import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('userAuth', () => {
  const currentUser = ref(null)
  function setUser(user) {
    currentUser.value = user
  }

  return { currentUser, setUser }
})
