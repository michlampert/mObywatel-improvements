<template>
  <ion-page>
    <ion-header>
      <Toolbar>
        Najbliższe terminy
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
          <ion-input label-placement="floating" :clear-input="true" placeholder="np. Ortopeda">
            <div slot="label">Usługa</div>
          </ion-input>
        </ion-item>
        <ion-item>
          <ion-input label-placement="floating" :clear-input="true" placeholder="np. Warszawa">
            <div slot="label">Miejscowość</div>
          </ion-input>
          <ion-button class="ion-activatable" shape="round" size="small" fill="clear">
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
          <Place :date="new Date(2023, 0, 1)" :city="'Warszawa'" :distance="123"
            :name="'Szpital im. JP2'" :telephone="'123456789'" :address="'ul. Wiejska 13'" :webpage="'google.com'">
          </Place>
        </ion-item>
        <!-- <ion-item lines="none">
          <Place>

          </Place>
        </ion-item> -->
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import Place from "@/components/Place.vue"
import Toolbar from '@/components/Toolbar.vue'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { analytics, call, heart, list, locate, map, optionsOutline, pin, timerOutline } from 'ionicons/icons';

import { IonRippleEffect } from '@ionic/vue';
import { Ref, onMounted, ref } from "vue";
import { Clinic } from "@/api/model"
import { getClinics } from "@/api/api"

const clinics: Ref<Clinic[]> = ref([])

function search() {
  clinics.value = getClinics({longitude:0, latitude:0})
}

</script>

<style>
.full-width {
  width: 1000px !important;
}
</style>
