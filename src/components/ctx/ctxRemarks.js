import html from 'html-literal';
import store from '../../store/_index';

const { remarks } = store;

export default () => {
  return html`
    <div id="ctx-remarks" class="ctx-component">
      <div id="chunk">
        ${remarks.rawChunk}
      </div>
      <hr />
      <div id="remark-comments">
        Here are some comments (TODO)
      </div>
    </div>
  `;
};
