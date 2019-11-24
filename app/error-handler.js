module.exports = (err, req, res, next) => {
    const errorCode = err.code || 500;
    res.status(errorCode).send({message: err.message})
}