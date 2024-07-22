<template>
  <a-card :bordered="false" class="card" :extra="timeToRead">
    <template #title>
      <NuxtLink :to="articleLink" class="card-title">{{ article?.title }}</NuxtLink>
    </template>
    <template #cover>
      <img
        v-if="article?.cover"
        :alt="article?.title"
        :src="article?.cover"
        class="card-cover"
      />
    </template>
    <a-card-meta :title="article?.author" class="card-meta">
      <template #avatar>
        <a-avatar :src="avatarUrl" />
      </template>
    </a-card-meta>
    <ContentRenderer
      v-if="article"
      :key="article._id"
      :value="article"
      :excerpt="!!showArticleLink && !!article.excerpt"
      class="nuxt-content"
    ></ContentRenderer>
    <template #actions>
      <NuxtLink v-if="showArticleLink" :to="articleLink">
        <EllipsisOutlined />
      </NuxtLink>
      <ClientOnly>
        <rating-widget v-if="path" :path="path" />
      </ClientOnly>
    </template>
  </a-card>
</template>

<script setup>
import { computed, ref } from "vue";
import RatingWidget from "./rating-widget";
import { generateAvatarUrl } from "~/src/helpers/avatar";
import { calculateReadTime } from "~/src/helpers/blogPostHelper";

const props = defineProps({
  article: {
    type: Object,
    required: true,
  },
  preview: {
    type: Boolean,
    required: false,
    default: false,
  },
  path: {
    type: String,
    required: false,
  },
});

const timeToRead = `${calculateReadTime(props.article?.body)} min read`;

const avatarUrl = ref(generateAvatarUrl(props.article?.github));

const showArticleLink = computed(() => {
  return props.preview && props.path;
});

const articleLink = computed(() => {
  return props.path ? props.path : "/";
});
</script>

<style lang="scss" scoped>
.card {
  .card-title {
    font-weight: 500;
    font-size: 125%;
    line-height: 80%;
  }

  .card-meta {
    min-height: 48px;
  }

  :deep(img) {
    max-width: 100%;
  }
}
</style>
