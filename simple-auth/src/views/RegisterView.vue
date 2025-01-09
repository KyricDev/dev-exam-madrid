<script setup>
import { ref } from 'vue'
import api from '../api/Api.vue'
import axios from 'axios'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import SubmitOTPDialog from '../components/dialogs/SubmitOTPDialog.vue'

const validPhoneNumber = ref(false)
const dialogVisibility = ref(false)
const errorText = ref('')

function validatePhoneNumber(e) {
  let phoneNumber = e.target.value

  if (phoneNumber.length == 0) {
    validPhoneNumber.value = false
    errorText.value = ''
    return
  }

  if (phoneNumber[0] === '+') {
    phoneNumber = phoneNumber.substring(1)

    if (phoneNumber.substring(0, 2) !== '63') {
      validPhoneNumber.value = false
      errorText.value = "Must Start With '09' or '+63'"
      return
    }

    if (phoneNumber.length !== 13) {
      validPhoneNumber.value = false
      errorText.value = 'Invalid Phone Number Length'
      return
    }

    if (!/^\d+$/.test(phoneNumber)) {
      validPhoneNumber.value = false
      errorText.value = `Must Only Contain Numbers`
      return
    }

    validPhoneNumber.value = true
    errorText.value = ''
    return
  }

  if (phoneNumber.substring(0, 2) !== '09') {
    validPhoneNumber.value = false
    errorText.value = "Must Start With '09' or '+63'"
    return
  }

  if (phoneNumber.length !== 11) {
    validPhoneNumber.value = false
    errorText.value = 'Invalid Phone Number Length'
    return
  }

  if (!/^\d+$/.test(phoneNumber)) {
    validPhoneNumber.value = false
    errorText.value = `Must Only Contain Numbers`
    return
  }

  validPhoneNumber.value = true
  errorText.value = ''
  return
}

async function sendOTP(e) {
  e.preventDefault()
  // api.get('/test')

  dialogVisibility.value = true;
  let response = await axios.get(
    // 'http://localhost:8080/api/test',
    'https://www.randomnumberapi.com/api/v1.0/random?min=100000&max=999999',
    // 'https://www.randomnumberapi.com/api/v1.0/random?min=100000&max=999999',
    {
      // headers: {
      // 	'Content-Type': 'application/json',
      // },
      mode: 'no-cors',
    },
  )
  // let response = await fetch("https://www.randomnumberapi.com/api/v1.0/random?min=100000&max=999999")
  console.log(response.data[0])
}
</script>

<template>
  <div>
    <h1>Register</h1>
    <form @submit="sendOTP">
      <InputText type="text" class="text-input" @input="validatePhoneNumber" />
      <Button
        type="submit"
        label="Send OTP"
        :disabled="!validPhoneNumber"
        @click="sendOTP"
      />
    </form>
    <p class="error-text">
      {{ errorText }}
    </p>
    <SubmitOTPDialog v-model:visible="dialogVisibility"></SubmitOTPDialog>
  </div>
</template>

<style>
.text-input {
  border-radius: 5px;
}

.error-text {
  height: 25px;
  color: red;
}
</style>
