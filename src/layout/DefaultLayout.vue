<script setup lang="ts">
import { useBreadcrumbStore } from '@/store';
import { Breadcrumb, Card } from '@fewangsit/wangsvue';

const { breadcrumbs } = useBreadcrumbStore();
</script>

<template>
  Test
  <Breadcrumb :menus="breadcrumbs" />
  <Card>
    <template #content>
      <router-view />
    </template>
  </Card>
</template>
