<template>
  <a-card title="Categories" :bordered="true" class="card">
    <a-tree
      v-model:expandedKeys="expandedKeys"
      show-line
      defaultExpandAll
      :tree-data="treeDataProp"
      @select="goToCategory"
    >
      <a-icon slot="switcherIcon" type="down" />
    </a-tree>
  </a-card>
</template>

<script>
export default {
  data() {
    return {
      expandedKeys: [],
    }
  },
  computed: {
    treeDataProp() {
      return this.$treeData
    },
  },
  methods: {
    goToCategory(nodes) {
      if (nodes && nodes[0]) {
        this.$router.push(`/blog${nodes[0]}`)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03),
    0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
  border-radius: 8px;
}
</style>
