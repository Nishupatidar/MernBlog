const User_Register = require('../Model/Signup_model')
const bcrypt = require('bcryptjs')
const User_details_controller = async (req, res) => {
    try {
        const User_details = await User_Register.find({})
        res.json({ "userdetails": User_details, success: true })
    }
    catch (error) {
        console.log(error)
    }
}
const Delete_user_details = async (req, res) => {
    try {
        const userdelete = await User_Register.findByIdAndDelete({ _id: req.params.udid })
        res.json({ "message": "User Succefull Delete", sucess: true })

    }
    catch (error) {
        console.log(error)
    }
}
const Edit_user_details = async (req, res) => {
    try {

        const useredits = await User_Register.findById({ _id: req.params.ueid })
        res.json({ "useredit": useredits })
    }
    catch (error) {
        console.log(error)
    }
}
const Update_user = async (req, res) => {
    try {



        bcrypt.hash(req.body.password, 10, async (err, hash) => {
            if (err) {
res.json({"message":"Invaild Password",success:true})
            }
            else {
                req.body.password = hash
                const { username, email, password, role, description } = req.body
                const updated_at = new Date()
                const response = await User_Register.findByIdAndUpdate({ _id: req.body._id }, { username, email, password, role, description,updated_at })
               res.json({"message":"User Update Successfully" , success:true})
            }
        })
    }
    catch (error) {
        console.log(error)
    }

}
module.exports = { User_details_controller, Delete_user_details, Edit_user_details, Update_user }