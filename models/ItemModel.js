const mongoose=require('mongoose');
const Schema = mongoose.Schema;

var ItemSchema=new mongoose.Schema({
    
    imageUrl:{
        type:String
    },
    itemName:{
        type:String,
        maxlength:100
    },
    price:{
        type:String,
        
    },
    desc:{
        type:String,
    },
    rating:{
        type:String,
       
    }

},{timestamps:true});

ItemSchema.index({
    itemName:'text',
    desc:'text'
},{
    weights:{
        itemName:5,
        desc:1
    },
});


module.exports=mongoose.model('ItemSchema',ItemSchema);