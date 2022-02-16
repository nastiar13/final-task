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
const { addMovies, getAllMovies } = require('../controllers/movies');
const {
  addCategory,
  addMovieCategories,
  getAllCategories,
} = require('../controllers/categories');

router.post('/register', register);
router.post('/login', login);
router.get('/check-auth', auth, checkAuth);
router.patch('/user', auth, editProfile);
router.patch('/user-photo', auth, upload.single('media'), editProfilePicture);

// movies

router.post('/movie', upload.single('media'), addMovies);
router.get('/movies', getAllMovies);

// categories

router.post('/category', addCategory);
router.post('/movie-categories', addMovieCategories);
router.get('/categories', getAllCategories);

module.exports = router;
