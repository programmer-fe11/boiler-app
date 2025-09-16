<script setup lang="ts">
import { shallowRef } from 'vue';
import { MenuItem } from '@fewangsit/wangsvue/menuitem';
import {
  Button,
  ButtonBulkAction,
  ButtonDownload,
  ButtonFilter,
  ButtonSearch,
  Checkbox,
  DialogForm,
  ImageCompressor,
  InputText,
} from '@fewangsit/wangsvue';
import { Member } from '@/types/member.type';
import DialogDeleteUser from './DialogDeleteUser/DialogDeleteUser.vue';

const dataSelected = shallowRef<Member[]>([]);
const showDeleteUserDialog = shallowRef<boolean>(false);
const showRegisterDialog = shallowRef<boolean>(false);
const bulkAction: MenuItem[] = [
  {
    label: 'Delete User',
    icon: 'checkbox-blank-circle',
    danger: true,
    command: (): void => {
      showDeleteUserDialog.value = true;
    },
  },
];

/*
 * TODO: shallowRef harus ada tipenya
 * Referensi: Coding Style Guide 6.3.3 (done)
 * TODO: shallowRef harus dikelompokin sama shallowRef lain
 * Referensi: Coding Style Guide 5.1.2 (done)
 */
</script>

<template>
  <div class="flex justify-end gap-4" data-wv-section="tabletoolbars">
    <ButtonBulkAction
      v-model:selected-data="dataSelected"
      :options="bulkAction"
      table-name="user-list"
    />
    <ButtonSearch class="ml-auto" table-name="user-list" />
    <ButtonDownload file-name="Download" table-name="user-list" />
    <ButtonFilter table-name="user-list" />
    <Button
      @click="showRegisterDialog = !showRegisterDialog"
      class="bg-grayscale-900"
      label="+ Register"
      severity="secondary"
    />
  </div>

  <DialogDeleteUser
    v-model:visible="showDeleteUserDialog"
    :list="dataSelected"
    list-label="name"
  />
  <!--
    TODO: Coba pake grid dari tailwind, biar enggak pake banyak div.
    https://v3.tailwindcss.com/docs/grid-template-columns
    <div class="w-full"> yang ngebungkus input juga dihapus aja.
  -->
  <DialogForm
    v-model:visible="showRegisterDialog"
    :buttons-template="['cancel', 'clear', 'submit']"
    header="Register Asset"
    width="medium"
  >
    <template #fields>
      <div class="flex flex-col gap-3">
        <div class="flex gap-3">
          <div class="w-full">
            <InputText
              :validator-message="{
                exceed: 'Max char 30',
                empty: 'Should not empty',
              }"
              label="Group"
              mandatory
              placeholder="Select group"
              use-validator
            />
          </div>
          <div class="w-full">
            <InputText
              :validator-message="{
                exceed: 'Max char 30',
                empty: 'Should not empty',
              }"
              label="Category"
              mandatory
              placeholder="Select Category"
              use-validator
            />
          </div>
        </div>
        <div class="flex gap-3">
          <div class="w-full">
            <InputText
              :validator-message="{
                exceed: 'Max char 30',
                empty: 'Should not empty',
              }"
              label="Name"
              mandatory
              placeholder="Select asset name"
              use-validator
            />
          </div>
          <div class="w-full">
            <InputText
              :validator-message="{
                exceed: 'Max char 30',
                empty: 'Should not empty',
              }"
              label="Alias Name"
              mandatory
              placeholder="Enter alias name"
              use-validator
            />
          </div>
        </div>
        <div class="flex gap-3">
          <div class="w-full">
            <InputText
              :validator-message="{
                exceed: 'Max char 30',
                empty: 'Should not empty',
              }"
              label="Brand"
              mandatory
              placeholder="Select brand"
              use-validator
            />
          </div>
          <div class="w-full">
            <InputText
              :validator-message="{
                exceed: 'Max char 30',
                empty: 'Model/Type',
              }"
              label="Group"
              mandatory
              placeholder="Select model/type"
              use-validator
            />
          </div>
        </div>
        <div class="">
          <ImageCompressor
            :custom-requirements="['Max. 1MB', 'Must be image format']"
            field-name="image"
            multiple
            use-validator
          />
        </div>
        <!-- TODO: Checkbox ini udah ada di props DialogForm, coba cari disitu -->
        <div class="flex justify-end">
          <Checkbox label="Stay on this form after submitting" within-table />
        </div>
      </div>
    </template>
  </DialogForm>
</template>
