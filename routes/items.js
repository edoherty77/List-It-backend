const router = require('express').Router()
const ctrl = require('../controllers')

// routes
router.get('/search/:item', ctrl.items.search)
router.get('/:id', ctrl.items.show)
router.post('/', ctrl.items.create)
router.put('/:id', ctrl.items.update)
router.delete('/:id', ctrl.items.destroy)

// exports
module.exports = router
