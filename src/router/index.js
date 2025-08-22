import DataTableView from '@/views/DataTableView.vue'
import HomeView from '@/views/HomeView.vue'
import MBiodataView from '@/views/MBiodataView.vue'
import Page1View from '@/views/Page1View.vue'
import Page2View from '@/views/Page2View.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/page1',
      name: 'page1',
      component: Page1View
    },
    {
      path: '/page2',
      name: 'page2',
      component: Page2View
    },
    {
      path: '/datatable',
      name: 'datatable',
      component: DataTableView
    },
    {
      path: '/m-biodata',
      name: 'm-biodata',
      component: MBiodataView
    }
  ],
})

export default router
