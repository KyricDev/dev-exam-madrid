<script setup>
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { useOTPStore } from '@/stores/otp'
import { ref } from 'vue';

const entry = ref('');
const errorText = ref('');

function verifyOTP(e) {
  const otpStore = useOTPStore()

  const currentOTP = otpStore.currentOTP[0];
  console.log(`${currentOTP} === ${entry.value}`);
  if (currentOTP.toString() === entry.value.toString()) {
    errorText.value = '';
    return;
  }

  errorText.value = 'Incorrect OTP. Please Try Again.'
}


</script>
<template>
    <Dialog
      modal
      header="Enter OTP"
      class="dialog"
      dismissable-mask
    >
      <InputText type="text" class="text-input" v-model="entry" /><Button label="Submit" @click="verifyOTP"/>
      <p class="error-text">{{ errorText }}</p>
    </Dialog>
</template>