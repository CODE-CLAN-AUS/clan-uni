<template>
  <a-config-provider
    :theme="{
      algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
    }"
  >
    <div id="root">
      <header>
        <div class="logo">
          <NuxtLink to="/">
            <Logo />
          </NuxtLink>
        </div>
        <div class="darkmode-switch">
          <ThemSwitch
            :isDarkMode="isDarkMode"
            @change:isDarkMode="
              (value) => {
                isDarkMode = value;
              }
            "
          />
        </div>
      </header>
      <a-row class="main" :gutter="16">
        <a-col :xs="24" :lg="isDetailView ? 24 : 18">
          <slot />
        </a-col>
        <a-col v-if="!isDetailView" :xs="24" :lg="6">
          <a-affix :offset-top="16">
            <categories :coursesTree="coursesTree" :filesArray="filesArray" />
          </a-affix>
        </a-col>
      </a-row>
    </div>
  </a-config-provider>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useUiOptions } from "../stores/uiOptions";
import { useContentData } from "../stores/contentData";
import { theme } from "ant-design-vue";
import Logo from "../components/logo.vue";
import ThemSwitch from "../components/them-switch.vue";

const uiOptions = useUiOptions();
const contentData = useContentData();
const colorMode = useColorMode();

const coursesTree = contentData.coursesTree;
const filesArray = contentData.filesArray;

const isDetailView = ref(uiOptions.isDetailView);
const isDarkMode = ref(uiOptions.isDarkMode);

const initiateIsDarkMode = () => {
  const value = colorMode.value === "dark";
  isDarkMode.value = value;
  uiOptions.setIsDarkMode(value);
};

onMounted(() => {
  initiateIsDarkMode();
});

watch(isDarkMode, (newValue) => {
  colorMode.preference = newValue ? "dark" : "light";
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap");
</style>
