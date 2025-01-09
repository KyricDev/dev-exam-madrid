<script setup>
import { ref } from 'vue'
import axios from 'axios'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import SubmitOTPDialog from '../components/dialogs/SubmitOTPDialog.vue'
import { useOTPStore } from '@/stores/otp'

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

    if (phoneNumber.length !== 12) {
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

  dialogVisibility.value = true
  let response = await axios.get(
    // 'http://localhost:8080/api/test',
    // 'https://www.randomnumberapi.com/api/v1.0/randomnumber?min=100000&max=999999',
    // 'https://www.randomnumberapi.com/api/v1.0/random?min=100000&max=999999',

    'https://manga-app-snowy.vercel.app/api/randomnumbergen',
    // 'https://www.random.org/integers/?num=1&min=100000&max=999999&col=1&base=10&format=plain&rnd=new',
    {
      headers: {
        'Content-Type': 'application/json',
      },
      // mode: 'no-cors',
    },
  )
  // let response = await fetch("https://www.randomnumberapi.com/api/v1.0/random?min=100000&max=999999")
  const otp = response.data
  const otpStore = useOTPStore()
  otpStore.setOTP(otp)
}
</script>

<template>
  <h1>Register</h1>
  <form @submit="sendOTP">
    <label>Phone Number</label>
    <InputText placeholder="Phone Number" type="text" class="text-input" @input="validatePhoneNumber" />
    <Button type="submit" label="Send OTP" :disabled="!validPhoneNumber" @click="sendOTP" />
  </form>
  <p class="error-text">
    {{ errorText }}
  </p>
  <p>
    Already have an account?<RouterLink to="/login">Login here</RouterLink>
  </p>
  <SubmitOTPDialog v-model:visible="dialogVisibility"></SubmitOTPDialog>
</template>

<style scoped>
.text-input {
  border-radius: 5px;
}

.error-text {
  height: 25px;
  color: red;
}

form {
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 180px;
  justify-content: space-evenly;
}
</style>
