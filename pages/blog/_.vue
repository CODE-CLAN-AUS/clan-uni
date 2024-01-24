<template>
  <article>
    <breadcrumbs
      :path="params.pathMatch"
      :treeData="$treeData"
      :pageTitle="isArticle ? article.title : null"
    />
    <top-menu :path="params.pathMatch" :treeData="$treeData" />
    <blog-post
      v-if="isArticle"
      :article="article"
      :path="article.path"
      class="blog-post"
    />
    <template v-else>
      <blog-post
        v-for="post in article"
        :key="post.slug"
        :article="post"
        :path="post.path"
        class="blog-post"
        preview
      />
    </template>
  </article>
</template>

<script>
export default {
  async asyncData({ $filesArray, $treeData, $content, params }) {
    const isArticle = $filesArray.some((x) => x.path === `/${params.pathMatch}`)

    const article = isArticle
      ? await $content('', params.pathMatch).fetch()
      : await $content(params.pathMatch, { deep: true })
          .sortBy('createdAt', 'desc')
          .limit(5)
          .fetch()

    return { article, isArticle, params, $treeData }
  },
}
</script>
