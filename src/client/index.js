import html from 'html-literal';
import { footer, mainContent, navHeader } from './components/_index';
import { initRouter, router } from './router';
import store from './store/_index.js';
import views from './views/_index';

const { device } = store;

// prettier-ignore
export function render(view) {
  document.getElementById('app').innerHTML = html`
    ${navHeader()}
    ${mainContent(views[view]())}
    ${footer()}
  `;

  router.updatePageLinks();
}

export function rerender() {
  render(router.getCurrentLocation().url || 'home');
}

// init

device.determineType();
window.addEventListener('resize', () => device.determineType());
initRouter();
