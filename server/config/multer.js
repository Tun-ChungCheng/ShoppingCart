const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, path.join("./files/"));
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname); // Windows OS doesn't accept files with a ":"
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload an image.", 400), false);
  }
};

exports.upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 6,
  },
  fileFilter: fileFilter,
});
