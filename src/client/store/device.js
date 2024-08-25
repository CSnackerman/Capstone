import { reload } from '../router.js';

const DEVICE_MOBILE = 0;
const DEVICE_DESKTOP = 1;

export default {
  type: undefined,
  determineType() {
    const deviceType =
      window.innerWidth <= 500 ? DEVICE_MOBILE : DEVICE_DESKTOP;

    if (this.type === undefined) {
      this.type = deviceType;
      console.log('device:', this.type ? 'desktop' : 'mobile');
      return;
    }

    if (this.type !== deviceType) {
      this.type = deviceType;
      console.log('device:', this.type ? 'desktop' : 'mobile');
      reload();
    }
  },
  isMobile() {
    return this.type === DEVICE_MOBILE;
  },
  isDesktop() {
    return this.type === DEVICE_DESKTOP;
  },
};
