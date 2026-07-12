<script setup lang="ts">
import { useTaskStore } from '@/stores/taskStore'
import TaskItem from './TaskItem.vue'

const taskStore = useTaskStore()
</script>

<template>
  <div>
    <!-- Empty state -->
    <div
      v-if="taskStore.filteredTasks.length === 0"
      class="rounded-xl border-2 border-dashed border-gray-200 py-16 text-center"
    >
      <p class="text-sm font-medium text-gray-500">
        {{
          taskStore.searchQuery
            ? 'No tasks match your search.'
            : 'No tasks yet. Add one above!'
        }}
      </p>
    </div>

    <!-- Task items with animated transitions -->
    <TransitionGroup
      v-else
      name="task-list"
      tag="ul"
      class="space-y-3"
    >
      <TaskItem
        v-for="task in taskStore.filteredTasks"
        :key="task.id"
        :task="task"
        @complete="taskStore.completedTask(task.id)"
        @reopen="taskStore.reopenTask(task.id)"
        @delete="taskStore.deleteTask(task.id)"
      />
    </TransitionGroup>

    <!-- Bulk action: clear completed -->
    <div
      v-if="taskStore.completedTasks.length > 0"
      class="mt-6 flex justify-end"
    >
      <button
        class="btn-secondary text-red-600 hover:bg-red-50 hover:border-red-300"
        @click="taskStore.clearCompleted()"
      >
        Clear {{ taskStore.completedTasks.length }} completed
      </button>
    </div>
  </div>
</template>

<style scoped>
.task-list-enter-active,
.task-list-leave-active {
  transition: all 0.25s ease;
}

.task-list-enter-from,
.task-list-leave-to {
  opacity: 0;
  transform: translateX(-12px);
}

.task-list-move {
  transition: transform 0.25s ease;
}
</style>