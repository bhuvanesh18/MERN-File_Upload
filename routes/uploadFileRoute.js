const express = require('express');
const router = express.Router();
const { uploadFileController }= require('./../controllers/uploadFileController');

router.route('/').post(uploadFileController);

module.exports = router;