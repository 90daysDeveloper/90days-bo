<template>
  <SideMenu></SideMenu>
  <div :style="{ 'margin-left': sidemenuWidth }">
    <router-view />
  </div>
</template>
<script setup>
import SideMenu from './components/SideMenu.vue.vue';
import { sidemenuWidth } from './utils/state';
</script>