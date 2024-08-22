import html from 'html-literal';
import { postReview } from '../../../network/rhymeRemarksApi.js';
import store from '../../../store/_index.js';
import stars from './stars.js';

const { reviews, poems } = store;

export default () => {
  return html`
    <div id="review-form-container">
      <div id="stars-required">Star rating required</div>
      ${stars('review-form', 'light')}
      <form id="review-form">
        <textarea
          id="review-textarea"
          name="review"
          placeholder="Type your review..."
          required
        ></textarea>
        <input id="review-submit" type="submit" />
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
  textarea.value = reviews.getCurrentPoemReview() ?? '';

  // store review progress
  textarea.addEventListener('keyup', () =>
    reviews.setCurrentPoemReview(textarea.value)
  );

  // handle submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!reviews.getCurrentPoemRating()) {
      starsRequired.style.visibility = 'visible';
      submitBtn.value = 'Submit ⚠️';
      return;
    }

    starsRequired.style.visibility = 'hidden';

    submitBtn.value = 'Submit ⏳';

    const requestBody = {
      title: poems.getTitle(),
      author: poems.getAuthor(),
      rating: reviews.getCurrentPoemRating(),
      review: new FormData(form).get('review'),
    };

    const res = await postReview(requestBody);

    console.log(res);

    if (res.ok) {
      form.reset();
      submitBtn.value = 'Submitted ✅';
      submitBtn.disabled = true;
      setTimeout(() => {
        submitBtn.value = 'Submit';
        submitBtn.disabled = false;
      }, 3000);
    } else {
      submitBtn.value = 'Try Again ⛔';
    }
  });
}
