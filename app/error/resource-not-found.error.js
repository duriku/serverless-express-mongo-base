module.exports = class ResourceNotFoundError extends Error {
    constructor(message) {
        super()
        this.message = message
        this.code = 404
    }
}