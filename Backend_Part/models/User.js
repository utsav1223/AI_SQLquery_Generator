// const mongoose = require('mongoose')

// const userSchema = new mongoose.Schema(
//     {
//         name : {type: String, required: true, trim: true},
//         email : {type: String, required: true, unique: true, lowercase: true, trim: true},
//         password : {type: String, default: null},
//         googleID : {type: String, default:null},
//         role : {type: String, enum:["admin","user"],default:"user"},
//         isVerified : {type: Boolean, default:false},
//         lastLogin : {type:Date},

//     },
//     {timestamps:true}
// )
// const User = new mongoose.model("User",userSchema)
// export default User;











const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      default: null
    },
    googleId: {
      type: String,
      default: null
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user"
    },
    resetPasswordToken: {
      type: String
    },

    resetPasswordExpire: {
      type: Date
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
