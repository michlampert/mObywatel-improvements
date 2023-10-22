<template>
    <ion-segment @ion-change="emit('update', value)">
        <ion-segment-button value="list">
            <ion-icon :icon="list"></ion-icon>
            lista
        </ion-segment-button>
        <ion-segment-button value="map">
            <ion-icon :icon="map"></ion-icon>
            mapa
        </ion-segment-button>
    </ion-segment>
</template>

<script setup lang="ts">
import { list, map } from 'ionicons/icons';
import { IonSegment, IonSegmentButton, IonIcon } from '@ionic/vue';
import { Ref, ref } from 'vue';

const value: Ref<"list"|"map"> = ref("list")

const emit = defineEmits(['update'])


</script>

<style lang="scss" scoped></style>