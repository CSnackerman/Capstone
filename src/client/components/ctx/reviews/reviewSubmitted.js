import html from 'html-literal';
import { deleteReviewById } from '../../../network/rhymeRemarksApi.js';
import { reload } from '../../../router.js';
import store from '../../../store/_index.js';
import { DRAFT } from '../../../store/reviews.js';
import stars, { LIGHT, READONLY } from './stars.js';

const { reviews } = store;

export default () => {
  const review = reviews.getReview();

  return html`
    <div id="review-submitted">
      ${stars('submitted', {
        type: READONLY,
        mode: LIGHT,
        getRatingFunc: () => reviews.getRating(),
      })}
      <div id="review-submitted-content">${review}</div>
      <div id="review-submitted-buttons">
        <button id="edit-review-btn" class="review-submitted-button">
          Edit
        </button>
        <button id="delete-btn" class="review-submitted-button">Delete</button>
      </div>
    </div>
  `;
};

export function addReviewSubmittedListeners() {
  const editBtn = document.getElementById('edit-review-btn');
  const deleteBtn = document.getElementById('delete-btn');

  editBtn.addEventListener('click', () => {
    reviews.setStatus(DRAFT);
    reload();
  });

  deleteBtn.addEventListener('click', async () => {
    const res = await deleteReviewById(reviews.getCloudId());

    if (!res.ok) {
      console.log('idk something is wrong');
    }

    reviews.resetDraft();
    reload();
  });
}
