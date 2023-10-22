<template>
    <ion-input label-placement="floating" placeholder="np. Warszawa" :value="address"
        @input="$emit('update:address', $event.target.value)">
        <div slot="label">Miejscowość</div>
    </ion-input>
    <ion-button class="ion-activatable" shape="round" size="small" fill="clear" @click="setCurrentAddress()">
        <ion-ripple-effect></ion-ripple-effect>
        <ion-icon :icon="locate" size="large" color="primary"></ion-icon>
    </ion-button>
</template>

<script setup lang="ts">
import { getCurrentLocation } from '@/api/api';
import { localizationToCity } from '@/api/utils';
import { IonInput, IonButton, IonIcon, IonRippleEffect } from '@ionic/vue';
import { locate } from 'ionicons/icons';
import { Ref, ref } from 'vue';

const address: Ref<string> = ref("")

const emit = defineEmits(['update:address'])

function setCurrentAddress() {
    getCurrentLocation()
        .then(value => {
            return localizationToCity(value)
        }).then(value => {
            address.value = value;
            emit('update:address', address.value)
        })
}

</script>


<style scoped></style>
