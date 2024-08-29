import html from 'html-literal';
import closeSvg from '../../assets/images/close.svg';
import { reload } from '../../router';
import store from '../../store/_index';
import ctxDictionary from './ctxDictionary';
import ctxRemarks, { afterCtxRemarks } from './ctxRemarks';
import ctxReviews, { setupCtxReview } from './reviews/ctxReviews';

const { poems } = store;

export default () => {
  if (poems.noContext()) {
    return '';
  }

  const ctx = poems.context;
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

export function addCtxListeners() {
  if (poems.context === 'Reviews') setupCtxReview();
  if (poems.context === 'Remarks') afterCtxRemarks();

  // all contexts have an exit button
  document.getElementById('exit-btn')?.addEventListener('click', () => {
    poems.clearContext();
    reload();
  });
}
