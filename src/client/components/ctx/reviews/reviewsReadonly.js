import html from 'html-literal';
import { deleteReviewById } from '../../../network/rhymeRemarksApi.js';
import store from '../../../store/_index.js';
import { getDateTimeString } from '../../../utils/dateUtils.js';
import stars, { LIGHT, READONLY } from './stars.js';

const { reviews, forms } = store;

export default () => {
  const empty = reviews.getReadonlyReviewCount() === 0 ? 'class="empty"' : '';

  return html`
    <div id="reviews-readonly" ${empty}>
      ${getAllReviewItemsHtml()}
    </div>
  `;
};

export function addReadonlyReviewListeners() {
  const editButtons = document.querySelectorAll('.review-edit-button');
  const deleteButtons = document.querySelectorAll('.review-delete-button');

  const getCloudId = (e) =>
    e.target.closest('[data-cloud-id]')?.getAttribute('data-cloud-id');

  const onEditButtonClick = (e) => {
    const cloudId = getCloudId(e);

    reviews.blitToDraft(cloudId);
  };

  const onDeleteButtonClick = async (e) => {
    const cloudId = getCloudId(e);

    await deleteReviewById(cloudId);

    dispatchEvent(forms.review.refreshEvent);
  };

  editButtons.forEach((b) => (b.onclick = onEditButtonClick));
  deleteButtons.forEach((b) => (b.onclick = onDeleteButtonClick));
}

// util

export function refreshReadonlyReviews() {
  const reviewsReadonly = document.getElementById('reviews-readonly');
  reviewsReadonly.innerHTML = getAllReviewItemsHtml();
  reviewsReadonly.classList.remove('empty');
}

const getAllReviewItemsHtml = () =>
  reviews
    .getSortedReadonlyReviews()
    .map(getReviewItemHtml)
    .join('');

const getReviewItemHtml = ({ rating, review, postedAt, cloudId }) => html`
  <div class="review-item" data-cloud-id="${cloudId}">
    ${stars('readonly', {
      type: READONLY,
      mode: LIGHT,
      scale: 16,
      getRatingFunc: () => rating,
    })}
    <div class="readonly-review-date">${getDateTimeString(postedAt)}</div>
    <div class="readonly-review-content">${review}</div>
    <div class="readonly-review-buttons">
      <button class="review-edit-button">Edit</button>
      <button class="review-delete-button">Delete</button>
    </div>
  </div>
`;
