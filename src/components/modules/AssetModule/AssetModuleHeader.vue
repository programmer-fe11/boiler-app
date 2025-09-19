<script setup lang="ts">
import { shallowRef } from 'vue';
import { MenuItem } from '@fewangsit/wangsvue/menuitem';
import {
  Button,
  ButtonBulkAction,
  ButtonDownload,
  ButtonFilter,
  ButtonSearch,
} from '@fewangsit/wangsvue';
import { Member } from '@/types/member.type';
import DialogRegisterEditLayout from './DialogRegisterEditLayout.vue';

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

const dataSelected = shallowRef<Member[]>([]);
const showDeleteUserDialog = shallowRef<boolean>(false);
const showRegisterDialog = shallowRef<boolean>(false);
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

  <DialogRegisterEditLayout v-model:visible="showRegisterDialog" />
</template>
