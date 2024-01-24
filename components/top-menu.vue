<template>
  <a-menu v-if="subCategories.length" mode="horizontal" class="card menu">
    <a-menu-item
      v-for="item in subCategories"
      :key="item.key"
      class="top-menu-link"
    >
      <a @click="goToCategory(item.path)">{{ item.title }}</a>
    </a-menu-item>
  </a-menu>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      required: true,
    },
    treeData: {
      type: Array,
      required: true,
    },
  },
  computed: {
    subCategories() {
      const names = this.path ? this.path.split('/') : []
      let ref = this.treeData

      for (let i = 0; i < names.length; i++) {
        for (let j = 0; j < ref.length; j++) {
          if (ref[j].title === names[i]) {
            ref = ref[j].children
            break
          }
        }
      }

      return ref && Array.isArray(ref) ? ref : []
    },
  },
  methods: {
    goToCategory(path) {
      this.$router.push(`/blog${path}`)
    },
  },
}
</script>

<style lang="scss" scoped>
.top-menu-link {
  color: black;
  font-weight: 500;
}
</style>
