import { defineStore } from 'pinia'

export const useUiOptions = defineStore('uiOptions', {
  state: () => ({
    isDetailView: false,
    isDarkMode: false,
  }),
  actions: {
    setIsDetailView(value: boolean) {
      this.isDetailView = value;
    },
    setIsDarkMode(value: boolean) {
      this.isDarkMode = value;
    }
  },
});
