const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const userController = require('../controllers/user');

router.post('/api/auth/signup', userController.signup);
router.post('/api/auth/login', userController.login);
router.get('/user/me', auth, userController.getProfile);
router.delete('/user/me', auth, userController.deleteProfile);
router.put('/user/me', auth, userController.updateProfile);

module.exports = router;