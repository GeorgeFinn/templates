const express = require('express')
const router = express.Router()

// GET api/careerplans/test
// Public
router.get('/test', (req, res) => res.json({
  msg: "CareerPlans works"
}))

module.exports = router
