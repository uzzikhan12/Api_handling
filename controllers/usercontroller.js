const userModel = require('../model/usermodel');

const UserController = {
    GetAll: async (req, resp) => {
        try {
            let result = await userModel.find({});
            resp.status(200).send({
                isSuccessfull: true,
                data: result,
                message: "Data fetched successfully"
            });
        }
        catch (err) {
            resp.status(500).send({
                isSuccessfull: false,
                data: null,
                error: err.message,
                message: "Internal server error"
            });
        }
    },

    GetId: async (req, resp) => {
        try {
            let id = req.params.id;
            let result = await userModel.findById(id);
            resp.status(200).send({
                isSuccessfull: true,
                data: result,
                message: "Data fetched successfull"
            });
        }
        catch (err) {
            resp.status(500).send({
                isSuccessfull: false,
                data: null,
                error: err.message,
                message: "Internal server error",
            });
        }
    },

    Post: async (req, resp) => {
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
            });

            if (existingUser) {
                resp.status(409).send({
                    isSuccessfull: false,
                    data: null,
                    message: "user already exists with this email"
                });
                return;
            }

            let userObj = new userModel(obj);
            userObj.save().then((result) => {
                resp.status(201).send({
                    isSuccessfull: true,
                    data: result,
                    message: "User added successfully"
                });
            })
                .catch((error) => {
                    throw error
                });

        } catch (err) {
            resp.status(500).send({
                isSuccessfull: false,
                data: null,
                message: "Internal server error",
                error: err.message
            })
        }
    },

    Edit: async (req, resp) => {
        try {
            let id = req.params.id;
            let body = {
                ...req.body,
                updated_at: new Date()
            }
            userModel.findByIdAndUpdate(id, body, { new: true })
                .then((result) => {
                    resp.status(200).send({
                        isSuccessfull: true,
                        data: result,
                        message: "user update successfully"
                    });
                })
                .catch((error) => {
                    throw error
                })
        }
        catch (err) {
            resp.status(500).send({
                isSuccessfull: false,
                data: null,
                message: "Internal server error",
                error: err.message
            });
        }
    },

    Delete: async (req, resp) => {
        try {
            let id = req.params.id;
            userModel.findByIdAndDelete(id)
            .then((result)=>{
                resp.status(200).send({
                    isSuccessfull:true,
                    data:result,
                    message:"User delete successfully"
                });
            })
            .catch((err)=>{
                throw err
            });
        } catch (error) {
            resp.status(500).send({
                isSuccessfull:false,
                data:null,
                message:"Internal server error",
                error:error.message
            })
        }
    }
}

module.exports = UserController;