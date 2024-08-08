import html from 'html-literal';
import Navigo from 'navigo';
import {
  footer,
  header,
  loadingSpinner,
  mainContent,
} from './components/_index';
import { updateActiveNavigation } from './components/nav';
import store from './store/_index';
import views, { poemHooks } from './views/_index';
import { notFoundHooks } from './views/notFound';

const app = document.getElementById('app');

export const router = new Navigo('/');

//prettier-ignore
const prerender = (state) => {
  // todo: doesn't appear on next click
  app.innerHTML = html`
    ${loadingSpinner(state.loadingSpinner.enabled)}
  `
}

// prettier-ignore
export const render = (view) => {
  app.innerHTML = html`
    ${header()}
    ${mainContent(views[view]())}
    ${footer()}
  `;

  router.updatePageLinks();
}

// common hooks
router.hooks({
  before(done) {
    prerender(store);
    done();
  },
  already(match) {
    render(match.url);
  },
  after(match) {
    updateActiveNavigation(match);
  },
});

router
  .on('/', () => render('home'))
  .on('/about', () => render('about'))
  .on('/contact', () => render('contact'))
  .on('/poems', () => render('poems'), poemHooks)
  .on('/compose', () => render('compose'))
  .notFound(() => render('notFound'), notFoundHooks)
  .resolve();
