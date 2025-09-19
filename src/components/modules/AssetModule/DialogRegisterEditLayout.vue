<!-- TODO: Ini kan dialog untuk register/edit asset, ubah nama file ini biar sesuai -->
<script setup lang="ts">
import { RegisterAssetBody } from '@/components/dto/asset.dto';
import AssetServices from '@/components/services/api.service';
import { Member } from '@/types/member.type';
import {
  DialogForm,
  Dropdown,
  ImageCompressor,
  InputText,
  useToast,
} from '@fewangsit/wangsvue';
import { QueryParams } from '@fewangsit/wangsvue/datatable';
import { shallowRef, watch } from 'vue';

const props = defineProps<{ idEdit?: string }>();
const visible = defineModel<boolean>('visible', { required: true });

const toast = useToast();

/*
 * TODO: Liat TODO dibawah tentang kebanyakan input enggak perlu v-model.
 * Karena itu, beberapa shallowRef ini bisa dihapus.
 */
const group = shallowRef<string>();
const category = shallowRef<string>();
const name = shallowRef<string>();
const aliasName = shallowRef<string>();
const brand = shallowRef<string>();
const model = shallowRef<string>();
const dataById = shallowRef<Member | undefined>(undefined);

const getDataById = async (
  params: QueryParams,
): Promise<Member | undefined> => {
  try {
    if (!props.idEdit) {
      return;
    }
    const { data }: { data: { data: Member } } =
      await AssetServices.getAssetById(props.idEdit, params);
    dataById.value = data.data;

    // TODO: Semua nullish coalescing ini bisa dihapus
    group.value = dataById.value.group ?? '';
    category.value = dataById.value.category ?? '';
    name.value = dataById.value.name ?? '';
    aliasName.value = dataById.value.aliasName ?? '';
    brand.value = dataById.value.brand ?? '';
    model.value = dataById.value.model ?? '';
  } catch (error) {
    console.error(error);
  }
};

/*
 * TODO: Nama function ini kurang sesuai, karena ini function untuk submit form
 * TODO: Tipe argumen untuk function ini harusnya sesuai sama emit submit DialogForm,
 * coba diliat disitu tipe emitnya apa
 */
const submitBtn = async (body: RegisterAssetBody): Promise<void> => {
  try {
    // TODO: Kalau ini untuk edit asset, harusnya manggil API edit asset
    await AssetServices.postAsset(body);
    // TODO: Kalau mau nambahin toast sukses, tambahin severity: 'success', error dihapus
    toast.add({
      message: props.idEdit
        ? 'Successfully edit asset'
        : 'Successfully register asset',
      error: false,
    });
  } catch (error) {
    /*
     * TODO: Kalau mau nambahin toast error, ubah `error: false`
     * jadi `error: error` (bisa disingkat jadi `error`)
     */
    toast.add({
      message: props.idEdit ? 'Failed edit asset' : 'Failed register asset',
      error: false,
    });
    console.error(error);
  }
};

// TODO: get data harusnya pas dialongnya dibuka, bukan pas props idEdit diubah
watch(
  () => props.idEdit,
  async (newId) => {
    if (newId) {
      await getDataById({});
    } else {
      dataById.value = undefined;
    }
  },
);
</script>

<template>
  <!-- TODO: DialogForm enggak bakal pake idEdit, hapus v-modelnya -->
  <!--
    TODO: Disini Dayen ada nambahin idEdit di header, padahal enggak ada di Figma.
    Jangan nambahin hal2 yang enggak ada di Figma ya. Kalau nanti pas masuk proyek
    Dayen memang ada hal yang mau ditambahin, minta ijin dulu sama yang buat desainnya
    siapa, dari tim UI/UX.
  -->
  <DialogForm
    v-model:visible="visible"
    :buttons-template="['cancel', 'clear', 'submit']"
    :header="props.idEdit ? `Edit Asset : ${props.idEdit}` : 'Register Asset'"
    :id-edit="props.idEdit"
    @submit="submitBtn"
    show-stay-checkbox
    stay-checkbox-label="Stay on this form after submitting"
    width="medium"
  >
    <template #fields>
      <!-- TODO: Options harusnya didapetin dari API, bukan hardcode -->
      <!--
        TODO: use-validator cuma boleh antara ditambahin atau enggak,
        jangan pake kondisi
      -->
      <!--
        TODO: Kebanyakan input ini enggak perlu v-model. v-model cuma dipake kalau
        inputnya bakal ngeubah kondisi untuk input lain. Misalnya, kan dropdown
        brand belum aktif kalau grup belum dipilih. Berarti dropdown group
        perlu pake v-model. Atau kalau misalnya dropdown group bakal munculin suatu
        teks, baru pake v-model.
        
        Kalau enggak kayak gitu, jangan pake v-model. Misalnya brand jangan
        pake v-model.

        Kalau mau set initial value, bisa pake prop initialValue dari Dropdown.
      -->
      <div class="grid grid-cols-2 gap-3">
        <Dropdown
          v-model="group"
          :options="[
            { label: 'Room 402', value: 'Room 402' },
            { label: 'Wirehouse', value: 'Wirehouse' },
            { label: 'Garage', value: 'Garage' },
          ]"
          :use-validator="group ? false : true"
          field-name="Group"
          label="Group"
          mandatory
          option-label="label"
          option-value="value"
          placeholder="Select group"
        />
        <Dropdown
          v-model="category"
          :options="[
            { label: 'Elektronik', value: 'Elektronik' },
            { label: 'Transportasi', value: 'Transportasi' },
            { label: 'Sanitasi', value: 'Sanitasi' },
          ]"
          :use-validator="category ? false : true"
          field-name="category"
          label="Category"
          mandatory
          option-label="label"
          option-value="value"
          placeholder="Select category"
        />
        <Dropdown
          v-model="name"
          :options="[
            { label: 'name-1', value: 'name-1' },
            { label: 'name-2', value: 'name-2' },
            { label: 'name-3', value: 'name-3' },
          ]"
          :use-validator="name ? false : true"
          field-name="name"
          label="Name"
          mandatory
          option-label="label"
          option-value="value"
          placeholder="Select asset name"
        />
        <InputText
          v-model="aliasName"
          :validator-message="{
            exceed: 'Max char 30',
            empty: 'Category',
          }"
          field-name="aliasName"
          label="Alias Name"
          placeholder="Select alias name"
        />
        <Dropdown
          v-model="brand"
          :disabled="!group || !category || !name"
          :options="[
            { label: 'Samsung', value: 'Samsung' },
            { label: 'Hyundai', value: 'Hyundai' },
            { label: 'Apple', value: 'Apple' },
          ]"
          :use-validator="brand ? false : true"
          field-name="brand"
          label="Brand"
          mandatory
          option-label="label"
          option-value="value"
          placeholder="Select brand"
        />

        <Dropdown
          v-model="model"
          :disabled="!group || !category || !name"
          :options="[
            { label: 'MacBook Pro', value: 'MacBook Pro' },
            { label: 'Asus', value: 'Asus' },
            { label: 'Ultra 24', value: 'Ultra 24' },
          ]"
          :use-validator="model ? false : true"
          field-name="model"
          label="Model / Type"
          mandatory
          option-label="label"
          option-value="value"
          placeholder="Select model/type"
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
