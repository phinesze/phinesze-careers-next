<script setup lang="ts">
const props = defineProps<{
  value: number | [number, number];
}>();

const teamNumberStr = computed(() =>
  Array.isArray(props.value)
    ? `${props.value[0]}~${props.value[1]}`
    : `${props.value}`,
);
</script>

<template>
  <span>{{ teamNumberStr }}人</span>
</template>
