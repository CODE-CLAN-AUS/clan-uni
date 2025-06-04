<template>
  <Card class="border-none cardClass">
    <CardHeader>
      <CardTitle >
        <div class="w-full flex items-center justify-between w-full">
          <div class="flex justify-center items-start gap-2 flex-col w-full">
            <div class="card-meta flex flex-col gap-1 justify-center items-center min-w-10">
              <a-avatar :src="avatarUrl" />
              <h6 class="font-medium text-gray-500 truncate">{{authorName}}</h6>
            </div>
            <div class="flex justify-between w-full items-center">
              <NuxtLink :to="articleLink" class="card-title text-xl">{{
                  article?.title
                }}</NuxtLink>
              <span  class="text-xs text-gray-500">
              {{ calculateReadTime(article?.body) }} min read
              </span>
            </div>
            </div>
        </div>
      </CardTitle>
      <CardDescription>{{article.description}}</CardDescription>
    </CardHeader>
    <CardContent class="content ">
      <div v-if="article?.cover">
        <img
            :alt="article?.title"
            :src="article?.cover"
            class="card-cover"
            ref="cardCover"
          />
      </div>
      <ContentRenderer
          v-if="article"
          :key="article._id"
          :value="article"
          :excerpt="!!showArticleLink && !!article.excerpt"
          class="nuxt-content prose lg:prose-xl dark:prose-invert"
      />
    </CardContent>
    <CardFooter>
      <NuxtLink v-if="showArticleLink" :to="articleLink">
        <EllipsisOutlined />
      </NuxtLink>
      <rating-widget v-else-if="path" :path="path" />
    </CardFooter>
  </Card>
</template>

<script setup>
import { computed, ref } from "vue";
import RatingWidget from "./rating-widget";
import { useAvatar } from "../composables/useAvatar";
import { calculateReadTime } from "../composables/useArticle";
import { theme } from 'ant-design-vue';
console.log(theme);
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
});

const showArticleLink = computed(() => {
  return props.preview && props.path;
});

const articleLink = computed(() => {
  return props.path ? props.path : "/";
});

const cardExtra = computed(() => {
  return props.noHeader
    ? null
    : `${calculateReadTime(props.article?.body)} min read`;
});

const cardClass = computed(() => {
  return { card: true, "no-header-no-meta": props.noHeader && props.noAuthor };
});
const cardCover = ref(null);
const adjustCardCoverHeight = () => {
  if (cardCover.value) {
    const viewportHeight = window.innerHeight;
    const cardRect = cardCover.value.getBoundingClientRect();
    const remainingHeight = viewportHeight - cardRect.top;
    cardCover.value.style.height = `${remainingHeight}px`;
  }
};

// Adjust height on mounted and window resize
onMounted(() => {
  adjustCardCoverHeight();
  window.addEventListener("resize", adjustCardCoverHeight);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", adjustCardCoverHeight);
});
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
