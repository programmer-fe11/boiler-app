<script lang="ts" setup>
import { computed } from 'vue';
import { Item, ShowOptionBulk } from './CustomFieldHeader.vue';
import { DialogConfirm, eventBus, useToast } from '@fewangsit/wangsvue/';
import CustomFieldService from '@/components/services/customField.service';

type OptionBulkType = {
  header: string;
  message: string;
  severity: 'success' | 'danger' | 'primary';
  confirmLabel: string;
};

const props = defineProps<{ listBulk?: Item[] }>();

const typeOptionBulk = defineModel<ShowOptionBulk | undefined>('optionBulk', {
  required: true,
});
const visible = defineModel<boolean>('visible', { required: true });

const toast = useToast();

const optionBulk = computed<OptionBulkType>(() => {
  /*
   * TODO: Ganti 'if' jadi 'switch'
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
   */
  if (typeOptionBulk.value === 'activeBulk') {
    return {
      header: 'Activate Custom Field',
      message: 'Are you sure want to activate it?',
      severity: 'success',
      confirmLabel: 'Activate',
    };
  } else if (typeOptionBulk.value === 'inactiveBulk') {
    return {
      header: 'Inactivate Custom Field',
      message: 'Are you sure want to inactivate it?',
      severity: 'danger',
      confirmLabel: 'Inactivate',
    };
  }
  return {
    header: 'Delete Custom Field',
    message: 'Are you sure want to delete it?',
    severity: 'danger',
    confirmLabel: 'Delete',
  };
});

const confirmEditStatusCustomFieldByBulk = async (): Promise<void> => {
  try {
    const ids = props.listBulk?.map((item) => item.id);
    /*
     * TODO: Untuk active sama inactive kan sama2 pake editStatusByBulk,
     * bisa digabung jadi pake satu editStatusByBulk aja
     */
    if (typeOptionBulk.value === 'activeBulk') {
      await CustomFieldService.editStatusByBulk({
        customFieldIds: ids,
        status: true,
      });
      toast.add({
        message: 'Success, custom field has been activated.',
        customMessage: true,
        severity: 'success',
      });
    } else if (typeOptionBulk.value === 'inactiveBulk') {
      await CustomFieldService.editStatusByBulk({
        customFieldIds: ids,
        status: false,
      });
      toast.add({
        message: 'Success, custom field has been inactivated.',
        customMessage: true,
        severity: 'success',
      });
    } else {
      await CustomFieldService.deleteCustomField({ customFieldIds: ids });
      toast.add({
        message: 'Success, custom field has been deleted.',
        customMessage: true,
        severity: 'success',
      });
    }
    eventBus.emit('data-table:update', { tableName: 'custom-field-list' });
    eventBus.emit('data-table:clear-selected-data', {
      tableName: 'custom-field-list',
    });
  } catch (error) {
    // TODO: Ini kan beda toastnya cuma di message, harusnya ini digabung jadi satu toast.add
    if (typeOptionBulk.value === 'activeBulk') {
      toast.add({
        message:
          'Error, failed to activate custom field. Please check your connection and try again.',
        customMessage: true,
        severity: 'error',
        error,
      });
    } else if (typeOptionBulk.value === 'inactiveBulk') {
      toast.add({
        message:
          'Error, failed to inactivate custom field. Please check your connection and try again.',
        customMessage: true,
        severity: 'error',
        error,
      });
    } else {
      toast.add({
        message:
          'Error, failed to delete custom field. Please check your connection and try again.',
        customMessage: true,
        severity: 'error',
        error,
      });
    }
    console.error(error);
  }
};
</script>

<template>
  <DialogConfirm
    v-model:visible="visible"
    :confirm-label="optionBulk.confirmLabel"
    :header="optionBulk.header"
    :list="props.listBulk?.map((item) => item.name)"
    :message="optionBulk.message"
    :severity="optionBulk.severity"
    @confirm="confirmEditStatusCustomFieldByBulk"
    close-label="Cancel"
  >
    <template #body v-if="typeOptionBulk !== 'activeBulk'">
      <Checkbox
        :label="
          typeOptionBulk === 'deleteBulk'
            ? 'Remove data has already been entered'
            : 'Hide data that has already been entered'
        "
        :tooltip="
          typeOptionBulk === 'deleteBulk'
            ? `If you uncheck, data that you have been entered 
        will not be removed in the item and 
        stock detail.`
            : `If you uncheck, data that you have been 
            entered will not be hidden in the item and stock 
            detail.`
        "
      />
    </template>
  </DialogConfirm>
</template>
