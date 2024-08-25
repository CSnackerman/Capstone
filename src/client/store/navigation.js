export default {
  active: 'home',
  getActiveDisplayText() {
    // prettier-ignore
    switch (this.active) {
      case 'home':    return 'Home';
      case 'about':   return 'About Me';
      case 'contact': return 'Contact';
      case 'poems':   return 'Poems';
      case 'compose': return 'Compose';
      default:        return '???';
    }
  },
  setActive(route) {
    this.active = route;
  },
};
