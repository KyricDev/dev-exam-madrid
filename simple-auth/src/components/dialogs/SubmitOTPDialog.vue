<script setup>
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'



</script>
<template>
    <Dialog
      modal
      header="Enter OTP"
      class="dialog"
      dismissable-mask
    >
      <InputText type="text" class="text-input" /><Button label="Submit" />
    </Dialog>
</template>