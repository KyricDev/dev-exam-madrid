<script setup>
import { ref } from 'vue'

const validPhoneNumber = ref(false)
const errorText = ref('')

function validatePhoneNumber(e) {
    let phoneNumber = e.target.value

    if (phoneNumber[0] === '+') {
        phoneNumber = phoneNumber.substring(1)

        if (phoneNumber.substring(0, 2) !== '63') {
            validPhoneNumber.value = false
            errorText.value = 'Must Start With \'09\' or \'+63\''
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
        errorText.value = 'Must Start With \'09\' or \'+63\''
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

</script>

<template>
    <div>
      <h1>Register</h1>
      <form>
        <input type="text" class="text-input" @input="validatePhoneNumber" />
        <input type="submit" value="Send OTP"  :disabled="!validPhoneNumber" />
      </form>
      <p class="error-text">
        {{ errorText }}
      </p>
    </div>
  </template>
  
  <style>

  .text-input {
    border-radius: 5px;
  }

  .error-text {
    color: red;
  }
  
  </style>