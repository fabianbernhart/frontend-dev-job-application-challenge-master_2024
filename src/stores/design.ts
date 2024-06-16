// stores/design.js
import { ref, computed } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'
import type { RefSymbol } from '@vue/reactivity'
import { da } from '@faker-js/faker'

export type Motive = {
    name: string
    price: number
    img: string
}

export type Color = {
    name: string
    color: string
    price: number
}

const host = 'http://localhost:3000'
const properties = ['--st0-color', '--st1-color', '--st2-color']

const storeId = 'designStore'

export const useDesignStore = defineStore(storeId, () => {
    const color = ref<Color | null>(null)
    const motive = ref<Motive | null>(null)
    const motives = ref<Motive[]>([])
    const colors = ref<Color[]>([])

    const motivePrice = ref<number>(0)
    const colorPrice = ref<number>(0)

    const personalData = ref({
        name: '',
        address: ''
    })

    const updateColor = () => {
        if (!color.value) return
        if (!document) return

        for (const property of properties) {
            document.documentElement.style.setProperty(
                property,
                color.value.color
            )
        }
    }

    const updateMotive = () => {
        if (!motive.value) return
        if (!document) return

        const imageElements = document.getElementsByClassName('optionalImg')

        for (const imageElement of imageElements) {
            imageElement.setAttribute('href', motive.value.img)
        }
    }

    const getColors = async () => {
        const { data } = await useFetch('/api/colors')

        if (data.value == null) {
            return
        }
        colors.value = data.value

        if (!color.value) {
            color.value = colors.value[0]
            updateColor()
        }
    }

    const getMotives = async () => {
        const { data } = await useFetch('/api/motives')

        if (data.value == null) {
            return
        }
        motives.value = data.value

        if (!motive.value) {
            motive.value = motives.value[0]
            updateMotive()
        }
    }

    const createOrder = async (data: { name: string; address: string }) => {
        const response = await axios
            .post(`${host}/api/order`, data)
            .then(() => {
                navigateTo('/order-success')
            })
            .catch((e) => {
                console.error(e)
            })

        console.debug(response)
    }

    watch(
        () => color.value?.price,
        (newColorPrice) => {
            if (!newColorPrice) return
            colorPrice.value = newColorPrice
        },
        { immediate: true }
    )

    watch(
        () => motive.value?.price,
        (newMotivePrice) => {
            if (!newMotivePrice) return
            motivePrice.value = newMotivePrice
        },
        { immediate: true }
    )

    const totalPrice = computed((): number => {
        const result = motivePrice.value + colorPrice.value

        const fixedResult = result.toFixed(2)

        return Number.parseFloat(fixedResult)
    })

    return {
        motivePrice,
        colorPrice,
        motive,
        color,
        personalData,
        motives,
        colors,
        totalPrice,
        updateColor,
        changeImg: updateMotive,
        updateMotive,
        getMotives,
        getColors,
        createOrder
    }
})
