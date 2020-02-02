let UserInfo= require("../db/model/User");
const findUser = (username) => {
    return new Promise((resolve, reject) => {
        UserInfo.findOne({ username: username }, (err, result) => {
            
            try {
                if (result !== null) {
                    resolve(result);
                } else {
                    resolve(false);
                }
            } catch (error) {
                reject(error);
            }
        })
    })
}

const saveUser = (userdata) => {
    let user = new userInfo({
        username: userdata.username,
        phonenumber:userdata.phonenumber,
        password: userdata.password,
        token: userdata.token,
        create_time: userdata.create_time
      });
    return new Promise((resolve, reject) => {
        user.save((err) => {
            try {
                resolve(true);
            } catch (error) {
                reject(false);
            }
        })
    })
}

module.exports={
    findUser,
    saveUser
}