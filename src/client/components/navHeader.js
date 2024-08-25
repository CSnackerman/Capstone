import html from 'html-literal';
import burgerSvg from '../assets/images/hamburger.svg';
import logo from '../assets/images/logo.png';
import store from '../store/_index.js';

const { device, navigation } = store;

export default () => {
  return device.isDesktop()
    ? html`
        <header>
          <nav>
            <a id="nav-home" href="/" data-navigo>
              <img src=${logo} alt="logo" width="56px" />
            </a>
            <a id="nav-about" href="/about" data-navigo>About Me</a>
            <a id="nav-contact" href="/contact" data-navigo>Contact</a>
            <a id="nav-poems" href="/poems" data-navigo>Poems</a>
            <a id="nav-compose" href="/compose" data-navigo>Compose</a>
          </nav>
        </header>
      `
    : html`
        <header>
          <nav>
            <a id="nav-home" href="/" data-navigo>
              <img id="logo-mobile" src=${logo} alt="logo" width="48px" />
            </a>
            <h1 id="active-nav-display">Home</h1>
            <button id="hamburger-button">
              <img src=${burgerSvg} alt="menu" title="menu" />
            </button>
          </nav>
          <div id="mobile-nav-items" class="mobile-nav-hidden">
            <a id="nav-about" href="/about" data-navigo>About Me</a>
            <a id="nav-contact" href="/contact" data-navigo>Contact</a>
            <a id="nav-poems" href="/poems" data-navigo>Poems</a>
            <a id="nav-compose" href="/compose" data-navigo>Compose</a>
          </div>
        </header>
      `;
};

export function updateActiveNavigation(match) {
  if (device.isMobile()) {
    navigation.setActive(match.route.path || 'home');
    const activeNavDisplay = document.getElementById('active-nav-display');
    activeNavDisplay.textContent = navigation.getActiveDisplayText();
    return;
  }

  const path = match.route.path;
  const tagId = path ? 'nav-' + path : 'nav-home';
  const navActiveLink = 'active-link';
  document.querySelectorAll('nav > a').forEach((a) => {
    a.classList.remove(navActiveLink);
  });
  document.getElementById(tagId)?.classList.add(navActiveLink);
}

export function addMobileNavHeaderListeners() {
  const burgerBtn = document.getElementById('hamburger-button');
  const mobileNavItems = document.getElementById('mobile-nav-items');

  burgerBtn.addEventListener('click', () => {
    const MOBILE_NAV_HIDDEN = 'mobile-nav-hidden';
    const hidden = mobileNavItems.classList.contains(MOBILE_NAV_HIDDEN);

    if (hidden) {
      mobileNavItems.style.scale = 1;
      mobileNavItems.style.visibility = 'visible';

      mobileNavItems.classList.remove(MOBILE_NAV_HIDDEN);
      return;
    }

    mobileNavItems.style.scale = 0;
    setTimeout(() => (mobileNavItems.style.visibility = 'hidden'), 200);
    mobileNavItems.classList.add(MOBILE_NAV_HIDDEN);
  });
}
