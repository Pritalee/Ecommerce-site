import React,{useEffect,useState} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom';


//import { Card } from 'antd';

function CartDetails(props){
    const [CartItems,setCartItems]=useState([]);
    const [ItemQuantity,setItemQuantity]=useState([]);
    const [total,setTotal]=useState(0);
    let history=useHistory();
    const userId=props.match.params.user_id;
    //console.log(props);
    useEffect(()=>{
        const data={
            userId:userId
        };
        getCartData(data);
    },[]);

    const getCartData=(data)=>{
        Axios.post('/api/auth/getCartItems',data)
        .then(response=>{
            //console.log('cartItems',response);
            setCartItems(response.data.itemDetails);
            setItemQuantity(response.data.quant);
           
        })
        .catch(err=>{
            console.log('cartItems ',err)
        });

    };

    const handleRemove=(id)=>{
        const data={
            userId:userId,
            itemId:id
        };
        getCartData(data);


    };

    const calc=()=>{
        var t=0;
        if(CartItems.length && ItemQuantity.length){
            CartItems.map((element,index)=>{
                t=t+parseInt(element.price,10)*parseInt(ItemQuantity[index].quantity,10);
                
            })  
            console.log('total',t);   
            //setTotal(t);    
            
            return(
                <div>
                   <h5><b> Total:Rs. {t} </b></h5>
                </div>
        
            )

        }
        else{
            return(
                <p>Total = 0</p>
            )
        }
        
    };

    const handlePayment=()=>{

        Axios.post('/api/auth/paytm');
        /*
        const data = {
			purpose: 'Bid Payment',
			amount: '100',
			buyer_name: 'Prats',
			email: 'prats@gmail.com',
			phone: '7738248131',
			user_id: userId,
			redirect_url: `http://localhost:5000/api/auth/callback?user_id=${userId}`,
            webhook_url: '/webhook/',
            userId:userId
		};
        Axios.post('/api/auth/payment',data)
        .then(response=>{
            console.log(response.data);
            //history.push(response.data);
            window.location.href=response.data;

        })
        .catch(err=>{
            console.log('payment',err)
        })*/

    }


    const display=CartItems.length?(
            CartItems.map((element,index)=>{
                var qty=ItemQuantity[index];
            return(
                <div className="card"  key={index}  style={{ height: '180px' }}>
                    <div className="card-image" style={{padding:'10px'}}>
                        <img src={element.imageUrl} alt="An item"  style={{ width:'80px', height:'120px'}}/>
                    </div>
                    <div className="row" style={{paddingLeft:'20px'}}>
                        <Link to={'/item/'+element._id}>
                            <p> {element.itemName} </p>
                        </Link>
                        <p>Price:<b> {element.price} </b></p>
                        <p>Quantity:<b> {qty &&  qty.quantity} </b></p>
                        
                        <button className="btn pink" onClick={()=>handleRemove(element._id)}>Remove</button>
                    </div>
                            
                </div>

                )          
            })
            

    ):(<p> You dont have an item in the cart.</p>)

   
  
   
   return(
    <div className="container">
        <h5 className="center">Cart Details </h5>
        <h6 className="center"><b>Items</b></h6>
        <div className="container">
            {display}
            </div>
        <div style={{position:'absolute',
            left:'100',
            bottom:'0',
            right:'0',
            padding:'40px'}}>
                {calc()}
                <button className="btn black" onClick={()=>handlePayment()}>Pay Now</button>                
        </div>
            
        
        
                 
    </div>
   

   )
}


export default CartDetails