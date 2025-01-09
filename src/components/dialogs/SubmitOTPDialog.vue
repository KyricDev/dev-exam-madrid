<script setup>
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { useOTPStore } from '@/stores/otp'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const entry = ref('')
const errorText = ref('')
const router = useRouter()

function verifyOTP(e) {
  const otpStore = useOTPStore()

  const currentOTP = otpStore.currentOTP[0]
  if (currentOTP.toString() === entry.value.toString()) {
    errorText.value = ''
    router.push('/set-credential')
    return
  }


  errorText.value = 'Incorrect OTP. Please Try Again.'
}

</script>

<template>
  <Dialog modal header="Enter OTP" class="dialog" dismissable-mask @after-hide="errorText=''" >
    <InputText type="text" class="text-input" v-model="entry" />
    <div class="gap"></div>
    <Button label="Submit" @click="verifyOTP" fluid />
    <div class="gap"></div>
    <p class="error-text">{{ errorText }}</p>
  </Dialog>
</template>

<style scoped>
.error-text {
  height: 25px;
  color: red;
}
.gap {
  width: 10px;
  height: 10px;
}
</style>
