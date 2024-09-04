import html from 'html-literal';
import store from '../../../store/_index.js';
import stars, { LIGHT, READONLY } from './stars.js';

const { reviews } = store;

export default () => {
  if (reviews.getReadonlyReviewCount() === 0) {
    return '';
  }

  const reviewItem = (rating, review) => html`
    <div id="review-item">
      ${stars('readonly', {
        type: READONLY,
        mode: LIGHT,
        scale: 16,
        getRatingFunc: () => rating,
      })}
      <div id="readonly-review-content">${review}</div>
    </div>
  `;

  const markupReviewItems = reviews
    .getReadonlyReviews()
    .map(({ rating, review }) => reviewItem(rating, review));

  return html`
    <div id="reviews-readonly">
      ${markupReviewItems}
    </div>
  `;
};
