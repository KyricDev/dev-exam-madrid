<script setup>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const password = ref('')
const confirmPassword = ref('')
const username = ref('')
const router = useRouter()

const errorText = ref('')

async function setCredentials(e) {
  e.preventDefault()

  if (
    password.value.length === 0 ||
    confirmPassword.value.length === 0 ||
    username.value.length === 0
  ) {
    errorText.value = 'Missing Fields'
    return
  }

  if (password.value !== confirmPassword.value) {
    errorText.value = 'Passwords Do Not Match'
    return
  }

  const encoder = new TextEncoder()
  const hash = await crypto.subtle.digest('SHA-1', encoder.encode(password.value))
  const array = Array.from(new Uint8Array(hash))
  const hex = array.map((b) => b.toString(16).padStart(2, '0')).join('')
  const prefix = hex.substring(0, 5)

  const response = await axios.get(`https://api.pwnedpasswords.com/range/${prefix}`)
  const data = response.data
  const resultArray = data.split('\r')
  let pwnSum = 0
  for (const entry of resultArray) {
    const value = entry.split(':')[1]
    pwnSum += parseInt(value)

    if (pwnSum < 100000) continue
    break
  }

  if (pwnSum >= 100000) {
    errorText.value = 'Password Is Too Weak'
    return
  }

  const existingUser = localStorage.getItem(username.value)
  console.log(existingUser)
  if (existingUser !== null) {
    errorText.value = 'User Already Exists'
    return
  }

  localStorage.setItem(username.value, password.value)
  router.push('/login')

  errorText.value = ''
  return
}
</script>
<template>
  <h1>Set Credentials</h1>
  <form @submit="setCredentials">
    <label>Username</label>
    <InputText v-model="username" placeholder="Username"></InputText>
    <label>Password</label>
    <Password
      v-model="password"
      placeholder="Password"
      toggleMask
      :feedback="false"
      fluid=""
    ></Password>
    <label>Confirm Password</label>
    <Password
      v-model="confirmPassword"
      placeholder="Confirm Password"
      toggleMask
      :feedback="false"
      fluid
    ></Password>
    <p class="error-text">{{ errorText }}</p>
    <Button type="submit" label="Submit"></Button>
  </form>
</template>
