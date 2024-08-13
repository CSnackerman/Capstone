import html from 'html-literal';
import loadingSpinner from './loadingSpinner';

export default (view) => {
  return html`
    <main>${view}</main>
    ${loadingSpinner()}
  `;
};
