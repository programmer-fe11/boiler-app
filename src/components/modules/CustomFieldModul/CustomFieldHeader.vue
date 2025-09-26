<script setup lang="ts">
import {
  Button,
  ButtonDownload,
  ButtonFilter,
  ButtonSearch,
  Changelog,
  FilterContainer,
} from '@fewangsit/wangsvue';

import { shallowRef, watch } from 'vue';
import CustomFieldModuleDialogForm from './CustomFieldModuleDialogForm.vue';

const showCreateCustomFieldDialog = shallowRef<boolean>(false);

watch(showCreateCustomFieldDialog, (newval) => {
  console.log(newval);
});
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
    <!--
      TODO: Di label jangan ada `+`, harusnya pake icon add
      (Ini aku kelewatan, harusnya di asset juga diperbaikin)
    -->
    <Button
      @click="showCreateCustomFieldDialog = !showCreateCustomFieldDialog"
      label="+ Custom Field"
      severity="secondary"
    />
  </div>
  <CustomFieldModuleDialogForm v-model:visible="showCreateCustomFieldDialog" />
</template>
