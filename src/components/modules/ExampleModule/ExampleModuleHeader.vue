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
import DialogRegister from './DialogRegister.vue';

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
  <DialogForm
    v-model:visible="showRegisterDialog"
    :buttons-template="['cancel', 'clear', 'submit']"
    header="Register Asset"
    show-stay-checkbox
    stay-checkbox-label="Stay on this form after submitting"
    width="medium"
  >
    <template #fields>
      <DialogRegister />
    </template>
  </DialogForm>
</template>
