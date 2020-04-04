const router = new require('express').Router()
const redirectsCtrl = require('../controllers/redirect.controller')

router.get('/:code', redirectsCtrl.runRedirect)

module.exports = router
