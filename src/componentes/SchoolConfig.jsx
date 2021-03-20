import React,{Component} from 'react'
import { withRouter } from 'react-router'
import AutenticationServices from './AutenticationServices.js'
import { makeStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/avatar'
import {BsCloudUpload} from 'react-icons/bs'
import {AiOutlineWarning} from 'react-icons/ai'
import {GrStatusGood, GrStatusDisabled} from 'react-icons/gr'
import {FaRecycle} from 'react-icons/fa'
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";
import {GrConfigure} from 'react-icons/gr'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
     medium: {
 
        fontSize:18,
        width: theme.spacing(30),
        height: theme.spacing(30),
     
      borderColor: '#FBD89F',  borderStyle:'solid',borderWidth:'thick'
      },
      small: {
        width: theme.spacing(7),
        height: theme.spacing(7),

      },
      Xsmall: {
        width: theme.spacing(4),
        height: theme.spacing(4),

      }
  }));
class SchoolConfig extends Component{
constructor(props){
    super(props)

    this.state={
        picture:'',
        name:'', 
        idSchool:'',
        rol:'', 
        file:null, 
        ListTeacher:[],
        dateNewStart:null, 
        dateNewFinish:null, 
        language:0,
        changeLanguage:0,
        flagDate:false,
        dateNewActivity:null, 
        saveInfo:true, 
        messageAlert:'',
        AlertMessage:false,
        Cicle:'',
        LanguageList:[0,1,2,3], 
        LanguageOptions:false, 
        isAdmin:false,
    }

}

componentDidMount(){
  const Category = AutenticationServices.returnCategory();
 const SchoolId =AutenticationServices.returnIdSchool();
 let Admin = false
 if(Category==='3'){
Admin=true
 }

 this.setState({isAdmin:Admin})

AutenticationServices.getSchoolProfile(SchoolId)
.then(response =>{
    
    let picture =''
    if(response.data.logo===null){
picture='/images/interrogant.png'
    }else{
        picture= response.data.logo
    }
    let DateExist= false
    if(response.data.dateStart!==null){
      DateExist=true
    }
    this.setState({picture:picture,
        name:response.data.name,
        flagDate:DateExist, 
        dateStart:response.data.dateStart,
        dateFinish:response.data.datefinish,
        language:response.data.language, 
        changeLanguage:response.data.language,
        idSchool:SchoolId,
        Cicle:response.data.cicle,
       

})
  
})
/*
*/

AutenticationServices.getTeachersBySchool(SchoolId)
.then(response => {
 
        this.setState({
           ListTeacher:response.data
})

})
.catch(error => {
if (!error.response) {
console.log( "we dont have a error response")    
// console.log( "this.state.codeLoginFailed> " + this.state.codeLoginFailed)
} else {
console.log("codigo de error " + error.response.data.code)
}})




this.fileSelectedHandler = this.fileSelectedHandler.bind(this)
this.Handleİnpt = this.Handleİnpt.bind(this)
this.SaveActivity = this.SaveActivity.bind(this)
this.NewStartDate= this.NewStartDate.bind(this)
this.NewFinishDate= this.NewFinishDate.bind(this)
this.ShiftChange = this.ShiftChange.bind(this)
this.props.title('')
}



Handleİnpt(event){
      if(!(event.target.value.match(/^[0-9.]+$/)) && event.target.value.length>0 ){
     this.setState({AlertMessage:true, 
    messageAlert:'please just use numbers',
  bgcolorAlert:'#F4EEC0'})

  setTimeout(() => {
    this.setState({AlertMessage:false, 
     })
  }, 2000);
  event.target.value=''
    }else if(parseInt(event.target.value)>12 ||parseInt(event.target.value)<0){
      this.setState({AlertMessage:true, 
        messageAlert:'Number has to be < 12 ',
      bgcolorAlert:'#F4EEC0'})
    
      setTimeout(() => {
        this.setState({AlertMessage:false, 
         })
      }, 2000);
      event.target.value=''
    }else{
      this.setState({
        [event.target.name]: event.target.value
            })
    }
   

   
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
      
    if(this.state.dateNewStart===null || this.state.dateNewFinish===null){
        this.setState({
        alert:true,
        messageAlert:'Choose a start and finish dates',
        loadingPicture:false
        })
        setTimeout(
        () => { this.setState({
          alert:false,
          messageAlert:''
          })},
        3500
        );
      
        }else if(this.state.Cicle==='' ) {
          this.setState({
            alert:true,
            messageAlert:'write a cicle [1-11]',
            loadingPicture:false,
            
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
                 
                  formData.append('idSchool', parseInt(this.state.idSchool))
                  formData.append('Logo', '')
                  formData.append('Cicle',this.state.Cicle );
                  formData.append('dateStart', this.state.dateNewStart.year + '-' +this.state.dateNewStart.month + '-'+this.state.dateNewStart.day);
                  formData.append('dateFinish', this.state.dateNewFinish.year + '-' +this.state.dateNewFinish.month + '-'+this.state.dateNewFinish.day);
                  formData.append('Language', this.state.changeLanguage)

                   AutenticationServices.updateSchool(formData)
                   .then(response=>{
                     this.setState({alertSuccess:true, 
                       loadingPicture:false, 
                       dateStart:this.state.dateNewStart.year + '-' +this.state.dateNewStart.month + '-'+this.state.dateNewStart.day, 
                       dateFinish:this.state.dateNewFinish.year + '-' +this.state.dateNewFinish.month + '-'+this.state.dateNewFinish.day, 
                       language:this.state.changeLanguage
                      })
                     setTimeout(() => {
                       this.setState({alertSuccess:false, flagDate:true})
                     }, 2500);
                   })
                   .catch(error=>{
                    
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
                  
                  formData.append('idSchool', parseInt(this.state.idSchool))
                  formData.append('Logo', res.message)
                  formData.append('Cicle',this.state.Cicle );
                  formData.append('dateStart', this.state.dateNewStart.year + '-' +this.state.dateNewStart.month + '-'+this.state.dateNewStart.day);
                  formData.append('dateFinish', this.state.dateNewFinish.year + '-' +this.state.dateNewFinish.month + '-'+this.state.dateNewFinish.day);
                  formData.append('Language', this.state.language)

                   AutenticationServices.updateSchool(formData)
                   .then(response=>{

                     this.setState({alertSuccess:true, 
                       loadingPicture:false, 
                        dateStart:this.state.dateNewStart.year + '-' +this.state.dateNewStart.month + '-'+this.state.dateNewStart.day, 
                        dateFinish:this.state.dateNewFinish.year + '-' +this.state.dateNewFinish.month + '-'+this.state.dateNewFinish.day,
                        
                      })
                     setTimeout(() => {
                       this.setState({alertSuccess:false, flagDate:true})
                     }, 2500);
                   })
                   .catch(error=>{
                    
                     this.setState({alertFail:true, 
                       loadingPicture:false})
                     setTimeout(() => {
                       this.setState({alertFail:false})
                     }, 2500);
                   })
                
          })
          .catch(error => {
           
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

NewStartDate(valueDate){

          this.setState({ dateNewStart:valueDate})
          }


NewFinishDate(valueDate){

            this.setState({ dateNewFinish:valueDate})
            }
        
ShiftChange(){
  if(this.state.flagDate){
    this.setState({flagDate:false})
  }else{
    this.setState({flagDate:true})
  }


}

changeLanguage(item){
  this.setState({changeLanguage:item})
}

render(){

    return(
            
<div style={{position:'absolute', width:'800px', height:'500px', top:'7%', left:'7%'}}>

 




       <div style={{position:'absolute', width:'240px',
        height:'250px', top:'0px', left:'30%' }} > <UpAvatar picture={this.state.picture}  ></UpAvatar> </div>
       
            <input type="file" name="file" id="file" className="inputfile" accept=".jpg,.jpeg,.png, .gif" onChange={this.fileSelectedHandler} />
          
      {this.state.isAdmin &&  <div style={{
        position: 'absolute',
        top: '35%',
        left: '30%'

     }}>
                  <label htmlFor="file" className="LabelUpload"
                        onMouseOver={()=>{this.setState({helpMouseOverUploadPicture:true})}}
                        onMouseOut={()=>{this.setState({helpMouseOverUploadPicture:false})}}>
                           <BsCloudUpload size="1.3rem" color="gray"></BsCloudUpload>
                   </label>
                  
             </div>}    
           

             <div style={{position:'absolute', top:'30%',
                   left:'60%', height:'20px', width:'400px'}}>
                     <UpAllTeachers  ListTeacher={this.state.ListTeacher} ></UpAllTeachers></div>
             
                     <div style={{position:'absolute', top:'30%',
                   left:'60%', height:'20px', width:'400px'}}>
                     <UpAllTeachers  ListTeacher={this.state.ListTeacher} ></UpAllTeachers></div>

{/*                            alert             */}

                     {this.state.AlertMessage && <div style={{height: "30px", width: '250px', position:"absolute", left:  "50.5%",top: "5.5%", backgroundColor:this.state.bgcolorAlert, border:'1px',
 paddingTop:'8px', borderRadius:'5%', zIndex:'10'}}><AiOutlineWarning size='1.2rem' /> &nbsp; &nbsp;{this.state.messageAlert}</div>}

             {this.state.alertPicture && <div className="MessageAlertPicture">FAIL UPLOAD</div>}
            {this.state.helpMouseOverUploadPicture && <div className="DivUploadHelp">change your picture</div>}
          
            {this.state.alert && <div style={{height: "60px", width: '250px', position:"absolute", left:  "60%",top: "50%", backgroundColor:'#F6F7DF', border:'1px',
 paddingTop:'8px', borderRadius:'5%', zIndex:'10'}}><AiOutlineWarning size='1.2rem' /> &nbsp; &nbsp;{this.state.messageAlert}</div>}

{this.state.alertSuccess && <div style={{height: "30px", width: '250px', position:"absolute", left:  "40%",top: "50%", backgroundColor:'#8FE777', border:'1px',
 paddingTop:'8px', borderRadius:'5%', zIndex:'10'}}><GrStatusGood size='1.2rem' /> &nbsp; &nbsp; Change saved</div>}

{this.state.alertFail && <div style={{height: "35px", width: '175px', position:"absolute", left:  "40%",top: "50%", backgroundColor:'#F99696 ', border:'1px',
 paddingTop:'8px', borderRadius:'5%', zIndex:'10'}}><GrStatusDisabled size='1.2rem' /> &nbsp; &nbsp; Fail! contact us</div>}



{/*                        N A M E     S C H O O L                  */}



    <div  style={{position:'absolute', width:'700px',
        height:'60px', top:'10%', left:'65%', fontSize:'65PX', color:'rgb(236, 163, 129)', fontFamily: "Lucida Sans Unicode",
         fontWeight:'700', textAlign:'left'
         }} >{this.state.name}</div>
       


       {   /*                 D A T E S                  */ }

         {this.state.flagDate && <div style={{position:'absolute', left:'45%', top:'60%',  width:'35%', height:'200px'}}> 
         <GetCalendar Language={this.state.language} MontStart={this.state.dateStart} 
         MontFinish={this.state.dateFinish} ></GetCalendar>   </div>}
{this.state.isAdmin  &&
 <div onClick={this.ShiftChange}  style={{position:'absolute', left:'40%', top:'65%', opacity:'0.4', cursor:'pointer'}}> 
         <GrConfigure size='1.2rem'></GrConfigure>  </div>}


{!this.state.flagDate && <div style={{position:'absolute', left:'45%', top:'65%', width:'35%', height:'100px'}}> 
<div style={{fontSize:'18px', opacity:'0.5', fontStyle:'oblique', textAlign:'right', width:'100px'}}>We start</div>  
    <GetDate setDate={this.state.dateNewStart} handleDate={this.NewStartDate}></GetDate>   </div>}

        {!this.state.flagDate && <div style={{position:'absolute', left:'45%',  top:'85%', width:'35%', height:'100px'}}> 
        <div style={{fontSize:'18px', opacity:'0.5', fontStyle:'oblique', textAlign:'right', width:'100px'}}>We finish</div>  
     <GetDate setDate={this.state.dateNewFinish} handleDate={this.NewFinishDate}></GetDate>   </div>}


{ /*                    F I N      D A T E S       */ }



 <div style={{position:'absolute', left:'83%',  top:'68%', width:'0.5%', height:'150px', border:'1px solid #DFD7D7 ', 
                                     borderBottom:'none', borderTop:'none' }}> 

        </div>

  <div style={{position:'absolute', left:'90%',  top:'65%', width:'35%', height:'70px', opacity:'0.6'
                                      }}> 
                                     <FaRecycle size='1.3rem'></FaRecycle>
                                      <br></br>
                                      <br></br>
                                     
                                      {!this.state.flagDate &&      <input style={{width:'80px', background:'transparent',marginLeft:'30px',  borderTop: 'none', 
                                       borderLeft: 'none' , borderRight: 'none'}}

                  onChange={this.Handleİnpt} type="text" value={this.state.Cicle} name='Cicle' placeholder="# month" />}

                                    {this.state.flagDate && <div style={{marginLeft:'15px'}}> {'# '+this.state.Cicle +' months'}</div>}

        </div>

        {
        this.state.flagDate &&<div style={{position:'absolute', left:'105%', top:'87%'}}  >  <UpAvatarLanguage name='current' currentLanguage={this.state.language} ></UpAvatarLanguage></div> 
       
       }

{
        !this.state.flagDate &&<div onClick={()=>{this.setState({LanguageOptions:true})}} 
        style={{position:'absolute', left:'105%', top:'87%' , cursor:'pointer'}}  > 
         <UpAvatarLanguage name='current' currentLanguage={this.state.changeLanguage} ></UpAvatarLanguage></div> 
       
       }

    {/*               LANGUAGE OPTIONS                                   */}
         {this.state.LanguageOptions && <div style={{position:'absolute', left:'115%', top:'90%'}}> {this.state.LanguageList.map(item=>{

if(parseInt(item)!==parseInt(this.state.changeLanguage)){
return(<div key={item.id} style={{marginBottom:'15px', cursor:'pointer'}} onClick={()=>{
this.setState({LanguageOptions:false})
this.changeLanguage(item)
}}>   <UpAvatarLanguage name='Notcurrent' currentLanguage={parseInt(item)} ></UpAvatarLanguage></div>)
}else{
  return ""
}

}

)} </div> }



        


        {!this.state.flagDate && <div style={{position:'absolute', width:'100px', height:'80px', 
                                                top:'100%', left:'76%'}}>
                                                  <button className="SaveActivityButton" onClick={this.SaveActivity}>
                                                     save</button></div>}
                              
       {this.state.loadingPicture && <div style={{position:'absolute', width:'75px', height:'50px', top:'90%', left:'58%'}}> <img src='/images/loading.gif' alt="" style={{width:'55px', height:'50px'}} ></img> </div>}
    </div>

     
    
        )
}


}

function UpAvatar(props) {
    const classes = useStyles();
    if(props.cat==='2'){
      return   <Avatar  size={40} src= {props.picture} className = {classes.small} ></Avatar>
    }else{ return   <Avatar  size={40} src= {props.picture} className = {classes.medium} ></Avatar>}
   
     }

function UpAllTeachers(props) {
 
let    countHorizontalPlace=0
let keycounter =0;
    return(<div  style={{position:'relative', width:'100%', height:'100%'}}>
      {props.ListTeacher.map(item=>{
       
        if(item.picture!=='n'){
        countHorizontalPlace=countHorizontalPlace+40
        keycounter=keycounter+1
        return(
        <div  key={keycounter} style={{position:'absolute', width:'7px', left:`${countHorizontalPlace}px`}}><UpAvatar cat='2' picture={item.picture} ></UpAvatar></div>)
        }else {return ""}

      })}
    </div>)
    
   
    
  
       }



function GetCalendar(props){

  const MontStart = new Date(props.MontStart)
  const MontFinish = new Date(props.MontFinish)
        let month=[]
      switch (props.Language){
        case 1:
          
          month = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
          break;
          case 0:
          
          month = ['ocak',
          'şubat',
          'Mart',
          'Nisan',
          'Mayıs',
          'Haziran',
          'temmuz',
          'Ağustos',
          'Eylül',
          'ekim',
          'kasım',
          'aralık',
        ];
        break
        case 2:
          
          month = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
          "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
          break;
          case 3:
          
            month = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
          ];
            break;
            
        default:
          break;
      }

    
      const GetMonthStart =month[MontStart.getMonth()];
      const GetMonthEnd = month[MontFinish.getMonth()];
      return(
<div style={{position:'relative', width:'100%', height:'100%'}}>
  <div style={{position:'absolute', left:'15%', top:'10%'}}>
  We Start
  <div style={{position:'relative', width:'80px', height:'60px', border:'1px solid #E1E1E1', borderRadius:'7%'}}>
          <div style={{position:'relative', width:'101.5%', marginLeft:'-0.5%', height:'30%', 
          backgroundColor:'#F55E43', color:'#FFFEFE ', paddingTop:'2px', fontSize:'14px'}} >{GetMonthStart}
    </div>
    <div style={{position:'relative', width:'100%', height:'70%', fontSize:'20px'}} >
        {MontStart.getDate()}
    </div>
      </div>
</div>

<div style={{position:'absolute', left:'15%', top:'70%'}}>
  We Finish
  <div style={{position:'relative', width:'80px', height:'60px', border:'1px solid #E1E1E1', borderRadius:'7%'}}>
          <div style={{position:'relative', width:'101.5%', marginLeft:'-0.5%', height:'30%', 
          backgroundColor:'#F55E43', color:'#FFFEFE ', paddingTop:'2px', fontSize:'14px'}} >{GetMonthEnd}
    </div>
    <div style={{position:'relative', width:'100%', height:'70%', fontSize:'20px'}} >
    {MontFinish.getDate()}
    </div>
      </div>
</div>
</div>


      
      
      
      ) 
    
    
    }
    
       
    function GetDate(props){

      return( 
        
      
      
              <DatePicker
              value={props.setDate}
              onChange={date =>props.handleDate(date)}
            inputPlaceholder="Select a date" // placeholder
            formatInputText={props.formatInputValue} // format value
            inputClassName="my-custom-input" // custom class
            shouldHighlightWeekends
          />
               
                )
      }

      function UpAvatarLanguage(props){
        const LanguageList = [{ id: 0, text: 'turkish', picture: "/images/turkishFlag.png" },
        { id: 1, text: 'english', picture: "/images/englishFlag.jpg" },
        { id: 2, text: 'spanish', picture: "/images/spanishFlag.png" },
        { id: 3, text: 'greek', picture: "/images/greekFlag.png" }]
        const classes = useStyles();
        
        
        if(props.name==='current'){        
return    <Avatar  size={40} src={LanguageList[props.currentLanguage].picture}  className = {classes.small} ></Avatar>}else{
  return    <Avatar  size={40} src={LanguageList[props.currentLanguage].picture}  className = {classes.Xsmall} ></Avatar> 
}

   
      }
export default withRouter(SchoolConfig)