const express=require('express');
const router=express.Router();
const {signupValidator,resultValidator}=require('../middleware/validator');
const {signupController,loginController}=require('../controller/authController');
const User=require('../models/UserModel');
const ItemSchema=require('../models/ItemModel');
const Insta=require('instamojo-nodejs');
const url=require('url');
const checksum_lib = require('./Paytm_Node_Checksum-master/PaytmChecksum');


router.post('/signup',signupValidator,resultValidator,signupController);
router.post('/login',signupValidator,resultValidator,loginController);

router.post('/uploadItem',(req,res)=>{
    
    
    const item=new ItemSchema();
    const {imageUrl,itemName,price,desc,rating}=req.body;
    item.itemName=itemName;
    item.imageUrl=imageUrl;
    item.price=price;
    item.desc=desc;
    item.rating=rating;
    //console.log('Item:',item);
    
    item.save((err)=>{
        if (err) return res.status(400).json({errorMessage:err})
        return res.json({successMessage:'Item uploaded successfully'})
    });
    
});

router.post('/getItems',(req,res)=>{
    //console.log('filter in server',req.body);
    let findArgs={
        company:[]
    };
   if(req.body.company){
   findArgs.company=req.body.company;

    //console.log("findArgs:",findArgs);
   }
   //.find({company:{$in:findArgs.company}})
    let term=req.body.terms;
    if(term){
        ItemSchema
        .find({ $text: { $search: term } })
        //.find(findArgs)
        .sort(req.body.sortBy)
        .exec((err,items)=>{
            //console.log("items from server:",items);
            if (err) return res.status(400).json({errorMsg:err})
            return res.status(200).json({success:true,items})
    }); 
    
    }
    else{
        ItemSchema.find({company:{$in:findArgs.company}})
        .sort(req.body.sortBy)
        .exec((err,items)=>{
            //console.log("items from server:",items);
            if (err) return res.status(400).json({errorMsg:err})
            return res.status(200).json({success:true,items})
    }); 

    }
    
});


router.get('/itemDetails',(req,res)=>{
    var type=req.query.type;
    var itemId=req.query.id;
    ItemSchema.find({'_id':itemId})
    .exec((err,item)=>{
        if (err) return req.status(400).send(err)
        return res.status(200).send(item)
    });
})


router.get('/cartDetails',(req,res)=>{
    //console.log('cartDetails server',req.query.itemId);
    //console.log('cartDetails server',req.query.userId);
    var qty=req.query.qty;
    console.log('qty:',qty)
    User.findOneAndUpdate({_id:req.query.userId},
    {
        $push:{
            cart:{
                itemId: req.query.itemId,
                quantity:qty
            }
        }
    },
    {new:true},
    (err,user)=>{
        if (err) return req.status(400).send(err)
        //console.log(user.cart);
        return res.status(200).send({success:true})
    }
    )
    
});

router.post('/getCartItems',(req,res)=>{
    if(req.body.itemId){
        User.findOneAndUpdate({_id:req.body.userId},
            {
                "$pull":{
                    "cart":{
                        "itemId":req.body.itemId
                    }
                }
            },
        {multi:true},
        (err,user)=>{
            if (err) return res.status(500).json( {errorMsg:err} );
            //console.log(user.cart);
            //return res.json({success:true,user})
        });

    }
    User.findOne({_id:req.body.userId},(err,user)=>{
        if(err) return res.status(500).json( {errorMsg:err} );
        var cart=user.cart;
        var cartItems=cart.map(item=>{
            return item.itemId
        })

        ItemSchema.find({_id:{$in:cartItems}},(err,itemDetails)=>{
                if(err) return res.status(500).json( {errorMsg:err} );
                var quant=itemDetails.map(element=>{
                    //console.log('itemdetails element:',element);
                    return cart.find(el=>el.itemId==element._id);                   
                });
                //console.log('quant',quant);
                return res.json({success:true,itemDetails,quant})
            });
    });
});


router.post('/payment',(req,res)=>{
    Insta.setKeys('test_b9f57cbcab92912146266fd9abe', 'test_fc048d6aff261954744c74e3cc4');
    var data = new Insta.PaymentData();
    data.purpose =  req.body.purpose;
	data.amount = req.body.amount;
	data.buyer_name =  req.body.buyer_name;
	data.redirect_url =  req.body.redirect_url;
	data.email =  req.body.email;
	data.phone =  req.body.phone;
	data.send_email =  false;
	data.webhook= 'http://www.example.com/webhook/';
	data.send_sms= false;
    data.allow_repeated_payments =  false;
    console.log('userid-',req.body.userId)
    
    Insta.isSandboxMode(true);
    Insta.createPayment(data, function(error, response) {
    if (error) {
        console.log(error);
        // some error
    } else {
        // Payment redirection link at response.payment_request.longurl
        const responseData = JSON.parse( response );
			const redirectUrl = responseData.payment_request.longurl;
			console.log( redirectUrl );

			res.status( 200 ).json( redirectUrl );
    }
});

});

router.get('/callback/',(req,res)=>{
    let url_parts=url.parse(req.url,true);
    responseData=url_parts.query;
    //console.log('url_parts',url_parts);
    if(responseData.payment_id){
        User.findOneAndUpdate({_id:responseData.user_id},
            {
                $push:{
                    orders:responseData
                }
            },
            {new:true})
            .then((user)=>res.json(user))
            .catch((err)=>res.json(err));
            res.redirect('http://localhost:3000/payment')
    }
});

router.post('/paytm',(req,res)=>{
    var userId='5eeb89551e3dd31fc4928cf9';
    var paytmParams = {

		/* Find your MID in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys */
		"MID" : "yziqAu38638518649768",

		/* Find your WEBSITE in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys */
		"WEBSITE" : "WEBSTAGING",

		/* Find your INDUSTRY_TYPE_ID in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys */
		"INDUSTRY_TYPE_ID" : "Retail",

		/* WEB for website and WAP for Mobile-websites or App */
		"CHANNEL_ID" : "WEB",

		/* Enter your unique order id */
		"ORDER_ID" : "5eeb89551e3dd31fc4928cf9"+(new Date().getTime() ) ,

		/* unique id that belongs to your customer */
		"CUST_ID" : "5eeb89551e3dd31fc4928cf9",

		/* customer's mobile number */
		"MOBILE_NO" : "7738248131",

		/* customer's email */
		"EMAIL" : "prats@gmail.com",

		/**
		* Amount in INR that is payble by customer
		* this should be numeric with optionally having two decimal points
		*/
		"TXN_AMOUNT" : "100",

		/* on completion of transaction, we will send you the response on this URL */
		"CALLBACK_URL" : `http://localhost:5000/api/auth/callback?user_id=${userId}`,
    };
    checksum_lib.generateSignature(paytmParams, "FtbbfHRl4w60ujTI", function(err, checksum){
            console.log('checksum',checksum);
    })

})





module.exports=router;