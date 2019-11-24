module.exports = (err, req, res, next) => {

    if (err.name === 'UnauthorizedError') {
        res.status(401).send('invalid token...')
        return
    }

    const errorCode = err.code || 500
    res.status(errorCode).send({message: err.message})
}