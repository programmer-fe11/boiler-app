<script setup lang="ts">
import logo from '@/assets/img/Logo-Wangsit.png';
import { LoginBody } from '@/components/dto/login.dto';
import {
  Button,
  DialogForm,
  Form,
  InputEmail,
  InputPassword,
} from '@fewangsit/wangsvue/';
import { DialogFormPayload } from '@fewangsit/wangsvue/dialogform';
import { FormPayload } from '@fewangsit/wangsvue/form';
import { shallowRef, useTemplateRef } from 'vue';

const inputEmail = shallowRef<string>();
const inputPassword = shallowRef<string>();

const submitLogin = (body: FormPayload<LoginBody>): void => {
  const resp = {
    email: inputEmail.value,
    password: inputPassword.value,
  };
  inputEmail.value = undefined;
  inputPassword.value = undefined;
};

// Should delete
const dialogFormRef = useTemplateRef<DialogForm>('dialogFormRef');
const visible = shallowRef<boolean>(false);
const visibleForm = (): void => {
  visible.value = true;
};
const submitDialog = (body: DialogFormPayload<LoginBody>): void => {
  console.log(body.formValues.email);
};
</script>

<template>
  <div
    class="flex flex-col items-center min-w-[468px] h-[591px] gap-7 bg-white px-6 py-8 rounded-[20px]"
  >
    <img :src="logo" alt="logo wangsit" class="w-[204.38px] h-[70px]" />
    <h1 class="flex justify-center">
      <span class="font-medium text-xl">Login</span>
    </h1>
    <!-- should delete soon -->
    <Button @click="visibleForm" label="Test" />
    <DialogForm
      ref="dialogFormRef"
      v-model:visible="visible"
      :buttons-template="['cancel', 'clear', 'submit']"
      :close-on-submit="false"
      @submit="submitDialog"
      header="Test"
      stay-checkbox-label="Stay on this form after submitting"
      width="medium"
    >
      <template #fields>
        <InputEmail field-name="email" label="Email" mandatory />
        <InputPassword field-name="password" label="Password" mandatory />
      </template>
    </DialogForm>
    <Form
      :buttons-template="['submit']"
      @submit="submitLogin"
      class="w-full gap-96"
      hide-stay-checkbox
      submit-btn-label="Login"
      submit-btn-severity="secondary"
    >
      <template #fields>
        <InputEmail
          v-model="inputEmail"
          field-name="email"
          height="42px"
          label="Email"
          mandatory
          placeholder="Enter your email"
        />
        <InputPassword
          v-model="inputPassword"
          field-name="password"
          label="Password"
          mandatory
          placeholder="Enter your password"
        />

        <!-- Todo: should be remove button -->
        <!--
 <Button
            @click="submitLogin"
            class="!w-full"
            label="Login"
            severity="secondary"
          /> 
-->
      </template>
    </Form>
  </div>
</template>
