<script setup lang="ts">
import markdownit from "markdown-it";
const md = markdownit();

const props = defineProps<{
  label?: string;
  markdownText?: string;
}>();

const renderedHtml = computed(() => {
  return props.markdownText ? md.render(props.markdownText) : "";
});
</script>

<template>
  <section v-if="markdownText">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="renderedHtml" />
  </section>
</template>

<style scoped lang="scss">
:deep {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @apply font-bold;
    &:not(:first-child) {
      @apply mt-[1em];
    }
  }
  h1,
  h2,
  h3 {
    @apply text-2xl;
  }
  li {
    &:before {
      display: inline;
      content: "・";
    }
  }
  p {
    @apply break-inside-avoid;
  }
}
</style>
