import html from 'html-literal';
import reviewForm, { addReviewFormListeners } from './reviewForm.js';

export default () => {
  return html`
    <div id="ctx-reviews" class="ctx-component">
      ${reviewForm()}
    </div>
  `;
};

export function addCtxReviewListeners() {
  addReviewFormListeners();
}
