import { fetchRandomPoem } from '../api/poetrydb';

export default {
  stack: [],
  index: -1,
  async next() {
    if (this.index === this.stack.length - 1) {
      await fetchRandomPoem();
    }
    this.index++;
  },
  previous() {
    if (this.index > 0) {
      this.index--;
    }
  },
};
