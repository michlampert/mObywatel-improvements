<template>
    <ion-button class="ion-activatable full-width" shape="round" size="small" expand="full" @click="emit('click')"
        :color="enabled() ? 'primary' : 'medium'" :disabled="!enabled()">
        <ion-ripple-effect></ion-ripple-effect>
        <ion-text>
            <p>wyszukaj</p>
        </ion-text>
    </ion-button>
</template>
<script setup lang="ts">
import { PropType } from 'vue';
import { IonButton, IonRippleEffect, IonText } from '@ionic/vue';


const props = defineProps({
    requiredFields: {
        type: Object as PropType<string[]>,
        default: []
    }
})

const emit = defineEmits(['click'])

function enabled(): boolean {
    return props.requiredFields?.map(val => val.length > 0).reduce((a, b) => a && b, true) ?? false
}

</script>

<style scoped>
.full-width {
  width: 1000px !important;
}
</style>