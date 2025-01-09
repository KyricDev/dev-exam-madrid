<script setup>
import { useAuthStore } from '@/stores/authentication';
</script>

<template>
  <h1>Hello, {{ useAuthStore().currentUser }}</h1>
</template>
