import html from 'html-literal';
import { reload } from '../router';
import store from '../store/_index';
import reviews from '../store/reviews.js';
import { setAudioUtterance } from './audioPlayer';
import { addCtxListeners } from './ctx/ctxComponent';
import { beforeCtxRemarks } from './ctx/ctxRemarks.js';
import stars, { addStarListeners } from './ctx/reviews/stars';
import { loadSpin } from './loadingSpinner';

const { dictionary, remarks, poems } = store;

export default () => {
  const poem = store.poems.getPoem();
  const title = poem.title ?? '';
  const author = poem.author ?? '';
  const content = poem.content ?? '...';

  return html`
    <div id="poem">
      <h3 id="poem-title">${title}</h3>
      <div id="author-review-container">
        <h5 id="poem-author">${author}</h5>
        <div id="reviews-stars-btn-container">
          <button id="reviews-context-btn">reviews</button>
          ${stars('main')}
        </div>
      </div>
      <pre id="poem-content">${content}</pre>
      <div id="poem-buttons">
        <button id="poem-prev" ${poems.atFirst() ? 'disabled' : ''}>
          Previous
        </button>
        <button id="poem-next">Next</button>
      </div>
    </div>
  `;
};

export function addPoemListeners() {
  const nextBtn = document.getElementById('poem-next');
  const prevBtn = document.getElementById('poem-prev');
  const poemContent = document.getElementById('poem-content');
  const reviewsBtn = document.getElementById('reviews-context-btn');

  // reviews
  addStarListeners();

  reviewsBtn.addEventListener('click', async () => {
    poems.setReviewsContext();
    loadSpin();
    await reviews.syncActiveReadonlyReviews();
    reload();
  });

  // prevents outside-the-box highlighting
  poemContent.addEventListener('pointerdown', () => remarks.enableHighlight());

  // highlighted text for remarks
  poemContent.addEventListener('pointerup', async () => {
    if (!remarks.highlightEnabled) return;

    const selection = document.getSelection();
    const selectedText = selection.toString();

    remarks.disableHighlight();

    if (selectedText) {
      poems.setRemarksContext();
      remarks.setChunk(selectedText);

      loadSpin();
      await beforeCtxRemarks();
      reload();
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
    addCtxListeners();
  });
}
