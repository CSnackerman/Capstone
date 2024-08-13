import html from 'html-literal';
import { rerender } from '..';
import { ctxComponent, poem } from '../components/_index';
import { setAudioUtterance } from '../components/audioPlayer';
import { addExitContextListener } from '../components/ctxComponents/ctxComponent';
import { loadSpin } from '../components/loadingSpinner';
import { reload } from '../router';
import store from '../store/_index';

const { dictionary, loadingSpinner, poems } = store;

export default () => {
  // prettier-ignore
  return poems.noContext()
    ? html`
        <div id="poems-view" class="noncontextual">
          ${poem()}
        </div>
      `
    : html`
        <div id="poems-view" class="contextual">
          ${poem()} 
          ${ctxComponent()}
        </div>
      `;
};

// ---

export const poemHooks = {
  async before(done) {
    if (poems.index === -1) {
      loadingSpinner.enable();
      rerender();
      await poems.next();
      loadingSpinner.disable();
    }

    done();
  },
  already() {
    poemHooks.after();
  },
  after() {
    const nextBtn = document.getElementById('poem-next');
    const prevBtn = document.getElementById('poem-prev');
    const poemContent = document.getElementById('poem-content');

    poems.restoreContext();

    // highlighted text
    poemContent.addEventListener('mouseup', () => {
      const selection = document.getSelection();
      const selectedText = selection.toString();

      if (selectedText) {
        poems.setRemarksContext();
        console.log(selection.toString()); // todo
      }
    });

    // next
    nextBtn.addEventListener('click', async () => {
      loadSpin();

      await poems.next();
      reload();
    });

    // prev
    prevBtn.addEventListener('click', () => {
      if (poems.previous()) {
        reload();
      }
    });

    // word click
    poemContent.addEventListener('click', async (e) => {
      const isSpan = e.target instanceof HTMLSpanElement;
      if (!isSpan) {
        return;
      }

      const word = e.target.textContent;

      if (word === dictionary.selected) {
        return;
      }

      poems.setDictionaryContext();

      loadSpin();

      await dictionary.lookup(word);

      reload();

      setAudioUtterance('dictionary-audio-player', word);
      addExitContextListener();
    });
  },
};
