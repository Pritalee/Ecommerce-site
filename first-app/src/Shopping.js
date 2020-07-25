import React from 'react';
import {Link} from 'react-router-dom';
import logo from './logo192.png';
import {connect} from 'react-redux';

const Shopping=({items,deleteItem}) => {
    //console.log(props);
    //const{items} = props;
  

    const itemList= items.length?( items.map(item=>{
        //if(item.price>20000){
        return(
            
            <div className="col s12 m4" key={item.id}>
              <div className="card">
                <div className="card-image">
                  <img src={logo} alt="An item"/>
                </div>
                <Link to={'/'+item.id}>
                  <div className="card-title blue-text">{item.name}</div>
                </Link>
                  <a className="btn-floating halfway-fab waves-effect waves-light blue" onClick={()=>{deleteItem(item.id)}}>
                    <i className="material-icons">-</i></a>
                
                <div className="card-content">
                    <p>Price: {item.price}</p> 
                    <p>Rating: {item.rating}</p>                
                </div>
              </div>
            </div>
         
)
})
):(
    <p> You do not have any item in the cart </p>

)

  return (
    <div className="todos collection">
        {itemList}
    </div>    
  )
}

const mapStateToProps=(state)=>{
  return {
    items:state.items
  }
}
/*
const mapDispatchToProps=(dispatch)=>{
  return{
    addCart:(id)=>{ dispatch(addCart(id))}
  }
}
*/

export default connect(mapStateToProps)(Shopping);