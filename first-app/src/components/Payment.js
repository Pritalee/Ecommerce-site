import React from 'react';
import {Link} from 'react-router-dom';


const Payment=()=>{

    return(
        <div className="center" style={{ alignContent :'center'}} >
            <div className="green-text"> <i className="material-icons" style={{fontSize :'6rem'}} >check</i> </div>
            <h6>Payment Successful.</h6>
            <h6>Thank you for Shopping.</h6>
            <br />
            <button className="btn black"> <Link to='/home'>Continue Shopping</Link> </button>

        </div>
    )

}

export default Payment