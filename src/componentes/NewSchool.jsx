
import React,{Component} from 'react'

import AutenticationServices from './AutenticationServices.js'
import { makeStyles } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import  './login.css'
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
class NewSchool extends Component{
constructor(props){
    super(props)

    this.state={
      titleNewS:'School Name',
      passNewS:'Admin password for new school',
      InfoNewUser:'',
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
        loadingPicture:false
    }

    this.Handleİnpt = this.Handleİnpt.bind(this)
    this.HandleFocus= this.HandleFocus.bind(this)
    this.NewStartDate= this.NewStartDate.bind(this)
    this.NewFinishDate= this.NewFinishDate.bind(this)
    this.SaveActivity = this.SaveActivity.bind(this)

}

componentDidMount(){
  
}


Handleİnpt(event){
  this.setState({
[event.target.name]: event.target.value
  })
 }

 HandleFocus(event){
  this.setState({
    [event.target.name]: ''
      })
 }

 NewStartDate(valueDate){

  this.setState({ dateNewStart:valueDate})
  }


NewFinishDate(valueDate){

    this.setState({ dateNewFinish:valueDate})
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
          
          
          }else if(this.state.titleNewS==='' || this.state.titleNewS==='School Name'  ) {
            this.setState({
              alert:true,
              messageAlert:'write a Name',
              loadingPicture:false,
              
              })
              setTimeout(
              () => { this.setState({
                alert:false,
                messageAlert:''
                })},
              3500
              );
            
            
            }else if(this.state.passNewS==='' || this.state.passNewS==='Admin password for new school'  ) {
              this.setState({
                alert:true,
                messageAlert:'write a Name',
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
                  
                  formData.append('Password', this.state.passNewS)
                  formData.append('name', this.state.titleNewS)
                  formData.append('Cicle',this.state.Cicle );
                  formData.append('dateStart', this.state.dateNewStart.year + '-' +this.state.dateNewStart.month + '-'+this.state.dateNewStart.day);
                  formData.append('dateFinish', this.state.dateNewFinish.year + '-' +this.state.dateNewFinish.month + '-'+this.state.dateNewFinish.day);
                  formData.append('Language', this.state.changeLanguage)

                   AutenticationServices.CreateSchool(formData)
                   .then(response=>{
                     let respuesta = response.data + ''
                     if(respuesta!=='false'){
                       this.setState({alertSuccess:true, 
                       loadingPicture:false, 
                       dateStart:this.state.dateNewStart.year + '-' +this.state.dateNewStart.month + '-'+this.state.dateNewStart.day, 
                       dateFinish:this.state.dateNewFinish.year + '-' +this.state.dateNewFinish.month + '-'+this.state.dateNewFinish.day, 
                       InfoNewUser:'Username & password: ' + response.data
                      })
                     setTimeout(() => {
                       this.setState({alertSuccess:false, flagDate:true})
                     }, 2500);
                     }else{
                    
                      this.setState({ 
                        loadingPicture:false, 
                        InfoNewUser:'Wrong password'
                      })
                      setTimeout(() => {
                        this.setState({InfoNewUser:''})
                      }, 2500);
                     }

                     
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
                  
                  formData.append('Password', this.state.passNewS)
                  formData.append('name', this.state.titleNewS)
                  formData.append('Logo', res.message)
                  formData.append('Cicle',this.state.Cicle );
                  formData.append('dateStart', this.state.dateNewStart.year + '-' +this.state.dateNewStart.month + '-'+this.state.dateNewStart.day);
                  formData.append('dateFinish', this.state.dateNewFinish.year + '-' +this.state.dateNewFinish.month + '-'+this.state.dateNewFinish.day);
                  formData.append('Language', this.state.language)

                   AutenticationServices.CreateSchool(formData)
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



render(){

    return(
            
<div class="container">
<div class="row">
<div class="col-12 col-lg-12 mt-8 text-center">
<div className="Title">Create your School</div>

  </div>

  </div>

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
    
export default NewSchool;