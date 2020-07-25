import React,{useEffect, useState} from 'react';
import Axios from 'axios';
import {isAuthenticated} from '../components/Helper/auth';
import {useHistory} from 'react-router-dom';
 
function ItemDetails(props){
    let history=useHistory();
    const[itemDetails,setitemDetails]=useState([]);
    const [qty,setQty]=useState(1);

    const itemId=props.match.params.item_id;
    useEffect(()=>{
        Axios.get(`/api/auth/itemDetails?id=${itemId}&type=single`)
        .then(response=>{
            //console.log(response.data[0]);
            setitemDetails(response.data[0]);
        })
    },[]);

    const handleButton=(itemId)=>{
        
        if(isAuthenticated()){
           
            const userId=isAuthenticated()._id;
            const qt=qty;
            Axios.get(`/api/auth/cartDetails?userId=${userId}&itemId=${itemId}&qty=${qt}`)
            .then(response=>{
                //console.log('cartDetails response',response);
                history.push('/cart/'+userId);

            })
        }
        else{
            history.push('/login');
        }
    };

    const increment=()=>{
        var q=qty+1;
        console.log(q);
        setQty(q);
    };
    const decrement=()=>{
        var q=qty-1;
        console.log(q);
        setQty(q);
    };

    
    
    return(
        <div className="container">
            <div className="row">
                <div className="col s12 m6" style={{ padding:'20px' }}>
                    <img src={itemDetails.imageUrl} alt="An item" style={{  height:'100%'}} />
                </div>
                <div className="col s12 m6" style={{paddingBlockStart:'40px'}} >
                    <h5 className="pink-text"> {itemDetails.itemName} </h5>
                    <b>Rs. { itemDetails.price } </b> <br/>
                    <h6 style={{ paddingBlockStart:'20px' }}> <b>Description :</b>  { itemDetails.desc } </h6>
                    <b>Rating :</b> <b className="green-text">{ itemDetails.rating }*</b>      
                    Quantity:
                    <div style={{display: 'flex',alignItems: 'center', width:'200px',padding:'20px'}} >
                        <b>Quantity:</b> 
                        <button className="btn grey" onClick={()=>decrement()}>-</button>
                        <input name="quantity" value={qty} readOnly />
                        <button className="btn grey" onClick={()=>increment()} >+</button>
                    </div>
                    <div style={{ padding:'20px' }}>
                        <button className="btn pink" onClick={()=>handleButton(itemDetails._id)}>Add to Cart</button>
                    </div>
                    
                </div>
            
            
            </div>
        </div>
    )
}
export default ItemDetails


/*
import React from 'react';
import {connect} from 'react-redux';

class ItemDetails extends React.Component  {
    state={
        id:null,
        items:[
            {name:'Motorola', price:20000, rating:2.5 , id:1},
            {name:'One Plus', price:40000, rating:4 , id:2},
            {name:'Samsung', price:25000, rating:3 , id:3},
            {name:'Iphone', price:50000, rating:4.5 , id:4},
       ],
       item:{
            name:null,
            price:null,
           rating:null,
           id:null
       }
    }
    componentDidMount(){
        console.log(this.props);
        let id=this.props.match.params.item_id;
        let it=this.state.items.filter(i=>{
            return i.id == id
        });
        this.setState(Object.assign(this.state.item,{name:it[0].name,price:it[0].price,rating:it[0].rating,id:it[0].id}));

       
        //console.log(it[0].name);
        console.log(this.state.item);
        
    }
    render(){
        const item=this.props.item?(
            <div className="container">
                <h4>{this.props.item.name}</h4>
                <p><b>Description</b>
                    <br />
                price:  {this.props.item.price}  <br />
                rating: {this.props.item.rating}
            
                </p>
            </div>
        ):(
            <div>Loading item.......</div>
        )
        return(
            <div className="container">
                {item}
            </div>
        )
    }
}

const mapStateToProps=(state,ownProps)=>{
    let id=ownProps.match.params.item_id;
    //console.log(id);
    return{
        item:state.items.find(item=>item.id == id)
    }
}


export default connect(mapStateToProps)(ItemDetails)
*/