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

      <div class="center">
        <ion-spinner v-if="loading" name="circular" size="large" color="medium"></ion-spinner>
      </div>

      <PlacesPresentation v-model:current-location="currentLocation" v-model:places="places"></PlacesPresentation>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import Toolbar from '@/components/Toolbar.vue'
import { IonPage, IonHeader, IonContent, IonSpinner } from '@ionic/vue';
import { Ref, ref } from "vue";
import { Place } from "@/api/model"
import { getAEDs } from "@/api/api"
import City from "@/components/City.vue"
import SearchButton from "@/components/SearchButton.vue";

import { IonList, IonItem, IonSegment, IonSegmentButton, IonIcon, IonInput } from "@ionic/vue";
import PlacesPresentation from "@/components/PlacesPresentation.vue";

const places: Ref<Place[]> = ref([])
const address: Ref<string> = ref("")
const loading: Ref<boolean> = ref(false)
const searchMode: Ref<number> = ref(30)

const currentLocation = {
  latitude: 54.21093325,
  longitude: 22.000529771276238,
}

function search() {
  loading.value = true
  places.value = []
  getAEDs(currentLocation, searchMode.value)
    .then(value => {
      loading.value = false
      places.value = value
    })
}

</script>
