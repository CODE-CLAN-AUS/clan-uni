<template>
  <article>
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
const { BlogPageType } = require('@/src/enums/BlogPageType.ts')

export default {
  async asyncData({ $filesArray, payload, $content, params }) {
    let isArticle
    if (payload) {
      // for Static mode
      isArticle = payload.pageType === BlogPageType.Article
    } else {
      // for Server mode
      isArticle = $filesArray.some((x) => x.path === `/${params.pathMatch}`)
    }

    const article = isArticle
      ? await $content('', params.pathMatch).fetch()
      : await $content(params.pathMatch, { deep: true })
          .sortBy('createdAt', 'desc')
          .limit(5)
          .fetch()

    return { article, isArticle, params }
  },
}
</script>

<style scoped>
.blog-post {
  margin-bottom: 20px;
}
</style>
