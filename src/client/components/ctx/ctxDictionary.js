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

  return partsOfSpeech.map((pos) => html`
    <h5 id="pos"><i>${pos}</i></h5>
    <ol id="def-list">
      ${dictionary.definitions[pos].map((def) => html`
          <li id="def">${def}</li>
      `)}
    </ol>
  `)
}
