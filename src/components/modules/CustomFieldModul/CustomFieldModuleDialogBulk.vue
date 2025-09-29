<script lang="ts" setup>
import { computed } from 'vue';
import { ShowOptionBulk } from './CustomFieldHeader.vue';
import { DialogConfirm } from '@fewangsit/wangsvue/';

const props = defineProps<{ listBulk?: string[] }>();

const typeOptionBulk = defineModel<ShowOptionBulk | undefined>('optionBulk', {
  required: true,
});
const visible = defineModel<boolean>('visible', { required: true });

const optionBulk = computed(() => {
  if (typeOptionBulk.value === 'activeBulk') {
    return {
      header: 'Activate Custom Field',
      message: 'Are you sure want to activate it',
      severity: 'success' as const,
      confirmLabel: 'Activate',
    };
  } else if (typeOptionBulk.value === 'inactiveBulk') {
    return {
      header: 'Inactivate Custom Field',
      message: 'Are you sure want to inactivate it',
      severity: 'danger' as const,
      confirmLabel: 'Inactivate',
    };
  }
  return {
    header: 'Delete Custom Field',
    message: 'Are you sure want to delete it',
    severity: 'danger' as const,
    confirmLabel: 'Delete',
  };
});
</script>

<template>
  <DialogConfirm
    v-model:visible="visible"
    :confirm-label="optionBulk.confirmLabel"
    :header="optionBulk.header"
    :list="props.listBulk"
    :message="optionBulk.message"
    :severity="optionBulk.severity"
    close-label="Cancel"
  />
</template>
