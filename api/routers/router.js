var express = require('express');
var router = express.Router();
// var app = express();
var users = require("../controller/userController.js");
var authroute=require("./authroute")
router.post('/register', users.registration);
router.post('/login', users.login);
router.use('/auth', authroute);   
// router.get('/msgs',users.getmsgs) ;
// router.post('/user/:id/password',users.changePassword);
module.exports = router;  