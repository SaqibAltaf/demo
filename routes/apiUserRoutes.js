var express = require('express');
var router = express.Router();

var userController = require('./../controllers/userController');
router.get('/title', userController.demo1); // to test from demo1 , and other stretegy are also implemented
// router.get('/title', userController.demo2); // to test   this api commpone demo1 and demo3
// router.get('/title', userController.demo3); // to test this api commpone demo1 and demo2

module.exports = router;
