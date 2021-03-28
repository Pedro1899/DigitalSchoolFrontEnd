import React, {Component} from 'react';
import  './login.css'

import './css/theme.css';
import { AiFillPhone, AiTwotoneMail } from "react-icons/ai";
import {MdCloudOff} from "react-icons/md";
import {FcLock}  from "react-icons/fc";
import AutenticationServices from './AutenticationServices.js';
import { Form, Label} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BsPerson} from 'react-icons/bs'
import {AiOutlineUsergroupAdd} from 'react-icons/ai'
import { FaRegHandScissors } from 'react-icons/fa';



class login extends Component{
    
constructor(proops){
super(proops);
this.state ={
UserName: '',
password : '',
haslogingFailed : false,
codeLoginFailed: false,
IdUsuario: '',
DescriptionSlide:'',
PictureSlide:'',
counterSlide:0,
activeSlider:'',
ActivityCounter:0,
activeFrame:'s', 
login:false

}


this.Handleİnpt = this.Handleİnpt.bind(this)
this.LogingClick = this.LogingClick.bind(this)
this.NewSchoolClick = this.NewSchoolClick.bind(this)
this.handleValidationCredencials =this.handleValidationCredencials.bind(this) 
this.handleExceptionLogin = this.handleExceptionLogin.bind(this)
this.Focus =this.Focus.bind(this) 



this.handleDeleteAct = this.handleDeleteAct.bind(this)

}

componentDidMount(){
    this.setState({
     
        DescriptionSlide:'Welcome to Digital School',
        PictureSlide:'/images/Onboarding-pana.svg',
       login:false
    })
    
}


handleDeleteAct(id){
  
  this.setState({ ActivityCounter:id})

  if(id===0){
    this.setState({
      PictureSlide:'/images/Onboarding-pana.svg',
        DescriptionSlide:'Welcome to Digital School',
       
    })
  }else if(id===1){
    this.setState({
         PictureSlide:'/images/profile.svg',
     DescriptionSlide:'Create Profiles',
       
    })
  }else if(id===2){
    this.setState({
         PictureSlide:'/images/Schedual.svg',
        DescriptionSlide:'schedule your activities ',
       
    })
  }else if(id===3){
    this.setState({
        DescriptionSlide:'save the information',
        PictureSlide:'/images/saveFiles.svg'
    })
  }else if(id===4){
    this.setState({
        PictureSlide:'/images/Graph.svg',
        DescriptionSlide:'Studty the results',
        
    })
  }
    
  }


   
render(){return(






<div className ="LoginPage">



 
    
    
 <div className="LoginHeader" >

     <div class="container ">
            <div class="row  ">
                <div class="col-lg-2 col-md-3 col-sm-3">
                  <div class="row " style={{cursor:'pointer'}}  >
                  <div class="col-lg-2 col-md-3 col-sm-3">
                      <img   onClick={()=> {this.setState({login:false})}} style={{height:'25px', width:'25px'}} src='/images/papaicon.png' alt=""></img>
                  </div>
                  <div class="col-lg-5 col-md-5 col-sm-5">
                  <h4   onClick={()=> {this.setState({login:false})}} >PapayaSoft</h4>
                  </div>
                  </div>
              
              
                  </div>
                  <div class="col-lg-7 col-md-5 col-sm-5">
               
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-3 "  >

                      <div class="row ">
                      <div class="col-lg-5 col-md-6 col-sm-6"></div>
                  <div class="col-lg-2 col-md-2 col-sm-2">
                  <BsPerson size='1.8rem' color='green' style={{cursor:'pointer' ,opacity:'0.4'}}  onClick={()=> {this.setState({login:true})}}  ></BsPerson>
                  </div>
                  <div class="col-lg-2 col-md-2 col-sm-2">
                  <AiOutlineUsergroupAdd size='1.8rem' color='blue' style={{cursor:'pointer' ,opacity:'0.4'}}  onClick={this.NewSchoolClick}  ></AiOutlineUsergroupAdd>
                  </div>
                  </div>  
                 
                
                  </div>
 
 
</div>
</div>
 </div>
  

 
 


 
 



  {this.state.login && <div class="container w-50" >
        
        <div class='row    ' style={{marginTop:'45px'}}>
        <div class='col-lg-12 text-center '  >
      <p style={{fontSize:'35px', fontWeight:'500'}} class='text-info' >L O G I N </p>
        </div>
        </div>
        <div class='row    ' style={{marginTop:'35px'}}>
        
        <div class='col-lg-12   pl-3'  >
        <input class="form-control form-control-lg" type="text" placeholder="User name" 
         onChange={this.Handleİnpt} type="text" value= {this.state.UserName} name='UserName' id='UserName' placeholder="User Name"
        ></input>
        </div>
        </div>
        <div class='row    ' style={{marginTop:'35px'}}>
        
        <div class='col-lg-12   pl-3'  >
        <input type="password" class="form-control form-control-lg" id="password" placeholder="Password"
         onChange={this.Handleİnpt} value= {this.state.password} name='password'
        ></input>
        </div>
        </div>

        <div class='row    ' style={{marginTop:'35px'}}>
        
        <div class='col-lg-12   pl-3'  >
        <button type="button" class="btn btn-outline-success btn-lg" onClick={this.LogingClick}  >GO!</button>
        </div>

        </div>
       {this.state.haslogingFailed &&  <div class='row    ' style={{marginTop:'35px'}}>
        
        <div class='col-lg-12   pl-3'  >
        
        
        {this.state.codeLoginFailed && <div class="alert alert-danger" role="alert">
  Incorrect User or Password. Contact us 
</div>
        }
                {!this.state.codeLoginFailed && <div class="alert alert-secondary" role="alert">
  There is no connection with the server. Contact us
</div>
        }
        </div>

        </div>   } 
       

      
      </div> }
  {!this.state.login && <Cuerpo DescriptionSlide ={this.state.DescriptionSlide}  PictureSlide ={this.state.PictureSlide}></Cuerpo> }
 
</div>
);

}



Handleİnpt(event){
    
    this.setState({
[event.target.name]: event.target.value
    })
   }


