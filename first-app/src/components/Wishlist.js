import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import logo from '../logo192.png';

class Wishlist extends React.Component{
    render(){     
        let items=this.props.wishlist;
        console.log(items);
        const itemList= items.length?( items.map(item=>{
          //if(item.price>20000){
            console.log(item[0].id);
          return(
            <div className="col s12 m4" key={item[0].id}>
            <div className="card">
                <div className="card-image">
                    <img src={logo} alt="An item"/>
                </div>
                <div className="row">
                    <Link to={'/'+item.id}>
                        <div className="card-title blue-text">{item[0].name}</div>
                    </Link>
                    <div className="card-content">
                        <p>Price: {item[0].price}</p> 
                        <p>Rating: {item[0].rating}</p>                
                    </div>
                    
                    <button className="btn blue" onClick={()=>{this.handleCart(item[0].id)}}>Add to Cart</button>
                    <button className="btn green" onClick={()=>{this.handleWishlist(item[0].id)}}>Add to Wishlist</button>
                </div>

            </div>    
          </div>
       
  )
  })
  ):(
      <p> You do not have any item in the cart </p>
  
  )
       
        
      return(
          <div className="todo container">
              <div className="row" >
                {itemList}
              </div>
          </div>
      )}
  }
    
   

const mapStateToProps=(state)=>{
        return {
          wishlist:state.wishlist
        }
      }

export default connect(mapStateToProps)(Wishlist)