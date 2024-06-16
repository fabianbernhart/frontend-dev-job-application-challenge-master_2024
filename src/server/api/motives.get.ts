import { faker } from '@faker-js/faker'

function generateMotives(count: number) {
    const motives = []

    for (let step = 0; step < count; step++) {
        motives.push({
            name: faker.lorem.word(),
            img: faker.image.url({ width: 100, height: 100 }),
            price: faker.number.float({
                min: 5,
                max: 50,
                multipleOf: 0.01
            })
        })
    }

    return motives
}

export default defineEventHandler((event) => {
    return generateMotives(6)
})
