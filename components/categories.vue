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
