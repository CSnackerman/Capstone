import html from 'html-literal';
import store from '../../store/_index';

const { dictionary } = store;

export default () => {
  return html`
    <div class="ctx-dictionary">
      <h3 id="word">${dictionary.word}</h3>
      <div id="scrollable-defs">
        ${mapDefinitions()}
      </div>
    </div>
  `;
};

// prettier-ignore
function mapDefinitions() {
  const partsOfSpeech = Object.keys(dictionary.definitions);
  let out = '';
  for (const pos of partsOfSpeech) {
    out += html`
      <h5 id="pos"><i>${pos}</i></h5>
      <ol id="def-list">
    `;

    for (const def of dictionary.definitions[pos]) {
      out += html`
        <li id="def">${def}</li>
      `;
    }

    out += html`</ol>`;
  }

  return out;
}

