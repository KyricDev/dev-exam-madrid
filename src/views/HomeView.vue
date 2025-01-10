<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { ref } from 'vue';

const router = useRouter()
const toast = useToast()
const user = ref('')

onMounted(() => {
  if (sessionStorage.getItem('user') === null) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'User Is Not Logged In',
      life: 5000,
    })
    router.push('/')
    return
  }

  user.value = sessionStorage.getItem('user')
})
</script>

<template>
  <h1>Hello, {{ user }}</h1>
</template>
