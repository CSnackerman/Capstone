import html from 'html-literal';
import closeSvg from '../../assets/images/close.svg';
import { reload } from '../../router';
import store from '../../store/_index';
import ctxDictionary from './ctxDictionary';
import ctxRemarks from './ctxRemarks';
import ctxReviews from './reviews/ctxReviews';

const { poems } = store;

export default () => {
  if (store.poems.noContext()) {
    return '';
  }

  const ctx = store.poems.context;
  let component = '';
  if (ctx === 'Dictionary') component = ctxDictionary;
  if (ctx === 'Reviews') component = ctxReviews;
  if (ctx === 'Remarks') component = ctxRemarks;

  return html`
    <div class="ctx-component">
      <img id="exit-btn" src=${closeSvg} alt="exit" />
      <h1 id="ctx-title">${ctx}</h1>
      ${component()}
    </div>
  `;
};

export function addExitContextListener() {
  document.getElementById('exit-btn')?.addEventListener('click', () => {
    poems.clearContext();
    reload();
  });
}
