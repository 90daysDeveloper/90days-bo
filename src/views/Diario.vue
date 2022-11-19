<template>
  <div>
    <h1>{{ titoloPagina }}</h1>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const titoloPagina = route.path.slice(1)

</script>

<style lang="scss" scoped>

</style>