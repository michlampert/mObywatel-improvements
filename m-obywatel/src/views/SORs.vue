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
      <Map :zoom="zoom" :current-location=" { latitude: 50.2, longitude: 19 }" :locations="locations"/>
    </ion-content>
  </ion-page>

</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';

import Map from '@/components/Map.vue'

import { Localization } from "@/api/model"

let zoom = 13;

let locations = {
    latitude: 50.21093325,
    longitude: 19.000529771276238,
    name: 'test',
  }


</script>
