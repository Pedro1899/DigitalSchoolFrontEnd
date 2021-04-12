import React, {Component} from 'react';
import  './login.css'

import './css/theme.css';


import AutenticationServices from './AutenticationServices.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import {BsPerson} from 'react-icons/bs'
import {AiOutlineUsergroupAdd} from 'react-icons/ai'



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
login:false,
SchoolName:'', 
passNewS:'', 
titleNewS:'', 
alertFail:false, 
InfoNewUser:''

}


this.Handleİnpt = this.Handleİnpt.bind(this)
this.LogingClick = this.LogingClick.bind(this)

this.handleValidationCredencials =this.handleValidationCredencials.bind(this) 
this.handleExceptionLogin = this.handleExceptionLogin.bind(this)
this.NewSchool = this.NewSchool.bind(this)
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

     <div class="container" style={{height:'30px'}}>
            <div class="row  ">
                <div class="col-lg-2 col-md-3 col-sm-3 col-5" >

                    <div class="row " style={{cursor:'pointer'}}  >
                  <div class="col-lg-2 col-md-3 col-sm-3 col-2">
                      <img   onClick={()=> {this.setState({login:false, NewSchool:false})}} style={{height:'25px', width:'25px'}} src='/images/papaicon.png' alt=""></img>
                  </div>
                  <div class="col-lg-5 col-md-5 col-sm-5 col-3">
                  <h4   onClick={()=> {this.setState({login:false, NewSchool:false})}} >PapayaSoft</h4>
                  </div>
                  </div> 
              
              
                  </div>
                  <div class="col-lg-7 col-md-5 col-sm-5 col-1" >
               
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-3 col-5 ">

                   <div class="row ">
                      <div class="col-lg-5 col-md-6 col-sm-6 col-4" ></div>
                  <div class="col-lg-2 col-md-2 col-sm-2 col-3" >
                  <BsPerson size='1.8rem' color='green' style={{cursor:'pointer' ,opacity:'0.4'}}  onClick={()=> {this.setState({login:true, NewSchool:false})}}  ></BsPerson>
                  </div>
                  <div class="col-lg-2 col-md-2 col-sm-2 col-3  " >
                  <AiOutlineUsergroupAdd size='1.8rem' color='blue' style={{cursor:'pointer' ,opacity:'0.4'}}  onClick={()=> {this.setState({login:false, NewSchool:true})}}  ></AiOutlineUsergroupAdd>
                  </div>
                  </div>    
                 
                
                  </div>
 
 
