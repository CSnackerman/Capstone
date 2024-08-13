export default {
  rawChunk: '',
  refinedChunk: '',
  setRawChunk(textSelection) {
    if (typeof textSelection !== 'string') return;

    this.rawChunk = textSelection;
  },
};
