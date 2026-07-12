<script setup lang='ts'>
import {useTaskStore} from '@/stores/taskStore'
import TaskItem from './TaskItem.vue'

const taskStore = useTaskStore()
</script>

<template>
  <div>
    <!-- Empty state -->
     <div
       v-if = "taskStore.filteredTasks.length === 0"
       class="rounded-xl border-2 border-dashed border-gray-200 p-16 text-center"
      >
      <p class="text-sm font-medium text-gray-500">
        {{
          taskStore.searchQury
            ? 'No tasks match your search.'
            : 'No tasks yet. Add one above!'
        }}
      </p>
  </div>

  <!-- Task items with animated transitions -->
  <transitionGroup
    v-else
    name="task-list"
    tag="ul"
    class="space-y-3"
  >
    <TaskItem
      v-for="task in taskStore.filteredTasks"
      :key="task.id"
      :task="task"
      @complete="taskStore.completeTask(task.id)"
      @reopen="taskStore.reopenTask(task.id)"
      @delete="taskStore.deleteTask(task.id)"
    />
  </TransitionGroup>

  <!-- bulk action: clear completed -->
   <div
    v-if="taskStore.completedTasks.length > 0"
    class="mt-6 flex justify-end"
   >
    <bu

   </div>
</template>
