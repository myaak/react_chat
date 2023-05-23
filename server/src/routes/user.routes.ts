const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller.last')
const {body} = require('express-validator')


router.post('/reg', 
  userController.registration
);

  //userController.registration
router.post('/login',
  userController.login
);

router.post('/logout',
  userController.logout
);

module.exports = router;
