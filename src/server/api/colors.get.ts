import { faker } from '@faker-js/faker'

function generateColors(count: number) {
    const colors = []

    for (let step = 0; step < count; step++) {
        colors.push({
            name: faker.lorem.word(),
            color: faker.color.rgb(),
            price: faker.number.float({
                min: 5,
                max: 50,
                multipleOf: 0.01
            })
        })
    }

    return colors
}

export default defineEventHandler((event) => {
    return generateColors(10)
})
