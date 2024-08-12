import { fetchRandomPoem } from '../network/poetrydb';

export default {
  stack: [],
  index: -1,
  context: undefined,
  getPoem() {
    return this.empty() ? {} : this.stack[this.index];
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
};
