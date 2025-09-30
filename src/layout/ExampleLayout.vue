<script setup lang="ts">
import { ref } from 'vue';
import { Breadcrumb, Card, TabMenu } from '@fewangsit/wangsvue';
import { MenuItem } from '@fewangsit/wangsvue/menuitem';
import { useBreadcrumbStore } from '@/store';

const { breadcrumbs } = useBreadcrumbStore();

const tabMenus = ref<MenuItem[]>([
  {
    label: 'Home',
    route: 'home',
  },
  {
    label: 'Another Page',
    route: 'another-page',
  },
]);
</script>

<template>
  <Breadcrumb :menus="breadcrumbs" />
  <Card>
    <template #content>
      <TabMenu :menu="tabMenus" />
      <router-view />
    </template>
  </Card>
</template>
