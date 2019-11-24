const jsonwebtoken = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const userRepository = require('../repository/user.repository')
const InvalidResourceError = require('../error/invalid-resource-error')
const ConfigService = require('../service/config.service');

module.exports = {
    login: async ({email, password}) => {
        await userRepository.getUserByEmailAndPassword({email, hashedPassword: hashPassword(password)})
        return signToken({email, password})
    },

    register: async ({email, firstName, lastName, password, repeatPassword}) => {
        await throwIfPasswordAndRepeatPasswordDoesNotMatch({password, repeatPassword})

        await userRepository.createUser({email, firstName, lastName, hashedPassword: hashPassword(password)})
        return signToken({email, password})
    }
}

const throwIfPasswordAndRepeatPasswordDoesNotMatch = ({password, repeatPassword}) => {
    if (password !== repeatPassword) {
        throw new InvalidResourceError(`Password does not match repeat password`)
    }
}

const hashPassword = async (password) => await bcrypt.hash(password, 12)

const signToken = ({userId, email}) => {
    const config = ConfigService.getConfig()
    return jsonwebtoken.sign({userId, email}, config.jwt.secret, {
        expiresIn: config.jwt.expiryIn
    })
}

