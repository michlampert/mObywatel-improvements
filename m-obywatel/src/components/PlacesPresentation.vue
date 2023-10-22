<template>
    <div>
        <ion-list lines="none">
            <ion-item>
                <ViewModeButton v-model="viewMode"></ViewModeButton>
            </ion-item>
        </ion-list>
        <slot name="spinner"></slot>
        <Transition name="list">
            <template v-if="viewMode == 'list'">
                <div class="scrollable">
                    <ion-list>
                        <ion-item lines="none" v-for="clinic in places">
                            <Place v-bind:currentLocation="currentLocation" :place="clinic" :places="[clinic]">
                            </Place>
                        </ion-item>
                    </ion-list>
                </div>
            </template>
        </Transition>
        <Transition name="map">
            <template v-if="viewMode == 'map'">
                <ion-list lines="none" class="padding-top">
                    <ion-item>
                        <Map v-bind:current-location="currentLocation" v-bind:other-places="places">
                        </Map>
                    </ion-item>
                </ion-list>
            </template>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { IonList, IonItem } from '@ionic/vue';
import Map from './Map.vue';
import { PlacesCombined } from '@/api/model';
import { PropType, Ref, ref } from 'vue';
import { Localization } from '@/api/model';
import ViewModeButton from './ViewModeButton.vue';
import Place from './Place.vue';

const viewMode: Ref<"list" | "map"> = ref("list")

const emit = defineEmits(['update:isOpen'])

const props = defineProps({
    currentLocation: Object as PropType<Localization>,
    places: Object as PropType<PlacesCombined[]>,
    isOpen: Boolean,
    isSor: Boolean,
})

function setOpen(state: boolean) {
    emit("update:isOpen", state)
}

</script>

<style scoped>
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

.scrollable {
    max-height: 90vh;
    height: 90vh;
    overflow: scroll;
}
</style>