import { defineStore } from 'pinia';

export const useHeaderSidebarStore = defineStore('headerSidebar', {
  state: () => ({
    smallSidebar: false,
  }),
  actions: {
    toggleSidebar() {
      this.smallSidebar = !this.smallSidebar;
    },
  },
});