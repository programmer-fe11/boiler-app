<!-- eslint-disable vue/html-self-closing -->
<!-- eslint-disable vue/html-self-closing -->
<script setup lang="ts">
import { shallowRef } from 'vue';
import { MenuItem } from '@fewangsit/wangsvue/menuitem';
import {
  Button,
  ButtonBulkAction,
  ButtonDownload,
  ButtonFilter,
  ButtonSearch,
  DialogForm,
} from '@fewangsit/wangsvue';
import { Member } from '@/types/member.type';
import DialogDeleteUser from './DialogDeleteUser/DialogDeleteUser.vue';

const dataSelected = shallowRef<Member[]>([]);
const showDeleteUserDialog = shallowRef<boolean>(false);

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
 * Referensi: Coding Style Guide 6.3.3
 * TODO: shallowRef harus dikelompokin sama shallowRef lain
 * Referensi: Coding Style Guide 5.1.2
 */
const showRegisterDialog = shallowRef(false);
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
      class="bg-[#262627]"
      label="+ Register"
      severity="secondary"
    />
  </div>

  <DialogDeleteUser
    v-model:visible="showDeleteUserDialog"
    :list="dataSelected"
    list-label="name"
  />
  <DialogForm
    v-model:visible="showRegisterDialog"
    :buttons-template="['cancel', 'clear', 'submit']"
    header="Register new user"
    width="medium"
  />
</template>
