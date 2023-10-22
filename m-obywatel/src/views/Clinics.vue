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
          <ion-segment :value="30" v-model="searchMode">
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


        <ion-item>
          <City v-model:address="address"></City>
        </ion-item>
        <ion-item>
          <SearchButton @click="search()" :required-fields="[address, treatment]"></SearchButton>
        </ion-item>
        <ion-item>
          <ViewModeButton v-model="viewMode"></ViewModeButton>
        </ion-item>
      </ion-list>

      <div class="center">
        <ion-spinner v-if="loading" name="circular" size="large" color="medium"></ion-spinner>
      </div>
      <!-- {{ viewMode }} -->
      <Transition name="list">
        <template v-if="viewMode == 'list'">
          <ion-list>
            <!-- {{ clinics }} -->
            <ion-item lines="none" v-for="clinic in clinics">
              <Place :currentLocation="currentLocation" :place="clinic" :places="[clinic]">
              </Place>
            </ion-item>
          </ion-list>
        </template>
      </Transition>
      <Transition name="map">
        <template v-if="viewMode == 'map'">
            <Map :current-location="currentLocation" v-bind:other-places="clinics.map(val => val as PlacesCombined)">
            </Map>
        </template>
      </Transition>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import Place from "@/components/Place.vue"
import Toolbar from '@/components/Toolbar.vue'
import { IonPage, IonHeader, IonContent, IonSpinner } from '@ionic/vue';
import { analytics, optionsOutline, timerOutline } from 'ionicons/icons';
import { Ref, onMounted, ref } from "vue";
import { Clinic, PlacesCombined } from "@/api/model"
import { getClinics, getCurrentLocation, getPossibleTreatments } from "@/api/api"
import Alert from "@/components/Alert.vue"
import City from "@/components/City.vue"
import SearchButton from "@/components/SearchButton.vue";

import { IonList, IonItem, IonSegment, IonSegmentButton, IonIcon, IonButton, IonText, IonInput, IonCard } from "@ionic/vue";
import ViewModeButton from "@/components/ViewModeButton.vue";
import Map from "@/components/Map.vue";

const clinics: Ref<Clinic[]> = ref([])
const address: Ref<string> = ref("")
const loading: Ref<boolean> = ref(false)
// const treatment: Ref<string> = ref("")
const treatment: Ref<string> = ref("ODDZIAŁ CHIRURGICZNY OGÓLNY")
const treatments: Ref<{ name: string, id: string }[]> = ref([])
const viewMode: Ref<"list" | "map"> = ref("list")
const searchMode: Ref<number> = ref(30)

const currentLocation = {
  latitude: 54.21093325,
  longitude: 22.000529771276238,
}

function search() {
  loading.value = true
  clinics.value = []
  getClinics(currentLocation, treatment.value, searchMode.value)
    .then(value => {
      loading.value = false
      clinics.value = value
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

.list-enter-active,
.list-leave-active {
  transition: transform 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  transform: translateX(-100%);
}


.map-enter-active,
.map-leave-active {
  transition: transform 0.5s ease;
}

.map-enter-from,
.map-leave-to {
  transform: translateX(100%);
}
</style>
