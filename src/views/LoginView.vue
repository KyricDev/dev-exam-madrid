<script setup>
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import { useAuthStore } from '../stores/authentication'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'

const username = ref('')
const password = ref('')
const errorText = ref('')
const router = useRouter()
const toast = useToast()

function signIn(e) {
  e.preventDefault()

  const targetPassword = localStorage.getItem(username.value)

  if (targetPassword !== password.value) {
    errorText.value = 'Incorrect Username and/or Password'
    return
  }

  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: 'Login Successful',
    life: 5000,
  })

  const authStore = useAuthStore()
  authStore.setUser(username.value)
  errorText.value = ''
  router.push('/home')
  return
}
</script>
<template>
  <form @submit="signIn">
    <h1>Login</h1>
    <label>Username</label>
    <InputText v-model="username" placeholder="Username"></InputText>
    <label>Password</label>
    <Password
      v-model="password"
      placeholder="Password"
      toggleMask
      :feedback="false"
      fluid
    ></Password>
    <Button type="submit" label="Submit"></Button>
    <p class="error-text">{{ errorText }}</p>
    <p>Don't have an account?<RouterLink to="/register">Register here</RouterLink></p>
  </form>
</template>
<style scoped>
form {
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 400px;
  justify-content: space-evenly;
}
.error-text {
  height: 25px;
  color: red;
}
</style>
