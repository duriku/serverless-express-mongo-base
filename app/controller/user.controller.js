const userService = require('../service/user.service')

module.exports = app => {

    /**
     * Login user and return JWT
     */
    app.post('/login', async ({body}, res, next) => {
        try {
            const user = await userService.login(body)
            res.json(user)
        } catch (e) {
            next(e)
        }
    })

    /**
     * Register user and return JWT
     */
    app.post('/register', async ({body}, res, next) => {
        try {
            const user = await userService.register(body)
            res.json(user)
        } catch (e) {
            next(e)
        }
    })
}