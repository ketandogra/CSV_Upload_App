const express = require("express");
const router = express.Router();
// importing multer
const multer = require("multer");

// importing controllers

const homeController = require("../controllers/homeController");
const fileController = require("../controllers/fileController");


// storage gives full control how to store file in disk

// upload storage configurations
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads/files");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

//creating upload instance(middleware)
const upload = multer({ storage });

router.get("/", homeController.homePage);

router.post("/upload", upload.single("csvFile"), fileController.upload);

router.get("/view/:id",fileController.view);
router.get("/delete/:id",fileController.delete);

module.exports = router;
