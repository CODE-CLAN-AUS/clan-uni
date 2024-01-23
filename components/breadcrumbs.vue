<template>
  <a-card :bordered="false" class="card breadcrumbs">
    <template #title>
      <a-breadcrumb>
        <a-breadcrumb-item
          ><NuxtLink to="/"> <a-icon type="home" /></NuxtLink
        ></a-breadcrumb-item>
        <a-breadcrumb-item
          v-for="(crumb, index) in breadCrumbs"
          :key="crumb.key"
          ><NuxtLink
            v-if="index !== breadCrumbs.length - 1"
            :to="`/blog${crumb.key}`"
            >{{ crumb.title }}</NuxtLink
          >
          {{ index === breadCrumbs.length - 1 ? crumb.title : null }}
          <template #overlay v-if="crumb.children">
            <a-menu>
              <a-menu-item v-for="item in crumb.children" :key="item.key">
                <NuxtLink :to="`/blog${item.key}`">{{ item.title }}</NuxtLink>
              </a-menu-item>
            </a-menu>
          </template>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </template>
  </a-card>
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
    pageTitle: {
      type: String,
      required: false,
    },
  },
  computed: {
    breadCrumbs() {
      const names = this.path ? this.path.split('/') : []
      const levels = []
      let ref = this.treeData
      let nextRef

      for (let i = 0; i < names.length; i++) {
        levels.push({})

        for (let j = 0; j < ref.length; j++) {
          if (ref[j].title === names[i]) {
            levels[levels.length - 1].title = ref[j].title
            levels[levels.length - 1].key = ref[j].key
            if (!ref[j].children) {
              ref[j].children = []
            }
            nextRef = ref[j].children
          } else {
            const { title, key } = ref[j]
            if (levels[levels.length - 1].children) {
              levels[levels.length - 1].children.push({ title, key })
            } else {
              levels[levels.length - 1].children = [{ title, key }]
            }
          }
        }

        if (ref.length) {
          ref = nextRef
        } else {
          levels[levels.length - 1] = {
            title: this.pageTitle ? this.pageTitle : names[names.length - 1],
            key: 'here',
          }
        }
      }

      return levels
    },
  },
}
</script>
