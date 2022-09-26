const userRouter = require('./users')


function route (app) {
    app.use('/',userRouter)
}
module.exports = route