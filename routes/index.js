var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.status(200).json({ message: 'Login Success' });
});

router.get('/employees', (req, res, next) => {

})

module.exports = router;
