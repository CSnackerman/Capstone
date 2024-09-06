import { getReviewsByTitleAuthor } from '../network/rhymeRemarksApi.js';
import { reload } from '../router.js';
import poems from './poems.js';

export const DRAFT = 'draft';
export const EDIT = 'edit';
export const SUBMITTED = 'submitted';

export default {
  draft: {},
  readonly: {},
  activeAvgRating: undefined,

  // readonly methods
  async syncReadonlyReviews() {
    const res = await getReviewsByTitleAuthor(
      poems.getTitle(),
      poems.getAuthor()
    );

    const reviews = await res.json();

    const key = getKey();
    const desiredProps = ({ _id, rating, review, postedAt }) => ({
      cloudId: _id,
      rating,
      review,
      postedAt,
    });
    this.readonly[key] = reviews.map(desiredProps);
    this.activeAvgRating = this.calcReadonlyAvgRating();
  },
  isReadonlySynced() {
    return getKey() in this.readonly;
  },
  getSortedReadonlyReviews() {
    const key = getKey();

    const readonlyReviews = this.readonly[key] ?? [];

    readonlyReviews.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));

    return readonlyReviews;
  },
  getReadonlyReviewCount() {
    const key = getKey();

    if (key in this.readonly) {
      return this.readonly[key].length;
    }

    return 0;
  },
  calcReadonlyAvgRating() {
    const key = getKey();

    const exists = key in this.readonly;

    if (!exists) return 0;

    const reviews = this.getSortedReadonlyReviews();

    const totalStars = reviews.reduce(
      (runningTotal, review) => (runningTotal += review.rating),
      0
    );

    const count = this.getReadonlyReviewCount();

    if (count > 0) {
      return Math.floor(totalStars / count);
    }

    return 0;
  },
  getReadonlyAvgRating() {
    return this.activeAvgRating;
  },
  initEditableEntry() {
    const key = getKey();

    if (key in this.draft) return;

    this.draft[key] = {
      status: DRAFT,
      cloudId: undefined,
      rating: undefined,
      review: undefined,
      postedAt: undefined,
    };
  },
  setReview(review) {
    const key = getKey();

    if (key in this.draft) {
      this.draft[key].review = review;
      return;
    }
  },
  setRating(rating) {
    const key = getKey();

    if (key in this.draft) {
      this.draft[key].rating = rating;
      return;
    }
  },
  clearRating() {
    const key = getKey();
    if (key in this.draft) {
      this.draft[key].rating = undefined;
    }
  },
  getReview() {
    const key = getKey();
    return this.draft[key]?.review;
  },
  getRating() {
    const key = getKey();
    return this.draft[key]?.rating;
  },
  setStatus(status) {
    if (![DRAFT, SUBMITTED].includes(status)) {
      throw 'invalid review status';
    }

    this.draft[getKey()].status = status;
  },
  getStatus() {
    const key = getKey();
    return this.draft[key]?.status;
  },
  isDraftStatus() {
    return this.getStatus() === DRAFT;
  },
  isSubmittedStatus() {
    return this.getStatus() === SUBMITTED;
  },
  setCloudId(id) {
    const key = getKey();
    this.draft[key].cloudId = id;

    console.log('active-editable', this.draft[key]);
  },
  getCloudId() {
    return this.draft[getKey()].cloudId;
  },
  resetDraft() {
    this.draft[getKey()] = {
      status: DRAFT,
      cloudId: undefined,
      rating: undefined,
      review: undefined,
    };
  },
  hasCloudId() {
    return !!this.draft[getKey()]?.cloudId;
  },
  getReadonlyById(cloudId) {
    const key = getKey();
    return this.readonly[key]?.find((review) => review.cloudId === cloudId);
  },
  blitToDraft(cloudId) {
    const { rating, review } = this.getReadonlyById(cloudId);
    const key = getKey();

    this.draft[key] = {
      status: EDIT,
      cloudId,
      rating,
      review,
    };

    reload();
  },
};

// util

function getKey() {
  const keyTitle = poems.getTitle().replace(/ /g, '_');
  const keyAuthor = poems.getAuthor().replace(/ /g, '_');
  return `${keyTitle}&&&${keyAuthor}`;
}
