<template>
  <main>
    <top-menu path="/" :treeData="$treeData" isIndex />
    <blog-post
      :article="content"
      class="blog-post"
    />
  </main>
</template>

<script>
export default {
  async asyncData({ $content, $treeData }) {
    const content = await $content('index').fetch()

    return { content, $treeData }
  },
}
</script>
