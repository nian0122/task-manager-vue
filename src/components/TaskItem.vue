<script setup lang="ts">
import type { Task } from '@/types/task'

defineProps<{ task: Task }>()

const emit = defineEmits<{
  complete: []
  reopen: []
  delete: []
}>()

const priorityClasses: Record<Task['priority'], string> = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-yellow-100 text-yellow-700',
  low: 'bg-green-100 text-green-700',
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(iso))
}
</script>

<template>
  <li
    class="card flex items-start gap-3 transition-opacity"
    :class="{ 'opacity-60': task.status === 'completed' }"
  >
    <!-- Checkbox toggle -->
    <button
      class="mt-0.5 h-5 w-5 flex-shrink-0 rounded border-2 transition-colors
             focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
      :class="
        task.status === 'completed'
          ? 'border-primary-500 bg-primary-500'
          : 'border-gray-300 hover:border-primary-400'
      "
      :aria-label="task.status === 'completed' ? 'Reopen task' : 'Complete task'"
      @click="task.status === 'completed' ? emit('reopen') : emit('complete')"
    >
      <svg
        v-if="task.status === 'completed'"
        class="h-full w-full text-white"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0
             011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <!-- Task content -->
    <div class="min-w-0 flex-1">
      <p
        class="text-sm font-medium text-gray-900"
        :class="{ 'line-through text-gray-400': task.status === 'completed' }"
      >
        {{ task.title }}
      </p>
      <p v-if="task.description" class="mt-0.5 text-xs text-gray-500">
        {{ task.description }}
      </p>
      <div class="mt-2 flex flex-wrap items-center gap-2">
        <span
          class="rounded-full px-2 py-0.5 text-xs font-medium"
          :class="priorityClasses[task.priority]"
        >
          {{ task.priority }}
        </span>
        <span
          v-for="tag in task.tags"
          :key="tag"
          class="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
        >
          #{{ tag }}
        </span>
        <span class="text-xs text-gray-400">{{ formatDate(task.createdAt) }}</span>
      </div>
    </div>

    <!-- Delete button -->
    <button
      class="flex-shrink-0 rounded p-1 text-gray-400 transition-colors
             hover:bg-red-50 hover:text-red-500 focus:outline-none
             focus:ring-2 focus:ring-red-400"
      aria-label="Delete task"
      @click="emit('delete')"
    >
      <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path
          fill-rule="evenodd"
          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2
             0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1
             0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0
             00-1-1z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </li>
</template>
