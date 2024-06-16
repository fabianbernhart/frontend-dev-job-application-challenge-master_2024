<template>
    <NuxtLayout>
        <slot>
            <NuxtPage />
        </slot>
    </NuxtLayout>
</template>

<script setup lang="ts"></script>

<style type="text/css">
body {
    color: black;
}

#app {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.nuxt-page {
    width: 100vw;
    height: 100%;
    flex-grow: 1;
}
</style>
