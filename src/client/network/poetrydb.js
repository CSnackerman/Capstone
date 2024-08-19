export async function fetchRandomPoem() {
  const res = await fetch('https://poetrydb.org/random');
  const json = await res.json();
  const poem = json[0];

  const markupLines = [];
  for (const line of poem.lines) {
    const words = line.match(/\W|\w+/g) ?? [];

    markupLines.push(
      words
        .map((w) =>
          w.match(/\w+/) ? `<span class="poem-word">${w}</span>` : w
        )
        .join('')
    );
  }

  return {
    title: poem.title,
    author: poem.author,
    content: markupLines.join('\n'),
  };
}
