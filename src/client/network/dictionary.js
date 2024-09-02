/**
 * Free Dictionary API
 * {@link https://dictionaryapi.dev/}
 */

export async function fetchDictionaryDefinition(word) {
  const res = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`
  );
  const json = await res.json();

  const definitions = drillDefinitions(json);

  return {
    word,
    definitions,
  };
}

function drillDefinitions(json) {
  if (!Array.isArray(json)) return { definitions: ['not found'] };

  return json
    .map((entry) => entry.meanings)
    .map((meaning) =>
      meaning.map((m) => ({
        partOfSpeech: m.partOfSpeech,
        definitions: m.definitions.map((d) => d.definition),
      }))
    )
    .flat()
    .reduce((acc, cur) => {
      const pos = cur.partOfSpeech;
      return {
        ...acc,
        [pos]: [...(acc[pos] ?? []), ...(cur.definitions ?? [])],
      };
    }, {});
}
