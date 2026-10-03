<script setup lang="ts">
const props = defineProps<{
  value: {
    start: string;
    end?: string;
  };
}>();

const months = computed(() => {
  const getMonthNum = (date: Date) => date.getFullYear() * 12 + date.getMonth();

  if (!props.value.end) {
    return null;
  }
  const startDate = new Date(props.value.start);
  const endDate = new Date(props.value.end);
  return 1 + getMonthNum(endDate) - getMonthNum(startDate);
});

const yearCount = computed(() =>
  months.value ? Math.floor(months.value / 12) : null,
);
</script>

<template>
  <div>
    <DateLabel :value="value.start" />
    〜
    <DateLabel :value="value.end" />
    <div v-if="months">
      {{ `（約${yearCount ? `${yearCount}年` : ""}${months % 12}ヶ月）` }}
    </div>
    <div v-else>(進行中)</div>
  </div>
</template>
