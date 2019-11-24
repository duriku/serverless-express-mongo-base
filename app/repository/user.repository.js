const User = require('../model/user')
const ResourceNotFoundError = require('../error/resource-not-found.error')
const ResourceAlreadyExistsError = require('../error/resource-already-exists-error')
const InvalidPasswordError = require('../error/invalid-password.error')
const obtainMongoConnection = require('../service/mongoose.access.service')


module.exports = {
    getUserByEmailAndPassword: async ({email, hashedPassword}) => {
        await obtainMongoConnection()
        const user = await User.find({email})

        throwIfUserNotFoundWithEmail({user, email})
        throwIfPasswordDoesNotMatch({user, hashedPassword})
    },

    createUser: async ({email, firstName, lastName, hashedPassword}) => {
        await obtainMongoConnection()

        await throwIfEmailExist()
        return await new User({email, firstName, lastName, hashedPassword}).save()
    }
}

const throwIfUserNotFoundWithEmail = ({user, email}) => {
    if (!user) {
        throw new ResourceNotFoundError(`User with ${email} email does not exist!`)
    }
}

const throwIfPasswordDoesNotMatch = ({user, password}) => {
    if (user.hashedPassword !== password) {
        throw new InvalidPasswordError(`Password does not match`)
    }
}

const throwIfEmailExist = async (email) => {
    const user = await User.find(email)
    if (!!user) {
        throw new ResourceAlreadyExistsError(`User with ${email} email already exist!`)
    }
}
