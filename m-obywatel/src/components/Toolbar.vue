<template>
    <ion-toolbar>
        <ion-title>
            <slot></slot>
        </ion-title>

        <ion-avatar>
            <img alt="Silhouette of a person's head" src="../../resources/icon.png" />
        </ion-avatar>
    </ion-toolbar>
</template>

<script setup lang="ts">

</script>

<style scoped>
ion-avatar {
    --border-radius: 12px;
    margin: 4px
}
</style>