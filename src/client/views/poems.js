import html from 'html-literal';
import { ctxComponent, poem, search } from '../components/_index';
import { addStarListeners } from '../components/ctx/reviews/stars.js';
import { loadSpin } from '../components/loadingSpinner.js';
import { addPoemListeners } from '../components/poem';
import { addSearchListeners } from '../components/search.js';
import store from '../store/_index';

const { reviews, poems } = store;

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
      loadSpin();
      await poems.next();
      await reviews.syncReadonlyReviews();
    }

    done();
  },
  already() {
    poemHooks.after();
  },
  after() {
    addPoemListeners();
    addStarListeners();
    addSearchListeners();
    poems.restoreContext();
  },
};
