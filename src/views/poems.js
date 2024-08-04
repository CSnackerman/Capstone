import html from 'html-literal';
import { fetchDictionaryDefinition } from '../api/dictionary';
import { audioPlayer } from '../components';
import { setAudioSource } from '../components/audioPlayer';
import state from '../store/_index';

export default () => {
  const { stack, index } = state.poems;
  const { title, author, content } = stack[index];

  // prettier-ignore
  return html`
    <div id="poem-view">
      ${audioPlayer()}
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

// hooks

export const poemHooks = {
  async before(done) {
    if (state.poems.index === -1) {
      await state.poems.next();
    }

    done();
  },
  after() {
    const poemView = document.getElementById('poem-view');
    const nextBtn = document.getElementById('poem-next');
    const prevBtn = document.getElementById('poem-prev');
    const poemContent = document.getElementById('poem-content');

    poemView.addEventListener('mouseup', () => {
      const selection = document.getSelection();
      const selectedText = selection.toString();

      if (selectedText) {
        console.log(selection.toString()); // todo
      }
    });

    nextBtn.addEventListener('click', async () => {
      await state.poems.next();
      updateDOM();
    });

    prevBtn.addEventListener('click', () => {
      state.poems.previous();
      updateDOM();
    });

    poemContent.addEventListener('click', async (e) => {
      const isSpan = e.target instanceof HTMLSpanElement;

      if (!isSpan) {
        return;
      }

      const word = e.target.textContent;
      setAudioSource(word);
      await fetchDictionaryDefinition(word);
    });
  },
};

// util

function updateDOM() {
  const { stack, index } = state.poems;
  document.getElementById('poem-title').textContent = stack[index].title;
  document.getElementById('poem-author').textContent = stack[index].author;
  document.getElementById('poem-content').innerHTML = stack[index].content;
}
