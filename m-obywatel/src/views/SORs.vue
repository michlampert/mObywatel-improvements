<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>SOR</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 2</ion-title>
        </ion-toolbar>
      </ion-header>

      <ExploreContainer name="Tab 2 page" />
      <Map :zoom="zoom" :lat="50.21093325" :lon="19.000529771276238" :locations="locations"/>
    </ion-content>
  </ion-page>

</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';

import Map from '@/components/Map.vue'

let zoom = 13;

let locations = [{
  lat: 50.21093325,
  lon: 18.99,
  name: 'test',
}, {
  lat: 50.21093325,
  lon: 19.01,
  name: 'test2',
}]


</script>
