var express = require('express');
var router = express.Router();

router.post('/newApp',function(req,res){
  
})

router.get("/test",function(req,res,next){
  res.json({
    note:"hello test"
  })
})

module.exports = router;
