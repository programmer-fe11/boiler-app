import { Component } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    component: (): Promise<Component> => import('@/layout/DefaultLayout.vue'),
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
      {
        path: 'custom-field',
        name: 'CustomFieldView',
        redirect: 'custom-field/global',
        children: [
          {
            path: 'global',
            name: 'CustomFieldGlobalView',
            component: (): Promise<Component> =>
              import('@/views/CustomFieldGlobalView.vue'),
          },
          {
            path: 'specific',
            name: 'CustomFieldSpecificView',
            component: (): Promise<Component> =>
              import('@/views/CustomFieldSpecificView.vue'),
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
