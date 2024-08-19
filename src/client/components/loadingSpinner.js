import html from 'html-literal';
import { rerender } from '..';
import store from '../store/_index';

const { loadingSpinner } = store;

export default () => {
  if (store.loadingSpinner.enabled) {
    return html`
      <div id="loading-spinner"></div>
    `;
  }

  return '';
};

// util

// this is generally the usage, so here's a wrapper
export function loadSpin() {
  loadingSpinner.enable();
  rerender();
  loadingSpinner.disable();
}
