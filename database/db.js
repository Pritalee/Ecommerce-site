var mongoose=require('mongoose');

const connectDb=async()=>{
try{
mongoose.connect('<add the url from mongodb >',{useNewUrlParser: true,useUnifiedTopology: true });
console.log('connected to db');

}
catch(e){
    console.log(e);
    throw e;
}
};

module.exports= connectDb;