<template>
  <a-card :bordered="false" :class="cardClass" :extra="cardExtra">
    <template v-if="!noHeader" #title>
      <NuxtLink :to="articleLink" class="card-title">{{ article?.title }}</NuxtLink>
    </template>
    <template #cover>
      <img v-if="article?.cover" :alt="article?.title" :src="article?.cover" class="card-cover" />
    </template>
    <a-card-meta v-if="!noAuthor" :title="authorName" class="card-meta">
      <template #avatar>
        <a-avatar :src="avatarUrl" />
      </template>
    </a-card-meta>
    <ContentRenderer v-if="article" :key="article._id" :value="article"
      :excerpt="!!showArticleLink && !!article.excerpt" class="nuxt-content"></ContentRenderer>
    <template #actions>
      <NuxtLink v-if="showArticleLink" :to="articleLink">
        <EllipsisOutlined />
      </NuxtLink>
      <rating-widget v-else-if="path" :path="path" />
    </template>
  </a-card>
</template>

<script setup>
import { computed, ref } from "vue";
import RatingWidget from "./rating-widget";
import { useAvatar } from "../composables/useAvatar";
import { calculateReadTime } from "../composables/useArticle";

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
  noHeader: {
    type: Boolean,
    required: false,
    default: false,
  },
  noAuthor: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const avatarUrl = ref(useAvatar(props.article?.github));

const authorName = computed(() => {
  return props.article?.author ?? "CLAN UNI";
})

const showArticleLink = computed(() => {
  return props.preview && props.path;
});

const articleLink = computed(() => {
  return props.path ? props.path : "/";
});

const cardExtra = computed(() => {
  return props.noHeader ? null : `${calculateReadTime(props.article?.body)} min read`;
})

const cardClass = computed(() => {
  return { 'card': true, 'no-header-no-meta': props.noHeader && props.noAuthor };
})
</script>

<style lang="scss" scoped>
.card {
  &.no-header-no-meta {

    :deep(.ant-card-body) {
      padding-top: 0;
    }
  }

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
