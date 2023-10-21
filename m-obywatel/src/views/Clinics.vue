<template>
  <ion-page>
    <ion-header>
      <Toolbar>
        <template v-slot:name>
          Najbliższe terminy
        </template>
        <template v-slot:alert>
          <Alert :message="'Zwolnił się termin do lekarza'"></Alert>
        </template>
      </Toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-list lines="none" class="padding-top">
        <ion-item>
          <ion-segment :value="30">
            <ion-segment-button :value="1000">
              <ion-icon :icon="timerOutline"></ion-icon>
              Szybko
            </ion-segment-button>
            <ion-segment-button :value="30">
              <ion-icon :icon="optionsOutline"></ion-icon>
              Optymalnie
            </ion-segment-button>
            <ion-segment-button :value="10">
              <ion-icon :icon="analytics"></ion-icon>
              Blisko
            </ion-segment-button>
          </ion-segment>
        </ion-item>
        <ion-item>
          <ion-input label-placement="floating" placeholder="np. Ortopeda" v-model="treatment">
            <div slot="label">Usługa</div>
          </ion-input>
        </ion-item>
        <!-- <ion-item style="height: 1009px;">
          <Dropdown :options="treatments"></Dropdown>
        </ion-item> -->


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

      <div class="center">
        <ion-spinner v-if="loading" name="circular" size="large" color="medium"></ion-spinner>
      </div>

      <ion-list>
        <ion-item lines="none" v-for=" clinic  in  clinics ">
          <Place :date="clinic.date" :city="clinic.address.city" :distance="clinic.distance" :name="clinic.name"
            :telephone="clinic.phone" :address="clinic.address.details" :webpage="clinic.webpage"
            :current-localization="currentLocation" :localization="clinic.localization">
          </Place>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import Place from "@/components/Place.vue"
import Toolbar from '@/components/Toolbar.vue'
import { IonPage, IonHeader, IonContent, IonSpinner } from '@ionic/vue';
import { analytics, list, locate, map, notifications, optionsOutline, pin, timerOutline } from 'ionicons/icons';

import { IonRippleEffect } from '@ionic/vue';
import { Ref, onMounted, ref } from "vue";
import { Clinic } from "@/api/model"
import { getClinics, getCurrentLocation, getPossibleTreatments } from "@/api/api"
import { localizationToAddress } from "@/api/utils";
import Alert from "@/components/Alert.vue"

import { IonList, IonItem, IonSegment, IonSegmentButton, IonIcon, IonButton, IonText, IonInput, IonCard } from "@ionic/vue";

const clinics: Ref<Clinic[]> = ref([])
const address: Ref<string> = ref("")
const loading: Ref<boolean> = ref(false)
const treatment: Ref<string> = ref("")
const treatments: Ref<{ name: string, id: string }[]> = ref([])

const currentLocation = {
  latitude: 54.21093325,
  longitude: 22.000529771276238,
}

function search() {
  loading.value = true
  clinics.value = []
  getClinics(currentLocation, "ODDZIAŁ CHIRURGICZNY OGÓLNY", 100)
    .then(value => {
      loading.value = false
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

onMounted(() => {
  getPossibleTreatments()
    .then(val => treatments.value = val.map(val => ({ name: val, id: val })))
})

</script>

<style>
.full-width {
  width: 1000px !important;
}

ion-spinner {
  width: 4em;
  height: 4em;
}

.center {
  margin: 12px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.suggestions {}
</style>
