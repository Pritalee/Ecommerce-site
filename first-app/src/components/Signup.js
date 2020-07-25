import React,{useState,useEffect} from 'react';
import '../css/signup.css';
import {Link,useHistory} from 'react-router-dom';
import isEmpty from 'validator/lib/isEmpty';
import equals from 'validator/lib/equals';
import isEmail from 'validator/lib/isEmail';
import {showErrorMsg,showSuccessMsg} from './Helper/message';
import {showLoading} from './Helper/Loading'
import { signup } from '../api/auth';
import { isAuthenticated } from '../components/Helper/auth';

const SignUp=()=>{
    let history=useHistory();
    useEffect(()=>{
        if( isAuthenticated() && isAuthenticated().role===1 ){
            console.log('Admin');
            history.push('/admin');
        }
        else if( isAuthenticated() && isAuthenticated().role===0) {
            history.push('/home');
        }
    },[history]);



    const[formData,setFormData]=useState({
        email:'prit@gmail.com',
        password:'123',
        confirmPassword:'123',
        successMsg:false,
        errorMsg:false,
        loading:false

    });
    const{email,password,confirmPassword,successMsg,errorMsg,loading}=formData;

    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
            successMsg:'',
            errorMsg:''
        })
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(isEmpty(email)|| isEmpty(password) || isEmpty(confirmPassword)){
            setFormData({
                ...formData,errorMsg:"All fields are required"
            });
        }
        else if(!isEmail(email)){
            setFormData({
                ...formData,errorMsg:"Invalid email"
            });
        }
        else if(!equals(password,confirmPassword)){
            setFormData({
                ...formData,errorMsg:"Passwords do not match"
            });
        }
        else{
            const{email,password}=formData;
            const data= {email,password};
            
            setFormData({...formData,loading:true});
            signup(data)
            .then(response=>{
                //console.log(response);
                setFormData({
                    ...formData,
                    email:'',
                    password:'',
                    confirmPassword:'',
                    loading:false,
                    successMsg:response.data.successMessage,
                });
            

            })
            .catch(err=>{
                console.log("api error :",err);
                setFormData({
                    ...formData,loading:false,errorMsg:err.response.data.errorMessage,
                });
            })
        }
    };


    const register=()=>{
        return(
            <div className="container">
                <form onSubmit={handleSubmit} noValidate>
                    <div className="form-group">
                        <label >Email address</label>
                        <input type="email" className="form-control" name="email" value={email}  onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" name="password" value={password}  onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" className="form-control" name="confirmPassword" value={confirmPassword}  onChange={handleChange}/>
                    </div>
                    <div className="center">
                        <button type="submit" className="btn btn-primary " id="buttons">Submit</button>
                    </div>
                    
                </form>
                <div>
                    <p>
                        Already have an account? <Link to="/login"> Login</Link>
                    </p>
                </div>
            </div>
        )
            
        }
      return(
        <div className="container" id="container">
            <div className="row h-100" >
                <div className="col-md-12 mx-auto" id="signup">
                    {errorMsg && showErrorMsg(errorMsg)}
                    {successMsg && showSuccessMsg(successMsg)}
                    {loading && showLoading()}
                    {register()}
                    <p>{JSON.stringify(formData)} </p>
                </div>
            </div>
        </div>
      );
}    

export default SignUp







/*
import React from 'react';
import '../css/signup.css';
import {Link} from 'react-router-dom';

class SignUp extends React.Component{
    state={
        email:null,
        password:null,
        confirmPassword:null,
        errormsg:false,
        loading:false

    }
    handleChange=(e)=>{
        this.setState({
            [e.target.id]:e.target.value
        })
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        if(this.state.password===this.state.confirmPassword){
            console.log('success',this.state.email);
        }
        else{

            console.log('Passwords do not match');
        }
    }

    
        
    


    render(){
        const signupForm=()=>{
            return(
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
            )}
        return(
            <div className="container">
                <div className="row h-100" >
                <div className="col-md-5 mx-auto">
                {signupForm()}
                </div>
                
                 </div>
                
            </div>
            
        )
    }
}


export default SignUp
*/