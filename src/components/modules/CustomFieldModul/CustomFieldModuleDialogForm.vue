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
} from '@fewangsit/wangsvue';
import { DialogFormPayload } from '@fewangsit/wangsvue/dialogform';
import { FetchOptionResponse } from '@fewangsit/wangsvue/filtercontainer';
import { AxiosResponse } from 'axios';
import { shallowRef, useTemplateRef, watch } from 'vue';

type CustomFieldOptions =
  FetchOptionResponse<GetOptionsCustomFieldParams>['data'];

const props = defineProps<{ idEdit?: string }>();
const visible = defineModel<boolean>('visible', { required: true });

const dialogFormRef = useTemplateRef<DialogForm>('DialogForm');

const radioButton = shallowRef<string>('no');
const dataCustomFieldById = shallowRef<CustomField>();
const allOptionsCustomField = shallowRef<CustomFieldOptions>();
const dataType = shallowRef<string>();

const getAllCustomFieldOptions = async (
  params: GetOptionsCustomFieldParams,
): Promise<void> => {
  try {
    const response = await CustomFieldService.getCustomFieldOptions(params);
    allOptionsCustomField.value = response.data
      .data as unknown as CustomFieldOptions;
  } catch (error) {
    console.error(error);
  }
};

const getDataEditCustomField = async (): Promise<void> => {
  try {
    const response = await CustomFieldService.getCustomFieldById(
      props.idEdit as string,
    );
    const { data } = response.data.data;
    dataCustomFieldById.value = data.find(
      (customField) => customField._id === props.idEdit,
    );
  } catch (error) {
    console.error(error);
  }
};
const submitForm = async (
  body: DialogFormPayload<CreateCustomFieldRequestBody>,
): Promise<void> => {
  try {
    console.log(body.formValues);
  } catch (error) {
    console.error(error);
  }
};
watch(visible, () => {
  if (visible.value === false && !props.idEdit) {
    radioButton.value = 'no';
    dataType.value = undefined;
  }
});
</script>

<template>
  <DialogForm
    ref="dialogFormRef"
    v-model:visible="visible"
    :buttons-template="['cancel', 'clear', 'submit']"
    :header="
      props.idEdit
        ? `Edit Custom Field ${props.idEdit}`
        : `Create Custom Field ${props.idEdit}`
    "
    :id-edit="props.idEdit"
    @show="getDataEditCustomField"
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
          :value="dataCustomFieldById?.name"
          label="Field Name"
          mandatory
          placeholder="Enter field name"
          use-validator
        />

        <Dropdown
          v-model="dataType"
          :initial-value="dataCustomFieldById?.dataType"
          :options="allOptionsCustomField?.dataTypeOptions"
          @show="getAllCustomFieldOptions"
          field-info="Press enter to add new value"
          field-name="datatype"
          label="Data Type"
          mandatory
          option-label="label"
          option-value="value"
        />
        <InputBadge
          v-if="dataType"
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
            <ButtonRadio v-model="radioButton" label="Yes" value="yes" />
            <ButtonRadio v-model="radioButton" label="No" value="no" />
          </div>
        </div>
        <MultiSelect
          :options="allOptionsCustomField?.nameOptions"
          @show="getAllCustomFieldOptions"
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
