import { getReviewsByTitleAuthor } from '../network/rhymeRemarksApi.js';
import poems from './poems.js';

export const DRAFT = 'draft';
export const SUBMITTED = 'submitted';

export default {
  editable: {},
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
    const stripIdentifiers = ({ rating, review }) => ({ rating, review });
    this.readonly[key] = reviews.map(stripIdentifiers);
    this.activeAvgRating = this.calcReadonlyAvgRating();
  },
  isReadonlySynced() {
    return getKey() in this.readonly;
  },
  getReadonlyReviews() {
    const key = getKey();

    return this.readonly[key] ?? [];
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

    const reviews = this.getReadonlyReviews();

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

  // editable methods
  initEditableEntry() {
    const key = getKey();

    if (key in this.editable) return;

    this.editable[key] = {
      status: DRAFT,
      cloudId: undefined,
      rating: undefined,
      review: undefined,
    };
  },
  setReview(review) {
    const key = getKey();

    if (key in this.editable) {
      this.editable[key].review = review;
      return;
    }
  },
  setRating(rating) {
    const key = getKey();

    if (key in this.editable) {
      this.editable[key].rating = rating;
      return;
    }
  },
  clearRating() {
    const key = getKey();
    if (key in this.editable) {
      this.editable[key].rating = undefined;
    }
  },
  getReview() {
    const key = getKey();
    return this.editable[key]?.review;
  },
  getRating() {
    const key = getKey();
    return this.editable[key]?.rating;
  },
  setStatus(status) {
    if (![DRAFT, SUBMITTED].includes(status)) {
      throw 'invalid review status';
    }

    this.editable[getKey()].status = status;
  },
  getStatus() {
    const key = getKey();
    return this.editable[key]?.status;
  },
  isDraftStatus() {
    return this.getStatus() === DRAFT;
  },
  isSubmittedStatus() {
    return this.getStatus() === SUBMITTED;
  },
  setCloudId(id) {
    const key = getKey();
    this.editable[key].cloudId = id;

    console.log('active-editable', this.editable[key]);
  },
  getCloudId() {
    return this.editable[getKey()].cloudId;
  },
  resetDraft() {
    this.editable[getKey()] = {
      status: DRAFT,
      cloudId: undefined,
      rating: undefined,
      review: undefined,
    };
  },
  hasCloudId() {
    return !!this.editable[getKey()]?.cloudId;
  },
};

// util

function getKey() {
  const keyTitle = poems.getTitle().replace(/ /g, '_');
  const keyAuthor = poems.getAuthor().replace(/ /g, '_');
  return `${keyTitle}&&&${keyAuthor}`;
}
