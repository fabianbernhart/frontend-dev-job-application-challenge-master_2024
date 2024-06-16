<template>
    <div class="order-success-page">
        <div class="content">
            <h1>Thank you {{ personalData.name }} for your order!</h1>
            <VaButton @click="navigateToDesignPage">
                Design Another Product</VaButton
            >
        </div>
    </div>
</template>

<script setup>
import { designStore } from '@/stores/design'

const { personalData } = designStore

// Function to navigate to the design page
const navigateToDesignPage = () => {
    navigateTo('/designer')
    designStore.$reset()
}
</script>

<style scoped>
h1 {
    font-size: xx-large;
}

.order-success-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin-top: 10rem;
}

.content {
    text-align: center;
}
</style>
