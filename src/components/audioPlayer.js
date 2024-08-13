import html from 'html-literal';
import speakerIcon from '/src/assets/images/speaker.svg';

export default (id) => {
  return html`
    <img
      id="${id}"
      class="audio-player"
      src=${speakerIcon}
      alt="play"
      width="32px"
    />
  `;
};

export function setAudioUtterance(audioPlayerId, word) {
  document.getElementById(audioPlayerId).onclick = async () => {
    const utterance = new SpeechSynthesisUtterance(word.toLowerCase());
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };
}
