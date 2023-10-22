<template>
    <ion-card class="card-content">
        <ion-card-header>
            <ion-card-title class="capitalize">{{ place?.name?.toLowerCase() }}</ion-card-title>
            <ion-card-subtitle class="capitalize">
                <ion-icon :icon="map"></ion-icon>
                {{ place?.address.city?.toLowerCase() }}, {{ Math.round(place?.distance ?? 0) }}km
            </ion-card-subtitle>
            <ion-card-subtitle v-if="place?.date">
                <ion-icon :icon="calendarNumber"></ion-icon>
                {{ place?.date }}
            </ion-card-subtitle>

        </ion-card-header>
        <ion-card-content>
            <ion-label v-if="place?.phone">
                <ion-icon :icon="call"></ion-icon>
                <a href="tel:{{ place?.phone }}">{{ " " }}{{ place?.phone }} </a>
            </ion-label>
            <ion-label class="capitalize">
                <ion-icon :icon="location"></ion-icon>
                <a v-if="!place?.localization">{{ ` ${place?.address.city}, ${place?.address.details}`.toLowerCase() }}</a>
                <a v-if="place?.localization" href="geo:{{localization?.longitude}},{{localization?.longitude}}"
                    target="_blank">{{ ` ${place?.address.city},
                                        ${place?.address.details}`.toLowerCase() }}</a>
            </ion-label>
            <ion-label v-if="place?.webpage">
                <ion-icon :icon="globe"></ion-icon>
                <a target="_blank" :href="place?.webpage">{{ " " }}{{ place?.webpage }}</a>
            </ion-label>
        </ion-card-content>
        <ion-accordion-group @ionChange="dispatchResize" v-if="showMap">
            <ion-accordion value="first">
                <ion-item slot="header" color="light">
                    <ion-label>pokaż na mapie</ion-label>
                </ion-item>
                <div slot="content">
                    <Map :currentLocation="currentLocation" v-bind:other-places="places"></Map>
                </div>
            </ion-accordion>
        </ion-accordion-group>
    </ion-card>
</template>

<script setup lang="ts">
import { calendarNumber, call, globe, location, map } from 'ionicons/icons';
import { PropType, capitalize, ref } from 'vue';
import Map from "./Map.vue";
import { Localization, PlacesCombined } from "@/api/model"

import { IonCard, IonCardContent, IonCardTitle, IonAccordion, IonLabel, IonIcon, IonAccordionGroup, IonCardSubtitle, IonCardHeader, IonItem } from '@ionic/vue';

const props = defineProps({
    place: Object as PropType<PlacesCombined>,
    places: Object as PropType<PlacesCombined[]>,
    currentLocation: Object as PropType<Localization>,
    showMap: {
        type: Boolean,
        default: true
    }
})

function dispatchResize() {
    window.dispatchEvent(new Event('resize'))
}

</script>

<style lang="scss">
.card-content {


    // display: flex !important;
    // flex-direction: column !important;
    width: 100% !important;
    max-width: 100% !important;

    margin: 8px;

    ion-card-content {
        display: flex !important;
        flex-direction: column !important;
        font-size: 0.75rem !important;
    }

    ion-card-header > ion-card-title {
        font-size: 1.5rem !important;
    }

}

.capitalize {
    text-transform: capitalize !important;
}
</style>
