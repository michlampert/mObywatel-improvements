<template>
  <div ref="mapDiv" style="height:80vw; width:90vw">
    <l-map :zoom.sync="zoom" :use-global-leaflet="false" :center="middle">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"

      ></l-tile-layer>
        <l-circle-marker :lat-lng="[currentLocation.latitude, currentLocation.longitude]" :color="currentLocationColor"></l-circle-marker>

        <l-marker v-for="location in otherLocations" :lat-lng="[location.latitude, location.longitude]">
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

import { calculateDistanceKM } from "@/api/utils";

function linearFunction(x: number) {
  const x1 = 71; // x-coordinate of the first point
  const y1 = 8;  // y-coordinate of the first point
  const x2 = 162; // x-coordinate of the second point
  const y2 = 7;  // y-coordinate of the second point

  // Calculate the slope (m) using the formula: m = (y2 - y1) / (x2 - x1)
  const slope = (y2 - y1) / (x2 - x1);

  // Calculate the y-intercept (b) using the formula: b = y - mx
  const intercept = y1 - slope * x1;

  // Calculate the y value using the linear function equation: y = mx + b
  const y = slope * x + intercept;

  return y;
}

const props = defineProps({
    currentLocation: {
        type: Object as PropType<Localization>,
        default: () => ({
            latitude: 0,
            longitude: 0,
        }),
    },
    otherLocations: {
        type: Array as PropType<Localization[]>,
        default: () => (
            {
                latitude: 0,
                longitude: 0,
                name: ''
            }
        ),
    },
});

const minimalLatitude = Math.min(props.currentLocation.latitude, ...props.otherLocations.map(location => location.latitude));
const minimalLongitude = Math.min(props.currentLocation.longitude, ...props.otherLocations.map(location => location.longitude));
const maximalLatitude = Math.max(props.currentLocation.latitude, ...props.otherLocations.map(location => location.latitude));
const maximalLongitude = Math.max(props.currentLocation.longitude, ...props.otherLocations.map(location => location.longitude));

let currentLocationColor = "red";

const zoom = linearFunction(calculateDistanceKM(
    {latitude: maximalLatitude, longitude: maximalLongitude},
    {latitude: minimalLatitude, longitude: minimalLongitude}
));
const middle = [
    (maximalLatitude + minimalLatitude) / 2,
    (maximalLongitude + minimalLongitude) / 2
]

</script>

<style>
</style>
