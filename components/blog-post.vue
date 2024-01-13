<template>
  <a-card :bordered="false" class="card" :extra="formatDate(article.createdAt)">
    <template #title>
      <NuxtLink :to="articleLink" class="card-title">{{
        article.title
      }}</NuxtLink>
    </template>
    <img
      v-if="article.cover"
      slot="cover"
      :alt="article.title"
      :src="article.cover"
      class="card-cover"
    />
    <a-card-meta :title="article.author" class="card-meta">
      <a-avatar
        v-if="article.email"
        slot="avatar"
        :src="getAvatarURL(article.email)"
      />
    </a-card-meta>
    <nuxt-content style="font-size: 125%" :document="{ body }" />
    <template v-if="showArticleLink" slot="actions">
      <NuxtLink :to="articleLink">
        <a-icon key="ellipsis" type="ellipsis" />
      </NuxtLink>
    </template>
  </a-card>
</template>

<script>
import Vue from 'vue'
import { generateGravatarUrl, formatDate } from '../src/helpers'

export default Vue.extend({
  props: {
    article: {
      required: true,
    },
    preview: {
      type: Boolean,
      required: false,
      default: false,
    },
    path: {
      type: String,
    },
  },

  computed: {
    body() {
      return this.preview && this.article.excerpt
        ? this.article.excerpt
        : this.article.body
    },
    showArticleLink() {
      return this.preview && this.path
    },
    articleLink() {
      return '/blog'.concat(this.path)
    },
  },

  methods: {
    getAvatarURL(email) {
      return generateGravatarUrl(email, 32)
    },
    formatDate,
  },
})
</script>

<style lang="scss" scoped>
.card {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03),
    0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
  border-radius: 8px;

  .card-title {
    color: black;
    font-weight: 500;
    font-size: 125%;
    line-height: 80%;
  }

  .card-cover {
    border-radius: 8px 8px 0 0;
  }

  .card-meta {
    min-height: 48px;
  }

  ::v-deep {
    .ant-card-actions {
      border-radius: 0 0 8px 8px;

      > :first-child {
        border-radius: 0 0 0 8px;
      }

      > :last-child {
        border-radius: 0 0 8px 0;
      }
    }

    img {
      max-width: 100%;
    }
  }
}
</style>
