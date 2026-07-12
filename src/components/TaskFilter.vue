<script setup lang="ts">
import type { TaskSortOption } from '@/types/task'
import { useTaskFilters } from '@/composables/useTaskFilters'

const { filterOptions, sortOptions, currentFilter, currentSort, setFilter, setSort } =
  useTaskFilters()
</script>

<template>
  <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
    <!-- Filter tab group -->
    <div class="flex rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
      <button
        v-for="option in filterOptions"
        :key="option.value"
        class="rounded-md px-3 py-1.5 text-sm font-medium transition-all"
        :class="
          currentFilter === option.value
            ? 'bg-primary-600 text-white shadow-sm'
            : 'text-gray-600 hover:bg-gray-100'
        "
        @click="setFilter(option.value)"
      >
        {{ option.label }}
      </button>
    </div>

    <!-- Sort dropdown -->
    <div class="flex items-center gap-2">
      <label class="text-xs font-medium text-gray-500">Sort:</label>
      <select
        :value="currentSort"
        class="input-field w-auto py-1.5 text-sm"
        @change="setSort(($event.target as HTMLSelectElement).value as TaskSortOption)"
      >
        <option
          v-for="opt in sortOptions"
          :key="opt.value"
          :value="opt.value"
        >
          {{ opt.label }}
        </option>
      </select>
    </div>
  </div>
</template>