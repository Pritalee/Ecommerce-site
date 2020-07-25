const express=require('express');
const app=express();
const connectDb=require('./database/dbconfig');
const cors=require('cors');
const morgan=require('morgan');
const authRoute=require('./routers/authRoute');


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/api/auth',authRoute);

connectDb();
/*
app.get('/',(req,res)=>{
    console.log('inside node');
    res.send('inside node');
});
*/
const port=process.env.PORT || 5000;

app.listen(port,'0.0.0.0',()=>
    console.log('listening to port',port));