import html from 'html-literal';
import Navigo from 'navigo';

import { footer, header, loadingSpinner } from './components';
import { updateActiveNavigation } from './components/header';
import state from './store/_index';
import views, { poemHooks } from './views/_index';

export const app = document.getElementById('app');

export const router = new Navigo('/');

//prettier-ignore
const prerender = (state) => {
  // todo: doesn't appear on next click
  app.innerHTML = html`
    ${loadingSpinner(state.loadingSpinner.enabled)}
  `
}

// prettier-ignore
const render = (view) => () =>
  (app.innerHTML = html`
    ${header()}
    <main>${views[view]()}</main>
    ${footer()}
  `);

// common hooks
router.hooks({
  before(done) {
    prerender(state);
    done();
  },
  after(match) {
    updateActiveNavigation(match);
  },
});

router
  .on('/', render('home'))
  .on('/about', render('about'))
  .on('/contact', render('contact'))
  .on('/poems', render('poems'), poemHooks)
  .on('/compose', render('compose'))
  .resolve();

console.log('/' + router.getCurrentLocation().url);
