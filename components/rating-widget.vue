<template>
  <div class="rating-container">
    <a-spin v-if="!canRate" :style="{ padding: '4.8px 70px 0px' }" />
    <template v-else>
      <a-rate @change="upsertRating" :style="{ marginLeft: '18px' }" character="★" :value="averageRating"
        :allow-clear="false" />
      <a-tooltip placement="right">
        <template #title>
          <span>{{ count }} People Voted</span>
        </template>
        <InfoCircleFilled :style="{
          fontSize: '18px',
          color: 'LightSkyBlue',
          position: 'relative',
          top: '0.2px',
          left: '12px',
          marginRight: '30px',
        }" />
      </a-tooltip>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRouter } from 'vue-router';
import { v4 as uuidv4 } from "uuid";
import { useErrorHandler } from "../composables/useErrorHandler";
import { useFetch } from "nuxt/app";
import { nextTick } from "process";

const props = defineProps({
  path: {
    type: String,
    required: true,
  },
});

const averageRating = ref(0);
const count = ref(0);
const fingerprint = ref("");
const canRate = ref(false);

const upsertRating = async (rate: number) => {
  const errorMessage = "Failed to rate this content.";

  canRate.value = false;

  const { data, error } = await useFetch("/.netlify/functions/upsertRating", {
    method: "POST",
    body: JSON.stringify({
      fingerprint: fingerprint.value,
      url: props.path,
      rating: rate,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (error && error.value) {
    useErrorHandler(error.value, errorMessage);
    canRate.value = true;
    return;
  }

  if (data && data.value) {
    try {
      const parsedData = JSON.parse(data.value);
      await getRating();
    } catch (err) {
      useErrorHandler(err, errorMessage);
      canRate.value = true;
    }
  }
};

const getRating = async () => {
  const errorMessage = "Failed to get ratings.";

  const { data, error } = await useFetch("/.netlify/functions/getRating", {
    method: "POST",
    body: JSON.stringify({
      fingerprint: fingerprint.value,
      url: props.path,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(data && data.value)
  console.log(error && error.value)

  canRate.value = true;

  if (error && error.value) {
    useErrorHandler(error.value, errorMessage);
    return;
  }

  if (data && data.value) {
    try {
      const parsed = JSON.parse(data.value);
      averageRating.value = parsed.averageRating;
      count.value = parsed.count;
    } catch (err) {
      useErrorHandler(err, errorMessage);
    }
  }
  console.log('done getRating')
};

const router = useRouter();

onMounted(async () => {
  if (typeof window !== "undefined") {
    const storedFingerprint = localStorage.getItem("fingerprint");
    if (storedFingerprint) {
      fingerprint.value = storedFingerprint;
    } else {
      fingerprint.value = uuidv4();
      localStorage.setItem("fingerprint", fingerprint.value);
    }

    nextTick(async () => {
      await getRating();
    });
  }
});
</script>