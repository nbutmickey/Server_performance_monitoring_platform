let jwt=require("jsonwebtoken");
module.exports=function (username) {
    const token=jwt.sign({username:username},"mickey_2020",{expiresIn:'18000s'});
    return token;
}