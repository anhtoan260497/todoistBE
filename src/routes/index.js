const accountRouters = require('./account')

const routes = (app) => {
    app.use('/api/account', accountRouters)
}

module.exports = routes