<script lang="ts" setup>
import { computed } from 'vue';
import { CustomField, ShowOptionBulk } from '@/types/customField.type';
import {
  Checkbox,
  DialogConfirm,
  eventBus,
  useToast,
} from '@fewangsit/wangsvue/';
import CustomFieldService from '@/components/services/customField.service';

type OptionBulkType = {
  header: string;
  message: string;
  severity: 'success' | 'danger' | 'primary';
  confirmLabel: string;
};

const props = defineProps<{
  listBulk?: CustomField[];
  optionBulk?: ShowOptionBulk;
}>();

const emit = defineEmits<{
  cancelForm: [];
}>();

const visible = defineModel<boolean>('visible', { required: true });

const toast = useToast();

const optionBulk = computed<OptionBulkType>(() => {
  switch (props.optionBulk) {
    case 'activeBulk': {
      return {
        header: 'Activate Custom Field',
        message: 'Are you sure want to activate it?',
        severity: 'success',
        confirmLabel: 'Activate',
      };
    }
    case 'inactiveBulk': {
      return {
        header: 'Inactivate Custom Field',
        message: 'Are you sure want to inactivate it?',
        severity: 'danger',
        confirmLabel: 'Inactivate',
      };
    }
    default: {
      return {
        header: 'Delete Custom Field',
        message: 'Are you sure want to delete it?',
        severity: 'danger',
        confirmLabel: 'Delete',
      };
    }
  }
});

const confirmEditStatusCustomFieldByBulk = async (): Promise<void> => {
  try {
    const ids = props.listBulk?.map((item) => item._id);

    if (props.optionBulk === 'deleteBulk') {
      await CustomFieldService.deleteCustomField({ customFieldIds: ids });
      toast.add({
        message: 'Success, custom field has been deleted.',
        customMessage: true,
        severity: 'success',
      });
    } else {
      const isActive = props.optionBulk === 'activeBulk';
      await CustomFieldService.editStatusByBulk({
        status: isActive,
        customFieldIds: ids,
      });
      toast.add({
        message: isActive
          ? 'Success, custom field has been activated.'
          : 'Success, custom field has been Inactivated.',
        customMessage: true,
        severity: 'success',
      });
    }

    eventBus.emit('data-table:update', { tableName: 'custom-field-list' });
    eventBus.emit('data-table:clear-selected-data', {
      tableName: 'custom-field-list',
    });
  } catch (error) {
    let message = 'delete';
    switch (props.optionBulk) {
      case 'activeBulk':
        message = 'activate';
        break;
      case 'inactiveBulk':
        message = 'inactivate';
        break;
    }
    toast.add({
      message: `Error, failed to ${message} custom field. Please check your connection and try again.`,
      customMessage: true,
      severity: 'error',
      error,
    });
    console.error(error);
  }
};
</script>

<template>
  <DialogConfirm
    v-model:visible="visible"
    :confirm-label="optionBulk.confirmLabel"
    :header="optionBulk.header"
    :list="
      props.listBulk ? props.listBulk?.map((item) => item.name) : undefined
    "
    :severity="optionBulk.severity"
    @close="emit('cancelForm')"
    @confirm="confirmEditStatusCustomFieldByBulk"
    close-label="Cancel"
  >
    <template #body>
      <div class="flex flex-col gap-3">
        <Checkbox
          v-if="props.optionBulk !== 'activeBulk'"
          :label="
            props.optionBulk === 'deleteBulk'
              ? 'Remove data has already been entered'
              : 'Hide data that has already been entered'
          "
          :tooltip="
            props.optionBulk === 'deleteBulk'
              ? `If you uncheck, data that you have been entered 
        will not be removed in the item and 
        stock detail.`
              : `If you uncheck, data that you have been 
            entered will not be hidden in the item and stock 
            detail.`
          "
        />
        <span class="font-normal leading-[18px] text-xs">
          {{ optionBulk.message }}
        </span>
      </div>
    </template>
  </DialogConfirm>
</template>
