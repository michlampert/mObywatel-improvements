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
          <ion-segment :value="50" v-model="searchMode">
            <ion-segment-button :value="1000">
              <ion-icon :icon="timerOutline"></ion-icon>
              Szybko
            </ion-segment-button>
            <ion-segment-button :value="50">
              <ion-icon :icon="optionsOutline"></ion-icon>
              Optymalnie
            </ion-segment-button>
            <ion-segment-button :value="30">
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

      </ion-list>

      <PlacesPresentation v-model:current-location="currentLocation" v-model:places="clinics">
        <template v-slot:spinner>
          <div class="center">
            <ion-spinner v-if="loading" name="circular" size="large" color="medium"></ion-spinner>
          </div>
        </template>
      </PlacesPresentation>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import Toolbar from '@/components/Toolbar.vue'
import { IonPage, IonHeader, IonContent, IonSpinner } from '@ionic/vue';
import { analytics, optionsOutline, timerOutline } from 'ionicons/icons';
import { Ref, onMounted, ref } from "vue";
import { Clinic, Localization } from "@/api/model"
import { getClinics, getPossibleTreatments } from "@/api/api"
import Alert from "@/components/Alert.vue"
import City from "@/components/City.vue"
import SearchButton from "@/components/SearchButton.vue";

import { IonList, IonItem, IonSegment, IonSegmentButton, IonIcon, IonInput } from "@ionic/vue";
import PlacesPresentation from "@/components/PlacesPresentation.vue";
import { cityToLocalization } from '@/api/utils';


const clinics: Ref<Clinic[]> = ref([])
const address: Ref<string> = ref("")
const loading: Ref<boolean> = ref(false)
// const treatment: Ref<string> = ref("")
const treatment: Ref<string> = ref("ODDZIAŁ CHIRURGICZNY OGÓLNY")
const treatments: Ref<{ name: string, id: string }[]> = ref([])
const searchMode: Ref<number> = ref(30)

const currentLocation: Ref<Localization | undefined> = ref(undefined)

async function search() {
  loading.value = true
  clinics.value = []
  cityToLocalization(address.value)
    .then(val => {
      currentLocation.value = val
    }).then(() => {
      return getClinics(currentLocation.value!, treatment.value, searchMode.value)
    }).then(value => {
      loading.value = false
      clinics.value = value
    });
}

onMounted(() => {
  getPossibleTreatments()
    .then(val => treatments.value = val.map(val => ({ name: val, id: val })))
})

</script>

<style>


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
</style>
