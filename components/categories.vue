<template>
  <a-card title="Courses" :bordered="true" class="card">
    <a-tree :selectedKeys="selectedKeys" :expandedKeys="expandedKeys" show-line defaultExpandAll
      :tree-data="treeDataProp">
      <a-icon slot="switcherIcon" type="down-circle" />
      <template #title="node">
        <NuxtLink :to="`/blog${node.path}`">{{ node.title }}</NuxtLink>
      </template>
    </a-tree>
  </a-card>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      selectedKeys: [],
      treeDataProp: [],
      expandedKeys: [],
    }
  },
  mounted() {
    this.treeDataProp = this.$treeData
    this.selectProperNode(this.$route.path, this.treeDataProp)
  },
  watch: {
    '$route': function (to) {
      const fullPath = to.fullPath;

      if (fullPath.startsWith('/blog')) {
        this.selectProperNode(fullPath.slice(5), this.treeDataProp);
      } else {
        if (this.selectedKeys.length) {
          this.selectedKeys = [];
        }

        if (this.expandedKeys.length) {
          this.expandedKeys = [];
        }
      }
    }
  },
  methods: {
    selectProperNode(subPath, treeData) {
      this.expandedKeys = []
      for (let i = 0; i < treeData.length; i++) {
        const node = treeData[i]

        if (node.key == subPath) {
          this.selectedKeys = [node.key]
          if (this.canNodeExpand(node)) {
            this.expandNode(node)
            treeData[i].expanded = true
          }
          return true
        } else if (node.children && node.children.length) {
          const result = this.selectProperNode(subPath, node.children)
          if (result) {
            if (this.canNodeExpand(node)) {
              this.expandNode(node)
              treeData[i].expanded = true
            }
            return true
          }
        }
      }

      return false
    },
    canNodeExpand(node) {
      return node.children && node.children.length && this.expandedKeys.indexOf(node.key) === -1
    },
    expandNode(node) {
      this.expandedKeys = [...this.expandedKeys, node.key]
    },
  },
})
</script>
