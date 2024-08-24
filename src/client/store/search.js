export default {
  collapsed: true,
  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  },
  isCollapsed() {
    return this.collapsed;
  },
  collapse() {
    this.collapsed = true;
  },
  getOpacity() {
    return this.collapsed ? 0 : 1;
  },
};
