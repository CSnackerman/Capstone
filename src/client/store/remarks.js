import { getRemarksByChunk } from '../network/rhymeRemarksApi.js';
import { getDateTimeString } from '../utils/dateUtils.js';

export default {
  highlightEnabled: false,
  chunk: '',
  comments: [],
  setChunk(textSelection) {
    if (typeof textSelection !== 'string') return;

    this.chunk = textSelection;
  },
  getSanitizedChunk() {
    return this.chunk.replace(/\n/g, '/n');
  },
  async syncComments() {
    const res = await getRemarksByChunk(this.getSanitizedChunk());

    if (res.ok) {
      const rawComments = await res.json();
      this.comments = rawComments.map(({ _id, poster, comment, postedAt }) => ({
        id: _id,
        poster: `@${poster}`,
        comment,
        postedAt: getDateTimeString(postedAt),
      }));
      return;
    }

    this.comments = [
      {
        id: undefined,
        poster: '@Error',
        comment: 'Something went wrong.',
        postedAt: getDateTimeString(),
      },
    ];
  },
  enableHighlight() {
    this.highlightEnabled = true;
  },
  disableHighlight() {
    this.highlightEnabled = false;
  },
};
