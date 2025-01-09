import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useOTPStore = defineStore('otp', () => {
  const currentOTP = ref(null)
  function setOTP(newOTP) {
    currentOTP.value = newOTP
  }

  return { currentOTP, setOTP }
})
