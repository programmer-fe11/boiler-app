import { Component } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    component: (): Promise<Component> => import('@/layout/ExampleLayout.vue'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'HomeView',
        component: (): Promise<Component> => import('@/views/HomeView.vue'),
      },
      {
        path: 'another-page',
        name: 'AnotherView',
        component: (): Promise<Component> => import('@/views/AnotherView.vue'),
      },
    ],
  },
  // TODO: Ini udah bener kok ada di children di atas, jangan dipindahin kesini
  {
    path: '/detail/:id',
    name: 'detailView',
    component: (): Promise<Component> => import('@/views/DetailView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
