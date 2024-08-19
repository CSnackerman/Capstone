import html from 'html-literal';

export default () => {
  return html`
    <div id="not-found-view">
      <hr />
      <hr />
      <hr />
      <h5>404 Not Found</h5>
      <h1 id="lost">Are you lost<span id="qmark">?</span></h1>
      <hr />
      <hr />
      <hr />
    </div>
    <a id="head-back" href="/" data-navigo>Head on back</a>
  `;
};

export const notFoundHooks = {
  before(done) {
    document.body.style.overflow = 'hidden';
    done();
  },
  leave(done) {
    document.body.style.overflow = 'visible'; // default
    done();
  },
};
