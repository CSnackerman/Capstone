import html from 'html-literal';
import { postFeedbackMessage } from '../network/rhymeRemarksApi.js';

export default () => {
  return html`
    <div id="contact-view">
      <h1>Speak your mind<span id="brain">🧠</span></h1>
      <form id="contact-form" autocomplete="off">
        <div id="from-field">
          <label for="contact-from">Name</label>
          <input id="contact-from" name="from" type="text" required />
        </div>
        <div id="email-field">
          <label for="contact-email">Email</label>
          <input id="contact-email" name="email" type="email" />
        </div>
        <div id="message-field">
          <label for="contact-message">Message</label>
          <textarea id="contact-message" name="message" required></textarea>
        </div>
        <input id="contact-submit" type="submit" />
      </form>
      <div id="contact-error" style="visibility: hidden;">.</div>
    </div>
  `;
};

export const contactHooks = {
  after() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('contact-submit');
    const errorDiv = document.getElementById('contact-error');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      submitBtn.value = 'Submit ⏳';

      const requestBody = {};
      new FormData(form).forEach((value, key) => (requestBody[key] = value));

      const res = await postFeedbackMessage(requestBody);

      if (res.ok) {
        form.reset();
        submitBtn.value = 'Submit ✅';
        setTimeout(() => (submitBtn.value = 'Submit'), 3000);
      } else {
        submitBtn.value = 'Submit ⛔';
        errorDiv.innerHTML = `Whoops<br/>[${res.status}] ${res.statusText}`;
        errorDiv.style.visibility = 'visible';
      }
    });
  },
};
