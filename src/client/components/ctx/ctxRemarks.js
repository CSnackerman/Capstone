import html from 'html-literal';
import store from '../../store/_index';
import formEx, { addFormExEventListeners } from '../formEx.js';

const { remarks, forms } = store;

export default () => {
  return html`
    <div id="ctx-remarks" class="ctx-component">
      <div id="chunk">
        <q>${remarks.chunk}</q>
      </div>
      <hr />
      ${formEx('remark')}
      <div id="remark-comments">
        ${getCommentsHtml()}
      </div>
    </div>
  `;
};

export function addCtxRemarksListeners() {
  addFormExEventListeners('remark');

  addEventListener(forms.remark.refreshEventId, async () => {
    await remarks.syncComments();
    document.getElementById('remark-comments').innerHTML = getCommentsHtml();
  });
}

// util

function getCommentsHtml() {
  return remarks.comments
    .map(
      (comment) => html`
        <div id="remark-readonly-comment">
          <div id="remark-readonly-comment-poster">${comment.poster}</div>
          <div id="remark-readonly-comment-date">${comment.postedAt}</div>
          <div id="remark-readony-comment-content">${comment.comment}</div>
        </div>
      `
    )
    .join('');
}
