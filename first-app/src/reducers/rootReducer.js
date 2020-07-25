const initState={
    items:[
    {name:'Iphone', price:50000, rating:4.5 , id:4},
    {name:'Motorola', price:20000, rating:2.5 , id:1},
    {name:'One Plus', price:40000, rating:4 , id:2},
    {name:'Samsung', price:25000, rating:3 , id:3},
    {name:'Lenovo', price:35000, rating:3.5 , id:5},
    ],
    cart:[],
    wishlist:[]
}

const rootReducer=(state=initState,action)=>{
    if(action.type=='ADD_CART'){
        let item=state.items.filter(item=>{
            return item.id==action.id
        });
        //let cartitem=[...state.cart,item];
        //console.log(cartitem);
        return{
            ...state,
            cart:[...state.cart,item]
        } 
    }
    if(action.type=='ADD_WISHLIST'){
        let item=state.items.filter(item=>{
            return item.id==action.id
        });
        //let cartitem=[...state.cart,item];
        //console.log(cartitem);
        return{
            ...state,
            wishlist:[...state.wishlist,item]
        } 
    }
    return state;
}

export default rootReducer