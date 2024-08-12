import html from 'html-literal';
import { footer, header, mainContent } from './components/_index';
import { initRouter, router } from './router';
import views from './views/_index';

// prettier-ignore
export function render(view) {
  document.getElementById('app').innerHTML = html`
    ${header()}
    ${mainContent(views[view]())}
    ${footer()}
  `;

  router.updatePageLinks();
}

export function rerender() {
  render(router.getCurrentLocation().url || 'home');
}

initRouter();
