import React,{Component} from 'react';
import './Students.css'
import { withRouter } from 'react-router'
import AutenticationServices from './AutenticationServices.js'
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/avatar'
import {BsCloudUpload} from 'react-icons/bs'
import {AiOutlineWarning} from 'react-icons/ai'
import {GrStatusGood, GrStatusDisabled} from 'react-icons/gr'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    icono: {
    
      width: theme.spacing(4.5),
        height: theme.spacing(4.5),
    },
    
     medium: {
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
        fontSize:18,
        width: theme.spacing(28),
        height: theme.spacing(28),
      }
  }));
class settings extends Component{
constructor(props){
    super(props)

    this.state={
        picture:'',
        name:'', 
        surname:'', 
        idUsuario:'',
        contrasena:'',
        rol:'', 
        file:null, 
        password:''
    }

}

componentDidMount(){
    const UserId =AutenticationServices.returnUser(); 
   const picture = AutenticationServices.returnPicture();
    const userName =AutenticationServices.returnUserName();

AutenticationServices.getRol(UserId)
.then(response =>{

    this.setState({name:response.data.name,
                    surname:response.data.surname
                    })
})

this.setState({picture:picture,
                name:userName,
                idUsuario:UserId

})
this.fileSelectedHandler = this.fileSelectedHandler.bind(this)
this.Handleİnpt = this.Handleİnpt.bind(this)
this.SaveActivity = this.SaveActivity.bind(this)
this.props.title('My profile')
}



Handleİnpt(event){
    this.setState({
[event.target.name]: event.target.value
    })
   }

   fileSelectedHandler(event){
    const file = event.target.files[0]
   this.setState({
     file: file,
     helpMouseOverUploadPicture:false
   })
 this.previewPicture(file)
 }



 previewPicture(file){
    const reander = new FileReader();
    reander.readAsDataURL(file)
    reander.onloadend = () =>{
      this.setState({
      picture:reander.result,
      alreadyUpdate:false
      })
    }
    
    }

    SaveActivity(){

      this.setState({loadingPicture:true})
      if((!this.state.name.match(/^[a-zA-ZüğşçöĞŞÇÖİÜı]+$/))){
        this.setState({
        alert:true,
        messageAlert:'not valid Name: [ABC] no spaces',
        loadingPicture:false
        })
        setTimeout(
        () => { this.setState({
          alert:false,
          messageAlert:''
          })},
        3500
        );
      
        }else if((!this.state.surname.match(/^[a-zA-ZüğşçöĞŞÇÖİÜı]+$/)) ) {
          this.setState({
            alert:true,
            messageAlert:'not valid Surname: [ABC] no spaces',
            loadingPicture:false
            })
            setTimeout(
            () => { this.setState({
              alert:false,
              messageAlert:''
              })},
            3500
            );
          
          
          }else if((this.state.password !=='')&& 
          ((!this.state.password.match(/^[a-zA-ZüğşçöĞŞÇÖİÜı1-9]+$/))||(this.state.password.length<5))){
            
            this.setState({
              alert:true,
              messageAlert:'not valid Password: [ABC123] with more than 5 characters',
              loadingPicture:false
              })
              setTimeout(
              () => { this.setState({
                alert:false,
                messageAlert:''
                })},
              3500
              );
          }else {

            if(this.state.file!==null){
            
          
              this.uploadPicture(this.state.picture)
  
          
                }else {
                  const formData = new FormData();
                  formData.append('idUser', this.state.idUsuario)
                  formData.append('picture', '')
                  formData.append('name',this.state.name );
                  formData.append('surname', this.state.surname);
                  formData.append('password', this.state.password);
                
                   AutenticationServices.updateUser(formData)
                   .then(response=>{
                     
              
                     this.setState({alertSuccess:true, 
                       loadingPicture:false})
                     setTimeout(() => {
                       this.setState({alertSuccess:false})
                     }, 2500);
                   })
                   .catch(error=>{
                     console.log(error)
                     this.setState({alertFail:true, 
                       loadingPicture:false})
                     setTimeout(() => {
                       this.setState({alertFail:false})
                     }, 2500);
                   })
                  
                }

          }
    }

