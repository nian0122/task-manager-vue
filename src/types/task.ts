export type TaskPriority = 'low' | 'medium' | 'high'
export type TaskStatus = 'active' | 'completed'

export interface Task {
    id: string
    title: string
    description: string
    priority: TaskPriority
    status: TaskStatus
    createAt: string
    completedAt: string | null
    tags: string[]
}

export interface TaskFormData {
    title: string
    description: string
    priority: TaskPriority
    tags: string[]
}

export type TaskFilterOption = 'all' | TaskStatus
export type TaskSortOption = 'createAt' | 'priority' | 'title'