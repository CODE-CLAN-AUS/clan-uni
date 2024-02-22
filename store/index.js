export const state = () => ({
  darkMode: false,
})

export const mutations = {
  setDarkMode(state, value) {
    state.darkMode = value;
  },
}
