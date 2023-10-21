<template>
    <ion-toolbar>
        <ion-title>
            <slot name="name"></slot>
        </ion-title>

        <ion-avatar>
            <img alt="Silhouette of a person's head" src="../../resources/icon.png" />
        </ion-avatar>

        <div slot="end">
            <slot name="alert"></slot>
        </div>
    </ion-toolbar>
</template>

<script setup lang="ts">
import { IonTitle, IonAvatar, IonToolbar } from '@ionic/vue';

</script>

<style scoped>
ion-avatar {
    --border-radius: 12px;
    margin: 4px
}

div[slot="end"] {
    display: flex;
    margin: 8px
}
</style>