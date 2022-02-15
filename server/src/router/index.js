const router = require('express').Router();

const { register, login, checkAuth } = require('../controllers/users');
const { auth } = require('../middlewares/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/check-auth', auth, checkAuth);

module.exports = router;
