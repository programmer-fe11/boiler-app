<script setup lang="ts">
import { DialogForm, ImageCompressor, InputText } from '@fewangsit/wangsvue';
/*
 * TODO: Tolong jangan disable rule eslint, bukannya Senin kemarin udah aku kasitau?
 * Yang di bawah ini dihapus ya
 */

// eslint-disable-next-line vue/define-props-declaration
const model = defineModel<boolean>('visible', { required: true });
</script>

<template>
  <DialogForm
    v-model:visible="model"
    :buttons-template="['cancel', 'clear', 'submit']"
    header="Register Asset"
    show-stay-checkbox
    stay-checkbox-label="Stay on this form after submitting"
    width="medium"
  >
    <template #fields>
      <div class="grid grid-cols-2 gap-3">
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

      <ImageCompressor
        :custom-requirements="['Max. 1MB', 'Must be image format']"
        field-name="image"
        multiple
        use-validator
      />
    </template>
  </DialogForm>
</template>
