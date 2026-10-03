<script setup lang="ts">
import { CareerEnvironmentList } from "~/types/CareerEnvironmentList.ts";

defineProps<{
  environments: CareerEnvironmentList;
}>();
</script>

<template>
  <section v-for="(elements, name) in environments" :key="name" class="mb-3">
    <h4 class="font-bold">{{ `【${name}】` }}</h4>
    <div v-for="(element, index) in elements" :key="element">
      <EnvironmentLabel :element="element" />
      <span v-if="index + 1 < elements.length">{{ "、" }}</span>
    </div>
  </section>
</template>
