import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'
import type { Task, TaskFormData, TaskFilterOption, TaskSortOption } from '@/types/task'

const STORAGE_KEY = 'task-manager-tasks'

function loadFromStorage(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveToStorage(tasks: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

export const useTaskStore = defineStore('tasks', () => {
  // State
  const tasks = ref<Task[]>(loadFromStorage())
  const filterStatus = ref<TaskFilterOption>('all')
  const sortBy = ref<TaskSortOption>('createdAt')
  const searchQuery = ref('')

  // Computed: derived task lists
  const activeTasks = computed(() => tasks.value.filter((t) => t.status === 'active'))

  const completedTasks = computed(() => tasks.value.filter((t) => t.status === 'completed'))

  const filteredTasks = computed(() => {
    let result = tasks.value

    // Apply status filter
    if (filterStatus.value !== 'all') {
      result = result.filter((t) => t.status === filterStatus.value)
    }

    // Apply search query
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase()
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query) ||
          t.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    // Apply sorting
    return [...result].sort((a, b) => {
      if (sortBy.value === 'priority') {
        const order = { high: 0, medium: 1, low: 2 }
        return order[a.priority] - order[b.priority]
      }
      if (sortBy.value === 'title') {
        return a.title.localeCompare(b.title)
      }
      // Default: sort by createAt descending
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  })

  //Actions
  function addTask(formData: TaskFormData): Task {
    const newTask: Task = {
      id: nanoid(),
      ...formData,
      status: 'active',
      createdAt: new Date().toISOString(),
      completedAt: null,
    }
    tasks.value.unshift(newTask)
    persistTasks()
    return newTask
  }

  function completedTask(id: string): void {
    const task = tasks.value.find((t) => t.id === id)
    if (task) {
      task.status = 'completed'
      task.completedAt = new Date().toISOString()
      persistTasks()
    }
  }

  function reopenTask(id: string): void {
    const task = tasks.value.find((t) => t.id === id)
    if (task) {
      task.status = 'active'
      task.completedAt = null
      persistTasks()
    }
  }

  function deleteTask(id: string): void {
    const index = tasks.value.findIndex((t) => t.id === id)
    if (index !== -1) {
      tasks.value.splice(index, 1)
      persistTasks()
    }
  }

  function updateTask(id: string, updates: Partial<TaskFormData>): void {
    const task = tasks.value.find((t) => t.id === id)
    if (task) {
      Object.assign(task, updates)
      persistTasks()
    }
  }

  function clearCompleted(): void {
    tasks.value = tasks.value.filter((t) => t.status === 'active')
    persistTasks()
  }

  function persistTasks(): void {
    saveToStorage(tasks.value)
  }

  return {
    // State
    tasks,
    filterStatus,
    sortBy,
    searchQuery,
    // Computed
    activeTasks,
    completedTasks,
    filteredTasks,
    // Actions
    addTask,
    completedTask,
    reopenTask,
    deleteTask,
    updateTask,
    clearCompleted,
  }
})
