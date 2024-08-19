import Navigo from 'navigo';
import { render } from '.';
import { updateActiveNavigation } from './components/nav';
import { notFoundHooks } from './views/notFound';
import { poemHooks } from './views/poems';

export const router = new Navigo();

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
  },
};

export function initRouter() {
  router.hooks(commonHooks);
  router
    .on('/', () => render('home'))
    .on('/about', () => render('about'))
    .on('/contact', () => render('contact'))
    .on('/poems', () => render('poems'), poemHooks)
    .on('/compose', () => render('compose'))
    .notFound(() => render('notFound'), notFoundHooks)
    .resolve();
}

export function reload() {
  router.navigate(router.getCurrentLocation().url || '/');
}
