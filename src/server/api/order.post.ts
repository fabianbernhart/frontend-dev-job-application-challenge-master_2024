type requestBodyType = {
    address: string
    name: string
}

function validateRequestBody(body: requestBodyType) {
    const { address, name } = body

    const errors: {
        name?: string[]
        address?: string[]
    } = {}

    if (!address) {
        errors.address = ['The address field is required.']
    }

    if (!name) {
        errors.name = ['The name field is required.']
    }

    if (name && name.length >= 15) {
        errors.name = [
            'The name must not be longer than 15 characters.'
        ].concat(errors.name ?? [])
    }

    if (name && name.includes('_')) {
        errors.name = ['The name must not contain "_".'].concat(
            errors.name ?? []
        )
    }

    if (errors.name || errors.address) {
        throw {
            message: 'The given data was invalid.',
            statusText: 'Unprocessable',
            errors
        }
    }
}

export default defineEventHandler(async (event) => {
    try {
        validateRequestBody(await readBody(event))
    } catch (e) {
        setResponseStatus(event, 422)
        return e
    }

    return {
        success: true
    }
})
