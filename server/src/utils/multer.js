const multer = require('multer');
const path = require('path');

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let extension = path.extname(file.originalname);
    if (
      extension.toLowerCase() !== '.jpg' &&
      extension.toLowerCase() !== '.png' &&
      extension.toLowerCase() !== '.svg' &&
      extension.toLowerCase() !== '.jpeg' &&
      extension.toLowerCase() !== '.webp' &&
      extension.toLowerCase() !== '.mp4' &&
      extension.toLowerCase() !== '.mkv'
    ) {
      cb(new Error('File extension is not supported'));
      return;
    }
    cb(null, true);
  },
});
