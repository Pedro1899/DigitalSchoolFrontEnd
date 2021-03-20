import React, {Component} from 'react';
import  './login.css'



import { AiFillPhone, AiTwotoneMail } from "react-icons/ai";
import {MdCloudOff} from "react-icons/md";
import {FcLock}  from "react-icons/fc";
import {FaRegCircle,FaCircle} from 'react-icons/fa'



import AutenticationServices from './AutenticationServices.js';






class login extends Component{
    
constructor(proops){
super(proops);
this.state ={
UserName: '',
password : '',
haslogingFailed : false,
codeLoginFailed: 0,
IdUsuario: '',
DescriptionSlide:'',
PictureSlide:'',
counterSlide:0,
activeSlider:'',
ActivityCounter:0,
activeFrame:'s'

}


this.Handleİnpt = this.Handleİnpt.bind(this)
this.LogingClick = this.LogingClick.bind(this)
this.NewSchoolClick = this.NewSchoolClick.bind(this)
this.handleValidationCredencials =this.handleValidationCredencials.bind(this) 
this.handleExceptionLogin = this.handleExceptionLogin.bind(this)
this.Focus =this.Focus.bind(this) 
this.automaticFrame = this.automaticFrame.bind(this)


this.handleDeleteAct = this.handleDeleteAct.bind(this)

}

componentDidMount(){
    this.setState({
     
        DescriptionSlide:'Welcome to Digital School',
        PictureSlide:'/images/Onboarding-pana.svg',
       
    })
    this.automaticFrame();
}

automaticFrame(){
 
    setTimeout(() => {
        if(this.state.activeFrame ==='s'){
            let c = this.state.ActivityCounter
            c = c + 1
            if(c===5){
                c=0
                this.setState({ActivityCounter:c})
                this.handleDeleteAct(c)

            }else{

                this.setState({ActivityCounter:c})
                this.handleDeleteAct(c)
               this.automaticFrame()
            }
           
        }
        
      }, 5000);
   

 

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
<div className ="EncabezadoPadre">
        <div className ="EncabezadoHijo">
         <AiFillPhone  size='0.8rem' color='red' ></AiFillPhone>  &nbsp; +49 17687578683   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         <AiTwotoneMail size='0.8rem' color='red' ></AiTwotoneMail> &nbsp;    MeLlamoPedro@gmail.com  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             user name  &nbsp;  <input className = "textareaHeader" type="text" id="uname" name="UserName"  value ={this.state.UserName} onChange={this.Handleİnpt} onFocus={this.Focus} />  &nbsp;&nbsp;
             password   &nbsp; <input className = "textareaHeader" type="password" id="psw" name="password"  value ={this.state.password}   onChange={this.Handleİnpt}   onFocus={this.Focus}/> &nbsp;&nbsp;
  <button className = "button" onClick={this.LogingClick}>GO!</button>
  &nbsp; &nbsp;
  <button className = "button" onClick={this.NewSchoolClick}>School</button>

  {this.state.haslogingFailed &&   <MessageError codeError={this.state.codeLoginFailed}> </MessageError>}
  
  </div>
 

  
  </div>
 <div className="cuerpo" >
 <div className="slider-contenedor">
         
          
             <div className="contenido-slider">
            
                <h2>{this.state.DescriptionSlide}</h2>
           
            
            <img src={this.state.PictureSlide} alt=""></img>


            </div>
            <UpShowCounter          
                                   Actual={this.state.ActivityCounter} 
                                   handleDelete ={this.handleDeleteAct}
                                 
></UpShowCounter>
    </div>
   
    <div style={{position:'absolute', left:'6.8%', top:'0.9%', height:'35px', width:'30px'}}  >
         
    <img  style={{height:'25px', width:'25px'}} src='/images/papaicon.png' alt=""></img>

              </div>

              <div style={{position:'absolute', left:'0%', top:'0%', height:'30px', width:'100px'}}>
                <h4>papayasoft</h4>
              </div>
    

</div>
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
                codeLoginFailed: 500,
                haslogingFailed:true
                
                })
            //console.log( "this.state.HASLOGINF> " + this.state.haslogingFailed)    
           // console.log( "this.state.codeLoginFailed> " + this.state.codeLoginFailed)
        } else {
           
            this.setState({
                codeLoginFailed: error.response.data.code,
                haslogingFailed:true
                })
               
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


    function UpShowCounter(props){

        let position=3.5
      
      return (
[0,1,2,3, 4].map((item, index)=>{
        position=position+2
        
       
        if(index===props.Actual){
          return(<div key={index} style={{position:'absolute', left:`${position}%`, top:'93.1%', cursor:'pointer'}}  onClick={()=> props.handleDelete(item)} >
              <FaCircle size='0.95rem' color= '#000000' ></FaCircle></div>)
      
        }else{
          return(<div key={index} style={{position:'absolute', left:`${position}%`, top:'93%', cursor:'pointer'}} 
          onClick={
            ()=> props.handleDelete(item)
               } 
          ><FaRegCircle size='0.85rem' color='#F10000'></FaRegCircle></div>)
          
        }
       
      })
      )
      
      
      
      }
export default login