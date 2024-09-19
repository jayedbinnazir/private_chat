const path = require("node:path");
const multer = require("multer");

const uploader = (subfolderpath, mimeTypes, fileSize, allowMessage) => {
  const uploadPath = path.join(__dirname + "/../public/uploads", subfolderpath);
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const filename =
        file.originalname.replace(fileExt, "").split(" ").join("-") +
        Date.now();
      cb(null, filename + fileExt);
    },
  });

  const upload = multer({
    storage,
    limits: {
      fileSize: fileSize,
    },
    fileFilter: (req, file, cb) => {
      if (mimeTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error(allowMessage));
      }
    },
  });

  return upload;
};

module.exports = uploader;
// e.g.
//  req.files['avatar'][0] -> File
//  req.files['gallery'] -> Array
//
// req.body wi
