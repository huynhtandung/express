const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Handler for /fish route')
  next()
})
// define the home page route
router.get('/', (req, res, next) => {
  console.log('No return')
  next('router')
}, function (req, res) {
  res.send('Fishes home page')
})
// define the about route
router.get('/about', function (req, res) {
  res.send('About fishes')
})

module.exports = router