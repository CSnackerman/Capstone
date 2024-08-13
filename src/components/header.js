import html from 'html-literal';
import nav from './nav';

export default () => {
  return html`
    <header>
      ${nav()}
    </header>
  `;
};
