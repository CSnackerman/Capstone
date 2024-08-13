import html from 'html-literal';
import store from '../store/_index';

export default () => {
  const poem = store.poems.getPoem();
  const title = poem.title ?? '...';
  const author = poem.author ?? '...';
  const content = poem.content ?? '...';

  return html`
    <div id="poem">
      <h3 id="poem-title">${title}</h3>
      <h5 id="poem-author">${author}</h5>
      <pre id="poem-content">${content}</pre>
      <div id="poem-buttons">
        <button id="poem-prev">Previous</button>
        <button id="poem-next">Next</button>
      </div>
    </div>
  `;
};
