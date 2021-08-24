const {RegisterValidation, LoginValidation} = require("../../validations/AuthValidation")
const AuthService = require("../../services/AuthService")
class AuthController {
    Register = async (req, res) => {
        
        const errors = await RegisterValidation(req, res);

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({
                errors: errors
            });
        }

        const { username, email, password } = req.body;
        try{
            const user = await AuthService.Register(username, email, password);
            if (!user) {
                return res.status(400).json({
                    message: "User not found"
                });
            }
            return res.status(200).redirect('/user/login');
        }catch (error){
            console.log(error.message);
            res.status(500).send("Error in Saving");
        }
    }

    Login = async (req, res) => {
    
        const errors = await LoginValidation(req, res);

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({
                errors: errors
            });
        }
        
        const { email, password } = req.body;
        try{
            const user = await AuthService.Login(email, password);
            let sess = req.session
            sess.token = user._id;
            return res.status(200).redirect('/');
        } catch (error){
            console.log(error.message);
            res.status(500).send("Error in Saving");
        }
    }
}

module.exports = new AuthController();