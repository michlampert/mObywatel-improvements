<template>
    <div>
        <div ref="mapDiv" style="height:100vw; width:100vw">
            <l-map :zoom.sync="zoom * 0.75" :use-global-leaflet="false" :center="middle">
                <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base"
                    name="OpenStreetMap"></l-tile-layer>
                <l-circle-marker v-if="currentLocation" :lat-lng="[currentLocation.latitude, currentLocation.longitude]"
                    :color="currentLocationColor"></l-circle-marker>

                <l-marker v-for="location in otherPlaces" id="open-modal"
                    :lat-lng="[location.localization.latitude, location.localization.longitude]"
                    @click="openModal(location!); console.log(location)">
                </l-marker>
            </l-map>
        </div>
        <ion-modal :is-open="isOpen" :initial-breakpoint="1" :breakpoints="[0, 1]" @didDismiss="isOpen = false">
            <Place :showMap="false" :place="selectedPlace" :places="[]"></Place>
        </ion-modal>
    </div>
</template>

<script lang="ts" setup>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup, LCircleMarker } from "@vue-leaflet/vue-leaflet";

import { PropType, Ref, getCurrentInstance, onBeforeMount, onMounted, onUpdated, ref } from "vue";
import { IonModal } from "@ionic/vue";

import { Localization, PlacesCombined } from "@/api/model"
import Place from "./Place.vue";

const isOpen: Ref<boolean> = ref(false)
const selectedPlace: Ref<PlacesCombined | undefined> = ref(undefined)

function openModal(place: PlacesCombined) {
    isOpen.value = true
    selectedPlace.value = place
}

function linearFunction(x: number) {
    if(x < 0.01) {
        return 20;
    } else if (x < 0.05) {
        return 17;
    } else if (x < 0.1) {
        return 16;
    } else if (x < 0.5) {
        return 13;
    } else if (x < 1) {
        return 12;
    } else if (x < 5) {
        return 9;
    } else if (x < 10) {
        return 8;
    }
    return 6;
}

const props = defineProps({
    currentLocation: {
        type: Object as PropType<Localization>,
        default: () => ({
            latitude: 0,
            longitude: 0,
        }),
    },
    otherPlaces: Object as PropType<PlacesCombined[]>,
});

const minimalLatitude = Math.min(props.currentLocation.latitude, ...props.otherPlaces?.map(val => val.localization).map(location => location.latitude) ?? []);
const minimalLongitude = Math.min(props.currentLocation.longitude, ...props.otherPlaces?.map(val => val.localization).map(location => location.longitude) ?? []);
const maximalLatitude = Math.max(props.currentLocation.latitude, ...props.otherPlaces?.map(val => val.localization).map(location => location.latitude) ?? []);
const maximalLongitude = Math.max(props.currentLocation.longitude, ...props.otherPlaces?.map(val => val.localization).map(location => location.longitude) ?? []);
console.log(maximalLatitude, minimalLatitude, maximalLongitude, minimalLongitude)
let currentLocationColor = "red";
let zoom = linearFunction(Math.max(
    Math.abs(maximalLatitude - minimalLatitude),
    Math.abs(maximalLongitude - minimalLongitude))
);
const middle = [
    (maximalLatitude + minimalLatitude) / 2,
    (maximalLongitude + minimalLongitude) / 2
]
</script>

<style>
.block {
    width: 100%;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
}

ion-modal {
    --height: auto;
}
</style>
