const User = require("../../models/user.model");
const md5 = require("md5");

const generateHelper = require("../../helpers/generate.helper");

module.exports.register = async (req, res) => {
    const user = req.body;

    const existUser = await User.findOne({
        email: user.email,
        deleted: false
    });

    if (existUser) {
        res.json({
            code: "error", 
            message: "Email đã tồn tại trong hệ thống!"
        });
        return;
    }

    const dateUser = {
        fullName: user.fullName, 
        email: user.email, 
        password: md5(user.password), 
        token: generateHelper.generateRandomString(30)
    }

    const newUser = new User(dateUser);
    await newUser.save();

    res.json({
        code: "success", 
        message: "Đăng kí thành công!",
        token: newUser.token
    });
}