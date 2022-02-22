const router = require('express').Router();
const upload = require('../utils/multer');
const {
  register,
  login,
  checkAuth,
  editProfile,
  editProfilePicture,
} = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const {
  addMovies,
  getAllMovies,
  editMovie,
  getMovies,
} = require('../controllers/movies');
const {
  addCategory,
  addMovieCategories,
  getAllCategories,
} = require('../controllers/categories');
const {
  isBuy,
  addTransaction,
  getAllTransactions,
  editTransaction,
  getTransactions,
  getSuccessTransactions,
} = require('../controllers/transactions');

router.post('/register', register);
router.post('/login', login);
router.get('/check-auth', auth, checkAuth);
router.patch('/user', auth, editProfile);
router.patch('/user-photo', auth, upload.single('media'), editProfilePicture);

// movies

router.post('/movie', upload.single('media'), addMovies);
router.get('/movies', getAllMovies);
router.get('/movie/:id', getMovies);
router.patch('/movie/:id', editMovie);
router.patch('/movie-image/:id', upload.single('media'), editMovie);

// categories

router.post('/category', addCategory);
router.post('/movie-categories', addMovieCategories);
router.get('/categories', getAllCategories);

// transactions
router.get('/buy/:id', auth, isBuy);
router.post('/transaction', upload.single('media'), addTransaction);
router.get('/transactions', getAllTransactions);
router.patch('/transaction/:id', editTransaction);
router.get('/user-transactions', auth, getTransactions);
router.get('/success-transactions', auth, getSuccessTransactions);

module.exports = router;
