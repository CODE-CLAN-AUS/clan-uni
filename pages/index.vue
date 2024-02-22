<template>
  <main>
    <top-menu path="/" :treeData="$treeData" isIndex />
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
  async asyncData({ $content, $treeData }) {
    const posts = await $content('', { deep: true })
      .sortBy('createdAt', 'desc')
      .limit(5)
      .fetch()

    return { posts, $treeData }
  },
}
</script>
