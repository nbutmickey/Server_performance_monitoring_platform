var express = require('express');
var router = express.Router();
let { findApp } = require("../db/model/App");
let { createClientID } = require("../utils/createID");

router.get('/clientID', async function (req, res, next) {
  let appID = req.query.appID;
  let result = await findApp(appID);
  if (result) {
    let clientID = createClientID();
    res.json({
      success: true,
      clientID: clientID
    });
  }

});

router.post('/', function (req, res, next) {
  let performance_info = req.body;
  console.log(JSON.parse(performance_info.performnce).trans);
})


module.exports = router;