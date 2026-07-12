import { computed } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import type { TaskFilterOption, TaskSortOption } from '@/types/task'

export function useTaskFilters() {
  const taskStore = useTaskStore()

  const filterOptions: { value: TaskFilterOption; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ]

  const sortOptions: { value: TaskSortOption; label: string }[] = [
    { value: 'createdAt', label: 'Newest first' },
    { value: 'priority', label: 'Priority' },
    { value: 'title', label: 'Alphabetical' },
  ]

  // Writable computed for v-model binding without exposing store internals
  const searchQuery = computed({
    get: () => taskStore.searchQuery,
    set: (val: string) => { taskStore.searchQuery = val },
  })

  function setFilter(value: TaskFilterOption) {
    taskStore.filterStatus = value
  }

  function setSort(value: TaskSortOption) {
    taskStore.sortBy = value
  }

  function clearSearch() {
    taskStore.searchQuery = ''
  }

  return {
    filterOptions,
    sortOptions,
    searchQuery,
    currentFilter: computed(() => taskStore.filterStatus),
    currentSort: computed(() => taskStore.sortBy),
    setFilter,
    setSort,
    clearSearch,
  }
}