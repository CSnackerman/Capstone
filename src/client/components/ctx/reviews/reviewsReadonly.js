import html from 'html-literal';
import store from '../../../store/_index.js';
import stars from './stars.js';

const { reviews } = store;

export default () => {
  if (reviews.getActiveReadonlyReviewCount() === 0) {
    return '';
  }

  const reviewItem = (rating, review) => html`
    <div id="review-item">
      ${stars('readonly', 'light', rating, 16)}
      <div id="readonly-review-content">${review}</div>
    </div>
  `;

  const markupReviewItems = reviews
    .getActiveReadonlyReviews()
    .map(({ rating, review }) => reviewItem(rating, review));

  return html`
    <div id="reviews-readonly">
      ${markupReviewItems}
    </div>
  `;
};
