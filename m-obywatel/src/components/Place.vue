<template>
    <ion-card>
        <ion-card-header>
            <ion-card-title class="capitalize">{{ name?.toLowerCase() }}</ion-card-title>
            <ion-card-subtitle class="capitalize">
                <ion-icon :icon="map"></ion-icon>
                {{ city?.toLowerCase() }}, {{ distance }}km
            </ion-card-subtitle>
            <ion-card-subtitle v-if="date">
                <ion-icon :icon="calendarNumber"></ion-icon>
                {{ date }}
            </ion-card-subtitle>

        </ion-card-header>
        <ion-card-content>
            <ion-label v-if="telephone">
                <ion-icon :icon="call"></ion-icon>
                <a href="tel:{{ telephone }}">{{ " " }}{{ telephone }} </a>
            </ion-label>
            <ion-label class="capitalize">
                <ion-icon :icon="location"></ion-icon>
                <a v-if="!currentLocalization">{{ ` ${city}, ${address}`.toLowerCase() }}</a>
                <a v-if="currentLocalization" href="geo:{{localization?.longitude}},{{localization?.longitude}}" target="_blank">{{ ` ${city},
                                    ${address}`.toLowerCase() }}</a>
            </ion-label>
            <ion-label v-if="webpage">
                <ion-icon :icon="globe"></ion-icon>
                <a target="_blank" :href="webpage">{{ " " }}{{ webpage }}</a>
            </ion-label>
        </ion-card-content>
        <ion-accordion-group @ionChange="dispatchResize">
            <ion-accordion value="first">
                <ion-item slot="header" color="light">
                    <ion-label>pokaż na mapie</ion-label>
                </ion-item>
                <div slot="content">
                    <Map :currentLocation="currentLocalization" :otherLocations="locations"/>
                </div>
            </ion-accordion>
        </ion-accordion-group>
    </ion-card>
</template>

<script setup lang="ts">
import { calendarNumber, call, globe, location, map } from 'ionicons/icons';
import { PropType, capitalize, ref } from 'vue';
import Map from "./Map.vue";
import { Localization } from "@/api/model"

import { IonCard, IonCardContent, IonCardTitle, IonAccordion, IonLabel, IonIcon, IonAccordionGroup, IonCardSubtitle, IonCardHeader, IonItem } from '@ionic/vue';

const props = defineProps({
    date: Date,
    city: String,
    distance: Number,
    name: String,
    telephone: String,
    address: String,
    webpage: String,
    currentLocalization: Object as PropType<Localization>,
    locations: Array as PropType<Localization[]>,
})

function dispatchResize() {
    window.dispatchEvent(new Event('resize'))
}

</script>

<style scoped lang="scss">
ion-content {

    ion-card {
        display: flex;
        flex-direction: column;
        width: 100% !important;
        max-width: 100% !important;
        margin: 8px
    }

    ion-card-content {
        font-size: 0.75rem !important;
    }

    ion-card-title {
        font-size: 1.5rem;
    }

    .capitalize {
        text-transform: capitalize;
    }
}
</style>
