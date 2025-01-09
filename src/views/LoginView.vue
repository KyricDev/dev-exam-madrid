<script setup>
import InputText from "primevue/inputtext"
import Password from "primevue/password"
import Button from 'primevue/button'
import { useAuthStore } from '../stores/authentication'
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const username = ref('')
const password = ref('')
const errorText = ref('')
const router = useRouter()

function signIn(e) {
    e.preventDefault()

    const targetPassword = localStorage.getItem(username.value);

    if (targetPassword !== password.value) {
        errorText.value = "Incorrect Username and/or Password"
        return
    }

    router.push('/home')
    const authStore = useAuthStore()
    authStore.setUser(username.value)

    errorText.value = '';
    return
}

</script>
<template>
    <h1>Login</h1>
    <form @submit="signIn">
        <InputText v-model="username" placeholder="Username"></InputText>
        <Password v-model="password" placeholder="Password" toggleMask :feedback="false"></Password>
        <Button type="submit" label="Submit"></Button>
        <p class="error-text">{{ errorText }}</p>
    </form>
</template>