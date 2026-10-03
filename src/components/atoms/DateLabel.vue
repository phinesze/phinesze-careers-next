<script setup lang="ts">
const props = defineProps<{
  value?: string;
}>();

const dateString = computed(() => {
  if (props.value) {
    const [year, month, day] = props.value.split("-");
    return `${Number(year)}年${Number(month)}月${
      day ? Number(day) + "日" : ""
    }`;
  } else {
    return null;
  }
});
</script>

<template>
  <span>
    {{ dateString }}
  </span>
</template>
