const User = require('../model/user')
const ResourceNotFoundError = require('../error/resource-not-found.error')
const ResourceAlreadyExistsError = require('../error/resource-already-exists-error')
const InvalidResourceError = require('../error/invalid-resource-error')
const obtainMongoConnection = require('./mongoose.access.service')

module.exports = {
    getUserById: async (userId) => {
        await obtainMongoConnection()

        const user = await User.findById(userId)
        throwIfUserNotFoundWithId({user, userId})

        return user
    },

    createUser: async ({email, firstName, lastName, password, repeatPassword}) => {
        await obtainMongoConnection()

        await throwIfPasswordAndRepeatPasswordDoesNotMatch({password, repeatPassword})
        await throwIfEmailExist()

        // TODO: hash the pass
        return await new User({email, firstName, lastName, password, repeatPassword}).save()
    }
}

const throwIfUserNotFoundWithId = ({user, userId}) => {
    if (!user) {
        throw new ResourceNotFoundError(`User with ${userId} id does not exist!`)
    }
}

const throwIfPasswordAndRepeatPasswordDoesNotMatch = ({password, repeatPassword}) => {
    if (password !== repeatPassword) {
        throw new InvalidResourceError(`Password does not match repeat password`)
    }
}

// TODO: hash the pass
const throwIfEmailExist = async (email) => {
    const user = await User.findById(userId)
    if (!!user) {
        throw new ResourceAlreadyExistsError(`User with ${email} already exist!`)
    }
}