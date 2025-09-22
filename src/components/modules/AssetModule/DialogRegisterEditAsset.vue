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
import { computed, onMounted, shallowRef } from 'vue';

type GetOptionsResponse = FetchOptionResponse<GetOptionsParams>;

const props = defineProps<{ idEdit?: string }>();
const visible = defineModel<boolean>('visible', { required: true });
// TODO: Udah bener yang di bawah ini pake shallowRef, jangan pake defineModel
const group = defineModel<string | undefined>('group');
const category = defineModel<string | undefined>('category');
const name = defineModel<string | undefined>('name');

onMounted(async () => {
  getAllOptions({});
});

const toast = useToast();

const dataById = shallowRef<Member | undefined>(undefined);
const dataOptions = shallowRef<GetOptionsResponse['data'] | undefined>(
  undefined,
);

/*
 * TODO: Semua computed harus ada typenya
 * Referensi: Coding Style Guide 6.3.4
 *
 * Dayen, kemarin hari Rabu padahal udah aku kasitau kalau semua computed harus ada type,
 * tapi disini malah enggak ada. Tolong lebih hati2 ya, dan jangan lupain komentar2ku
 * yang udah Dayen fix, biar bisa belajar dari komentarku.
 *
 * Ini balik lagi ke eval yang aku kasih lewat WA, aku rasa Dayen terlalu buru2, jadi enggak hati2.
 * Kayak yang aku bilang, pelan2 aja ya, cek lagi kode yang udah ditulis itu bener atau enggak.
 * Mungkin selain itu, Dayen kalau ada komentar TODO langsung diselesaiin tanpa Dayen caritau kenapa
 * perlu ada komentar itu. Jadi Dayen enggak ada pengalaman belajar, padahal tujuan Dayen ngerjain
 * ini kan untuk belajar, bukan karena kode Dayen ini bakal dipake.
 */
const isBrandModelEnabled = computed(() => {
  return (
    (group.value || dataById.value?.group) &&
    (category.value || dataById.value?.category) &&
    (name.value || dataById.value?.name)
  );
});

const getDataById = async (): Promise<Member | undefined> => {
  try {
    /*
     * TODO: Daripada kayak gini, mending `if (props.isEdit) { ... }`,
     * biar enggak perlu return
     */
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
 * TODO: Tipe argumen untuk function ini harusnya sesuai sama emit submit DialogForm,
 * coba diliat disitu tipe emitnya apa
 *
 * Dayen, kalau bingung gimana cara ngerjain TODOnya, tanya aku aja, jangan malah dihapus.
 */
const submitForm = async (body: RegisterEditAssetBody): Promise<void> => {
  try {
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
      <div class="grid grid-cols-2 gap-3">
        <!--
          TODO: Untuk `options`, kalau mau return value yang di kanan kalau value yang di kiri undefined,
          harus pake nullish coalescing operator `??`, jangan pake OR operator `||`
          https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing

          Dan malah, options enggak perlu operator sama sekali, langsung aja "dataOptions?.groupOptions".
          Soalnya kalau `dataOptions?.groupOptions === undefined` kan dropdownnya jadi enggak ada option,
          sama aja kayak array kosong.
        -->
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
        <!--
          TODO: Ini pake props yang salah untuk initial value,
          coba diliat lagi InputText ada props apa aja
        -->
        <InputText
          :model-value="dataById?.aliasName"
          field-name="aliasName"
          label="Alias Name"
          placeholder="Select alias name"
        />
        <!--TODO: Kan value isBrandModelEnabled itu udah boolean, disini enggak perlu ternary operator -->
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

      <ImageCompressor
        :custom-requirements="['Max. 1MB', 'Must be image format']"
        :image-preview-url="dataById?.assetImage"
        label="Photo"
        mandatory
        multiple
        use-validator
      />
    </template>
  </DialogForm>
</template>
