import html from 'html-literal';
import infoSvg from '../assets/images/info.svg';
import tooltipSvg from '../assets/images/tooltip.svg';
import { postPoemComposition } from '../network/rhymeRemarksApi.js';

export default () => {
  return html`
    <div id="compose-view">
      <form id="compose-form">
        <div>
          <label for="compose-title">Title</label>
          <input
            id="compose-title"
            name="title"
            type="text"
            placeholder="Invitation"
            required
          />
        </div>
        <div>
          <textarea
            id="compose-textarea"
            name="composition"
            placeholder="${textareaPlaceholder}"
            required
          ></textarea>
          <div id="info-container">
            <img id="info-icon" src=${infoSvg} />
            <div id="tooltip-container">
              <img id="tooltip-svg" src=${tooltipSvg} />
              <div id="tooltip-content">
                Evoke your inner poet.
                <br />
                Formatting is preserved.
                <br />
                Your submission will be considered!
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <label for="compose-author">Author</label>
            <input
              id="compose-author"
              name="author"
              type="text"
              placeholder="Shel Silverstein"
              required
            />
          </div>
          <input id="compose-submit" type="submit" />
        </div>
      </form>
      <div id="compose-error" style="visibility: hidden;">.</div>
    </div>
  `;
};

export const composeHooks = {
  after() {
    const form = document.getElementById('compose-form');
    const submitBtn = document.getElementById('compose-submit');
    const errorDiv = document.getElementById('compose-error');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      submitBtn.value = 'Submit ⏳';
      errorDiv.style.visibility = 'hidden';

      const requestBody = {};
      new FormData(form).forEach((value, key) => (requestBody[key] = value));

      const res = await postPoemComposition(requestBody);

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

const textareaPlaceholder = `\
If you are a dreamer, come in,
If you are a dreamer, a wisher, a liar,
A hope-er, a pray-er, a magic bean buyer...
If you're a pretender, come sit by my fire
For we have some flax-golden tales to spin.
Come in!
Come in!
`;
