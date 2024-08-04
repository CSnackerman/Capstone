import html from 'html-literal';
import speakerIcon from '/src/assets/images/speaker.svg';

export default () => {
  return html`
    <img id="speaker-icon" src=${speakerIcon} alt="play" width="32px" />
  `;
};

// util

export function setAudioSource(word) {
  document.getElementById('speaker-icon').onclick = async () => {
    const utterance = new SpeechSynthesisUtterance(word.toLowerCase());
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };
}
