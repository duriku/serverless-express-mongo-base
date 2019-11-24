module.exports = class ResourceAlreadyExistsError extends Error {
    constructor(message) {
        super()
        this.message = message
        this.code = 409
    }
}