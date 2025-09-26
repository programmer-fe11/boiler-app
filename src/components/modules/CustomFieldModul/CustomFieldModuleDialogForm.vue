<script setup lang="ts">
import { DialogForm, Dropdown, InputText } from '@fewangsit/wangsvue';
import { ref, useTemplateRef } from 'vue';

const visible = defineModel<boolean>('visible', { required: true });
const dialogFormRef = useTemplateRef<DialogForm>('DialogForm');
// TODO: Ini harusnya pake shallowRef
const dataType = ref<string>();
</script>

<template>
  <DialogForm
    ref="dialogFormRef"
    v-model:visible="visible"
    :buttons-template="['cancel', 'clear', 'submit']"
    header="Create Custom Field"
    show-stay-checkbox
    stay-checkbox-label="Stay on this form after submitting"
  >
    <template #fields>
      <div class="flex flex-col gap-4">
        <InputText
          label="Field Name"
          mandatory
          placeholder="Enter field name"
        />

        <Dropdown
          v-model="dataType"
          :options="[
            { label: 'test-1', value: 'test-1' },
            { label: 'test-2', value: 'test-2' },
            { label: 'test-3', value: 'test-3' },
          ]"
          field-info="test"
          field-name="datatype"
          label="Data Type"
          mandatory
          option-label="label"
          option-value="value"
        />
        <Dropdown
          :class="`${!dataType ? 'hidden' : 'block'}`"
          :options="[
            { label: 'test-1', value: 'test-1' },
            { label: 'test-2', value: 'test-2' },
            { label: 'test-3', value: 'test-3' },
          ]"
          field-info="test"
          field-name="itemName"
          label="Item Name"
          option-label="label"
          option-value="value"
        />
      </div>
    </template>
  </DialogForm>
</template>
