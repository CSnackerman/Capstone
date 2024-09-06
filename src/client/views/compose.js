import html from 'html-literal';
import formEx, { addFormExEventListeners } from '../components/formEx.js';

// todo: add tooltip back
export default () => {
  return html`
    <div id="compose-view">
      ${formEx('compose')}
    </div>
  `;
};

export const composeHooks = {
  after() {
    addFormExEventListeners('compose');
  },
};
