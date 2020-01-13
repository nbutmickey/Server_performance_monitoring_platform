var express = require('express');
var router = express.Router();

router.get('/cookie', function (req, res, next) {
    let AppID = req.query.AppID;
    res.status(200).send({ cookie: '12312312' });
  });
  
router.post('/', function (req, res, next) {
    let performance_info = req.body;
    console.log(JSON.parse(performance_info.performnce).trans);
  })


module.exports = router;