import { fetchRandomPoem } from '../network/poetrydb';

export default {
  stack: [],
  index: -1,
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
    }
  },
};
