import { setAudioUtterance } from '../components/audioPlayer';
import { addCtxListeners } from '../components/ctx/ctxComponent';
import { fetchRandomPoem } from '../network/poetrydb';
import store from './_index';

export default {
  stack: [],
  index: -1,
  context: undefined,
  addPoem(poem) {
    this.stack.push(poem);
    this.index++;
  },
  getPoem() {
    return this.empty() ? {} : this.stack[this.index];
  },
  getTitle() {
    return this.empty() ? '' : this.stack[this.index].title;
  },
  getAuthor() {
    return this.empty() ? '' : this.stack[this.index].author;
  },
  async next() {
    if (this.index === this.stack.length - 1) {
      const poem = await fetchRandomPoem();
      this.stack.push(poem);
    }
    this.index++;
  },
  previous() {
    if (this.index > 0) {
      this.index--;
      return true;
    }
    return false;
  },
  empty() {
    return this.stack.length === 0 && this.index === -1;
  },
  atFirst() {
    return this.index === 0;
  },
  clearContext() {
    this.context = undefined;
  },
  setDictionaryContext() {
    this.context = 'Dictionary';
  },
  setReviewsContext() {
    this.context = 'Reviews';
  },
  setRemarksContext() {
    this.context = 'Remarks';
  },
  noContext() {
    return !this.context;
  },
  restoreContext() {
    if (this.context === 'Dictionary' && store.dictionary.word) {
      setAudioUtterance('dictionary-audio-player', store.dictionary.word);
    }

    addCtxListeners();
  },
};
