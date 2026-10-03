<script setup lang="ts">
defineProps<{
  label: string;
  markdownText?: string;
}>();
</script>

<template>
  <tbody>
    <tr>
      <!-- A, タイトル -->
      <th class="p-2">{{ label }}</th>
      <!-- B,C, D 本文 -->
      <td class="p-4 align-top" colspan="2">
        <MarkdownDocument :markdown-text="markdownText" />
      </td>
    </tr>
  </tbody>
</template>
