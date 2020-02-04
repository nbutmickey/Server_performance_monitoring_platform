var express = require('express');
var router = express.Router();
let userinfo= require("../service/userinfo");
let sha1 = require("sha1");
let createToken = require("../utils/createToken");
let _=require("loadsh");
let time=require("../utils/time");

// 登录
router.post('/login', async function (req, res, next) {
  let username = req.body.username;
  let password = sha1(req.body.password);
  let doc = await userinfo.findUser(username);
  if (!doc) {
    res.json({
      success: false,
      note: "用户名不存在!"
    })
  } else if (doc.password === password) {
    // 密码正确，生成一个token
    let token = createToken(username);
    doc.token = token;
    let result = await userinfo.saveUser(doc);
    if (result) {
      res.json({
        success: true,
        username,
        token,
        create_time: doc.create_time,
        note: "登录成功！"
      })
    } else {
      res.json({
        success: false,
        note: "内部错误！"
      })
    }
  } else {
    res.json({
      success: false,
      note: "密码错误！请重新输入。"
    })
  }
})

// 注册
router.post('/reg', async function (req, res, next) {
  let user=_.extend(req.body,{password:sha1(req.body.password),token: createToken(req.body.username),create_time: time.getNowTimeString()});
  let doc = await userinfo.findUser(user.username);
  if (doc) {
    res.json({
      success: false,
      note: "用户名或手机号已存在"
    })
  } else {
    let result = await userinfo.saveUser(user);
    if (result) {
      res.json({
        success: true,
        note: "恭喜你，注册成功!"
      })
    } else {
      res.json({
        success: false,
        note: "内部错误"
      })
    }
  }

})

module.exports = router;
