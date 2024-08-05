<template>
  <div>
    <a-spin v-if="!canRate" :style="{ padding: '4.8px 70px 0px' }" />
    <template v-else>
      <a-rate @change="upsertRating" :style="{ marginLeft: '18px' }" character="★" :value="averageRating"
        :allow-clear="false" />
      <a-tooltip v-if="isMobile" placement="right">
        <template #title>
          <span>{{ formatNumberToFixedDecimals(count) }} People Voted</span>
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
      <a-popover v-else placement="top">
        <template #content class="rating-popover">
          <a-table :columns="columns" :data-source="tableData" :pagination="false" :show-header="false" size="small">
            <template #bodyCell="{ column, record }">
              <template v-if="column.dataIndex === 'label'">
                {{ record.label }}
              </template>
              <template v-else-if="column.dataIndex === 'percentage'">
                <a-progress :percent="record.percentage" :show-info="false" size="small" />
              </template>
              <template v-else-if="column.dataIndex === 'votes'">
                ({{ formatNumberWithCommas(record.votes) }} Votes)
              </template>
            </template>
          </a-table>
        </template>
        <template #title>
          <span>{{ formatNumberToFixedDecimals(averageRating) }} out of 5</span>
        </template>
        <InfoCircleFilled :style="{
          fontSize: '18px',
          color: 'LightSkyBlue',
          position: 'relative',
          top: '0.2px',
          left: '12px',
          marginRight: '30px',
        }" />
      </a-popover>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { v4 as uuidv4 } from "uuid";
import { useErrorHandler } from "../composables/useErrorHandler";
import { formatNumberWithCommas, formatNumberToFixedDecimals, calculateRatings } from "../composables/useNumber";
import { useFetch } from "nuxt/app";
import { nextTick } from "process";
import { Grid } from "ant-design-vue";
import type { ColumnsType } from 'ant-design-vue/es/table';
import type { IRatingTableRow } from "../types/IRatingTableRow";

const isMobile = Grid?.useBreakpoint()?.value?.xs ?? false;

const props = defineProps({
  path: {
    type: String,
    required: true,
  },
});

const columns: ColumnsType<IRatingTableRow> = [
  {
    dataIndex: 'label',
  },
  {
    dataIndex: 'percentage',
    width: 200,
  },
  {
    dataIndex: 'votes',
    align: 'right',
  }
];

const averageRating = ref(0);
const count = ref(0);
const fingerprint = ref("");
const canRate = ref(false);
const tableData: IRatingTableRow[] = reactive([
  {
    key: 1,
    label: 'Excellent',
    percentage: 0,
    votes: 0
  },
  {
    key: 2,
    label: 'Good',
    percentage: 0,
    votes: 0
  },
  {
    key: 3,
    label: 'Average',
    percentage: 0,
    votes: 0
  },
  {
    key: 4,
    label: 'Poor',
    percentage: 0,
    votes: 0
  },
  {
    key: 5,
    label: 'Awful',
    percentage: 0,
    votes: 0
  }
]);

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
      const { counts, percentages } = calculateRatings(parsed.ratings);
      for (let i = 1; i < 6; i++) {
        tableData[i].votes = counts[i];
        tableData[i].percentage = percentages[i];
      }
    } catch (err) {
      useErrorHandler(err, errorMessage);
    }
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

    nextTick(async () => {
      await getRating();
    });
  }
});
</script>