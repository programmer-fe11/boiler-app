<script setup lang="ts">
import {
  CreateCustomFieldRequestBody,
  GetOptionsCustomFieldParams,
} from '@/components/dto/customField.dto';
import CustomFieldService from '@/components/services/customField.service';
import { CustomField } from '@/types/customField.type';
import {
  ButtonRadio,
  DialogForm,
  Dropdown,
  InputBadge,
  InputText,
  MultiSelect,
  useToast,
} from '@fewangsit/wangsvue';
import { DialogFormPayload } from '@fewangsit/wangsvue/dialogform';
import { FetchOptionResponse } from '@fewangsit/wangsvue/filtercontainer';
import { shallowRef, watch } from 'vue';

type CustomFieldOptions =
  FetchOptionResponse<GetOptionsCustomFieldParams>['data'];

const props = defineProps<{ customFieldData?: CustomField }>();
const visible = defineModel<boolean>('visible', { required: true });

const toast = useToast();

const radioButton = shallowRef<boolean>(false);
const optionsCustomField = shallowRef<CustomFieldOptions>();
const dataType = shallowRef<string | undefined>(
  props.customFieldData?.dataType,
);

const getCustomFieldOptions = async (
  params: GetOptionsCustomFieldParams,
): Promise<void> => {
  try {
    const response = await CustomFieldService.getCustomFieldOptions(params);
    optionsCustomField.value = response.data
      .data as unknown as CustomFieldOptions;
  } catch (error) {
    console.error(error);
  }
};

const submitForm = async (
  body: DialogFormPayload<CreateCustomFieldRequestBody>,
): Promise<void> => {
  try {
    if (!props.customFieldData) {
      await CustomFieldService.postCustomField(body.formValues);
      if (body.stayAfterSubmit) {
        visible.value = true;
        dataType.value = undefined;
        radioButton.value = false;
      }
      toast.add({
        message: 'Success, custom field has been created.',
        severity: 'success',
        customMessage: true,
      });
    } else {
      await CustomFieldService.editCustomField(
        props.customFieldData._id,
        body.formValues,
      );
      toast.add({
        message: 'Success, custom field has been edited.',
        severity: 'success',
        customMessage: true,
      });
    }
  } catch (error) {
    toast.add({
      message: !props.customFieldData
        ? 'Error, failed to create custom field. Please check your connection and try again.'
        : 'Error, failed to edit custom field. Please check your connection and try again.',
      severity: 'error',
      customMessage: true,
      error,
    });
    console.error(error);
  }
};

const showDialog = (): void => {
  getCustomFieldOptions({ nameOptions: true });
  getCustomFieldOptions({ dataTypeOptions: true });
};

watch(visible, () => {
  if (visible.value === false && !props.customFieldData) {
    radioButton.value = false;
    dataType.value = undefined;
  }
});
</script>

<!-- eslint-disable vue/prefer-true-attribute-shorthand -->
<template>
  <DialogForm
    v-model:visible="visible"
    :buttons-template="['cancel', 'clear', 'submit']"
    :header="
      props.customFieldData ? `Edit Custom Field` : `Create Custom Field `
    "
    @show="showDialog"
    @submit="submitForm"
    show-stay-checkbox
    stay-checkbox-label="Stay on this form after submitting"
  >
    <template #fields>
      <div class="flex flex-col gap-4 pb-4">
        <InputText
          :max-length="30"
          :validator-message="{
            empty: 'Field name must not be empty',
            exist: 'This name is already exist',
          }"
          :value="customFieldData?.name"
          label="Field Name"
          mandatory
          placeholder="Enter field name"
          use-validator
        />

        <Dropdown
          v-model="dataType"
          :initial-value="customFieldData?.dataType"
          :options="optionsCustomField?.dataTypeOptions"
          @show="getCustomFieldOptions({ dataTypeOptions: true })"
          field-info="Press enter to add new value"
          field-name="datatype"
          label="Data Type"
          mandatory
          option-label="label"
          option-value="value"
        />
        <InputBadge
          v-if="dataType || customFieldData?.dataType"
          :initial-value="customFieldData?.optionValue"
          field-info="Press enter to add new value"
          field-name="models"
          label="Value"
          mandatory
          remove-button-variant="disabled"
          restore-value-on-empty
          use-validator
        />
        <div class="flex justify-between">
          <span class="font-semibold leading-4 text-xs">Required?</span>
          <div class="flex gap-3">
            <ButtonRadio v-model="radioButton" :value="true" label="Yes" />
            <ButtonRadio v-model="radioButton" :value="false" label="No" />
          </div>
        </div>
        <MultiSelect
          :initial-value="customFieldData?.itemName.map((item) => item._id)"
          :options="optionsCustomField?.nameOptions"
          @show="getCustomFieldOptions({ nameOptions: true })"
          field-info="Custom fields will be applied to each item 
          SKU under the selected item name."
          label="Item Name"
          option-label="label"
          option-value="value"
        />
      </div>
    </template>
  </DialogForm>
</template>
