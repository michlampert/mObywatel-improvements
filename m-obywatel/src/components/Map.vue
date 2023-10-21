<template>
  <div ref="mapDiv" style="height:80vw; width:90vw">
    <l-map ref="map" :zoom="zoom" :center="[currentLocation.latitude, currentLocation.longitude]" :use-global-leaflet="false">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"

      ></l-tile-layer>
        <l-circle-marker :lat-lng="[currentLocation.latitude, currentLocation.longitude]" :color="currentLocationColor"></l-circle-marker>

        <l-marker :lat-lng="[locations.latitude, locations.longitude]">
            <l-popup>
                <p>{{ location.name }}</p>
            </l-popup>
        </l-marker>
    </l-map>
  </div>
</template>

<script lang="ts" setup>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup, LCircleMarker } from "@vue-leaflet/vue-leaflet";

import { PropType } from "vue";

import { Localization } from "@/api/model"

let currentLocationColor = "red";

const props = defineProps({
    zoom: {
        type: Number,
        default: '1',
    },
    currentLocation: {
        type: Object as PropType<Localization>,
        default: () => ({
            latitude: 0,
            longitude: 0,
        }),
    },
    locations: {
        type: Object,
        default: () => (
            {
                latitude: 0,
                longitude: 0,
                name: ''
            }
        ),
    },
});
</script>

<style>
</style>
