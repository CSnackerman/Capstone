import html from 'html-literal';
import {
  postReview,
  updateReviewById,
} from '../../../network/rhymeRemarksApi.js';
import { reload } from '../../../router.js';
import store from '../../../store/_index.js';
import { SUBMITTED } from '../../../store/reviews.js';
import stars, { INTERACTABLE, LIGHT } from './stars.js';

const { reviews, poems } = store;

export default () => {
  const submitValue = reviews.hasCloudId() ? 'Update' : 'Submit';

  return html`
    <div id="review-draft-container">
      <div id="stars-required">Star rating required</div>
      ${stars('review-draft', {
        type: INTERACTABLE,
        mode: LIGHT,
        getRatingFunc: () => reviews.getRating(),
      })}
      <form id="review-form">
        <textarea
          id="review-textarea"
          name="review"
          placeholder="Type your review..."
          required
        ></textarea>
        <input id="review-submit" type="submit" value="${submitValue}" />
      </form>
    </div>
  `;
};

export function addReviewFormListeners() {
  const form = document.getElementById('review-form');
  const textarea = document.getElementById('review-textarea');
  const submitBtn = document.getElementById('review-submit');
  const starsRequired = document.getElementById('stars-required');

  // restore review (if applicable)
  textarea.value = reviews.getReview() ?? '';

  // store review progress
  textarea.addEventListener('keyup', () => reviews.setReview(textarea.value));

  // submit/update review
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!reviews.getRating()) {
      starsRequired.style.visibility = 'visible';
      submitBtn.value = 'Submit ⚠️';
      return;
    }

    starsRequired.style.visibility = 'hidden';

    submitBtn.value = 'Submit ⏳';

    const requestBody = {
      title: poems.getTitle(),
      author: poems.getAuthor(),
      rating: reviews.getRating(),
      review: new FormData(form).get('review'),
    };

    let res;
    if (reviews.hasCloudId()) {
      delete requestBody.title;
      delete requestBody.author;
      res = await updateReviewById(reviews.getCloudId(), requestBody);
    } else {
      res = await postReview(requestBody);
    }

    if (!res.ok) {
      submitBtn.value = 'Try Again ⛔';
      reload();
      return;
    }

    const review = await res.json();

    if (!reviews.hasCloudId()) {
      reviews.setCloudId(review._id);
    }

    form.reset();
    submitBtn.value = 'Submitted ✅';
    submitBtn.disabled = true;
    setTimeout(() => {
      submitBtn.value = 'Submit';
      submitBtn.disabled = false;
    }, 3000);

    reviews.setStatus(SUBMITTED);
    reload();
  });
}
