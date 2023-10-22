<template>
  <ion-page>
    <ion-header>
      <Toolbar>
        <template v-slot:name>
          Defibrylatory
        </template>
      </Toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-list lines="none" class="padding-top">
        <ion-item>
          <City v-model:address="address"></City>
        </ion-item>
        <ion-item>
          <SearchButton @click="search()" :required-fields="[address]"></SearchButton>
        </ion-item>

      </ion-list>

      <PlacesPresentation v-model:current-location="currentLocation" v-model:places="places">
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
import { Ref, ref } from "vue";
import { Localization, Place } from "@/api/model"
import { getAEDs } from "@/api/api"
import City from "@/components/City.vue"
import SearchButton from "@/components/SearchButton.vue";

import { IonList, IonItem, IonSegment, IonSegmentButton, IonIcon, IonInput } from "@ionic/vue";
import PlacesPresentation from "@/components/PlacesPresentation.vue";
import { cityToLocalization } from '@/api/utils';

const places: Ref<Place[]> = ref([])
const address: Ref<string> = ref("")
const loading: Ref<boolean> = ref(false)
const searchMode: Ref<number> = ref(30)


const currentLocation: Ref<Localization | undefined> = ref(undefined)

function search() {
  loading.value = true
  places.value = []

  cityToLocalization(address.value)
    .then(val => {
      currentLocation.value = val
    }).then(() => {
      getAEDs(currentLocation.value!, searchMode.value)
        .then(value => {
          loading.value = false
          places.value = value
        })
    });
}

</script>
