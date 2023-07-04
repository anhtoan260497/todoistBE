const authRouters = require('./auth')

const routes = (app) => {
    app.use('/api/auth', authRouters)
}

module.exports = routes