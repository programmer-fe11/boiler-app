<script setup lang="ts">
import { QuickFilter } from '@fewangsit/wangsvue';
import { quickFilterFields } from './options/filterFields';
</script>

<template>
  <QuickFilter :fields="quickFilterFields" table-name="user-list" />
</template>
