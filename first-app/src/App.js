import React from 'react';
import {NavbarOut,Navbar} from './components/Navbar'
import {BrowserRouter, Route,Switch} from 'react-router-dom'
import Home from './components/Home'
import Wishlist from './components/Wishlist'
import CartDetails from './components/cartDetails'
import ItemDetails from './components/ItemDetails'
import SignUp from './components/Signup';
import Login from './components/Login';
import UploadItems from './components/UploadItems';
import NotFound from './components/NotFound';
import Payment from './components/Payment';

class App extends React.Component  {
  
  render(){
  return (
    <div>
      <BrowserRouter>
      <NavbarOut />
      <Switch>
        <Route exact path='/upload' component={UploadItems} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/cart/:user_id' component={CartDetails} />
        <Route exact path='/wishlist' component={Wishlist} />       
        <Route path='/item/:item_id' component={ItemDetails} />
        <Route exact path='/payment' component={Payment} />  

        <Route component={NotFound} />
      </Switch>
      </BrowserRouter>
    </div>
  );
}
}
export default App;
