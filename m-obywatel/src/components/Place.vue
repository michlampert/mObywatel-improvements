<template>
    <ion-card>
        <ion-card-header>
            <ion-card-title>{{ name }}</ion-card-title>
            <ion-card-subtitle>
                <ion-icon :icon="map"></ion-icon>
                {{ city }}, {{ distance }}km
            </ion-card-subtitle>
            <ion-card-subtitle>
                <ion-icon :icon="calendarNumber"></ion-icon>
                {{ date }}
            </ion-card-subtitle>

        </ion-card-header>
        <ion-card-content>
            <ion-label>
                <ion-icon :icon="call"></ion-icon>
                <a>{{" "}}{{ telephone }} </a>
            </ion-label>
            <ion-label>
                <ion-icon :icon="location"></ion-icon>
                <a>{{" "}}{{ city }}, {{ address }}</a>
            </ion-label>
            <ion-label>
                <ion-icon :icon="globe"></ion-icon>
                <a target="_blank" :href="webpage">{{" "}}{{ webpage }}</a>
            </ion-label>
        </ion-card-content>
        <ion-accordion-group>
            <ion-accordion value="first">
                <ion-item slot="header" color="light">
                    <ion-label>pokaż na mapie</ion-label>
                </ion-item>
                <div slot="content">
                    <Map></Map>
                </div>
            </ion-accordion>
        </ion-accordion-group>
    </ion-card>
</template>

<script setup lang="ts">
import { calendarNumber, call, globe, location, map } from 'ionicons/icons';
import { ref } from 'vue';
import Map from "./Map.vue";

const props = defineProps({
    date: Date,
    city: String,
    distance: Number,
    name: String,
    telephone: String,
    address: String,
    webpage: String
})

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

    ion-card-subtitle {
        text-transform: capitalize;
    }
}
</style>