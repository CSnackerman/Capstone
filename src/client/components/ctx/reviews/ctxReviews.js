import html from 'html-literal';
import { reload } from '../../../router.js';
import store from '../../../store/_index.js';
import { DRAFT } from '../../../store/reviews.js';
import reviewDraft, { addReviewDraftListeners } from './reviewDraft.js';
import reviewsReadonly, {
  addReadonlyReviewListeners,
  refreshReadonlyReviews,
} from './reviewsReadonly.js';

const { reviews, forms } = store;

export default () => {
  // prettier-ignore
  return html`
    <div id="ctx-reviews" class="ctx-component">
      ${reviewDraft()}
      ${reviewsReadonly()}
    </div>
  `;
};

export function addCtxReviewListeners() {
  addEventListener(forms.review.refreshEvent.type, async () => {
    await reviews.syncReadonlyReviews();
    refreshReadonlyReviews();
  });

  addEventListener(forms.reviewEdit.refreshEvent.type, async () => {
    await reviews.syncReadonlyReviews();
    reviews.setStatus(DRAFT);
    reviews.resetDraft();
    reload();
  });

  addReviewDraftListeners();
  addReadonlyReviewListeners();
}