</div>
</div>
 </div>
  
  {this.state.login && <div class="container " >
        
        <div class='row    ' style={{marginTop:'45px'}}>
        <div class='col-lg-12 text-center '  >
      <p style={{fontSize:'35px', fontWeight:'500'}} class='text-info' >L O G I N </p>
        </div>
        </div>
        <div class='row    ' style={{marginTop:'35px'}}>
        <div class='col-lg-2  col-0 '  >

        </div>
        <div class='col-lg-8  col-12 pl-3'  >
        <input class="form-control form-control-lg" type="text" placeholder="User name" 
         onChange={this.Handleİnpt} type="text" value= {this.state.UserName} name='UserName' id='UserName' 
        ></input>
        </div>
        </div>
        <div class='row    ' style={{marginTop:'35px'}}>
        <div class='col-lg-2  col-0 '  >

</div>
        <div class='col-lg-8   pl-3'  >
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
  {(!this.state.login  && !this.state.NewSchool )&& <Cuerpo DescriptionSlide ={this.state.DescriptionSlide}  PictureSlide ={this.state.PictureSlide}></Cuerpo> }
 
 {this.state.NewSchool &&  <div class="container" >
        
        <div class='row    ' style={{marginTop:'45px'}}>
        <div class='col-lg-6 text-center '  >
      <p style={{fontSize:'35px', fontWeight:'500'}} class='text-info' >CREATE A NEW SCHOOL </p>
        </div>

     
        </div>
        <div class='row    ' style={{marginTop:'35px'}}>
        


        <div class='col-lg-6  col-12 pl-2 pr-2  '  >
         <div>
           
           <input class="form-control form-control-lg" type="text" placeholder="School Name" 
         onChange={this.Handleİnpt} type="text" value= {this.state.titleNewS} name='titleNewS' id='titleNewS' 
        ></input>
           </div> 
           <br />
           <br></br>
<div>

<input type="password" class="form-control form-control-lg" id="passNewS" placeholder="Admin Password"
         onChange={this.Handleİnpt} value= {this.state.passNewS} name='passNewS'
        ></input>
</div>
<br>
</br>
<br />
<button type="button" class="btn btn-outline-success btn-lg" onClick={this.NewSchool}  >GO!</button>
 <div class='row    ' style={{marginTop:'20px'}}>
        
        <div class='col-lg-12   pl-3'  >
        
        
    
          
                {this.state.alertFail && <div class="alert alert-danger" role="alert">
{this.state.InfoNewUser}
</div>
        }
          {this.state.alertSuccess && <div class="alert alert-success" role="alert">
          {this.state.InfoNewUser}
</div>
        }
        

        



        </div>

        </div>    
<br></br>
        </div>
        <div class='col-lg-2  col-0  '  >
    
        </div>
        <div class='col-lg-3  col-12  ' style={{borderLeft:'1px solid #F19200',  borderWidth:'3px'}}  >
        <p style={{fontSize:'25px', fontWeight:'500', paddingTop:'10px'}} class='text-warning' >CONTACT US TO JOIN IN THE DIGITAL SCHOOL EXPERIENCE </p>
    </div>


      
        </div>
     

     
       

      
      </div>
 }
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


NewSchool(){

  this.setState({loadingPicture:true})
   
if(this.state.titleNewS==='' || this.state.titleNewS==='School Name'  ) {
  this.setState({alertFail:true, InfoNewUser:'please insert Name'
})
           setTimeout(
           () => {  this.setState({alertFail:false, InfoNewUser:''
          })},
           3500
           );
         
         
         }else if(this.state.passNewS==='' || this.state.passNewS==='Admin password for new school'  ) {
          this.setState({alertFail:true, InfoNewUser:'please insert password'
             })
             setTimeout(
             () => { 
              this.setState({alertFail:false, InfoNewUser:''
            })
              },
             3500
             );
           
           
           }else {

      


                AutenticationServices.CreateSchool(this.state.titleNewS, this.state.passNewS)
                .then(response=>{
                  let respuesta = response.data + ''
                  console.log(respuesta)
                  console.log(response.data)
                  if(respuesta!='incorrect password'){
                    console.log('heu')
                    this.setState({alertSuccess:true, 
               InfoNewUser:'Username & password: ' + response.data
                   })
               
                  }else{
                
                   this.setState({ 
                    alertFail:true,
                     InfoNewUser:'Wrong password'
                   })
                   setTimeout(() => {
                     this.setState({InfoNewUser:'', alertFail:false})
                   }, 3500);
                  }

                  
                })
                .catch(error=>{
                 console.log('there is an error ')
                  this.setState({alertFail:true, InfoNewUser:'ups... something went wrong'
                    })
                  setTimeout(() => {
                    this.setState({alertFail:false})
                  }, 4000);
                })
               
             

       }
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




  

    



      function Cuerpo(props){

   return (     
   
   <div className="cuerpo" >

<div Class="container-fluid">
<div class="row min-vh-75 " style={{backgroundColor:"#eeecec"}}>
    <div class='col-lg-6 col-md-4 col-sm-3 col-12 text-right  pr-0 pt-7' >
<div className="texto">Digital School</div>
<div  className="textoDescr">
We help you manage your information in a simple way. We focus on student development and promote the implementation of new teaching methodologies


</div>
</div>

        <div class='col-lg-6 col-md-8 col-sm-9 col-12 text-left pl-0 pt-0' >
<img src={props.PictureSlide} alt=""></img>
      </div>

     </div>

     <div class="row min-vh-75" style={{backgroundColor:" #f1f9fc"}}>
    <div class='col-lg-6 col-md-4 col-sm-3 text-right  pt-6'  >
<div className="texto">Create profiles</div> 
<div className="textoDescr">
Create student, parent or teacher profile. Each of them interact in a different way with the tool. 

</div>
</div>

        <div class='col-lg-6 col-md-8 col-sm-9 text-left  pl-0 pt-0' >
<img src='/images/profile.svg' alt=""></img>
      </div>

     </div>

     <div class="row  min-vh-75" style={{backgroundColor:"#f2fcf1"}}>
    <div class='col-lg-6 col-md-4 col-sm-3 text-right  pr-0 pt-6'  >
<div className="texto">
schedule activities</div>
<div  className="textoDescr">
Create back office or outside activities,  
assign activities to another teacher (Admin Profile)

</div>
</div>

        <div class='col-lg-6 col-md-8 col-sm-9 text-left  pl-0 pt-0'  >
<img src='/images/Schedual.svg' alt=""></img>
      </div>

     </div>

     <div class="row min-vh-75 "style={{backgroundColor:" #fcf2f1"}}> 
    <div class='col-lg-6 col-md-4 col-sm-3 text-right  pr-0 pt-6'  >
<div className="texto">Save students notes</div>
<div  className="textoDescr">
Save student notes, based on your categories
</div>
</div>

        <div class='col-lg-6 col-md-8 col-sm-9 text-left  pl-0 pt-0'  >
<img src='/images/saveFiles.svg' alt=""></img>
      </div>

     </div>

     <div class="row  "style={{backgroundColor:"#f3f3e1"}}> 
    <div class='col-lg-6 col-md-4 col-sm-3 text-right  pr-0 pt-6'  >
<div className="texto">Study the results</div>
<div  className="textoDescr">
See the results in a simple and clear way, observe the performance of a classroom or a particular student.
</div>
</div>

        <div class='col-lg-6 col-md-8 col-sm-9 text-left  pl-0 pt-0' >
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