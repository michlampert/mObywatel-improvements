<template>
  <div style="height:600px; width:800px">
    <l-map ref="map" :zoom="zoom" :center="[lat, lon]" :use-global-leaflet="false">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"

      ></l-tile-layer>
        <l-circle-marker :lat-lng="[lat, lon]" :color="currentLocationColor"></l-circle-marker>

        <l-marker v-for="location in locations" :lat-lng="[location.lat, location.lon]">
            <l-popup>
                <p>{{ location.name }}</p>
            </l-popup>
        </l-marker>
    </l-map>
    {{ zoom }}
  </div>
</template>

<script lang="ts" setup>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup, LCircleMarker } from "@vue-leaflet/vue-leaflet";

let currentLocationColor = "red";

const props = defineProps({
    zoom: {
        type: Number,
        default: '1',
    },
    lat: {
        type: Number,
    },
    lon: {
        type: Number,
    },
    locations: {
        type: Object,
    },
});
</script>

<style>
</style>
