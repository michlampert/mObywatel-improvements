<template>
  <ion-page>
    <ion-header>
      <Toolbar>
        <template v-slot:name>
          Szpitalne oddziały ratunkowe
        </template>
      </Toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <Map :zoom="zoom" :current-location=" { latitude: 50.2, longitude: 19 }" :other-locations="locations"/>
    </ion-content>
  </ion-page>

</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonContent } from '@ionic/vue';

import Map from '@/components/Map.vue'

import Toolbar from '@/components/Toolbar.vue';

let zoom = 7;

const locations = [{
    latitude: 51.21093325,
    longitude: 18.000529771276238,
    name: 'test',
  }, {
    latitude: 52.21093325,
    longitude: 17.000529771276238,
    name: 'test',
  }];
console.log(locations)


</script>
