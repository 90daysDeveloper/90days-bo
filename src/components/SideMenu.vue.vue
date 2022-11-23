<template>
  <div class="sidemenu" :style="{ width: sidemenuWidth }">

    <h1>
      <span v-if="collapsed">
        <div>90</div>
        <div>bo</div>
      </span>
      <span v-else>90 Days backoffice</span>
    </h1>

    <MenuItem v-for="menuitem in items" :key="menuitem.label" :to="menuitem.to" :icon="menuitem.icon">{{ menuitem.label
    }}</MenuItem>

    <span @click="toggleSidemenu" class="collapsed-icon cursor-pointer" :class="{ 'rotate-180': collapsed }">
      <i class="pi pi-angle-double-left"></i>
    </span>
  </div>
</template>

<script setup>
import MenuItem from './MenuItem.vue';
import { collapsed, toggleSidemenu, sidemenuWidth } from '../utils/state'

const items = [
  {
    label: "Utenti",
    icon: "pi-user",
    to: '/Utenti'
  },
  {
    label: "Gruppi",
    icon: "pi-users",
    to: "/Gruppi"
  },
  {
    label: "Helper",
    icon: "pi-flag",
    to: "/Helper",
  },
  {
    label: "Orari",
    icon: "pi-clock",
    to: "/Orari",
  },
  {
    label: "Obiettivi",
    icon: "pi-star",
    to: "/Obiettivi",
  },
  {
    label: "Abitudini",
    icon: "pi-chart-line",
    to: "/Abitudini",
  },
  {
    label: "Diario",
    icon: "pi-book",
    to: "/Diario",
  },
  {
    label: "Recap Settimanale",
    icon: "pi-list",
    to: "/RecapSettimanale",
  },
  {
    label: "Primo Appuntamento",
    icon: "pi-calendar",
    to: "/PrimoAppuntamento",
  },
  {
    label: "Percorso",
    icon: "pi-map",
    to: "/Percorso",
  },
  {
    label: "Percorso Feedback",
    icon: "pi-share-alt",
    to: "/PercorsoFeedback",
  },

]
</script>