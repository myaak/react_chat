const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller.last')


router.post('/reg', userController.registration);

module.exports = router;
