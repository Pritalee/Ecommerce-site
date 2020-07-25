import React from 'react';


class AddItems extends React.Component  {
    state={
        name:null,
        price:null,
        rating:null
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.id]:e.target.value
        })
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        //console.log(this.state);
        this.props.addItems(this.state);
    }
  render(){
  return (
   <div>
       <form onSubmit={this.handleSubmit}>
           <label htmlFor="name">Name</label>
           <input type="text" id="name" onChange={this.handleChange}/>
           <label htmlFor="price">Price</label>
           <input type="text" id="price" onChange={this.handleChange}/>
           <label htmlFor="rating">Rating</label>
           <input type="text" id="rating" onChange={this.handleChange}/>
           <button>Submit</button>
       </form>
   </div>
  );
}
}
export default AddItems;
