const UserModel = require("../Models/User");
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const signup = async (req, res) => {
    try {
        const {
            name,
            email,
            password
        } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }
        //checking user exist or not
        const existingUser = await UserModel.findOne({
            email
        });
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists",
                success: false
            });
        }
        const userModel = new UserModel({
            name,
            email,
            password
        })
        userModel.password = await bcrypt.hash(password, 10)
        await userModel.save();
        res.status(201)
            .json({
                message: 'signup successfully',
                success: true
            })
    } catch (err) {
        res.status(500)
            .json({
                message: 'internal server error' + err,
                success: false
            })
    }
}

const login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password required",
                success: false
            });
        }

        const user = await UserModel.findOne({
            email
        });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Invalid credentials or incorrect password",
                success: false
            });
        }
        const jwtToken = jwt.sign({
                email: user.email,
                _id: user._id,
                name: user.name
            },
            process.env.JWT_SECRET, {
                expiresIn: '24h'
            }

        )
        res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToken,
            email,
            name: user.name
        });

    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

module.exports = {
    signup,
    login
}