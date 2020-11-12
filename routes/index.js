var express = require('express');
var router = express.Router();
var employeeController = require('../controllers/employeeController')
var userService = require('../configs/user.service');
const Empoloyee = require('../models/employee');

/* GET home page. */
router.get('/', async (req, res, next) => {
  res.status(200).json({ message: 'Login Success' });
});

router.get('/employees', async (req, res, next) => {
  var result = await employeeController.find();
  res.status(200).json(result);
});

router.get('/employees/:id', async (req, res, next) => {
  var result = await employeeController.findByID(req.params.id);
  res.status(200).json(result);
});

router.post('/employees', async (req, res, next) => {
  try {
    if (typeof (new Date(req.body.birthday)) === 'object') {
      // custom application error
      return res.status(400).json({ message: "Bad Request shoud check your request body" });
    }

    var emplyeeNew = new Empoloyee ({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      birthday: req.body.birthday,
      email: req.body.email
    })
    await employeeController.create(emplyeeNew).then((r) => {
      res.status(200).json(r)
    }) ;
  } catch(e) {
    return res.status(400).json({ message: e.message });
  }
});

router.put('/employees/:id', async (req, res, next) => {
  await employeeController.update(id, req.body).then((r) => {
    res.status(200).json(r)
  }).catch(err => {
    res.status(400).json(err.message)
  }) ;
});

router.delete('/employees/:id', async (req, res, next) => {

});

module.exports = router;
