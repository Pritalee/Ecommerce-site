import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import Checkbox from '../components/Helper/Checkbox';
import SearchBar from '../components/Helper/SearchBar';
import RadioButton from '../components/Helper/Radio';


const Home=()=>{

  const [itemData,setItemData]=useState([]);
  const [Filters,setFilters]=useState({});
  const [Terms,setTerms]=useState('');
  const [sortData,setSortData]=useState({});
  

  useEffect( () => {
    const data={
    };
    getItems(data);

    
  },[]);

  const getItems=(data)=>{
    Axios.post('/api/auth/getItems',data)
    .then(response=>{
      //var items= response.data.items;
      if(response.data.success){
        setItemData(response.data.items);
        //console.log(response.data.items);
      }
      else{
        alert('Failed to fetch data');
      }
      
    })
    .catch(err=>{
      console.log('Home api error',err);
    });
  }



  const itemList= itemData.length?( itemData.map((item, index)=>{
    return(      
        <div className="col s12 m4" key={index}>
          <div className="card">
          
            <div className="card-image" style={{padding:'10px'}}>
              <img src={item.imageUrl} alt="An item"  style={{ width:'100px', height:'300px'}}/>
            </div>
            <div className="row" style={{paddingLeft:'40px', paddingRight:'10px'}}>
            <Link to={'/item/'+item._id}>
              <p className="card-title">{item.itemName}</p>
            </Link>
            <div >
                <p>Rs: {item.price}</p> 
                <p>Rating: {item.rating} *</p>                
            </div>
          
          <button className="btn black" > Add to Wishlist</button>
          </div>
          </div>    
        </div>     
)
})
):(
<p> You haven't searched for any item</p>

);

const handlefilters=(filters)=>{
  console.log("filters in client",filters);
  const data={
    company:filters,
    sortBy:sortData,
  };
  setFilters(filters);
  //console.log('client hadle filters:',Filters);
  getItems(data);
};

const handleSearchBar=(terms)=>{
  console.log(terms);
  const data={
    company:Filters,
    terms:terms,
    sortBy:sortData,
  };
  setTerms(terms);
  getItems(data);
};

const handleRadio=(value)=>{
  //console.log('from home',value);
  var mysort={}
  if (value===1){
    mysort={
      price :-1
    }
  }
  else if(value===2){
     mysort={
        price :1
      }
  }
  else{
    mysort={
      rating :-1
    }
  }
  const data={
    company:Filters,
    terms:Terms,
    sortBy:mysort
  };
  getItems(data);
  setSortData(mysort);


}

 //style={{ display: 'flex', justifyContent: 'center', margin: '1rem auto'}} 
  
  return(
      <div >
        
        <SearchBar handleSearchBar={terms=>handleSearchBar(terms)} /> 
        <div  className="container">
        <div className="row">  
        <div className="col s12 m6" >
            <Checkbox  handlefilters={ filters=>handlefilters(filters) }/>
        </div>
        <div className="col s12 m6" >
            <RadioButton  handleRadio={ radio=>handleRadio(radio) } />
        </div>
        </div>  
        </div> 
        
            <div className="row" >
              {itemList}
            </div>
        
        
      </div>
  );
}

export default Home

/*
import React from 'react';
import AddItems from '../AddItems'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import logo from '../logo192.png';
import {addCart,addWishlist} from '../actions/itemActions';
//import {Navbar} from './Navbar';


class Home extends React.Component{
    state={
        items:[ ]
      }
      addItems=(item)=>{
         
        item.id=Math.random();
        console.log(item);
        let items=[...this.state.items,item];
        
        this.setState({
          items:items
        })
      }
    
    handleCart=(id)=>{
      this.props.addCart(id);
      console.log(id);
    }
    handleWishlist=(id)=>{
      this.props.addWishlist(id);
      console.log(id);
    }
    
    static getDerivedStateFromProps(nextProps, prevState) {
      return {
       items: nextProps.items,
      };
     }

    render(){
      //console.log(this.props);
      let items=this.state.items;
      const itemList= items.length?( items.map(item=>{
        //if(item.price>20000){
        return(
            
            <div className="col s12 m4" key={item.id}>
              <div className="card">
                <div className="card-image">
                  <img src={logo} alt="An item"/>
                </div>
                <div className="row">
                <Link to={'/'+item.id}>
                  <div className="card-title blue-text">{item.name}</div>
                </Link>
                <div className="card-content">
                    <p>Price: {item.price}</p> 
                    <p>Rating: {item.rating}</p>                
                </div>
              <button className="btn blue" onClick={()=>{this.handleCart(item.id)}}>Add to Cart</button>
              <button className="btn green" onClick={()=>{this.handleWishlist(item.id)}}>Add to Wishlist</button>
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
            <AddItems addItems={this.addItems}/>
        </div>
    )}
}
const mapStateToProps=(state)=>{
  return {
    items:state.items
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    addCart:(id)=>{ dispatch(addCart(id))},
    addWishlist:(id)=>{ dispatch(addWishlist(id))}
  }
}



    export default connect(mapStateToProps,mapDispatchToProps)(Home)

*/