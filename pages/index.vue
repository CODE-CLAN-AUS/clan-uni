<template>
  <main>
    <top-menu :path="params.pathMatch" :treeData="$treeData" isIndex />
    <blog-post
      v-for="post in posts"
      :key="post.slug"
      :article="post"
      :path="post.path"
      class="blog-post"
      preview
    />
  </main>
</template>

<script>
export default {
  async asyncData({ $content, $treeData, params }) {
    const posts = await $content('', { deep: true })
      .sortBy('createdAt', 'desc')
      .limit(5)
      .fetch()

    return { posts, params, $treeData }
  },
}
</script>
