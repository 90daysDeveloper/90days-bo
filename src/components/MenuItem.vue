<template>
  <router-link :to="to" class="link" :class="{ active: isActive }">
    <i class="pi ml-2 mr-4" :class="icon"></i>
    <transition name="fade">
      <span v-if="!collapsed">
        <slot />
      </span>
    </transition>
  </router-link>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { collapsed } from '@/utils/state';

// eslint-disable-next-line no-undef
const props = defineProps({
  to: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})

const route = useRoute()
const isActive = computed(() => route.path === props.to)
</script> 