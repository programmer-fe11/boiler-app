<script setup lang="ts">
import { GetOptionsParams } from '@/components/dto/asset.dto';
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
import { FetchOptionResponse } from '@fewangsit/workspace-api-services/src/types/fetchResponse.type';
import { computed, shallowRef } from 'vue';

const props = defineProps<{ idEdit?: string }>();
const visible = defineModel<boolean>('visible', { required: true });

const group = shallowRef<string>();
const category = shallowRef<string>();
const name = shallowRef<string>();

const toast = useToast();

const dataById = shallowRef<Asset | undefined>(undefined);
// TODO: Kayak yang aku ajarin kemarin, disini undefined bisa dihapus
const dataOptions = shallowRef<
  FetchOptionResponse<GetOptionsParams>['data'] | undefined
>(undefined);

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

const getAllOptions = async (params: GetOptionsParams): Promise<void> => {
  try {
    const response = await AssetServices.getOptions(params);
    dataOptions.value = response.data.data;
  } catch (error) {
    console.error(error);
  }
};

const submitForm = async (body: DialogFormPayload): Promise<void> => {
  try {
    if (!props.idEdit) {
      await AssetServices.postAsset(body.formValues);
      toast.add({
        message: 'Successfully register asset',
        severity: 'success',
      });
    } else {
      await AssetServices.editAsset(props.idEdit, body.formValues);
      toast.add({
        message: 'Successfully edit asset',
        severity: 'success',
      });
    }

    /*
     * TODO: Kalau stay after submit, harusnya dropdown brand sama model
     * disabled lagi, dan kayak yang dikasitau di Figma bagian kiri atas,
     * `semua input akan reset kecuali group`
     */
    if (!body.stayAfterSubmit) {
      visible.value = false;
    }
  } catch (error) {
    toast.add({
      message: props.idEdit ? 'Failed edit asset' : 'Failed register asset',
      severity: 'error',
      error,
    });
    console.error(error);
  }
};
</script>

<template>
  <DialogForm
    v-model:visible="visible"
    :buttons-template="['cancel', 'clear', 'submit']"
    :close-on-submit="false"
    :header="props.idEdit ? `Edit Asset` : `Register Asset`"
    :id-edit="props.idEdit"
    @show="showForm"
    @submit="submitForm"
    show-stay-checkbox
    stay-checkbox-label="Stay on this form after submitting"
    width="medium"
  >
    <template #fields>
      <div class="grid grid-cols-2 gap-3">
        <!--
          TODO: Harusnya untuk tiap dropdown pas show ada getOptions,
          dan get optionsnya juga spesifik untuk tiap dropdown, jadi perlu
          dikasih param
        -->
        <Dropdown
          v-model="group"
          :initial-value="dataById?.group"
          :options="dataOptions?.groupOptions"
          @show="getAllOptions({})"
          field-name="Group"
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
          field-name="name"
          label="Name"
          mandatory
          option-label="label"
          option-value="value"
          placeholder="Select asset name"
          use-validator
        />
        <!--
          TODO: Kalau Dayen liat di Figma, ada icon info sama ada tooltip
          Alias name info, itu pake prop `fieldInfo` dari InputText
        -->
        <InputText
          :value="dataById?.aliasName"
          field-name="aliasName"
          label="Alias Name"
          placeholder="Enter alias name"
        />
        <Dropdown
          :disabled="isBrandModelDisabled"
          :initial-value="dataById?.brand"
          :options="dataOptions?.brandOptions"
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
