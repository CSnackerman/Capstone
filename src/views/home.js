import html from 'html-literal';
import { scrawlings } from '../components';

export default () => {
  return html`
    <div id="home-view">
      <h1>Welcome to <b>Rhyme Remarks</b></h1>
      <div>
        <div>Please read some poetry.</div>
        <div>Learn some new words.</div>
        <div>Contribute to ratings.</div>
        <div>Share your insight.</div>
        <div>And enjoy!</div>
      </div>
    </div>
    <br />
    ${scrawlings()}
  `;
};
