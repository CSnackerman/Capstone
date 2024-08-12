import { fetchDictionaryDefinition } from '../network/dictionary';

export default {
  word: '',
  definitions: {},
  async lookup(word) {
    try {
      const result = await fetchDictionaryDefinition(word.toLowerCase());
      this.word = result.word;
      this.definitions = result.definitions;
    } catch (err) {
      console.log('[dictionary]', err);
    }
  },
};
