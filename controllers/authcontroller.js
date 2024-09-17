const userModel = require("../model/usermodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const AuthController = {
    signup: async (req, resp) => {
        try {
            let body = req.body;
            let obj = {
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                password: body.password
            }

            let existingUser = await userModel.findOne({
                email: obj.email
            })

            if (existingUser) {
                resp.status(409).send({
                    isSuccessfull: false,
                    data: null,
                    message: "Email already exists"
                });
                return;
            } else {
                obj.password = await bcrypt.hash(obj.password, 10);

                let userObj = new userModel(obj);
                userObj.save()
                    .then((result) => {
                        resp.status(201).send({
                            isSuccessfull: true,
                            data: result,
                            message: "User created successfully"
                        });
                    })
                    .catch((err) => {
                        throw err;
                    })
            }

        } catch (error) {
            resp.status(500).send({
                isSuccessfull: false,
                data: null,
                message: "Internal server error",
                error: error.message
            })
        }
    },

    login: async (req, resp) => {
        try {
            let body = req.body;
            let existingUser = await userModel.findOne({ email: body.email });

            if (!existingUser) {
                resp.status(401).send({
                    isSuccessfull: false,
                    data: null,
                    message: "Invalid Credentials"
                });
                return;
            } else {
                let isCorrectPass = await bcrypt.compare(
                    body.password,
                    existingUser.password
                )

                if (isCorrectPass) {
                    resp.status(200).send({
                        isSuccessfull: true,
                        data: existingUser,
                        message: "User login successfully",
                        token: await jwt.sign(
                            { ...existingUser },
                            process.env.SECURITY_KEY
                        )
                    });
                }
            }

        } catch (error) {
            resp.status(500).send({
                isSuccessfull: false,
                data: null,
                message: "Internal server error"
            });
        }
    },

    protected: async (req, res, next) => {
        let token = req.headers?.authorization?.split(" ")[1];
        if (!token) {
            res.status(401).send({
                isSuccessfull: false,
                message: "User Unauthorized",
                data: null,
            });
            return;
        }

        const loggedInUser = await jwt.verify(token, process.env.SECURITY_KEY);
        console.log(loggedInUser);
        if (loggedInUser?._doc) {
            next();
        } else {
            res.status(401).send({
                isSuccessfull: false,
                message: "User Unauthorized",
                data: null,
            });
        }
    },
}

module.exports = AuthController;