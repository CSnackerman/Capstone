export default {
  collapsed: true,
  value: '',
  setValue(value) {
    this.value = value;
  },
  getValue() {
    return this.value;
  },
  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  },
  isCollapsed() {
    return this.collapsed;
  },
  getOpacity() {
    return this.collapsed ? 0 : 1;
  },
};
