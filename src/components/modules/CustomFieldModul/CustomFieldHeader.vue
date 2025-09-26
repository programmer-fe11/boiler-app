<script setup lang="ts">
import {
  Button,
  ButtonDownload,
  ButtonFilter,
  ButtonSearch,
  Changelog,
} from '@fewangsit/wangsvue';

import { shallowRef } from 'vue';
import CustomFieldModuleDialogForm from './CustomFieldModuleDialogForm.vue';

const showCreateCustomFieldDialog = shallowRef<boolean>(false);
</script>

<template>
  <div class="flex justify-end items-center gap-3">
    <div class="flex gap-4 items-center">
      <ButtonSearch table-name="custom-field-list" />
      <ButtonFilter table-name="custom-field-list" />
      <ButtonDownload
        file-name="Download custom-field-table"
        table-name="custom-field-list"
      />
      <Changelog object="" />
    </div>
    <Button
      @click="showCreateCustomFieldDialog = !showCreateCustomFieldDialog"
      icon="add"
      label="Custom Field"
      severity="secondary"
    />
  </div>
  <CustomFieldModuleDialogForm v-model:visible="showCreateCustomFieldDialog" />
</template>
