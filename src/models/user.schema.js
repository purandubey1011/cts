let mongoose = require('mongoose');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken')

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32,
        minlength: 2,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      },
    contact: {
        type: String,
        required: [true,"Contact number is required."],
        trim: true,
        maxlength: 10,
        minlength: 10,
        unique: true,
        match: /^[6-9]\d{9}$/,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32,
        minlength: 6,
        select:false
    },
    avatar: {
        type: String,
        default: 'https://imgs.search.brave.com/sHfS5WDNtJlI9C_CT2YL2723HttEALNRtpekulPAD9Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA2LzMzLzU0Lzc4/LzM2MF9GXzYzMzU0/Nzg0Ml9BdWdZemV4/VHBNSjl6MVljcFRL/VUJvcUJGMENVQ2sx/MC5qcGc',
    },
    date: {
        type: Date,
        default: Date.now
    },
    bio:{
        type:String
    },
    city:{
        type:String
    },
    country:{
        type:String
    },
    gender:{
        type:String
    },
    dateofbirth:{
        type:String
    },
    schoolcollege:{
        type:String
    },
    currentyeargrade:{
        type:String
    },
    percent:{
        type:String
    },
    boardtype:{
        type:String
    },
    refreshToken: {
        type: String,
        select:false
    }
},{timestamps: true});


userSchema.pre('save', async function () {

    if(!this.isModified('password')) return

    let salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hashSync(this.password, salt);
})

userSchema.methods.comparepassword = function(enteredPassword) {
    return bcrypt.compareSync(enteredPassword, this.password)
}

userSchema.methods.getjwttoken = function () {
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE
    })
};


module.exports = mongoose.model('User', userSchema);
