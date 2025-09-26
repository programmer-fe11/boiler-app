<script setup lang="ts">
import { Checkbox, DialogConfirm } from '@fewangsit/wangsvue/';

const visible = defineModel<boolean>('visible', { required: true });
</script>

<template>
  <DialogConfirm
    v-model:visible="visible"
    :list="['Warna', 'Deskripsi', 'Keterangan']"
    close-label="Cancel"
    confirm-label="Delete"
    header="Delete Custom Field"
    message="Are you sure you want to delete it?"
    severity="danger"
  >
    <template #body>
      <Checkbox
        label="Remove data has already been entered"
        tooltip="If you uncheck, data that you have been entered 
        will not be removed in the item and 
        stock detail."
      />
    </template>
  </DialogConfirm>
</template>
