<template>
    <div class="base-switcher">
        <div class="arrow" v-if="canScrollPrev" @click="prevItems">
            <slot name="up-arrow">
                <span>&uarr;</span>
            </slot>
        </div>
        <div class="items-container" @wheel="handleScroll">
            <slot
                name="items"
                v-for="(item, index) in visibleItems"
                :item="item"
                :index="index"
                :key="index"
            ></slot>
        </div>
        <div class="arrow" v-if="canScrollNext" @click="nextItems">
            <slot name="down-arrow">
                <span>&darr;</span>
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts" generic="T">
import { ref, computed } from 'vue'

const props = withDefaults(
    defineProps<{
        initialIndex?: number
        visibleCount?: number
        items: T[]
    }>(),
    {
        initialIndex: 0,
        visibleCount: 5,
        items: Array
    }
)

const visibleCount = ref(props.visibleCount)
const startIndex = ref(props.initialIndex)

const visibleItems = computed(() =>
    props.items.slice(startIndex.value, startIndex.value + visibleCount.value)
)

const canScrollPrev = computed(() => startIndex.value > 0)
const canScrollNext = computed(
    () => startIndex.value + visibleCount.value < props.items.length
)

const prevItems = () => {
    startIndex.value = Math.max(startIndex.value - visibleCount.value, 0)
}

const nextItems = () => {
    startIndex.value = Math.min(
        startIndex.value + visibleCount.value,
        props.items.length - visibleCount.value
    )
}

const handleScroll = (event: WheelEvent) => {
    if (event.deltaY > 0) {
        nextItems()
    } else {
        prevItems()
    }
}
</script>

<style scoped>
.base-switcher {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-radius: 10px;
    max-width: 200px;
}

.arrow {
    cursor: pointer;
    margin: 10px 0;
    color: var(--secondary-color);
    font-size: 24px;
    transition: color 0.3s;
}

.arrow:hover {
    color: darken(var(--secondary-color), 10%);
}

.items-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
}

@media (max-width: 799px) {
    .base-switcher {
        scale: 0.7;
    }
}
</style>
