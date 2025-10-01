<!--
  TODO: File ini dihapus, pakai CustomFieldDialogBulkConfirm aja untuk single action.
  Nama file itu diubah jadi CustomFieldDialogConfirm.
  Ini untuk ngurangin duplikasi kode.
-->
<script setup lang="ts">
import CustomFieldService from '@/components/services/customField.service';
import { CustomField } from '@/types/customField.type';
import {
  Checkbox,
  DialogConfirm,
  eventBus,
  useToast,
} from '@fewangsit/wangsvue/';

const props = defineProps<{ customFieldData?: CustomField }>();
const visible = defineModel<boolean>('visible', { required: true });
const toast = useToast();

const confirmDeleteCustomField = async (): Promise<void> => {
  try {
    await CustomFieldService.deleteCustomField({
      customFieldIds: props.customFieldData?._id
        ? [props.customFieldData._id]
        : [],
    });
    toast.add({
      message: 'Success, custom field has been deleted.',
      customMessage: true,
      severity: 'success',
    });
    eventBus.emit('data-table:update', { tableName: 'custom-field-list' });
  } catch (error) {
    toast.add({
      message:
        'Error, failed to delete custom field. Please check your connection and try again.',
      customMessage: true,
      severity: 'error',
      error,
    });

    console.error(error);
  }
};
</script>

<template>
  <!--
    TODO: Untuk 'list' harusnya antara ada array atau undefined.
    Kalau sekarang, jadi seakan2 masih ada objek yang perlu diprint di list.
-->
  <DialogConfirm
    v-model:visible="visible"
    :list="[props.customFieldData?.name ? props.customFieldData?.name : {}]"
    @confirm="confirmDeleteCustomField"
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
