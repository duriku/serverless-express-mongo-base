module.exports = class InvalidResourceError extends Error {
    constructor(message) {
        super();
        this.message = message
        this.code = 400;
    }
}