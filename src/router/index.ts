import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'All Tasks'}
    },
    {
      path: '/completed',
      name: 'completed',
      component: () => import('@/views/CompletedeView.vue'),
      meta: { title: 'Completed Tasks' },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
      meta: { title: 'About' },
    },
  ],
})

router.afterEach((to) => {
  const title = to.meta.tiltle as string | undefined
  document.title = title ? `${title} — Task Manager` : 'Task Manager'
})

export default router
