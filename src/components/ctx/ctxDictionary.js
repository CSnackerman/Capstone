import html from 'html-literal';
import store from '../../store/_index';
import audioPlayer from '../audioPlayer';

const { dictionary } = store;

export default () => {
  return html`
    <div class="ctx-dictionary">
      <div id="word-audio-wrapper">
        <h3 id="word">${dictionary.word}</h3>
        ${audioPlayer('dictionary-audio-player')}
      </div>
      <div id="scrollable-defs">
        ${mapDefinitions()}
      </div>
    </div>
  `;
};

// prettier-ignore
function mapDefinitions() {
  const partsOfSpeech = Object.keys(dictionary.definitions);
  let htmlOut = '';
  for (const pos of partsOfSpeech) {
    htmlOut += html`
      <h5 id="pos"><i>${pos}</i></h5>
      <ol id="def-list">
    `;

    for (const def of dictionary.definitions[pos]) {
      htmlOut += html`<li id="def">${def}</li>`;
    }

    htmlOut += html`</ol>`;
  }

  return htmlOut;
}
