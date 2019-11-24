const bcrypt = require('bcryptjs')

const User = require('../model/user')
const ResourceNotFoundError = require('../error/resource-not-found.error')
const ResourceAlreadyExistsError = require('../error/resource-already-exists-error')
const InvalidPasswordError = require('../error/invalid-password.error')
const obtainMongoConnection = require('../service/mongoose.access.service')


module.exports = {
    getUserByEmailAndPassword: async ({email, password}) => {
        await obtainMongoConnection()
        const user = await User.findOne({email})

        throwIfUserNotFoundWithEmail({user, email})
        await throwIfPasswordDoesNotMatch({user, password})
        return user
    },

    createUser: async ({email, firstName, lastName, password}) => {
        await obtainMongoConnection()

        await throwIfEmailExist(email)
        return await new User({email, firstName, lastName, hashedPassword: await hashPassword(password)}).save()
    }
}

const throwIfUserNotFoundWithEmail = ({user, email}) => {
    if (!user) {
        throw new ResourceNotFoundError(`User with ${email} email does not exist!`)
    }
}

const throwIfPasswordDoesNotMatch = async ({user, password}) => {
    const isPasswordCorrect = await bcrypt.compare(password, user.hashedPassword)
    if (!isPasswordCorrect) {
        throw new InvalidPasswordError(`Password does not match`)
    }
}

const throwIfEmailExist = async (email) => {
    const user = await User.findOne({email})
    if (!!user) {
        throw new ResourceAlreadyExistsError(`User with ${email} email already exist!`)
    }
}

const hashPassword = async (password) => await bcrypt.hash(password, 12)

