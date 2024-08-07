export async function fetchDictionaryDefinition(word) {
  const res = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`
  );
  const json = await res.json();

  console.log(json);
}
