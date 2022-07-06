const express 		= require('express');
const router 			= express.Router();

const UserController 	= require('../controllers/user.controller');

const passport      	= require('passport');
const path            = require('path');
const { runInContext } = require('vm');

require('./../middleware/passport')(passport)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({status:"success", message:"Hello from local Api", data:{"version_number":"v1.0.0"}})
});

router.post(    '/user',           UserController.create);                                                    // C
router.put(     '/users',           passport.authenticate('jwt', {session:false}), UserController.update);     // U
router.post(    '/users/login',     UserController.login);
router.get( '/users', UserController.getAllUsers);
router.get( '/user/:user_id', UserController.getUser);

//********* API DOCUMENTATION **********
router.use('/docs/api.json',            express.static(path.join(__dirname, '/../public/v1/documentation/api.json')));
router.use('/docs',                     express.static(path.join(__dirname, '/../public/v1/documentation/dist/index.html')));
module.exports = router;
