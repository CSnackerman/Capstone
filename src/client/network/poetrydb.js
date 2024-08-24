const POETRYDB_API_DOMAIN = 'https://poetrydb.org';

export async function fetchRandomPoem() {
  const res = await fetch(new URL('/random', POETRYDB_API_DOMAIN));
  const json = await res.json();
  const poem = json[0];

  return {
    title: poem.title,
    author: poem.author,
    content: markupLines(poem),
  };
}

export async function fetchPoemByTitleAuthor(title, author) {
  try {
    const res = await fetch(
      new URL(`/author,title/${author};${title}`, POETRYDB_API_DOMAIN)
    );

    const json = await res.json();
    const poem = json[0];

    if (!poem) throw '404 poem not found';

    return {
      title,
      author,
      content: markupLines(poem),
    };
  } catch (err) {
    console.error('[poemByTitleAuthor]', err);

    return {
      title,
      author,
      content: err,
    };
  }
}

// util

function markupLines(poem) {
  const lines = [];
  for (const line of poem.lines) {
    const words = line.match(/\W|\w+/g) ?? [];

    lines.push(
      words
        .map((w) =>
          w.match(/\w+/) ? `<span class="poem-word">${w}</span>` : w
        )
        .join('')
    );
  }

  return lines.join('\n');
}
