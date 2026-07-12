<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useTaskStore } from '@/stores/taskStore'

const taskStore = useTaskStore()
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="border-b border-gray-200 bg-white shadow-sm">
      <div class="mx-auto max-w-4xl px-4 sm:px-6">
        <div class="flex h-14 items-center justify-between">
          <span class="text-base font-semibold text-primary-600"> TaskManager </span>
          <div class="flex items-center gap-6 text-am">
            <RouterLink
              to="/"
              class="font-medium text-gray-600 transition-colors hover:text-primary-600"
              active-class="text-primary-600"
            >
              All Tasks
              <span class="ml-1 rounded-full bg-primary-100 px-2 py-0.5 text-xs text-primary-700">
                {{ taskStore.activeTasks.length }}
              </span>
            </RouterLink>
            <RouterLink
              to="/completed"
              class="font-medium text-gray-600 transition-colors hover:text-primary-600"
              active-class="text-primary-600"
            >
              Completed
            </RouterLink>
          </div>
        </div>
      </div>
    </nav>
    <!-- Main content -->
    <main class="mx-auto max-w-4xl px-4 py-8 am:px-6">
      <RouterView />
    </main>
  </div>
</template>
