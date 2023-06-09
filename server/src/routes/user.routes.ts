const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')


router.post('/reg', userController.registration);
router.post('/login', userController.login);

router.post('/logout', userController.logout);

module.exports = router;
