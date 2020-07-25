import React from 'react';

export const showErrorMsg=(msg)=>{
    console.log('showErrorMsg',msg)
    return(
        <div className="red-text center">
        {msg.message}
           
    </div>
    )   
}

export const showSuccessMsg=(msg)=>{
    return(
        <div className="green-text center">
           <h6> {msg} </h6> 
    </div>
    )
    
}