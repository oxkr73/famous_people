const express = require("express");
const router = express.Router();
const famousCtrl = require("../controllers/famousCtrl").famousCtrl;

router.get("/famous/:year", famousCtrl.index);
router.get("/famous/:year/centuries", famousCtrl.centuries);

module.exports = router;
