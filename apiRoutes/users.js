const express = require('express')
const router = express.Router()
const UsersControllers = require('../controllers/UsersControllers')


 
//login and register
router.post('/register',UsersControllers.register)
router.post('/login',UsersControllers.login)

router.get('/user',UsersControllers.getAll)
router.get('/user/:id',UsersControllers.get)
router.delete('/user/:id',UsersControllers.delete)
router.put('/user/:id',UsersControllers.update)


module.exports = router