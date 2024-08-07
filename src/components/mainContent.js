import html from 'html-literal';

export default (view) => {
  return html`
    <main>${view}</main>
  `;
};
