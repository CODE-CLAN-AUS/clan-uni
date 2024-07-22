<template>
  <div>
    <p>Average Rating: {{ averageRating }}</p>
    <p>Number of Ratings: {{ count }}</p>
    <p v-if="document">Your Rating: {{ document.data.rating }}</p>

    <select v-model="selectedRating">
      <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
    </select>

    <button @click="submitRating">Submit</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { v4 as uuidv4 } from "uuid";

const props = defineProps({
  path: {
    type: String,
    required: true,
  },
});

const averageRating = ref(0);
const count = ref(0);
const document = ref<any>(null);
const selectedRating = ref(1);
const fingerprint = ref("");

const getRating = async () => {
  const { data, pending, error } = await useFetch("/.netlify/functions/getRating", {
    method: "POST",
    body: JSON.stringify({
      fingerprint: fingerprint.value,
      url: props.path,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (error.value) {
    console.error("Failed to get ratings:", error.value);
    return;
  }

  console.log(data);
  if (data.value) {
    averageRating.value = data.value.averageRating;
    count.value = data.value.count;
    document.value = data.value.document;
  }
};

const submitRating = async () => {
  const { data, pending, error } = await useFetch("/.netlify/functions/upsertRating", {
    method: "POST",
    body: JSON.stringify({
      fingerprint: fingerprint.value,
      url: props.path,
      rating: selectedRating.value,
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
