import Navigo from 'navigo';
import { render } from '.';
import {
  addMobileNavHeaderListeners,
  updateActiveNavigation,
} from './components/navHeader.js';
import store from './store/_index.js';
import { composeHooks } from './views/compose.js';
import { contactHooks } from './views/contact.js';
import { notFoundHooks } from './views/notFound';
import { poemHooks } from './views/poems';

const { device } = store;

export const router = new Navigo('/');

const commonHooks = {
  before(done) {
    done();
  },
  already(match) {
    render(match.url || 'home');
    commonHooks.after(match);
  },
  after(match) {
    updateActiveNavigation(match);

    if (device.isMobile()) {
      addMobileNavHeaderListeners();
    }
  },
};

export function initRouter() {
  router.hooks(commonHooks);
  router
    .on('/', () => render('home'))
    .on('/about', () => render('about'))
    .on('/contact', () => render('contact'), contactHooks)
    .on('/poems', () => render('poems'), poemHooks)
    .on('/compose', () => render('compose'), composeHooks)
    .notFound(() => render('notFound'), notFoundHooks)
    .resolve();
}

export function reload() {
  router.navigate(router.getCurrentLocation().url || '/');
}
