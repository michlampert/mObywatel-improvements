<template>
    <div class="dropdown" v-if="options">

        <!-- Dropdown Input -->
        <ion-input class="dropdown-input" :name="name" @focus="showOptions()" @blur="exit()" v-model="searchFilter"
            :placeholder="placeholder" fill="outline"/>

        <!-- Dropdown Menu -->
        <ion-list class="dropdown-content" v-show="optionsShown">
            <ion-item class="dropdown-item" @mousedown="selectOption(option)" v-for="(option, index) in filteredOptions()"
                :key="index">
                {{ option.name || option.id || '-' }}
            </ion-item>
        </ion-list>
    </div>
</template>
  
<script lang="ts" setup>
import { PropType, Ref, ref, watch } from 'vue';
import { IonInput, IonList, IonItem } from '@ionic/vue';

const selected: Ref<{ name: string, id: string } | undefined> = ref(undefined)
const optionsShown: Ref<boolean> = ref(false)
const searchFilter: Ref<string> = ref("")



const emit = defineEmits(['selected', 'filter'])
emit('selected', selected.value)

const props = defineProps({
    name: {
        type: String,
        default: "name"
    },
    options: {
        type: Object as PropType<{ name: string, id: string }[]>,
        default: []
    },
    placeholder: {
        type: String,
        default: ""
    },
    disabled: {
        type: Boolean,
        default: false
    },
    maxItem: {
        type: Number,
        default: 10,
    },
})

function filteredOptions() {
    const filtered = [];
    const regOption = new RegExp(searchFilter.value, 'ig');
    for (const option of props.options) {
        if (searchFilter.value.length < 1 || props.name.match(regOption)) {
            if (filtered.length < props.maxItem) filtered.push(option);
        }
    }
    return filtered;
}

function selectOption(option: { name: string, id: string }) {
    selected.value = option;
    optionsShown.value = false;
    searchFilter.value = option.name;
    emit('selected', selected.value);
}

function showOptions() {
    if (!props.disabled) {
        searchFilter.value = '';
        optionsShown.value = true;
    }
}

function exit() {
    if (!selected.value?.id) {
        selected.value = undefined;
        searchFilter.value = '';
    } else {
        searchFilter.value = selected.value.name;
    }
    emit('selected', selected.value);
    optionsShown.value = false;
}

watch(
    searchFilter,
    () => {
        if (filteredOptions().length === 0) {
            selected.value = undefined;
        } else {
            selected.value = filteredOptions()[0];
        }
        emit('filter', searchFilter.value);
    })

</script>
  
  
<style lang="scss" scoped>
.dropdown {
    position: relative;
    display: block;
    margin: auto;

    .dropdown-input {
        cursor: pointer;
        display: block;
    }

    .dropdown-content {
        position: absolute;
        overflow: visible;
        z-index: 10000;

        .dropdown-item {
            color: black;
            font-size: .7em;
            line-height: 1em;
            padding: 8px;
            text-decoration: none;
            display: block;
            cursor: pointer;

            &:hover {
                background-color: #e7ecf5;
            }
        }
    }

    .dropdown:hover .dropdowncontent {
        display: block;
    }
}
</style>