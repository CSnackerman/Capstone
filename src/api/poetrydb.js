import state from '../store/_index';

export async function fetchRandomPoem() {
  const res = await fetch('https://poetrydb.org/random');
  const json = await res.json();
  const poem = json[0];

  // console.log('poemlines', poem.lines);

  const markupLines = [];
  for (const line of poem.lines) {
    // console.log('line --', line);
    const words = line.match(/\W|\w+/g) ?? [];
    // console.log('words', words);

    markupLines.push(
      words
        .map((w) =>
          w.match(/\w+/) ? `<span class="poem-word">${w}</span>` : w
        )
        .join('')
    );
  }

  state.poems.stack.push({
    title: poem.title,
    author: poem.author,
    content: markupLines.join('\n'),
  });
}
