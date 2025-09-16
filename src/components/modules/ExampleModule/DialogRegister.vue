<script setup lang="ts">
import { ImageCompressor, InputText } from '@fewangsit/wangsvue';
</script>

<template>
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
