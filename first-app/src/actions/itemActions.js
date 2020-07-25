export const addCart=(id)=>{
    return{
        type:'ADD_CART',
        id:id
    }
}

export const addWishlist=(id)=>{
    return{
        type:'ADD_WISHLIST',
        id:id
    }
}