<script setup lang="ts">
import AddTaskForm from '@/components/AddTaskForm.vue';
import TaskFilter from '@/components/TaskFilter.vue';
import TaskList from '@/components/TaskList.vue';
import { useTaskFilters } from '@/composables/useTaskFilters';

const { searchQuery, clearSearch } = useTaskFilters()
</script>
<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">
        My Tasks
      </h1>
      <p class="mt-1 text-sm text-gray-500">Organize your work, stay Focused.</p>
    </div>
    <AddTaskForm/>

    <!-- Search bar -->
    <div class="relative mb-4">
      <input
        v-model="searchQuery"
        type="search"
        placeholder="Search tasks by title, description, or tag..."  
        class="input-field pl-9"
      />
      <svg
        class="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-gray-400"
        fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
        aria-hidden="true"
      >
        <path/>
      </svg>
      <button
        v-if="searchQuery"
        class="absolute right-2.5 top-2 rounded p-0.5 text-gray-400 hover:text-gray-600"
        aria-label="Clear search"
        @click="clearSearch"
      >
        &times;
      </button>
    </div>

    <TaskFilter/>
    <TaskList/>
  </div>
</template>
