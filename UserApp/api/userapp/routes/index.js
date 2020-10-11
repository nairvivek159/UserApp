const auth = require('http-auth');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const Registration = mongoose.model('Registration');
const basic = auth.basic({
  file: path.join(__dirname, '../users.htpasswd'),
});
router.post('/',
  [
    check('mobileNumber')
      .isLength({ min: 1 })
      .withMessage('Please enter a phone number'),
    check('password')
      .isLength({ min: 1 })
      .withMessage('Please enter password'),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      const registration = new Registration(req.body);
      registration.save()
        .then(() => { res.send('Thank you for your registration!'); })
        .catch((err) => {
          console.log(err);
          res.send('Sorry! Something went wrong.');
        });
    } 
	else {
	  res.send('Sorry! Something went wrong');
    }
  });

router.get('/ValidateUser', (req, res) => {
	
  Registration.findOne({'mobileNumber' : req.mobileNumber})
    .then((registrations) => {
      res.send('User Found');
    })
    .catch((err) => {
      console.log(err);
      res.send('Sorry! Something went wrong.');
    });
});

module.exports = router;

