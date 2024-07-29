<template>
  <div class="rating-container">
    <a-spin v-if="!canRate" :style="{ padding: '4px 70px 4px' }" />
    <v-rating
      v-else
      v-model="averageRating"
      active-color="orange-lighten-1"
      color="orange-lighten-1"
      density="compact"
      hover
      :style="{ marginLeft: '20px' }"
    />
    <a-tooltip placement="right">
      <template #title>
        <span>{{ count }} People Voted</span>
      </template>
      <InfoCircleFilled
        :style="{
          fontSize: '20px',
          color: 'lightblue',
          position: 'relative',
          top: canRate ? '-6px' : '1.5px',
          left: '6px',
          marginRight: '30px',
        }"
      />
    </a-tooltip>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { v4 as uuidv4 } from "uuid";

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

watch(averageRating, async (rate: number) => {
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

  if (error.value) {
    console.error("Failed to submit rating:", error.value);
    return;
  }

  if (data.value) {
    await getRating();
  }
});

const getRating = async () => {
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

  canRate.value = true;

  if (error.value) {
    console.error("Failed to get ratings:", error.value);
    return;
  }

  if (data.value) {
    const averageRatingValue = JSON.parse(data.value).averageRating;
    const countValue = JSON.parse(data.value).count;
    averageRating.value = averageRatingValue;
    count.value = countValue;
  }
};

onMounted(async () => {
  if (typeof window !== "undefined") {
    const storedFingerprint = localStorage.getItem("fingerprint");
    if (storedFingerprint) {
      fingerprint.value = storedFingerprint;
    } else {
      fingerprint.value = uuidv4();
      localStorage.setItem("fingerprint", fingerprint.value);
    }

    await getRating();
    await getRating();
  }
});
</script>
