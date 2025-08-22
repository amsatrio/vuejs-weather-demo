<template>
  <div class="flex flex-row font-roboto h-screen space-x-2">
    <div class="">
      <SidebarComponent></SidebarComponent>
    </div>
    <div class="flex flex-1 flex-col space-y-2">
      <div class="p-4 v-screen ">
        <HeaderComponent></HeaderComponent>
      </div>
      <div class="p-4 h-screen">
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import HeaderComponent from './components/HeaderComponent.vue';
import SidebarComponent from './components/SidebarComponent.vue';
</script>

<style lang="scss" scoped></style>