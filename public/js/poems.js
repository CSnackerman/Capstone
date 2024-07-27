const titleElement = document.getElementById('poem-title');
const authorElement = document.getElementById('poem-author');
const contentElement = document.getElementById('poem-text');
const nextBtn = document.getElementById('poem-next');

window.addEventListener('load', fetchRandomPoem);
nextBtn.addEventListener('click', fetchRandomPoem);

async function fetchRandomPoem() {
  const res = await fetch('https://poetrydb.org/random');
  const json = await res.json();

  const poem = json[0];

  console.log(poem);

  titleElement.innerText = poem.title;
  authorElement.innerText = poem.author;

  let content = '';

  for (const line of poem.lines) {
    content += line + '\n';
  }

  contentElement.innerText = content;
}
