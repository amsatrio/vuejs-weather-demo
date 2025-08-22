<template>
    <div class="px-8 py-2 flex flex-row justify-start space-x-4 items-center">
        <i :class=icon></i>
        <div class="w-full" :hidden=headerSidebarStore.smallSidebar>
            <div class="flex flex-row justify-between w-full">
            <div>{{ title }}</div>
            <div>
                <i :class="iconDropdown" :hidden=!isDropdown @click="toggleDropdown()"></i>
            </div>
        </div>
        </div>
    </div>
    <div :hidden=headerSidebarStore.smallSidebar>
        <div :hidden=!showDropdown>
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
    title: {
        type: [String, null],
        required: true
    },
    icon: {
        type: [String, null],
        required: true
    },
    isDropdown: {
        type: [Boolean, false],
        required: false,
        default: false
    }
})
const showDropdown = ref(false);
const iconDropdown = ref("fa-solid fa-chevron-right");
function toggleDropdown() {
    showDropdown.value = !showDropdown.value;
    iconDropdown.value = "fa-solid fa-chevron-right";
    if (showDropdown.value) {
        iconDropdown.value = "fa-solid fa-chevron-down";
    }
}

import { useHeaderSidebarStore } from '@/stores/headerSidebarStore';
const headerSidebarStore = useHeaderSidebarStore();
</script>

<style lang="scss" scoped></style>