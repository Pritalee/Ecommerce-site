import React from 'react';
import '../css/signup.css';
import {Link} from 'react-router-dom';

const Register=()=>{
  
    const signupForm=()=>{
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label >Email address</label>
                        <input type="email" className="form-control" id="email" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" id="password" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" className="form-control" id="confirmPassword" onChange={this.handleChange}/>
                    </div>
                
                    <button type="submit" className="btn btn-primary btn-large" id="buttons">Submit</button>
                </form>
                <div>
                    <p>
                        Already have an account? <Link to="/login"> Login</Link>
                    </p>
                </div>
            </div>
        }
      return(
        <div className="container">
            <div className="row h-100" >
                <div className="col-md-5 mx-auto">
                    {signupForm()}
                </div>
            </div>
        </div>
      );
}    

export default Register