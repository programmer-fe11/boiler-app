<script setup lang="ts">
import {
  GetOptionsAssetParams,
  RegisterEditAssetBody,
} from '@/components/dto/asset.dto';
import AssetServices from '@/components/services/asset.service';
import { Asset } from '@/types/asset.type';
import {
  DialogForm,
  Dropdown,
  ImageCompressor,
  InputText,
  useToast,
} from '@fewangsit/wangsvue';
import { DialogFormPayload } from '@fewangsit/wangsvue/dialogform';
import { FetchOptionResponse } from '@fewangsit/wangsvue/filtercontainer';
import { computed, shallowRef, useTemplateRef } from 'vue';

const props = defineProps<{ idEdit?: string }>();
const visible = defineModel<boolean>('visible', { required: true });

const dialogFormRef = useTemplateRef<DialogForm>('dialogFormRef');
const group = shallowRef<string>();
const category = shallowRef<string>();
const name = shallowRef<string>();

const toast = useToast();

const dataById = shallowRef<Asset>();
const dataOptions =
  shallowRef<FetchOptionResponse<GetOptionsAssetParams>['data']>();

const isBrandModelDisabled = computed<boolean>(() => {
  return !group.value || !category.value || !name.value;
});

const showForm = (): void => {
  if (!dataById.value) {
    group.value = undefined;
    category.value = undefined;
    name.value = undefined;
  }
  getDataById();
};

const getDataById = async (): Promise<void> => {
  try {
    if (props.idEdit) {
      const { data }: { data: { data: Asset } } =
        await AssetServices.getAssetById(props.idEdit);
      dataById.value = data.data;

      group.value = dataById.value.group;
      category.value = dataById.value.category;
      name.value = dataById.value.name;
    }
  } catch (error) {
    console.error(error);
  }
};

const getAllOptions = async (params: GetOptionsAssetParams): Promise<void> => {
  try {
    const response = await AssetServices.getOptions(params);
    dataOptions.value = response.data.data;
  } catch (error) {
    console.error(error);
  }
};

const submitForm = async (
  body: DialogFormPayload<RegisterEditAssetBody>,
): Promise<void> => {
  try {
    if (!props.idEdit) {
      await AssetServices.postAsset(body.formValues);
      if (!body.stayAfterSubmit) {
        visible.value = false;
      } else {
        dialogFormRef.value?.setFieldValue(
          'group',
          body.formValues.group as string,
          true,
        );
        category.value = undefined;
        name.value = undefined;
        setTimeout(() => {
          dialogFormRef.value?.setErrors({
            category: undefined,
            name: undefined,
          });
        }, 0);
      }
      toast.add({
        message: 'Success, asset has been registered',
        severity: 'success',
        customMessage: true,
      });
    } else {
      await AssetServices.editAsset(props.idEdit, body.formValues);
      toast.add({
        message: 'Success, asset has been edited',
        severity: 'success',
        customMessage: true,
      });
      visible.value = false;
    }
  } catch (error) {
    toast.add({
      message: props.idEdit
        ? 'Error, failed to edit asset. Please check your connection and try again.'
        : 'Error, failed to register asset. Please check your connection and try again.',
      severity: 'error',
      customMessage: true,
      error,
    });
    console.error(error);
  }
};
</script>

<template>
  <DialogForm
    ref="dialogFormRef"
    v-model:visible="visible"
    :buttons-template="['cancel', 'clear', 'submit']"
    :close-on-submit="false"
    :header="props.idEdit ? `Edit Asset` : `Register Asset`"
    :id-edit="props.idEdit"
    :show-stay-checkbox="props.idEdit ? false : true"
    @show="showForm"
    @submit="submitForm"
    stay-checkbox-label="Stay on this form after submitting"
    width="medium"
  >
    <template #fields>
      <div class="grid grid-cols-2 gap-3">
        <Dropdown
          v-model="group"
          :initial-value="dataById?.group"
          :options="dataOptions?.groupOptions"
          @show="getAllOptions({ groupOptions: true })"
          field-name="group"
          label="Group"
          mandatory
          option-label="label"
          option-value="value"
          placeholder="Select group"
          use-validator
        />
        <Dropdown
          v-model="category"
          :initial-value="dataById?.category"
          :options="dataOptions?.categoryOptions"
          @show="getAllOptions({ categoryOptions: true })"
          field-name="category"
          label="Category"
          mandatory
          option-label="label"
          option-value="value"
          placeholder="Select category"
          use-validator
        />
        <Dropdown
          v-model="name"
          :initial-value="dataById?.name"
          :options="dataOptions?.nameOptions"
          @show="getAllOptions({ nameOptions: true })"
          field-name="name"
          label="Name"
          mandatory
          option-label="label"
          option-value="value"
          placeholder="Select asset name"
          use-validator
        />
        <!-- :validator-message="{ }" -->
        <InputText
          :value="dataById?.aliasName"
          field-info="You can input an alias name for convenience in searching for
           assets and to differentiate them from others."
          field-name="aliasName"
          label="Alias Name"
          placeholder="Enter alias name"
        />
        <Dropdown
          :disabled="isBrandModelDisabled"
          :initial-value="dataById?.brand"
          :options="dataOptions?.brandOptions"
          @show="getAllOptions({ brandOptions: true })"
          field-name="brand"
          label="Brand"
          mandatory
          option-label="label"
          option-value="value"
          placeholder="Select brand"
          use-validator
        />
        <Dropdown
          :disabled="isBrandModelDisabled"
          :initial-value="dataById?.model"
          :options="dataOptions?.modelOptions"
          @show="getAllOptions({ modelOptions: true })"
          field-name="model"
          label="Model / Type"
          mandatory
          option-label="label"
          option-value="value"
          placeholder="Select model/type"
          use-validator
        />
      </div>

      <ImageCompressor
        :custom-requirements="['Max. 1MB', 'Must be image format']"
        :image-preview-url="dataById?.assetImage"
        field-name="photo"
        label="Photo"
        mandatory
        multiple
        use-validator
      />
    </template>
  </DialogForm>
</template>
