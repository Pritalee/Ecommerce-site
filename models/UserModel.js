const mongoose = require("mongoose");

var UserSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        default:0
    },
    cart:{
        type:Array,
        default:[]
    },
    wishlist:{
        type:Array,
        default:[]

    },
    orders:{
        type:Array,
        default:[]
    }
},

    {timestamps:true}
    
);

module.exports = mongoose.model("User", UserSchema);