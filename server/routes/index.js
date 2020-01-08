var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/cookie', function (req, res, next) {
  let AppID = req.query.AppID;
  res.status(200).send({ cookie: '12312312' });
});

// router.get('/imgReport', function (req, res, next) {
//   let options = {
//     root: __dirname + '/public/images',
//     dotfiles: 'deny',
//     headers: {
//       'x-timestamp': Date.now(),
//       'x-sent': true
//     }
//   };
//   res.sendFile('img_test.jpg', options, function (err) {
//     if (err) {
//       next(err);
//     } else {
//       console.log("success succes");
//     }
//   });
// });


router.post('/', function (req, res, next) {
  let performance_info = req.body;
  console.log(JSON.parse(performance_info.performnce).trans);
})
module.exports = router;
