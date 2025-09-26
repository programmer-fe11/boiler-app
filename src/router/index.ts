import { Component } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    component: (): Promise<Component> => import('@/layout/AssetLayout.vue'),
    redirect: '/asset',
    children: [
      {
        path: 'asset',
        name: 'AssetView',
        component: (): Promise<Component> => import('@/views/AssetView.vue'),
      },

      {
        path: '/detail/:id',
        name: 'detailView',
        component: (): Promise<Component> => import('@/views/DetailView.vue'),
      },
    ],
  },
  {
    path: '/',
    component: (): Promise<Component> =>
      import('@/layout/CustomFieldLayout.vue'),
    redirect: '/customfield',
    children: [
      {
        path: 'custom-field',
        name: 'CustomFieldView',
        component: (): Promise<Component> =>
          import('@/views/CustomFieldView.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
