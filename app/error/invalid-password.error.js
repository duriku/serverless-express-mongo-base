module.exports = class InvalidPasswordError extends Error {
    constructor(message) {
        super()
        this.message = message
        this.code = 400
    }
}