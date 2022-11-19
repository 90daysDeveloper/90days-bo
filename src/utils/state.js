import { ref, computed } from "vue";

export const collapsed = ref(true);
export const toggleSidemenu = () => (collapsed.value = !collapsed.value);

export const SIDEBAR_WIDTH = 250;
export const SIDEBAR_WIDTH_COLLAPSED = 60;
export const sidemenuWidth = computed(
  () => `${collapsed.value ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH}px`
);
