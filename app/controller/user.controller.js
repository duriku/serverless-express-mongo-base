const userService = require('../service/user.service')

module.exports = app => {

    /**
     * Login user and return JWT
     */
    app.post('/login', async ({body}, res, next) => {
        try {
            const token = await userService.login(body)
            res.json(token)
        } catch (e) {
            next(e)
        }
    })

    /**
     * Register user and return JWT
     */
    app.post('/register', async ({body}, res, next) => {
        try {
            const token = await userService.register(body)
            res.json(token)
        } catch (e) {
            next(e)
        }
    })
}