<script setup lang="ts">
import { FilterContainer } from '@fewangsit/wangsvue';
import { filterFields } from './options/filterFields';
</script>

<template>
  <FilterContainer :fields="filterFields" table-name="data-asset" />
</template>
