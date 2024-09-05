import html from 'html-literal';
import formEx, { addFormExEventListeners } from '../components/formEx.js';

export default () => {
  return html`
    <div id="contact-view">
      <h1>Speak your mind<span id="brain">🧠</span></h1>
      ${formEx('contact')}
    </div>
  `;
};

export const contactHooks = {
  after() {
    addFormExEventListeners('contact');
  },
};
