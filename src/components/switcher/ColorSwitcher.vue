<template>
    <BaseControl :items="designStore.colors">
        <template #items="{ item }">
            <div
                class="color-circle"
                :style="[getItemClass(item), { backgroundColor: item.color }]"
                @click="setColor(item)"
            ></div>
        </template>
    </BaseControl>
</template>

<script setup lang="ts">
import BaseControl from '@/components/switcher/BaseSwitcher.vue'
import { useDesignStore } from '@/stores/design'
import type { Color } from '@/stores/design'

const designStore = useDesignStore()

designStore.getColors()

const setColor = (color: Color) => {
    designStore.color = color
    designStore.updateColor()
}

const getItemClass = (color: Color): { border: string } | {} => {
    if (color == color) {
        return { border: '4px solid #000' }
    }
    return {}
}
</script>

<style scoped>
.color-circle {
    margin: 5px 0;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 2px solid var(--va--secondary-color);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: bold;
    transition:
        transform 0.3s,
        box-shadow 0.3s;
}

.color-circle:hover {
    border-color: #000;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}

.color-circle.active {
    border: 3px solid var(--secondary-color);
    padding: 5px;
}
</style>
