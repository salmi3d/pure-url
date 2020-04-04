const router = new require('express').Router()
const usersCtrl = require('../controllers/user.controller')

router.post('/register', usersCtrl.register)
router.post('/login', usersCtrl.login)

module.exports = router
