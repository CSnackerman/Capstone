import html from 'html-literal';
import { getRemarksByChunk } from '../network/rhymeRemarksApi.js';

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
        postedAt: createPostedAtString(postedAt),
      }));
      return;
    }

    this.comments = [
      {
        id: undefined,
        poster: '@Error',
        comment: 'Something went wrong.',
        postedAt: createPostedAtString(),
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

// util

function createPostedAtString(when = new Date()) {
  const tz = {
    timeZone: 'America/Chicago',
  };
  const date = new Date(when).toLocaleDateString('en-US', tz);
  const time = new Date(when).toLocaleTimeString('en-US', tz);

  return html`
    ${date}<br />${time}
  `;
}
