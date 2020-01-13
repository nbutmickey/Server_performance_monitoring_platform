var express = require('express');
var router = express.Router();
const User=require("../db/model/User");
var sha1=require("sha1");
var createToken=require("../utils/createToken");

const findUser=(username)=>{
  return new Promise((resolve,reject)=>{
    User.findOne({username:username},(err,result)=>{
      if(err){
        console.log(err);
        reject(err);
      }
      resolve(result);
    })
  })
}

const saveUser=(user)=>{
  return new Promise((resolve,reject)=>{
    user.save((err)=>{
      if(err){
        console.log(err);
        reject(false)
      }
      resolve(true);
    })
  })
}

// 登录
router.post('/login',async function (req,res,next) {
  let username=req.body.username;
  let password=sha1(req.body.password);
  let doc=await findUser(username);
  if(!doc){
    res.json({
      success:false,
      note:"用户名不存在!"
    })
  }else if(doc.password==password){
    // 密码正确，生成一个token
    let token=createToken(username);
    doc.token=token;
    let result=await saveUser(doc);
    if(result){
      res.json({
        success:true,
        username,
        token,
        create_time:doc.create_time,
        note:"登录成功！"
      })
    }else{
      res.json({
        success:false,
        note:"内部错误！"
      })
    }
  }else{
    res.json({
      success:false,
      note:"密码错误！请重新输入。"
    })
  } 
})

// 注册
router.post('/reg',async function(req,res,next){
  let user=new User({
    username:req.body.username,
    phonenumber:req.body.phonenumber,
    password:sha1(req.body.password),
    token:createToken(this.username),
    create_time:Date.now()
  });
  console.log(user);
  let doc=await  findUser(user.username);
  if(doc){
    res.json({
      success:false,
      note:"用户名或手机号已存在"
    })
  }else{
    let result=await saveUser(user);
    if(result){
      res.json({
        success:true,
        note:"恭喜你，注册成功!"
      })
    }else{
      res.json({
        success:false,
        note:"内部错误"
      })
    }
  }

})

module.exports = router;
