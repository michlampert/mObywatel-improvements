<template>
    <ion-icon @click="setOpen(true)" :icon="notifications" size="large" style="margin-bottom: 0px"
        :color="on ? 'primary' : 'dark'"></ion-icon>


    <ion-alert :is-open="isOpen" header="Alert" :sub-header="message" :buttons="['OK']"
        @didDismiss="setOpen(false)"></ion-alert>
</template>

<script setup lang="ts">
import { notifications } from 'ionicons/icons';
import { Ref, ref } from 'vue';
import { IonAlert, IonButton, IonIcon, IonRippleEffect } from '@ionic/vue';

const on: Ref<boolean> = ref(false)
const isOpen: Ref<boolean> = ref(false)

const props = defineProps({
    message: String
})

const setOpen = (state: boolean) => {
    if (state || on.value) {
        on.value = true
        setTimeout(() => {
            isOpen.value = state
            on.value = false
        }, 5000)
    } else {
        on.value = false
        isOpen.value = false
    }
};

</script>

<style scoped></style>