    async uploadPicture(base64EncodedImage){

        try {
          this.callApi(base64EncodedImage)
          .then(res => {
     
           const formData = new FormData();
           formData.append('idUser', this.state.idUsuario)
           formData.append('picture', res.message)
           formData.append('name',this.state.name );
           formData.append('surname', this.state.surname);
           formData.append('password', this.state.password);
         
            AutenticationServices.updateUser(formData)
            .then(response=>{
              AutenticationServices.chantePicture(res.message)
              this.props.picture(res.message)
              this.setState({alertSuccess:true, 
                loadingPicture:false})
              setTimeout(() => {
                this.setState({alertSuccess:false})
              }, 2500);
            })
            .catch(error=>{
              console.log(error)
              this.setState({alertFail:true, 
                loadingPicture:false})
              setTimeout(() => {
                this.setState({alertFail:false})
              }, 2500);
            })
           
                
          })
          .catch(error => {
            console.log(error)
            this.setState({alertFail:true, 
              loadingPicture:false})
            setTimeout(() => {
              this.setState({alertFail:false})
            }, 2500);
            })
        
        }
        catch {
          this.setState({alertFail:true, 
            loadingPicture:false})
          setTimeout(() => {
            this.setState({alertFail:false})
          }, 2500);

        }
        }
              
            
            callApi = async (base64EncodedImage) => {

        const res=   await fetch('/api/upload', {
              method: 'POST', 
              body: JSON.stringify({data:base64EncodedImage}),
              headers: {'Content-type': 'application/json'}, 
              
            });
            const data = await res.json();
            return data;
        
         
        };


render(){

    return(
      <div className="PanelStudents">
      <div className="conteinerPanels">

      <div className="newStudent">
      <div className="conteinerNewStudent">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
 

 
  <div className="titleSteepOneStudent"> 
 Create a new student
  </div>
          </div>
  
        </div>
 
 
 
  
   
 <div className="row pt-3">
   <div className="col-lg-12 ">
   <div className="centerBlock">
                 
        <UpAvatar picture={this.state.picture} category={1}  ></UpAvatar> 
    </div>
    
   </div>
 </div>
 
 <div className="row pt-2">
   <div className="col-lg-12 " >
   <div className="centerBlock">
                 
   <div className="newName">Name<input className="textBoxStudent"  id="uname" name="name" type='text' value={this.state.name} onChange={this.Handleİnpt} /></div>
    </div>
    
   </div>
 </div>
 
 
 <div className="row pt-2">
   <div className="col-lg-12 ">
   <div className="centerBlock">
                 
   <div className="newSurname">Surname<input className="textBoxStudent"  id="usname" name="surname" type='text' value={this.state.surname} onChange={this.Handleİnpt}></input></div> </div>
    
   </div>
 </div>
 <div className="row pt-2">
   <div className="col-lg-12 ">
   <div className="centerBlock">
  
   <div className="newSurname">New Password?
   <input className="textBoxStudent"  id="password" name="password" type='Password' value={this.state.password} onChange={this.Handleİnpt}></input>
   </div>
    </div>
    
   </div>
 </div>
 

 
 
 <div className="row pt-0">
   <div className="col-lg-12" >
   <div className="centerBlock">

      <button className="SaveActivityButton" onClick={this.SaveActivity}   > save</button></div>
   {this.state.loadingPicture && <UpAvatarLoad  picture='/images/loading.gif' ></UpAvatarLoad> }
   {this.state.alertSuccess && <div style={{height: "47px", width: '200px', position:"absolute", left:  "25%",top: "60%", backgroundColor:'#8FE777', border:'1px',
 paddingTop:'8px', borderRadius:'5%', zIndex:'10', textAlign:'left'}}><GrStatusGood size='1.2rem' /> &nbsp; &nbsp; Change saved</div>}
{this.state.alertFail && <div style={{height: "35px", width: '300px', position:"absolute", left:  "20%",top: "60%", backgroundColor:'#F99696 ', border:'1px',
 paddingTop:'8px', borderRadius:'5%', zIndex:'10'}}><GrStatusDisabled size='1.2rem' /> &nbsp; &nbsp; Fail! contact us</div>}
  {this.state.alert && <div style={{height: "60px", width: '300px', position:"absolute", left:  "20%",top: "60%", backgroundColor:'#F6F7DF', border:'1px',
 paddingTop:'8px', borderRadius:'5%', zIndex:'10'}}><AiOutlineWarning size='1.2rem' /> &nbsp; &nbsp;{this.state.messageAlert}</div>}
 </div>
 </div>
  </div>
       
         
              <input type="file" name="file" id="file" className="inputfile" accept=".jpg,.jpeg,.png, .gif" onChange={this.fileSelectedHandler} />
              <div className="DivUpload">
                    <label htmlFor="file" className="LabelUpload"
                          onMouseOver={()=>{this.setState({helpMouseOverUploadPicture:true})}}
                          onMouseOut={()=>{this.setState({helpMouseOverUploadPicture:false})}}>
                             <BsCloudUpload size="2rem" color="gray"></BsCloudUpload>
                     </label>
                    
               </div>
               {this.state.alertPicture && <div className="MessageAlertPicture">FAIL UPLOAD</div>}
         
            
 

 
                                
        
      </div>
      </div>
      </div>
      </div>

      
/* <div style={{height:'500px', width:'95%', marginLeft:'70px', overflow:'block'}}>
<div className="conteinerPanels">
   
<div style={{position:'absolute', width:'450px', height:'575px', top:'-30px', left:'35%', backgroundColor:'#E5F6F4  ', borderTop:'0.2px solid'}}>

 
<div className="titleSteepOneStudent"> 
Would like to change something?
</div>



       <div style={{position:'absolute', width:'240px',
        height:'250px', top:'50px', left:'100px', }} > <UpAvatar picture={this.state.picture} name={this.state.name}  ></UpAvatar> </div>
       
            <input type="file" name="file" id="file" className="inputfile" accept=".jpg,.jpeg,.png, .gif" onChange={this.fileSelectedHandler} />
            <div style={{
        position: 'absolute',
        top: '200px',
        left: '350px'

     }}>
                  <label htmlFor="file" className="LabelUpload"
                        onMouseOver={()=>{this.setState({helpMouseOverUploadPicture:true})}}
                        onMouseOut={()=>{this.setState({helpMouseOverUploadPicture:false})}}>
                           <BsCloudUpload size="2rem" color="gray"></BsCloudUpload>
                   </label>
                  
             </div>
             {this.state.alertPicture && <div className="MessageAlertPicture">FAIL UPLOAD</div>}
            {this.state.helpMouseOverUploadPicture && <div className="DivUploadHelp">change your picture</div>}
          
            {this.state.alert && <div style={{height: "60px", width: '250px', position:"absolute", left:  "60%",top: "50%", backgroundColor:'#F6F7DF', border:'1px',
 paddingTop:'8px', borderRadius:'5%', zIndex:'10'}}><AiOutlineWarning size='1.2rem' /> &nbsp; &nbsp;{this.state.messageAlert}</div>}

{this.state.alertSuccess && <div style={{height: "30px", width: '250px', position:"absolute", left:  "40%",top: "50%", backgroundColor:'#8FE777', border:'1px',
 paddingTop:'8px', borderRadius:'5%', zIndex:'10'}}><GrStatusGood size='1.2rem' /> &nbsp; &nbsp; Change saved</div>}

{this.state.alertFail && <div style={{height: "35px", width: '175px', position:"absolute", left:  "40%",top: "50%", backgroundColor:'#F99696 ', border:'1px',
 paddingTop:'8px', borderRadius:'5%', zIndex:'10'}}><GrStatusDisabled size='1.2rem' /> &nbsp; &nbsp; Fail! contact us</div>}

       <div className="newName">Name<input className="textBoxStudent"  id="uname" name="name" type='text' value={this.state.name} onChange={this.Handleİnpt} /></div>
       <div className="newSurname">Surname<input className="textBoxStudent"  id="usname" name="surname" type='text' value={this.state.surname} onChange={this.Handleİnpt}></input></div>
      <div style={{position:'absolute', width:'200px', height:'55px', top:'80%', left:'125px', textAlign:'left'}}>New Password?<input className="textBoxStudent"  id="password" name="password" type='Password' value={this.state.password} onChange={this.Handleİnpt}></input></div>
       

                              
       {this.state.loadingPicture && <div style={{position:'absolute', width:'75px', height:'50px', top:'90%', left:'58%'}}> <img src='/images/loading.gif' alt="" style={{width:'55px', height:'50px'}} ></img> </div>}
    </div>
</div>


     </div>
     
     */
      
  
        )
}


}

function UpAvatar(props) {
    

    const classes = useStyles();
   if(props.picture===null || props.picture==="null"){
    return<Avatar  size={40} src='/images/newUser.jpg' className = {classes.medium} ></Avatar>
          }else{
            return   <Avatar  size={40} src= {props.picture} className = {classes.medium} ></Avatar>
            }
    
 }

 function UpAvatarLoad(props) {
  const classes = useStyles();


          return   <Avatar  size={40} src= {props.picture} className = {classes.icono} style={{float:'right'}}></Avatar>
    //students
     
      



}

export default withRouter(settings)