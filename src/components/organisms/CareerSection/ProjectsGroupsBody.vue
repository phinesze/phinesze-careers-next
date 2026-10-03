<script setup lang="ts">
import { ProjectGroup } from "~/types/ProjectGroup";
import { useCareerTableSections } from "~/composables/useCareerTableSections.ts";
const { isSecrets } = useCareerTableSections();

const props = defineProps<{
  groups: ProjectGroup[];
}>();

const index = 1;
</script>

<template>
  <template
    v-for="(group) in props.groups as ProjectGroup[]"
    :key="group.companyAlias"
  >
    <!-- 会社名 -->
    <div class="bg-blue-100 border-y p-2 font-bold break-after-avoid">
      {{ isSecrets ? group.company ?? group.companyAlias : group.companyAlias }}
    </div>
    <!-- 会社のプロジェクト -->
    <section
      v-for="career in group.projects"
      :key="career.id"
      class="career-row break-inside-avoid border-t-[1px] border-b-[1px]"
    >
      <!-- 文章行部分 -->
      <div class="align-top flex p-0">
        <!-- 番号・期間 -->
        <div class="w-[20mm]">
          <div
            class="flex items-center border-r-2 h-full bg-lime-300 text-center"
          >
            <div class="text-center">
              #{{ index++ }}
              <IntervalDateLabel v-if="career.times" :value="career.times" />
            </div>
          </div>
        </div>
        <!-- 本文タイトル、本文、チーム人数・言語・フレームワーク -->
        <div class="w-full">
          <!-- 本文タイトル-->
          <div class="font-bold p-2 bg-cyan-100 flex">
            {{ career.title }}
          </div>
          <div class="flex">
            <!-- 本文 -->
            <MarkdownDocument
              :markdown-text="career.detail"
              class="w-0 flex-grow px-2 py-4"
            />
            <!--チーム人数、言語・フレームワーク -->
            <div class="align-top w-[50mm] flex-grow-0 pt-4">
              <!-- チーム人数 -->
              <div v-if="career.teams" class="bg-gray-200 p-0.5 font-bold">
                チーム人数
              </div>
              <ul v-if="career.teams" class="inline-block w-fit p-2">
                <li
                  v-for="(teamNumber, team) in career.teams"
                  :key="team"
                  class="text-left"
                >
                  {{ team }}:
                  <TeamNumberLabel :value="teamNumber" />
                </li>
              </ul>

              <!-- 言語・フレームワーク -->
              <div class="bg-gray-200 p-0.5 font-bold">
                言語・フレームワーク
              </div>
              <div class="p-2">
                <EnvironmentListSection
                  v-if="career.environments"
                  :environments="career.environments"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
</template>
