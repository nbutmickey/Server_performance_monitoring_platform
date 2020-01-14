var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userInfo = new Schema({
    username: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    create_time: {
        type: Date,
    }
})

const findUser = (username) => {
    return new Promise((resolve, reject) => {
        User.findOne({ username: username }, (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            if (result !== null) {
                resolve(true);
            } else {
                resolve(false);
            }
        })
    })
}

const saveUser = (user) => {
    return new Promise((resolve, reject) => {
        user.save((err) => {
            if (err) {
                console.log(err);
                reject(false)
            }
            resolve(true);
        })
    })
}

// 创建一个model
var UserInfo = mongoose.model("userInfo", userInfo);

module.exports = { UserInfo, findUser, saveUser };