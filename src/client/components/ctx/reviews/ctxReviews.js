import html from 'html-literal';
import store from '../../../store/_index.js';
import reviewForm, { addReviewFormListeners } from './reviewDraft.js';
import reviewsReadonly from './reviewsReadonly.js';
import reviewSubmitted, {
  addReviewSubmittedListeners,
} from './reviewSubmitted.js';

const { reviews } = store;

export default () => {
  const activeReview = reviews.isSubmittedStatus()
    ? reviewSubmitted
    : reviewForm;

  // prettier-ignore
  return html`
    <div id="ctx-reviews" class="ctx-component">
      ${activeReview()}
      ${reviewsReadonly()}
    </div>
  `;
};

export function addCtxReviewListeners() {
  if (reviews.isDraftStatus()) {
    addReviewFormListeners();
  } else if (reviews.isSubmittedStatus()) {
    addReviewSubmittedListeners();
  }
}
