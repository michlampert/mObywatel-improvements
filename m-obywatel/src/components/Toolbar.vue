<template>
    <ion-toolbar>
        <ion-title>
            <slot name="name"></slot>
        </ion-title>

        <ion-button size="small" fill="clear" id="open-modal" style="margin:0px">
            <ion-avatar>
                <img alt="Silhouette of a person's head" src="../../resources/icon.png" />
            </ion-avatar>
        </ion-button>

        <div slot="end">
            <slot name="alert"></slot>
        </div>
    </ion-toolbar>

    <ion-modal ref="modal" trigger="open-modal" @willDismiss="onWillDismiss">
        <ion-header>
            <ion-toolbar>
                <ion-title>mObywatel 2.0</ion-title>
            </ion-toolbar>
        </ion-header>
        <div class="wrapper">
            <div class="center">
                <ion-input  ></ion-input>
                <ion-input  ></ion-input>
                <ion-button class="input" :strong="true" @click="cancel()" size="large" fill="outline">123123123123</ion-button>
                <ion-button class="input" :strong="true" @click="cancel()" size="large" fill="outline">************</ion-button>
                <ion-button class="input" :strong="true" @click="cancel()" size="large">Logowanie</ion-button>
                <ion-button class="input" :strong="true" @click="cancel()" size="large" fill="clear"></ion-button>
                <ion-button class="input" :strong="true" @click="cancel()" size="large" color="danger">
                    <ion-icon :icon="medkit" size="large"></ion-icon>
                    <span style="margin-left: 12px;">ePacjent</span>
                </ion-button>
            </div>

        </div>

    </ion-modal>
</template>

<script setup lang="ts">
import { IonTitle, IonAvatar, IonToolbar, IonModal, IonHeader, IonButton, IonButtons, IonContent, IonItem, IonInput, IonIcon } from '@ionic/vue';
import { ref } from 'vue';
import { OverlayEventDetail } from '@ionic/core/components';
import { medkit } from 'ionicons/icons';

const modal = ref();
const input = ref();

const cancel = () => modal.value.$el.dismiss(null, 'cancel');

const onWillDismiss = (ev: CustomEvent<OverlayEventDetail>) => {

};

</script>

<style scoped>
ion-avatar {
    --border-radius: 12px;
    /* margin: 4px */
}

div[slot="end"] {
    display: flex;
    margin: 8px
}

ion-title {
    padding: 0px
}


.wrapper {
    height: calc(100vh - 48px);
    display: flex;
    align-items: center;
    justify-content: center;
}

.center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.input {
    width: 300px;
}
</style>