import React,{useState,useEffect} from 'react';
import '../css/signup.css';
import {Link,useHistory} from 'react-router-dom';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import {showErrorMsg} from './Helper/message';
import {showLoading} from './Helper/Loading'
import { login } from '../api/auth';
import { setAuthentication,isAuthenticated } from '../components/Helper/auth';

const SignUp=()=>{
    let history=useHistory();
    useEffect(()=>{
        if( isAuthenticated() && isAuthenticated().role===1 ){
            console.log('Admin');
            history.push('/upload');
        }
        else if( isAuthenticated() && isAuthenticated().role===0) {
            history.push('/home');
        }
    },[history]);

    const[formData,setFormData]=useState({
        email:'',
        password:'',
        errorMsg:false,
        loading:false

    });
    const{email,password,errorMsg,loading}=formData;

    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
            errorMsg:''
        })
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(isEmpty(email)|| isEmpty(password)){
            setFormData({
                ...formData,errorMsg:"All fields are required"
            });
        }
        else if(!isEmail(email)){
            setFormData({
                ...formData,errorMsg:"Invalid email"
            });
        }
        else{
            const{email,password}=formData;
            const data= {email,password};
            setFormData({...formData,loading:true});
            console.log('Login data',data);
            login(data)
                .then(response=>{
                    var token=response.data.token;
                    var user=response.data.user;
                    setAuthentication(token,user);
                    if( isAuthenticated() && isAuthenticated().role===1 ){
                        console.log('Admin');
                        history.push('/admin');
                    }
                    else{
                        history.push('/home');
                    }

                    })
                .catch(err=>{
                   
                    console.log("Login api error:",err);
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
import {Link,useHistory} from 'react-router-dom';
import isEmpty from 'validator/lib/isEmpty';
import equals from 'validator/lib/equals';
import isEmail from 'validator/lib/isEmail';
import {showErrorMsg,showSuccessMsg} from './Helper/message';
import {showLoading} from './Helper/Loading';
import { login } from '../api/auth';
import { setAuthentication,isAuthenticated } from '../components/Helper/auth';

class Login extends React.Component{
    state={
        email:null,
        password:null,
        //confirmPassword:null,
        errorMsg:false,
        successMsg:false,
        loading:false

    };
    
    handleChange=(e)=>{
        this.setState({
            ...this.state,
            [e.target.id]:e.target.value,
            errorMsg:'',
            successMsg:''

        })
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        const history=useHistory();
        var {email,password,successMsg,errorMsg,loading}=this.state;
        //console.log('success',this.state.email,this.state.password);
        if(isEmpty(email) || isEmpty(password) ){
            this.setState({
                ...this.state,
                errorMsg:'All fields are required',
            });
        }
        else if(!isEmail(email)){
            this.setState({
                ...this.state,
                errorMsg:'Invalid email',
            });
        }
        else{
            
            const {email,password}=this.state;
            const data={email,password};
            this.setState({
                ...this.state,
                loading:true,
            });
            login(data)
                .then(response=>{
                    var token=response.data.token;
                    var user=response.data.user;
                    setAuthentication(token,user);
                    if( isAuthenticated() && isAuthenticated().role===1 ){
                        console.log('Admin');
                        //history.push('/admin');
                    }
                    else{
                        history.push('/home');
                    }

                    })
                .catch(err=>{
                   
                    console.log("Login api error:",err);
                })

        }

    }



    render(){
        const login=()=>{
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
                    
                
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            )
        }
        return(
            <div className="container" id="container">
                {this.state.errorMsg && showErrorMsg(this.state.errorMsg)}
                {this.state.successMsg && showSuccessMsg(this.state.successMsg)}
                {this.state.loading && showLoading()}
                {login()}
                <p> {JSON.stringify(this.state)} </p>
            </div>
            
        )
    }
}


export default Login
*/