const express = require('express');
const apiCtrl = require('../controller/apiCtrl.js');
const router = express.Router();
const fileconfig = require("../dir");
const multer = require('multer');
const FileUploader = require('../middleware/upload.js')
const path = require("path")
// trending

const Uploader = new FileUploader(path.join(fileconfig.BASEURL))

router.post("/add", apiCtrl.Addtoken);
router.get("/get", apiCtrl.GetData);
router.post('/remove', apiCtrl.Removetoken);
router.get('/track', apiCtrl.GetPrice);
router.post('/search', apiCtrl.GetToken);
router.post('/optionlist', apiCtrl.GetOptionlist);
router.post('/getChartData', apiCtrl.getChartData);
router.post('/tradingHistory', apiCtrl.getTradingHistory);
router.post('/UploadAds', multer({ storage: Uploader.storage, fileFilter: Uploader.filter }).any(), apiCtrl.imageMulti, apiCtrl.UploadAds);
router.post('/getAds', apiCtrl.getAds);

module.exports = router;