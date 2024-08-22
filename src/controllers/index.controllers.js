const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors")
const User = require("../models/user.schema.js")
const ErorrHandler = require("../utils/ErrorHandler")
const { sendtoken } = require("../utils/sendtoken")


exports.homepage = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "Welcome to crosstheskylimits"
    })
})

exports.signup = catchAsyncErrors(async (req, res, next) => {
    
    const {name, email, contact, password,avatar,date } = req.body

    if (
        [name, email, contact, password].some((field) => field?.trim() === "")
    ) {
        throw new ErorrHandler("User details required", 401)
    }

    const existedUser = await User.findOne({
        $or: [{ contact }, { email }]
    })

    if (existedUser) {
        throw new ErorrHandler("User with this email or contact already exists",409)
    }

    const user = await User.create({
        name,
        email, 
        contact,
        date,
        avatar: avatar,
        password,
    })
    // await user.save()

    sendtoken(user,200,res)
})

exports.signin = catchAsyncErrors(async (req, res, next) => {
    // user found login
    let user = await User.findOne({email:req.body.email}).select("+password").exec()

    // if user not found
    if(!user) return next(new ErorrHandler("User not found with this email address", 404))
    
    // if password is incorrect
    const isMatch = await user.comparepassword(req.body.password)
    if(!isMatch) return next(new ErorrHandler("Incorrect password", 400))

    sendtoken(user,200,res)     
})

exports.signout = catchAsyncErrors(async (req, res, next) => {
    res.clearCookie("token");
    res.json({ message: "Successfully signout!" });
})

exports.currentuser = catchAsyncErrors(async (req, res, next) => {
    let user = await User.findById(req.id).exec()

    // if user not found
    if(!user) return next(new ErorrHandler("User not found", 404))

    res.json({ success:true,user:user})
})
exports.edituser = catchAsyncErrors(async (req, res, next) => {
    let user = await User.findByIdAndUpdate(req.params.id,req.body)

    // if user not found
    if(!user) return next(new ErorrHandler("User not found", 404))

    res.json({ success:true,user:"user update successfully"})
})