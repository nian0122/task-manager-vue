<script setup lang="ts">
import { useTaskStore } from "@/stores/taskStore"
import { ref, reactive } from 'vue'
import type { TaskFormData } from "@/types/task"

const taskStore = useTaskStore()

const isExpanded = ref(false)
const tagInput = ref('')

const form = reactive<TaskFormData>({
  title: '',
  description: '',
  priority: 'medium',
  tags: [],
})

const errors = reactive({ title: '' })

function validateForm(): boolean {
  errors.title = ''
  if (!form.title.trim()) {
    errors.title = 'Task title is required.'
    return false
  }
  if (form.title.length > 120) {
    errors.title = 'Title must be 120 characters or fewer.'
    return false
  }
  return true
}

function addTag(): void {
  const tag = tagInput.value.trim().toLowerCase().replace(/s+/g, '-')
  if (tag && !form.tags.indexOf(tag) && form.tags.length < 5) {
    form.tags.push(tag)
    tagInput.value = ''
  }
}

function removeTag(tag: string): void {
  const index = form.tags.indexOf(tag)
  if (index !== -1) form.tags.splice(index, 1)
}

function handleTagKeydown(event: KeyboardEvent): void {
  if (event.key === 'Enter' || event.key === ',') {
    event.preventDefault()
    addTag()
  }
}

function submitForm(): void {
  if (!validateForm()) return
  taskStore.addTask({ ...form, tags: [...form.tags]})
  // Rest form state
  form.title = ''
  form.description = ''
  form.priority = 'medium'
  form.tags = []
  tagInput.value = ''
  isExpanded.value = false
}
</script>
<template>
  <div class="card mb-6">
    <form @submit.prevent="submitForm">
      <!-- Title input row (always visible) -->
      <div class="flex gap-3">
        <div class="flex-1">
          <input
            v-model="form.title"
            type="text"
            placeholder="Add a new task…"
            class="input-field"
            :class="{ 'border-red-400 focus:border-red-400 focus:ring-red-400': errors.title }"
            @focus="isExpanded = true"
          />
          <p v-if="errors.title" class="mt-1 text-xs text-red-600">{{ errors.title }}</p>
        </div>
        <button type="submit" class="btn-primary flex-shrink-0">Add Task</button>
      </div>

      <!-- Expanded fields (description, priority, tags) -->
      <Transition name="expand">
        <div v-if="isExpanded" class="mt-4 space-y-3">
          <textarea
            v-model="form.description"
            rows="2"
            placeholder="Description (optional)"
            class="input-field resize-none"
          />

          <div class="flex flex-wrap gap-3">
            <!-- Priority selector -->
            <div>
              <label class="mb-1 block text-xs font-medium text-gray-600">Priority</label>
              <select v-model="form.priority" class="input-field w-auto">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <!-- Tag input with badge display -->
            <div class="flex-1">
              <label class="mb-1 block text-xs font-medium text-gray-600">
                Tags <span class="text-gray-400">(press Enter or comma to add, max 5)</span>
              </label>
              <div
                class="flex flex-wrap items-center gap-1.5 rounded-lg border border-gray-300
                       bg-white px-2 py-1.5 focus-within:border-primary-500
                       focus-within:ring-1 focus-within:ring-primary-500"
              >
                <span
                  v-for="tag in form.tags"
                  :key="tag"
                  class="flex items-center gap-1 rounded-full bg-primary-100 px-2
                         py-0.5 text-xs font-medium text-primary-700"
                >
                  #{{ tag }}
                  <button
                    type="button"
                    class="text-primary-500 hover:text-primary-700 focus:outline-none"
                    :aria-label="`Remove tag ${tag}`"
                    @click="removeTag(tag)"
                  >
                    &times;
                  </button>
                </span>
                <input
                  v-model="tagInput"
                  type="text"
                  class="min-w-[80px] flex-1 border-0 bg-transparent p-0 text-sm
                         outline-none placeholder-gray-400"
                  placeholder="Add tag…"
                  :disabled="form.tags.length >= 5"
                  @keydown="handleTagKeydown"
                  @blur="addTag"
                />
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </form>
  </div>
</template>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.2s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}

.expand-enter-to,
.expand-leave-from {
  max-height: 300px;
}
</style>
