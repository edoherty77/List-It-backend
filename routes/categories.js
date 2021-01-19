const router = require('express').Router()
const ctrl = require('../controllers')

// routes
router.get('/', ctrl.categories.index)
// router.post('/', ctrl.categories.create)

// exports
module.exports = router
