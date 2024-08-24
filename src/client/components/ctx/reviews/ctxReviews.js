import html from 'html-literal';
import store from '../../../store/_index.js';
import reviewForm, { addReviewFormListeners } from './reviewForm.js';
import reviewsReadonly from './reviewsReadonly.js';
import reviewSubmitted, {
  addReviewSubmittedListeners,
} from './reviewSubmitted.js';

const { reviews } = store;

export default () => {
  const activeReview = reviews.activeIsSubittedStatus()
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

export function setupCtxReview() {
  reviews.initEditableEntry();

  if (reviews.activeIsDraftStatus()) {
    addReviewFormListeners();
  } else if (reviews.activeIsSubittedStatus()) {
    addReviewSubmittedListeners();
  }
}
