const router = new require('express').Router()
const linksCtrl = require('../controllers/link.controller')
const auth = require('../middleware/auth.middleware')

router.post('/generate', auth, linksCtrl.generate)
router.get('/', auth, linksCtrl.getLinks)
router.get('/:id', auth, linksCtrl.getLinkById)

module.exports = router