   Focus(){
    this.setState({
        haslogingFailed : false
    })
   }

LogingClick(){
  
    AutenticationServices.ValidateUsernamePassword(this.state.UserName, this.state.password)
     .then(response => this.handleValidationCredencials(response.data))
     .catch(error => {
        if (!error.response) {
           
            this.setState({
                codeLoginFailed: false,
                haslogingFailed:true
                
                })

                setTimeout(() => {
                    this.setState({
                        codeLoginFailed: false,
                        haslogingFailed:false
                        
                        }) 
                }, 5000);
        } else {
          
            this.setState({
                codeLoginFailed: true,
                haslogingFailed:true
                })
                setTimeout(() => {
                    this.setState({
                        codeLoginFailed: false,
                        haslogingFailed:false
                        
                        }) 
                }, 3500);
               
        }
      })


}


NewSchoolClick(){
    this.setState({
        activeSlider:''
    })

    this.props.history.push( `/NewSchool`)



}


handleValidationCredencials(response){

/*
*/
this.setState({
    IdUsuario:response.idUser,
    
        activeSlider:''


})

AutenticationServices.registerSuccessfulLogin(this.state.IdUsuario, 
    response.school.idSchool,
    response.school.idCountry, 
    this.state.UserName, response.picture, 
    response.category, response.school.language)
        this.props.history.push( `/Welcome`)

}


handleExceptionLogin(response){

 if(response.data.code===404){
            this.setState({
                haslogingFailed:true
})
    
                }

    
  
    
    }
}




    function MessageError(proops){


if(proops.codeError === 404){
    return (
    <span className="mensajeError">
     <FcLock  size='0.9rem'   ></FcLock>&nbsp; Faild Login   
     
    </span>   );}
    else if(proops.codeError === 500){
        return (
            
            <span className="mensajeError">
             <MdCloudOff  size='0.9rem'   ></MdCloudOff>&nbsp; No connection with the server  
             
            </span>   );

    } 


    }


    



      function Cuerpo(props){

   return (     
   
   <div className="cuerpo" >

<div Class="container-fluid">
<div class="row min-vh-75 " style={{backgroundColor:"#eeecec"}}>
    <div class='col-lg-6 col-md-4 col-sm-3 text-right  pr-0 pt-5' >
<div className="texto">Digital School</div>
<div  style={{ fontFamily:" Rubik, sans-serif" ,opacity:'0.6', fontSize:'1.8vw', fontWeight:'200', letterSpacing:'2px', paddingTop:'15px'}  }>
Manage your information in a simple way. Show results in charts, schedule activities, create profiles.


</div>
</div>

        <div class='col-lg-6 col-md-8 col-sm-9 text-left pl-0 pt-5' >
<img src={props.PictureSlide} alt=""></img>
      </div>

     </div>

     <div class="row min-vh-75" style={{backgroundColor:" #f1f9fc"}}>
    <div class='col-lg-6 col-md-4 col-sm-3 text-right  pt-7'  >
<div className="texto">Create profiles</div> 
<div  style={{ fontFamily:" Rubik, sans-serif" ,opacity:'0.6', fontSize:'1.8vw', fontWeight:'200', letterSpacing:'2px', paddingTop:'25px'}  }>
Create student, parent or teacher profile. Each of them interact in a different way with the tool. 

</div>
</div>

        <div class='col-lg-6 col-md-8 col-sm-9 text-left  pl-0 pt-5' >
<img src='/images/profile.svg' alt=""></img>
      </div>

     </div>

     <div class="row  min-vh-75" style={{backgroundColor:"#f2fcf1"}}>
    <div class='col-lg-6 col-md-4 col-sm-3 text-right  pr-0 pt-7'  >
<div className="texto">
schedule activities</div>
<div  style={{ fontFamily:" Rubik, sans-serif" ,opacity:'0.6', fontSize:'1.8vw', fontWeight:'200', letterSpacing:'2px', paddingTop:'25px'}  }>
Create inside or outside activities, 
assign activities to another teacher (Admin Profile)

</div>
</div>

        <div class='col-lg-6 col-md-8 col-sm-9 text-left  pl-0 pt-5'  >
<img src='/images/Schedual.svg' alt=""></img>
      </div>

     </div>

     <div class="row min-vh-75 "style={{backgroundColor:" #fcf2f1"}}> 
    <div class='col-lg-6 col-md-4 col-sm-3 text-right  pr-0 pt-7'  >
<div className="texto">Save students notes</div>
<div  style={{ fontFamily:" Rubik, sans-serif" ,opacity:'0.6', fontSize:'1.8vw', fontWeight:'200', letterSpacing:'2px', paddingTop:'25px'}  }>
Save the notes, with the category you want
</div>
</div>

        <div class='col-lg-6 col-md-8 col-sm-9 text-left  pl-0 pt-5'  >
<img src='/images/saveFiles.svg' alt=""></img>
      </div>

     </div>

     <div class="row  "style={{backgroundColor:"#f3f3e1"}}> 
    <div class='col-lg-6 col-md-4 col-sm-3 text-right  pr-0 pt-5'  >
<div className="texto">Study the results</div>
<div  style={{ fontFamily:" Rubik, sans-serif" ,opacity:'0.6', fontSize:'1.8vw', fontWeight:'200', letterSpacing:'2px', paddingTop:'25px'}  }>
Check the charts of the student that you want to see, or the classroom in general. You could check previous notes to study in depth a specific topic.
</div>
</div>

        <div class='col-lg-6 col-md-8 col-sm-9 text-left  pl-0 pt-5' >
<img src='/images/Graph.svg' alt=""></img>
      </div>

     </div>
</div>


  {/*<div className="slider-contenedor">
           
            
               <div className="contenido-slider">
              
                  <h2>{props.DescriptionSlide}</h2>
             
              
              <img src={props.PictureSlide} alt=""></img>
  
  
              </div>
     
      </div> */} 
     
     
  
  </div>)
      }
export default login