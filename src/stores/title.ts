import { useDesignStore } from '@/stores/design'

export type TitleObjectType = {
    title: null | string
    action: null | string
    to: null | string
    showTotal?: boolean
}

export const useTitleStore = () => {
    const designStore = useDesignStore()

    const route = useRoute()

    const titleObject = ref<TitleObjectType>({
        title: 'null',
        action: 'null',
        to: 'null',
        showTotal: false
    })

    const getTitle = computed<TitleObjectType>(() => titleObject.value)

    const setTitle = (newTitleObject: TitleObjectType) => {
        titleObject.value = newTitleObject
    }

    watch(
        () => route.path,
        (newPath) => {
            if (newPath === '/designer') {
                setTitle({
                    title: 'Design your shirt',
                    action: 'Go to Checkout',
                    to: '/checkout',
                    showTotal: true
                })
            } else if (newPath === '/checkout') {
                setTitle({
                    title: 'Checkout',
                    action: 'Back',
                    to: '/designer'
                })
                designStore.updateMotive()
            } else if (newPath === '/order-success') {
                setTitle({
                    title: 'Order success',
                    action: 'Back',
                    to: '/checkout'
                })
            }
        },
        { immediate: true }
    )

    return {
        titleObject,
        getTitle,
        setTitle
    }
}
