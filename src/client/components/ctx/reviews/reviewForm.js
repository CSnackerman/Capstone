import html from 'html-literal';
import { postReview } from '../../../network/rhymeRemarksApi.js';
import { reload } from '../../../router.js';
import store from '../../../store/_index.js';
import stars from './stars.js';

const { reviews, poems } = store;

export default () => {
  const submitValue = reviews.hasCloudId() ? 'Update' : 'Submit';

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
  textarea.value = reviews.getActiveReview() ?? '';

  // store review progress
  textarea.addEventListener('keyup', () =>
    reviews.setActiveReview(textarea.value)
  );

  // handle submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!reviews.getActiveRating()) {
      starsRequired.style.visibility = 'visible';
      submitBtn.value = 'Submit ⚠️';
      return;
    }

    starsRequired.style.visibility = 'hidden';

    submitBtn.value = 'Submit ⏳';

    const requestBody = {
      title: poems.getTitle(),
      author: poems.getAuthor(),
      rating: reviews.getActiveRating(),
      review: new FormData(form).get('review'),
    };

    const res = await postReview(requestBody);

    if (res.ok) {
      reviews.setActiveReview_SUBMITTED();
      const review = await res.json();
      console.log(review);
      reviews.setActiveCloudId(review._id);
    }

    if (res.ok) {
      form.reset();
      submitBtn.value = 'Submitted ✅';
      submitBtn.disabled = true;
      reviews.setActiveReview_SUBMITTED();
      setTimeout(() => {
        submitBtn.value = 'Submit';
        submitBtn.disabled = false;
      }, 3000);
      reload();
    } else {
      submitBtn.value = 'Try Again ⛔';
    }
  });
}
