import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/Utenti",
    component: () => import("@/views/Utenti.vue"),
  },
  {
    path: "/Helper",
    component: () => import("@/views/Helper.vue"),
  },
  {
    path: "/Orari",
    component: () => import("@/views/Orari.vue"),
  },
  {
    path: "/Obiettivi",
    component: () => import("@/views/Obiettivi.vue"),
  },
  {
    path: "/Abitudini",
    component: () => import("@/views/Abitudini.vue"),
  },
  {
    path: "/Diario",
    component: () => import("@/views/Diario.vue"),
  },
  {
    path: "/RecapSettimanale",
    component: () => import("@/views/RecapSettimanale.vue"),
  },
  {
    path: "/PrimoAppuntamento",
    component: () => import("@/views/PrimoAppuntamento.vue"),
  },
  {
    path: "/Percorso",
    component: () => import("@/views/Percorso.vue"),
  },
  {
    path: "/PercorsoFeedback",
    component: () => import("@/views/PercorsoFeedback.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
