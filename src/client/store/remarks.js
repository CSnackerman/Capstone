export default {
  highlightEnabled: false,
  rawChunk: '',
  refinedChunk: '',
  setRawChunk(textSelection) {
    if (typeof textSelection !== 'string') return;

    this.rawChunk = textSelection;
  },
  enableHighlight() {
    this.highlightEnabled = true;
  },
  disableHighlight() {
    this.highlightEnabled = false;
  },
};
