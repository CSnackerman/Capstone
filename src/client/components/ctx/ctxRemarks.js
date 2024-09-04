import html from 'html-literal';
import {
  getRemarksByChunk,
  postRemark,
} from '../../network/rhymeRemarksApi.js';
import { reload } from '../../router.js';
import store from '../../store/_index';

const { remarks } = store;

export default () => {
  return html`
    <div id="ctx-remarks" class="ctx-component">
      <div id="chunk">
        <q>${remarks.chunk}</q>
      </div>
      <hr />
      <form id="remark-form">
        <label id="remark-username-label">
          <span>Username <span class="optional">(optional)</span></span>
          <input
            id="remark-name-input"
            type="text"
            name="username"
            placeholder="anonymous (default)"
          />
        </label>
        <label id="remark-comment-label">
          <span>Comment</span>
          <textarea
            id="remark-textarea"
            name="comment"
            placeholder="Write a remark..."
            required
          ></textarea>
        </label>
        <input id="remark-submit" type="submit" value="Publish" />
      </form>
      <div id="remark-comments">
        ${getCommentsHtml()}
      </div>
    </div>
  `;
};

export function addCtxRemarksListeners() {
  const form = document.getElementById('remark-form');
  const submitBtn = document.getElementById('remark-submit');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    submitBtn.value = 'Publishing ⏳';

    const formData = new FormData(e.target);

    const res = await postRemark({
      chunk: remarks.chunk,
      poster: formData.get('username') || 'anonymous',
      comment: formData.get('comment'),
      postedAt: new Date(),
    });

    if (res.ok) {
      submitBtn.value = 'Published ✅';
      await refreshRemarkComments();
      form.reset();
      reload();
    } else {
      submitBtn.value = 'Failed ⛔';
    }

    setTimeout(() => {
      submitBtn.value = 'Publish';
    }, 3000);
  });
}

export async function refreshRemarkComments() {
  const res = await getRemarksByChunk(remarks.chunk);

  if (res.ok) {
    const comments = await res.json();
    remarks.setComments(comments);
  }
}

// util

function getCommentsHtml() {
  return remarks.comments.map(
    (comment) => html`
      <div id="remark-readonly-comment">
        <div id="remark-readonly-comment-poster">${comment.poster}</div>
        <div id="remark-readonly-comment-date">${comment.postedAt}</div>
        <div id="remark-readony-comment-content">${comment.comment}</div>
      </div>
    `
  );
}
