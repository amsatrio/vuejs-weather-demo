<template>
    <aside :class="headerSidebarStore.smallSidebar ? 'w-24' : 'w-72'">
        <nav class="py-2 items-center justify-center">
            <div class="max-w-sm">
                <div class="px-6 py-4 flex flex-row justify-center items-center">
                    <img src="/favicon.ico"></img>
                    <div class="font-bold text-xl" :hidden="headerSidebarStore.smallSidebar ? true : false">Title
                        Project</div>
                </div>
            </div>

            <RouterLink :to="{ name: 'home' }">
                <SidebarDropdownButton title="Home" icon="fa-solid fa-house"></SidebarDropdownButton>
            </RouterLink>
            <RouterLink :to="{ name: 'page1' }">
                <SidebarDropdownButton title="Page 1" icon="fa-solid fa-house"></SidebarDropdownButton>
            </RouterLink>
            <SidebarDropdownButton title="Dropdown" icon="fa-solid fa-house" isDropdown>
                <SidebarSubDropdownButton title="sub dropdown 1"></SidebarSubDropdownButton>
                <SidebarSubDropdownButton title="sub dropdown 2"></SidebarSubDropdownButton>
            </SidebarDropdownButton>
            <RouterLink :to="{ name: 'page2' }">
                <SidebarDropdownButton title="Page 2" icon="fa-solid fa-house"></SidebarDropdownButton>
            </RouterLink>
            <RouterLink :to="{ name: 'datatable' }">
                <SidebarDropdownButton title="Datatable" icon="fa-solid fa-house"></SidebarDropdownButton>
            </RouterLink>
            <RouterLink :to="{ name: 'm-biodata' }">
                <SidebarDropdownButton title="M Biodata" icon="fa-solid fa-house"></SidebarDropdownButton>
            </RouterLink>
        </nav>
    </aside>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import SidebarDropdownButton from './molecules/SidebarDropdownButton.vue';
import SidebarSubDropdownButton from './molecules/SidebarSubDropdownButton.vue';
import { useHeaderSidebarStore } from '@/stores/headerSidebarStore';
const headerSidebarStore = useHeaderSidebarStore();
</script>

<style lang="scss" scoped></style>