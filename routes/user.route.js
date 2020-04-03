const router = new require('express').Router()
const usersCtrl = require('../controllers/user.controller')

router.route('/register').post(usersCtrl.register)
router.route('/login').post(usersCtrl.login)

module.exports = router
