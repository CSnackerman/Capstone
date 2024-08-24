import html from 'html-literal';
import { rerender } from '..';
import { ctxComponent, poem, search } from '../components/_index';
import { addPoemListeners } from '../components/poem';
import { addSearchListeners } from '../components/search.js';
import store from '../store/_index';

const { loadingSpinner, poems } = store;

export default () => {
  // prettier-ignore
  return poems.noContext()
    ? html`
        ${search()}
        <div id="poems-view" class="noncontextual">
          ${poem()}
        </div>
      `
    : html`
        ${search()}
        <div id="poems-view" class="contextual">
          ${poem()} 
          ${ctxComponent()}
        </div>
      `;
};

export const poemHooks = {
  async before(done) {
    if (poems.index === -1) {
      loadingSpinner.enable();
      rerender();
      await poems.next();
      loadingSpinner.disable();
    }

    done();
  },
  already() {
    poemHooks.after();
  },
  after() {
    addPoemListeners();
    addSearchListeners();
    poems.restoreContext();
  },
};
