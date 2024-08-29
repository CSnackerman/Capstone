export default {
  highlightEnabled: false,
  chunk: '',
  comments: [],
  setChunk(textSelection) {
    if (typeof textSelection !== 'string') return;

    this.chunk = textSelection;
  },
  setComments(comments) {
    this.comments = comments.map(({ _id, poster, comment, postedAt }) => ({
      id: _id,
      poster: `@${poster}`,
      comment,
      postedAt: `${new Date(postedAt).toLocaleDateString('en-US', {
        timeZone: 'America/Chicago',
      })}<br/>${new Date(postedAt).toLocaleTimeString('en-US', {
        timeZone: 'America/Chicago',
      })}`,
    }));
  },
  enableHighlight() {
    this.highlightEnabled = true;
  },
  disableHighlight() {
    this.highlightEnabled = false;
  },
};
