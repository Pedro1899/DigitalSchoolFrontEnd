
import React, {Component} from 'react';
import AutenticationServices from './AutenticationServices.js';
import { Route, Redirect} from 'react-router-dom'
//import { AiFillPhone, AiTwotoneMail } from "react-icons/ai";





class AuthenticatedRoute extends Component{




render(){

     
       
       


 
    if(AutenticationServices.isUserLoggedİn()){
       return   <Route {...this.props}></Route>
            }else{
            return   <Redirect to ="/login/"></Redirect>
    
            }
}




}


export default AuthenticatedRoute