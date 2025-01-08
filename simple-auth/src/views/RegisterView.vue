<script setup>
import { ref } from 'vue'

const validPhoneNumber = ref(false)
function validatePhoneNumber(e) {
    console.log(e.target.value)
    validPhoneNumber.value = !validPhoneNumber.value
}

</script>

<template>
    <div>
      <h1>Register</h1>
      <form>
        <input type="text" class="text-input" @input="validatePhoneNumber" />
        <input type="submit" value="Send OTP"  :disabled="!validPhoneNumber" />
    </form>
    </div>
  </template>
  
  <style>

  .text-input {
    border-radius: 5px;
  }
  
  </style>