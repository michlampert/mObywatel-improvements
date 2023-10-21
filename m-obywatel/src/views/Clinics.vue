<template>
  <ion-page>
    <ion-header>
      <Toolbar>
        <template v-slot:name>
          Najbliższe terminy
        </template>
        <template v-slot:alert>
          <ion-icon :icon="notifications" size="large" style="margin-bottom: 0px"></ion-icon>
        </template>
      </Toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-list lines="none" class="padding-top">
        <ion-item>
          <ion-segment value="time">
            <ion-segment-button value="time">
              <ion-icon :icon="timerOutline"></ion-icon>
              Szybko
            </ion-segment-button>
            <ion-segment-button value="balance">
              <ion-icon :icon="optionsOutline"></ion-icon>
              Optymalnie
            </ion-segment-button>
            <ion-segment-button value="distance">
              <ion-icon :icon="analytics"></ion-icon>
              Blisko
            </ion-segment-button>
          </ion-segment>
        </ion-item>
        <ion-item>
          <ion-input label-placement="floating" placeholder="np. Ortopeda">
            <div slot="label">Usługa</div>
          </ion-input>
        </ion-item>
        <ion-item>
          <ion-input label-placement="floating" placeholder="np. Warszawa" v-model="address">
            <div slot="label">Miejscowość</div>
          </ion-input>
          <ion-button class="ion-activatable" shape="round" size="small" fill="clear" @click="setCurrentAddress()">
            <ion-ripple-effect></ion-ripple-effect>
            <ion-icon :icon="locate" size="large" color="primary"></ion-icon>
          </ion-button>
        </ion-item>
        <ion-item>
          <ion-button class="ion-activatable full-width" shape="round" size="small" expand="full" @click="search()">
            <ion-ripple-effect></ion-ripple-effect>
            <ion-text>
              <p>wyszukaj</p>
            </ion-text>
          </ion-button>
        </ion-item>
        <ion-item>
          <ion-segment value="list">
            <ion-segment-button value="list">
              <ion-icon :icon="list"></ion-icon>
              lista
            </ion-segment-button>
            <ion-segment-button value="map">
              <ion-icon :icon="map"></ion-icon>
              mapa
            </ion-segment-button>
          </ion-segment>
        </ion-item>
      </ion-list>

      <ion-list>
        <ion-item lines="none" v-for="clinic in clinics">
          <Place :date="clinic.date" :city="clinic.address.city" :distance="123" :name="clinic.name"
            :telephone="clinic.phone" :address="clinic.address.details" :webpage="clinic.webpage"
            :localization="{ latitude: 52.0, longitude: 24.0 }">
          </Place>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import Place from "@/components/Place.vue"
import Toolbar from '@/components/Toolbar.vue'
import { IonPage, IonHeader, IonContent } from '@ionic/vue';
import { analytics, list, locate, map, notifications, optionsOutline, pin, timerOutline } from 'ionicons/icons';

import { IonRippleEffect } from '@ionic/vue';
import { Ref, ref } from "vue";
import { Clinic } from "@/api/model"
import { getClinics, getCurrentLocation } from "@/api/api"
import { localizationToAddress } from "@/api/utils";

import { IonList, IonItem, IonSegment, IonSegmentButton, IonIcon, IonButton, IonText, IonInput } from "@ionic/vue";

const clinics: Ref<Clinic[]> = ref([])
const address: Ref<string> = ref("")

function search() {
  getClinics({ longitude: 52, latitude: 22 }, "ODDZIAŁ CHIRURGICZNY OGÓLNY", 10000000)
    .then(value => {
      clinics.value = value
    })
}

function setCurrentAddress() {
  console.log(address.value)
  getCurrentLocation()
    .then(value => {
      console.log(value)
      address.value = localizationToAddress(value)
    })
}

</script>

<style>
.full-width {
  width: 1000px !important;
}
</style>
