<template>
    <Navigation />
    <slot class="full-width-container"></slot>
</template>

<script setup lang="ts">
import Navigation from '@/components/Navigation.vue'
</script>

<style>
.full-width-container {
    width: 100vw;
    padding: 0;
    margin: 0;
}
</style>
