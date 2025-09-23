import { Component } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    component: (): Promise<Component> => import('@/layout/AssetLayout.vue'),
    redirect: '/home',
    children: [
      {
        path: 'home',
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
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
