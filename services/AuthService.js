const bcrypt = require("bcryptjs");

const User = require("../db/models/mongo/userModel");

class AuthService {
    Login = async (email, password) => {
        const user = await User.findOne({
            email
        });
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Password does not match"
            });
        }
        return user;
    }

    Register = async (username, email, password) => {
        let user = await User.findOne({
            email
        });
        if (user) {
            return res.status(400).json({
                message: "User already exists"
            });
        }
        const newUser = await User.create({
            username,
            email,
            password: await bcrypt.hash(password, 10)
        });
        return newUser;
    }

    async Logout() {

    }
}

module.exports = new AuthService();