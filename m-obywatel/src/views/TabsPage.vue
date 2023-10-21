<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/clinics">
          <ion-icon aria-hidden="true" :icon="calendarNumber" />
          <ion-label>Terminy</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tabs/sors">
          <ion-icon aria-hidden="true" :icon="warning" />
          <ion-label>SOR</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/tabs/aeds">
          <ion-icon aria-hidden="true" :icon="flash" />
          <ion-label>AED</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab4" href="/tabs/blood-points">
          <ion-icon aria-hidden="true" :icon="water" />
          <ion-label>Krwiodastwo</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { calendarNumber, ellipse, flash, square, triangle, warning, water } from 'ionicons/icons';
</script>
