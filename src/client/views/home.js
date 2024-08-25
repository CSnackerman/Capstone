import html from 'html-literal';
import { scrawlings } from '../components/_index';

export default () => {
  return html`
    <div id="home-view">
      <h1>
        <div>Welcome to</div>
        <div><b>Rhyme Remarks</b></div>
      </h1>
      <div>
        <div>Please read some poetry</div>
        <div>Learn a few new words</div>
        <div>Leave some reviews</div>
        <div>Write your remarks</div>
        <div>And enjoy!</div>
      </div>
    </div>
    <br />
    ${scrawlings()}
  `;
};
