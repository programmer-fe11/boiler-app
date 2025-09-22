<!-- TODO: Ini kan dialog untuk register/edit asset, ubah nama file ini biar sesuai -->
<script setup lang="ts">
import {
  GetOptionsParams,
  RegisterEditAssetBody,
} from '@/components/dto/asset.dto';
import AssetServices from '@/components/services/asset.service';
import { Member } from '@/types/asset.type';
import {
  DialogForm,
  Dropdown,
  ImageCompressor,
  InputText,
  useToast,
} from '@fewangsit/wangsvue';
import { FetchOptionResponse } from '@fewangsit/workspace-api-services/src/types/fetchResponse.type';
import { computed, onMounted, shallowRef, watch } from 'vue';

const props = defineProps<{ idEdit?: string }>();
const visible = defineModel<boolean>('visible', { required: true });
const group = defineModel<string | undefined>('group');
const category = defineModel<string | undefined>('category');
const name = defineModel<string | undefined>('name');

const toast = useToast();

const dataById = shallowRef<Member | undefined>(undefined);
type GetOptionsResponse = FetchOptionResponse<GetOptionsParams>;

const dataOptions = shallowRef<GetOptionsResponse['data'] | undefined>(
  undefined,
);

onMounted(async () => {
  getAllOptions({});
});

const isBrandModelEnabled = computed(() => {
  return (
    (group.value || dataById.value?.group) &&
    (category.value || dataById.value?.category) &&
    (name.value || dataById.value?.name)
  );
});

const getDataById = async (): Promise<Member | undefined> => {
  try {
    if (!props.idEdit) {
      return;
    }
    const { data }: { data: { data: Member } } =
      await AssetServices.getAssetById(props.idEdit);
    dataById.value = data.data;
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

/*
 * TODO: Nama function ini kurang sesuai, karena ini function untuk submit form
 * TODO: Tipe argumen untuk function ini harusnya sesuai sama emit submit DialogForm,
 * coba diliat disitu tipe emitnya apa
 */
const submitForm = async (body: RegisterEditAssetBody): Promise<void> => {
  try {
    // TODO: Kalau ini untuk edit asset, harusnya manggil API edit asset
    if (!props.idEdit) {
      await AssetServices.postAsset(body);
      toast.add({
        message: 'Successfully register asset',
        severity: 'success',
      });
    } else {
      await AssetServices.editAsset(props.idEdit, body);
      toast.add({
        message: 'Successfully edit asset',
        severity: 'success',
      });
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
    :header="props.idEdit ? `Edit Asset` : 'Register Asset'"
    :id-edit="props.idEdit"
    @show="getDataById"
    @submit="submitForm"
    show-stay-checkbox
    stay-checkbox-label="Stay on this form after submitting"
    width="medium"
  >
    <template #fields>
      <!-- TODO: Options harusnya didapetin dari API, bukan hardcode -->
      <div class="grid grid-cols-2 gap-3">
        <Dropdown
          v-model="group"
          :initial-value="dataById?.group"
          :options="dataOptions?.groupOptions || []"
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
          :options="dataOptions?.categoryOptions || []"
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
          :options="dataOptions?.nameOptions || []"
          field-name="name"
          label="Name"
          mandatory
          option-label="label"
          option-value="value"
          placeholder="Select asset name"
          use-validator
        />
        <InputText
          :model-value="dataById?.aliasName"
          field-name="aliasName"
          label="Alias Name"
          placeholder="Select alias name"
        />
        <Dropdown
          :disabled="isBrandModelEnabled ? false : true"
          :initial-value="dataById?.brand"
          :options="dataOptions?.brandOptions || []"
          field-name="brand"
          label="Brand"
          mandatory
          option-label="label"
          option-value="value"
          placeholder="Select brand"
          use-validator
        />

        <Dropdown
          :disabled="isBrandModelEnabled ? false : true"
          :initial-value="dataById?.model"
          :options="dataOptions?.modelOptions || []"
          field-name="model"
          label="Model / Type"
          mandatory
          option-label="label"
          option-value="value"
          placeholder="Select model/type"
          use-validator
        />
      </div>

      <!-- TODO: Harusnya ada inital value untuk ImageCompressor -->
      <ImageCompressor
        :custom-requirements="['Max. 1MB', 'Must be image format']"
        label="Photo"
        mandatory
        multiple
        use-validator
      />
    </template>
  </DialogForm>
</template>
