exports.sendtoken = async(user,statuscode,res)=>{
    let token =await user.getjwttoken();

    let options = {
        expire:new Date(
            Date.now() + process.env.COOKIE_EXPIRE *24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production'
    }

    res.status(statuscode)
    .cookie("token",token,options)
    .json({
        success:true,
        id:user._id,
        token  
    })
} 