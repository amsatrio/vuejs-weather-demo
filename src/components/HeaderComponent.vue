<template>
    <header class="sticky top-0">
        <nav>
            <div class="flex flex-row items-center">
                <div @click="toggleSidebar()">
                    <i class="fa-solid fa-bars-staggered"></i>
                </div>
            </div>
        </nav>
    </header>
</template>

<script setup>
import { useHeaderSidebarStore } from '@/stores/headerSidebarStore';
const headerSidebarStore = useHeaderSidebarStore();
function toggleSidebar(){
    headerSidebarStore.toggleSidebar();
}
</script>

<style lang="scss" scoped>

</style>