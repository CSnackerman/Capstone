import html from 'html-literal';
import { fetchPoemByTitleAuthor, markupLines } from '../network/poetrydb.js';
import { getCompositionByTitleAuthor } from '../network/rhymeRemarksApi.js';
import { reload } from '../router.js';
import store from '../store/_index.js';

const { search, poems } = store;

export default () => {
  return html`
    <div id="search-container">
      <div id="search-collapse-wrapper" class="search-toggles">
        <input
          id="search-title"
          class="search-toggles"
          type="text"
          placeholder="title"
        />
        <input
          id="search-author"
          class="search-toggles"
          type="text"
          placeholder="author"
        />
        <button id="search-btn" class="search-toggles" title="search">
          🔎
        </button>
      </div>
      <button id="toggle-search-btn">🔎</button>
    </div>
  `;
};

export function addSearchListeners() {
  const toggleBtn = document.getElementById('toggle-search-btn');
  const searchBtn = document.getElementById('search-btn');
  const titleInput = document.getElementById('search-title');
  const authorInput = document.getElementById('search-author');

  // toggle visibility
  toggleBtn.addEventListener('click', () => {
    search.toggleCollapsed();

    if (!search.isCollapsed()) {
      setStyles({ visibility: 'visible', scale: 1 });
      toggleBtn.textContent = '❌';
    }

    setStyles({ opacity: search.getOpacity() });

    if (search.isCollapsed()) {
      setStyles({ scale: 0 });
      toggleBtn.textContent = '🔎';

      // lazy hack. ms matches css transition time in search.css
      setTimeout(() => setStyles({ visibility: 'hidden' }), 200);
    }
  });

  // submit search
  searchBtn.addEventListener('click', async () => {
    const title = getSearchTitle();
    const author = getSearchAuthor();

    if (!title) {
      titleInput.setAttribute('placeholder', '⚠️ title required ⚠️');
    }

    if (!author) {
      authorInput.setAttribute('placeholder', '⚠️ author required ⚠️');
    }

    if (!title || !author) return;

    let poem = { title, author, content: 'Could not locate your search.' };
    const poetryDbPoem = await fetchPoemByTitleAuthor(title, author);

    if (!poetryDbPoem.error) {
      poem = poetryDbPoem;
    } else {
      const compositionResponse = await getCompositionByTitleAuthor(
        title,
        author
      );

      if (compositionResponse.ok) {
        const { title, author, composition } = await compositionResponse.json();
        poem = {
          title,
          author,
          content: markupLines(composition.split('\n')),
        };
      }
    }

    poems.addPoem(poem);

    titleInput.setAttribute('placeholder', 'title');
    authorInput.setAttribute('placeholder', 'author');

    // collapse search
    setStyles({ visibility: 'hidden', opacity: 0, scale: 0 });
    search.collapse();

    reload();
  });
}

// util

function setStyles(styles) {
  const searchToggles = document.querySelectorAll('.search-toggles');

  searchToggles.forEach((el) => {
    for (const attr in styles) {
      el.style[attr] = styles[attr];
    }
  });
}

const getSearchTitle = () =>
  document.getElementById('search-title')?.value ?? '';

const getSearchAuthor = () =>
  document.getElementById('search-author')?.value ?? '';
