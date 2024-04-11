export const state = () => ({
  darkMode: false,
  isDetailView: false,
})

export const mutations = {
  setDarkMode(state, value) {
    state.darkMode = value
  },
  setIsDetailView(state, value) {
    state.isDetailView = value;
  },
}
