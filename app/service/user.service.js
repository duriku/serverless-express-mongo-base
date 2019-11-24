const jsonwebtoken = require('jsonwebtoken')

const userRepository = require('../repository/user.repository')
const InvalidResourceError = require('../error/invalid-resource-error')
const ConfigService = require('../service/config.service')

module.exports = {
    login: async ({email, password}) => {
        const user = await userRepository.getUserByEmailAndPassword({email, password})
        return signToken(user)
    },

    register: async ({email, firstName, lastName, password, repeatPassword}) => {
        await throwIfPasswordAndRepeatPasswordDoesNotMatch({password, repeatPassword})
        const user = await userRepository.createUser({email, firstName, lastName, password})
        return signToken(user)
    }
}

const throwIfPasswordAndRepeatPasswordDoesNotMatch = ({password, repeatPassword}) => {
    if (password !== repeatPassword) {
        throw new InvalidResourceError(`Password does not match repeat password`)
    }
}

const signToken = ({id, email}) => {
    const config = ConfigService.getConfig()
    return jsonwebtoken.sign({id, email}, config.jwt.secret, {
        expiresIn: config.jwt.expiryIn
    })
}

