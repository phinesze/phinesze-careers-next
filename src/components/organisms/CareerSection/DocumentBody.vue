<script setup lang="ts">
defineProps<{
  label: string;
  markdownText?: string;
}>();
</script>

<template>
  <section class="[&:not(:first-child)]:border-t [&:not(:last-child)]:border-b">
    <!-- タイトル -->
    <div v-if="label" class="font-bold bg-gray-300 p-2">
      {{ label }}
    </div>
    <!-- 本文 -->
    <MarkdownDocument
      class="p-4"
      :label="label"
      :markdown-text="markdownText"
    />
  </section>
</template>
