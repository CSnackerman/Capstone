import { getReviewsByTitleAuthor } from '../network/rhymeRemarksApi.js';
import poems from './poems.js';

const REVIEW_DRAFT = 'review_draft';
const REVIEW_SUBMITTED = 'review_submitted';

export default {
  editable: {},
  readonly: {},
  // readonly methods
  async syncActiveReadonlyReviews() {
    const res = await getReviewsByTitleAuthor(
      poems.getTitle(),
      poems.getAuthor()
    );

    const reviews = await res.json();

    this.storeActiveReadonlyReviews(reviews);
  },
  storeActiveReadonlyReviews(reviews) {
    const key = getActiveKey();
    const stripIdentifiers = ({ rating, review }) => ({ rating, review });
    this.readonly[key] = reviews.map(stripIdentifiers);
  },
  activeReadonlyIsSynced() {
    return getActiveKey() in this.readonly;
  },
  getActiveReadonlyReviews() {
    const key = getActiveKey();

    return this.readonly[key] ?? [];
  },
  getActiveReadonlyReviewCount() {
    const key = getActiveKey();

    if (key in this.readonly) {
      return this.readonly[key].length;
    }

    return 0;
  },
  // editable methods
  initEditableEntry() {
    const key = getActiveKey();

    if (key in this.editable) return;

    this.editable[key] = {
      status: REVIEW_DRAFT,
      cloudId: undefined,
      rating: undefined,
      review: undefined,
    };
  },
  setActiveReview(review) {
    const key = getActiveKey();

    if (key in this.editable) {
      this.editable[key].review = review;
      return;
    }
  },
  setActiveRating(rating) {
    const key = getActiveKey();

    if (key in this.editable) {
      this.editable[key].rating = rating;
      return;
    }
  },

  setActiveReview_DRAFT() {
    const key = getActiveKey();
    this.editable[key].status = REVIEW_DRAFT;
  },
  setActiveReview_SUBMITTED() {
    const key = getActiveKey();
    this.editable[key].status = REVIEW_SUBMITTED;
  },
  getActiveReview() {
    const key = getActiveKey();
    return this.editable[key]?.review;
  },
  getActiveRating() {
    const key = getActiveKey();
    return this.editable[key]?.rating;
  },
  getActiveStatus() {
    const key = getActiveKey();
    return this.editable[key]?.status;
  },
  activeIsDraftStatus() {
    return this.getActiveStatus() === REVIEW_DRAFT;
  },
  activeIsSubittedStatus() {
    return this.getActiveStatus() === REVIEW_SUBMITTED;
  },
  setActiveCloudId(id) {
    const key = getActiveKey();
    this.editable[key].cloudId = id;

    console.log('active-editable', this.editable[key]);
  },
  getActiveCloudId() {
    return this.editable[getActiveKey()].cloudId;
  },
  resetActiveDraft() {
    this.editable[getActiveKey()] = {
      status: REVIEW_DRAFT,
      cloudId: undefined,
      rating: undefined,
      review: undefined,
    };
  },
  hasCloudId() {
    return !!this.editable[getActiveKey()]?.cloudId;
  },
};

// util

function createReviewKey(title, author) {
  return `${title.replace(/ /g, '_')}&&&${author.replace(/ /g, '_')}`;
}

function getActiveKey() {
  return createReviewKey(poems.getTitle(), poems.getAuthor());
}
