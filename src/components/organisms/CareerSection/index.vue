<script setup lang="ts">
import DateLabel from "~/components/atoms/DateLabel";
import { useCareerTableSections } from "~/composables/useCareerTableSections.ts";

const { loadedCareerTableSections, updatedAt, isSecrets } =
  useCareerTableSections();
</script>

<template>
  <section class="relative mb-5">
    <div class="text-5xl text-center">職務経歴書</div>
    <div v-if="isSecrets" class="text-xl">機密要素あり</div>
    <div class="absolute right-0 bottom-0 text-sm">
      <DateLabel v-if="updatedAt" :value="updatedAt" /> 更新
    </div>
  </section>
  <section
    v-if="loadedCareerTableSections.length"
    :class="`career-section border-2 ${isSecrets ? 'secret' : ''}`"
  >
    <template v-for="(section, index) in loadedCareerTableSections">
      <CareerSectionDocumentBody
        v-if="section.type === 'document'"
        :key="index"
        :markdown-text="section.detail"
        :label="section.label"
      />
      <CareerSectionProjectsGroupsBody
        v-if="section.type === 'project-groups'"
        :key="index"
        :groups="section.groups"
      />
    </template>
  </section>
  <section v-else>
    <div class="mt-8 text-3xl text-center">
      「biographyData.jsonファイル選択」からファイルを選択してください
    </div>
  </section>
</template>
