import html from 'html-literal';
import logo from '../assets/images/logo.png';

export default () => {
  return html`
    <nav>
      <a id="nav-home" href="/" data-navigo>
        <img src=${logo} alt="logo" width="56px" />
      </a>
      <a id="nav-about" href="/about" data-navigo>About Me</a>
      <a id="nav-contact" href="/contact" data-navigo>Contact</a>
      <a id="nav-poems" href="/poems" data-navigo>Poems</a>
      <a id="nav-compose" href="/compose" data-navigo>Compose</a>
    </nav>
  `;
};

export function updateActiveNavigation(match) {
  const path = match.route.path;
  const tagId = path ? 'nav-' + path : 'nav-home';
  const css_class = 'active-link';
  document.querySelectorAll('nav > a').forEach((a) => {
    a.classList.remove(css_class);
  });
  document.getElementById(tagId).classList.add(css_class);
}
