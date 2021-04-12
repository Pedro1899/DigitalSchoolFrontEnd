import React, {Component} from 'react';
import './program.css'

import { withRouter } from 'react-router'
import {FaSlidersH,FaRegCircle,FaCircle} from 'react-icons/fa'
import {BsCalendar, BsXCircle, BsFillCircleFill} from 'react-icons/bs'

import 'bootstrap/dist/css/bootstrap.min.css';
import { AiOutlineWarning, AiOutlineEye, AiOutlineRightCircle, AiOutlineLeftCircle, AiOutlineDelete}  from 'react-icons/ai'
import {BsCloudUpload,BsFillPlusSquareFill, BsCheck, BsX} from 'react-icons/bs'
import {GrSend, GrStatusGood} from 'react-icons/gr'
import Avatar from '@material-ui/core/avatar'
import AutenticationServices from './AutenticationServices.js';
import MaterialTable from 'material-table'
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";

import { Calendar } from "react-modern-calendar-datepicker";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';


import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    Lgreen: {
      color: theme.palette.getContrastText(green[500]),
      backgroundColor: green[500],
      width: theme.spacing(5),
        height: theme.spacing(5),
    }, 

    medium: {
      color: theme.palette.getContrastText(green[500]),
      backgroundColor: green[500],
      width: theme.spacing(6),
        height: theme.spacing(6),
    },
    formControl: {
      fontSize:5,
      minWidth: 100,
      minHeight:50
    }
  }));



class Program extends Component{
  
constructor(proops){
super(proops);
this.state ={
idSchool:'',
idUser:'', 
OffActivities:true, 
ShowSlidePanel:true, 
ListTeachers:[], 
CoursesFlag:false, 
ListCoursesAssPivot:[],
ListCoursesAss:[],
ListIdCoursesAss:[],
CoursesAssFlag:false, 
titleNewAc:'Title',
DescriptionNewAc:'Description', 
dateNewActivity:null,
flagUpPicture:false,
PictureActivityFile:null, 
PictureActivityFilePreview:null, 
AlertMessage:false, 
messageAlert:'', 
category :'Extern', 
SuccessMessage:false, 
FailMessage:false, 
Admin:false,

//Detail of activities for this specific teacher


ListCoursesThisTeacher:[],
ListActivitiesOfThisTeacher:[], 
ListIteractionActivity:[],
ActivityCounter:0,
TitleThisActivity:'',
DescriptionThisActivity:'',
PictureThisActivity:'',
dateThisActivity:'',
coursesThisActivity:[],
photoThisActivity:'',
categoryThisActivity:'',
dayDate:0,
monthDate:0,
yearDate:0, 
bgcolorActivityList:[],
bgColorActivity:'', 
sizeListActivity:0,


//
pictureAdminOfThisActivity:'',
nameAdminOfThisActivity:'',
surnameAdminOfThisActivity:'',


//delete activity

ShowNewActivityPanelDelete:false,
offActivityDelete:false,
ListActivitiesDelete:[],
idActivityToDelete:null

}


this.changeSelectionCourse = this.changeSelectionCourse.bind(this)
this.updateCoursesSelection = this.updateCoursesSelection.bind(this)
this.Handleİnpt = this.Handleİnpt.bind(this)
this.HandleFocus= this.HandleFocus.bind(this)
this.NewActivityDate = this.NewActivityDate.bind(this)
this.fileSelectedHandler = this.fileSelectedHandler.bind(this)
this.previewPicture = this.previewPicture.bind(this)
this.SaveActivity = this.SaveActivity.bind(this)
this.handleChangeSelect = this.handleChangeSelect.bind(this)
this.handleNextActivity = this.handleNextActivity.bind(this)
this.handlePreActivity = this.handlePreActivity.bind(this)
//to show all activities of this teacher
this.handleDeleteAct = this.handleDeleteAct.bind(this)
this.newActivityPanel = this.newActivityPanel.bind(this)
this.DeleteThisActivity = this.DeleteThisActivity.bind(this)
}

handleChangeSelect(event){
  this.setState({
 category:event.target.value
  })}


componentDidMount(){

  
  



  const idUser = AutenticationServices.returnUser();
              
AutenticationServices.getActivitiesOfAdmin(idUser)
.then(response => {
 
 if(response.data.length===0){
  this.setState({
    ListActivitiesDelete:response.data,
    offActivityDelete:true
})
 }else{

  
  this.setState({
    ListActivitiesDelete:response.data,
    offActivityDelete:false, 
  
})
 }

 
    })
.catch(error => {
    if (!error.response) {

    } else {
      
       }})
 
 


       
AutenticationServices.getActivitiesUser_Group(idUser)
.then(response => {
 
 const getActivity = response.data

 if(response.data.length===0){
  this.setState({
    ListActivitiesOfThisTeacher:getActivity,
    OffActivities:true
})
 }else{
   const getTitle =response.data[0].title
   const getDescription =response.data[0].description
   const getdateActivity = response.data[0].dateActivity
  const dateMonth = new Date(getdateActivity).getMonth() +1
  const dateYear = new Date(getdateActivity).getFullYear()
  const dateDay = new Date(getdateActivity).getDate()
   const getcategory = response.data[0].category
   const photo = response.data[0].photo
   const pictureAdmin = response.data[0].idAdmin
  
   const nameAdmin = response.data[0].nameAdmin
   const surnameAdmin = response.data[0].surnameAdmin
const size = response.data.length
   const idCourses = response.data[0].idCourses
   const setColor ='#FBF3EB'
   const setListbgColor =['#FBF3EB','#EFF8EB','#F7E6E5', '#F9EFFB' ]
  this.setState({
    ListActivitiesOfThisTeacher:response.data,
    OffActivities:false, 
    TitleThisActivity:getTitle,
    DescriptionThisActivity:getDescription, 
    dateThisActivity:getdateActivity,
    categoryThisActivity:getcategory,
    photoThisActivity:photo,
    coursesThisActivity:idCourses, 
    monthDate:dateMonth, 
    yearDate:dateYear,
    dayDate:dateDay,
    bgColorActivity:setColor,
    
    pictureAdminOfThisActivity:pictureAdmin,
    nameAdminOfThisActivity:nameAdmin,
    surnameAdminOfThisActivity:surnameAdmin,
    bgcolorActivityList:setListbgColor,
    sizeListActivity:size
})
 }

 
    })
.catch(error => {
    if (!error.response) {

    } else {
      
       }})
 


const schoolId = AutenticationServices.returnIdSchool();

    this.setState({
     
        idSchool:schoolId
    })
        //getAllTeachers

        AutenticationServices.getAllUserById(schoolId)
        .then(response => {
          const getTeachers = response.data.filter(item => item.category!==2)
          this.setState({
            ListTeachers:getTeachers
            })
           
        })
        .catch(error => {
            if (!error.response) {
                 
              
            } else {
              
               }})
               
               
               const Category = AutenticationServices.returnCategory();
  
               let Admin = false
             if(Category==='3'){
             Admin=true
             }
              this.setState({idUser:idUser, Admin:Admin})
              this.refreshActivities   =this.refreshActivities.bind(this) 
              
       const language = AutenticationServices.returnIdLanguage();
       this.setState({language:language})
       
        switch (language) {
          case '0':
           this.props.title('etkinlik yöneticisi')
            break;
           case '1':
            this.props.title('Activity management')
             break
             case '2':
               this.props.title('Manejo de actividades')
               break
            case '3':
             this.props.title('καλως ΗΡΘΑΤΕ')
             break
            
       
          default:
            break;
        }
              

}





fileSelectedHandler(event){
  const file = event.target.files[0]
 this.setState({
  PictureActivityFile: file,
  flagUpPicture:true
 })
this.previewPicture(file)
}

previewPicture(file){
const reander = new FileReader();
reander.readAsDataURL(file)
reander.onloadend = () =>{
 this.setState({
  PictureActivityFilePreview:reander.result,
 
 })
}


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

 handleNextActivity(){

 // const getActivity = this.state.ListActivitiesOfThisTeacher

  let count = this.state.ActivityCounter
  count = count +1

  if(count >= this.state.ListActivitiesOfThisTeacher.length){
    count=0
  }


  //change bg color
  const colors = this.state.bgcolorActivityList
    const color = colors[Math.floor(Math.random() * colors.length)];




  const tit =this.state.ListActivitiesOfThisTeacher[count].title
  const des = this.state.ListActivitiesOfThisTeacher[count].description
  const dat =this.state.ListActivitiesOfThisTeacher[count].dateActivity
  
  const mon = new Date(dat).getMonth() +1
  const year = new Date(dat).getFullYear()
  const day = new Date(dat).getDate()

  const cat =this.state.ListActivitiesOfThisTeacher[count].category
  const pic = this.state.ListActivitiesOfThisTeacher[count].photo

  const idCourses = this.state.ListActivitiesOfThisTeacher[count].idCourses
  const pictureAdmin = this.state.ListActivitiesOfThisTeacher[count].idAdmin
  
  const nameAdmin = this.state.ListActivitiesOfThisTeacher[count].nameAdmin
  const surnameAdmin = this.state.ListActivitiesOfThisTeacher[count].surnameAdmin

  this.setState({
   ActivityCounter:count,
   
   TitleThisActivity:tit,
   DescriptionThisActivity:des, 
   dateThisActivity:dat,
   categoryThisActivity:cat,
   photoThisActivity:pic,
   coursesThisActivity:idCourses, 
   monthDate:mon, 
   yearDate:year,
   dayDate:day, 
   bgColorActivity:color,
   nameAdminOfThisActivity:nameAdmin,
   pictureAdminOfThisActivity:pictureAdmin,
   surnameAdminOfThisActivity:surnameAdmin
   
    
 })

 }


 handlePreActivity(){

   
   let count = this.state.ActivityCounter
 if(count >0){
   count = count-1
 }
 
 const colors = this.state.bgcolorActivityList
 const color = colors[Math.floor(Math.random() * colors.length)];

 
   const tit =this.state.ListActivitiesOfThisTeacher[count].title
   const des = this.state.ListActivitiesOfThisTeacher[count].description
   const dat =this.state.ListActivitiesOfThisTeacher[count].dateActivity
   
   const mon = new Date(dat).getMonth() +1
   const year = new Date(dat).getFullYear()
   const day = new Date(dat).getDate()
 
   const cat =this.state.ListActivitiesOfThisTeacher[count].category
   const pic = this.state.ListActivitiesOfThisTeacher[count].photo
 
   const idCourses = this.state.ListActivitiesOfThisTeacher[count].idCourses
   const pictureAdmin = this.state.ListActivitiesOfThisTeacher[count].idAdmin
  
   const nameAdmin = this.state.ListActivitiesOfThisTeacher[count].nameAdmin
   const surnameAdmin = this.state.ListActivitiesOfThisTeacher[count].surnameAdmin
 
   this.setState({
    ActivityCounter:count,
    
    TitleThisActivity:tit,
    DescriptionThisActivity:des, 
    dateThisActivity:dat,
    categoryThisActivity:cat,
    photoThisActivity:pic,
    coursesThisActivity:idCourses, 
    monthDate:mon, 
    yearDate:year,
    dayDate:day,
    bgColorActivity:color,
    nameAdminOfThisActivity:nameAdmin,
   pictureAdminOfThisActivity:pictureAdmin,
   surnameAdminOfThisActivity:surnameAdmin
     
  })
   
 
  }

  handleDeleteAct(id){
    this.setState({
      ConfirmDelete:true,
      idActivityToDelete:id
    })
/**/
  
    
  }
  DeleteThisActivity(){

    AutenticationServices.deleteActivity(this.state.idActivityToDelete)
    .then(response=>
      {
        if(this.state.ListActivitiesDelete.filter(item=>item.id!==this.state.idActivityToDelete).length>0){
          this.setState({
            ListActivitiesDelete:this.state.ListActivitiesDelete.filter(item=>item.id!==this.state.idActivityToDelete),
            ConfirmDelete:false
          })
        }else{
          this.setState({
            ListActivitiesDelete:this.state.ListActivitiesDelete.filter(item=>item.id!==this.state.idActivityToDelete),
            offActivityDelete:true,
            ConfirmDelete:false

          })
        }
     
      })

  }

 NewActivityDate(valueDate){

 this.setState({ dateNewActivity:valueDate})
 }

 SaveActivity(){



if(this.state.titleNewAc==='' ||this.state.titleNewAc==='Title'){
    this.setState({AlertMessage:true, 
      messageAlert:'write a title'})
    
    setTimeout(() => {
         this.setState({AlertMessage:false})
         
       }, 3000);
    
  }else if(this.state.DescriptionNewAc==='' ||this.state.DescriptionNewAc==='Description'){
    this.setState({AlertMessage:true, 
      messageAlert:'write a Description'})
    
    setTimeout(() => {
         this.setState({AlertMessage:false})
         
       }, 3000);
  }else if(this.state.dateNewActivity===null){
    this.setState({AlertMessage:true, 
      messageAlert:'pick a day'})
    
    setTimeout(() => {
         this.setState({AlertMessage:false})
         
       }, 3000);
  }else if(this.state.ListCoursesAss.length===0){
    this.setState({AlertMessage:true, 
      messageAlert:'choose a Course'})
    
    setTimeout(() => {
         this.setState({AlertMessage:false})
         
       }, 3000);
  }else{


    if(this.state.PictureActivityFile!==null){
      this.setState({loadingSave:true})

    this.uploadPicture(this.state.PictureActivityFilePreview)
  

      }else{
        
        this.setState({loadingSave:true})
        const formData = new FormData()

        formData.append('Title',this.state.titleNewAc )
        formData.append('Description', this.state.DescriptionNewAc)
        formData.append('DateActivity', this.state.dateNewActivity.year + '-' +this.state.dateNewActivity.month + '-'+this.state.dateNewActivity.day)
        formData.append('photo', 'null')
        
        
        formData.append('Category', this.state.category)
        
        formData.append('idCourses', this.state.ListIdCoursesAss)
      
        formData.append('idAdmin', this.state.idUser)
        
        AutenticationServices.addActivity(formData)
        .then(response => {
           
          this.setState({
            titleNewAc:'Title', 
            DescriptionNewAc:'Description',
            dateNewActivity:null,
            loadingSave:false, 
            PictureActivityFile:null,
            PictureActivityFilePreview:null,
            SuccessMessage:true,
            flagUpPicture:false,
            CoursesAssFlag:false,
            CoursesFlag:false,
            ListCoursesAss:[],
            ListCourses:[],
            ListIdCoursesAss:[]})
        
          setTimeout(
            () => { this.setState({
              SuccessMessage:false
        
              })}
           ,
            1900
          );
                 
                
        })
        .catch(error => {
        if (!error.response) {
          this.setState({
            titleNewAc:'Title', 
            DescriptionNewAc:'Description',
            dateNewActivity:null,
            loadingSave:false, 
            PictureActivityFile:null,
            PictureActivityFilePreview:null,
            FailMessage:true,
            flagUpPicture:false,
            CoursesAssFlag:false,
            CoursesFlag:false,
            ListCoursesAss:[],
            ListCourses:[],
            ListIdCoursesAss:[]})
        
           
            
          setTimeout(
            () => { this.setState({
              FailMessage:false
        
              })}
           ,
            1900
          );
        
        } else {
        
        if(error.response.status===404){
          this.setState({
            titleNewAc:'Title', 
            DescriptionNewAc:'Description',
            dateNewActivity:null,
            loadingSave:false, 
            PictureActivityFile:null,
            PictureActivityFilePreview:null,
            FailMessage:true,
            flagUpPicture:false,
            CoursesAssFlag:false,
            CoursesFlag:false,
            ListCoursesAss:[],
            ListCourses:[],
            ListIdCoursesAss:[]})
            
            setTimeout(
              () => { this.setState({
                FailMessage:false
          
                })}
             ,
              1900
            );
          
        }
         
        
        }})

      }
  

  }
 }


 async uploadPicture(base64EncodedImage){

  try {
    this.callApi(base64EncodedImage)
    .then(res => { 
    
/* *******************************************  crear actividad */
const formData = new FormData()

formData.append('Title',this.state.titleNewAc )
formData.append('Description', this.state.DescriptionNewAc)
formData.append('DateActivity', this.state.dateNewActivity.year + '-' +this.state.dateNewActivity.month + '-'+this.state.dateNewActivity.day)
formData.append('photo', res.message)


formData.append('Category', this.state.category)

formData.append('idCourses', this.state.ListIdCoursesAss)

formData.append('idAdmin', this.state.idUser)

AutenticationServices.addActivity(formData)
.then(response => {
   
  this.setState({
    titleNewAc:'Title', 
    DescriptionNewAc:'Description',
    dateNewActivity:null,
    loadingSave:false, 
    PictureActivityFile:null,
    PictureActivityFilePreview:null,
    SuccessMessage:true,
    flagUpPicture:false,
    CoursesAssFlag:false,
    CoursesFlag:false,
    ListCoursesAss:[],
    ListCourses:[],
    ListIdCoursesAss:[]})

  setTimeout(
    () => { this.setState({
      SuccessMessage:false

      })}
   ,
    1900
  );
         
        
})
.catch(error => {
if (!error.response) {
  this.setState({
    titleNewAc:'Title', 
    DescriptionNewAc:'Description',
    dateNewActivity:null,
    loadingSave:false, 
    PictureActivityFile:null,
    PictureActivityFilePreview:null,
    FailMessage:true,
    flagUpPicture:false,
    CoursesAssFlag:false,
    CoursesFlag:false,
    ListCoursesAss:[],
    ListCourses:[],
    ListIdCoursesAss:[]})

   
    
  setTimeout(
    () => { this.setState({
      FailMessage:false

      })}
   ,
    1900
  );

} else {

if(error.response.status===404){
  this.setState({
    titleNewAc:'Title', 
    DescriptionNewAc:'Description',
    dateNewActivity:null,
    loadingSave:false, 
    PictureActivityFile:null,
    PictureActivityFilePreview:null,
    FailMessage:true,
    flagUpPicture:false,
    CoursesAssFlag:false,
    CoursesFlag:false,
    ListCoursesAss:[],
    ListCourses:[],
    ListIdCoursesAss:[]})
    
    setTimeout(
      () => { this.setState({
        FailMessage:false
  
        })}
     ,
      1900
    );
  
}
 

}})

/****************************************************** Aqui se creo la actividad  */
     
     }).catch(err => {
      this.setState({
        titleNewAc:'Title', 
        DescriptionNewAc:'Description',
        dateNewActivity:null,
        loadingSave:false, 
        PictureActivityFile:null,
        PictureActivityFilePreview:null,
        FailMessage:true,
        flagUpPicture:false,
        CoursesAssFlag:false,
        CoursesFlag:false,
        ListCoursesAss:[],
        ListCourses:[],
        ListIdCoursesAss:[]
           })

      setTimeout(
      () => { this.setState({
        FailMessage:false
  
        })}
     ,
      1900
    );



    });
    
} catch (error) {
 
 
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


refreshActivities(){
  const idUser = AutenticationServices.returnUser();
  AutenticationServices.getActivitiesUser_Group(idUser)
.then(response => {

 const getActivity = response.data

 if(response.data.length===0){
  this.setState({
    ActivityCounter:0,
    ListActivitiesOfThisTeacher:getActivity,
    OffActivities:true,
    ShowNewActivityPanel:false,
    ShowSlidePanel:true,
    ShowNewActivityPanelDelete:false
})
 }else{
   const getTitle =response.data[0].title
   const getDescription =response.data[0].description
   const getdateActivity = response.data[0].dateActivity
  const dateMonth = new Date(getdateActivity).getMonth() +1
  const dateYear = new Date(getdateActivity).getFullYear()
  const dateDay = new Date(getdateActivity).getDate()
   const getcategory = response.data[0].category
   const photo = response.data[0].photo
   const pictureAdmin = response.data[0].idAdmin
   const nameAdmin = response.data[0].nameAdmin
   const surnameAdmin = response.data[0].surnameAdmin
const size = response.data.length
   const idCourses = response.data[0].idCourses
   const setColor ='#FBF3EB'
   const setListbgColor =['#FBF3EB','#EFF8EB','#F7E6E5', '#F9EFFB' ]
  this.setState({
    ActivityCounter:0,
    ListActivitiesOfThisTeacher:response.data,
    OffActivities:false, 
    TitleThisActivity:getTitle,
    DescriptionThisActivity:getDescription, 
    dateThisActivity:getdateActivity,
    categoryThisActivity:getcategory,
    photoThisActivity:photo,
    coursesThisActivity:idCourses, 
    pictureAdminOfThisActivity:pictureAdmin,
    nameAdminOfThisActivity:nameAdmin,
    surnameAdminOfThisActivity:surnameAdmin,

    monthDate:dateMonth, 
    yearDate:dateYear,
    dayDate:dateDay,
    bgColorActivity:setColor,
    bgcolorActivityList:setListbgColor,
    sizeListActivity:size,
    ShowNewActivityPanel:false, ShowSlidePanel:true, ShowNewActivityPanelDelete:false
    
})
 }

 
    })
.catch(error => {
    if (!error.response) {
      this.setState({ShowNewActivityPanel:false, ShowSlidePanel:true })
    } else {
      this.setState({ShowNewActivityPanel:false, ShowSlidePanel:true })
      
       }})
  
  
}

newActivityPanel(){

  if(this.state.Admin){
    this.setState({ShowNewActivityPanel:true, ShowSlidePanel:false, ShowNewActivityPanelDelete:false })
  }else{

  let ListCoures=[]
  this.state.ListTeachers.forEach(item=>{
  
        if(item.idUser===parseInt(this.state.idUser)){
      if(item.courses.length>0){
        ListCoures=item.courses
      }
    }
  })

  if(ListCoures.length>0){

    this.setState({ShowNewActivityPanel:true, 
                    ShowSlidePanel:false,
                    ShowNewActivityPanelDelete:false,
                    ListCourses:ListCoures,
                    CoursesFlag:true 
                   })
  } else{
    this.setState({ShowNewActivityPanel:true, 
      ShowSlidePanel:false,
      ShowNewActivityPanelDelete:false,
      CoursesFlag:false })
    
    
  }
 



  }

}

render(){return(

<div className="PanelActivity">


    <div className="containerNavPanelAct">
  
        <div className="NewActivity" onClick={this.newActivityPanel}  ><BsFillPlusSquareFill size="1.5rem"></BsFillPlusSquareFill></div>
        <div className="showCalendar" onClick={this.refreshActivities}><BsCalendar size="1.5rem" ></BsCalendar></div>
        <div className="showSlide"><FaSlidersH size="1.5rem" onClick={()=>{
          const idUser = AutenticationServices.returnUser();
          AutenticationServices.getActivitiesOfAdmin(idUser)
  .then(response => {
   if(response.data.length===0){
    this.setState({
      ListActivitiesDelete:response.data,
      offActivityDelete:true
  })
   }else{
    this.setState({
      ListActivitiesDelete:response.data,
      offActivityDelete:false, 
    })}
      })
  .catch(error => {
      if (!error.response) {
  
      } else {
        
         }})
          this.setState({ShowNewActivityPanel:false, ShowSlidePanel:false, ShowNewActivityPanelDelete:true })
          }}  ></FaSlidersH></div>

    </div>

<div className="showSlideActivitiesPanel">
                        {/* PANEL DE INICIO ACTIVIDADES {VISUALIZACION} */}
{ this.state.ShowSlidePanel && 

<div className="containerSlidePanelAct">


{this.state.OffActivities && <div><img src='/images/empryActivities.png' alt='' style={{height: "250px", width: '250px', paddingTop: '125PX', opacity:'0.75'}} ></img>
<p style={{fontSize:'18px', color:'black', opacity:'0.3'}} >There is not activities</p></div>}


{!this.state.OffActivities && <UPActivity Title ={this.state.TitleThisActivity}
                                          Description ={this.state.DescriptionThisActivity}
                                          Photo ={this.state.photoThisActivity}
                                          Courses ={this.state.coursesThisActivity}
                                          Category= {this.state.categoryThisActivity}
                                          Date = {this.state.dateThisActivity}
                                          flagPicture ={this.state.flagPicture}
                                          month ={this.state.monthDate}
                                          year ={this.state.yearDate}
                                          day ={this.state.dayDate}
                                          SetbgColor ={this.state.bgColorActivity}
                                          language={this.state.language}
                                         
                                ></UPActivity>

                                          }



{ !this.state.OffActivities && <UpAdmin
                                   picture={this.state.pictureAdminOfThisActivity} 
                                  name={this.state.nameAdminOfThisActivity}
                                  surname ={this.state.surnameAdminOfThisActivity}
                                  language={this.state.language}
></UpAdmin> }
  

  {!this.state.OffActivities &&<div className='NextActivity' onClick={this.handleNextActivity}  >
<AiOutlineRightCircle size="2rem"  ></AiOutlineRightCircle></div> }

{ !this.state.OffActivities && <UpShowCounter
                                   Actual={this.state.ActivityCounter} 
                                  ListCourses={this.state.ListActivitiesOfThisTeacher}
                                  SetbgColor ={this.state.bgColorActivity}
></UpShowCounter> }
{!this.state.OffActivities &&<div className='PrevActivity' onClick={this.handlePreActivity} >
 <AiOutlineLeftCircle size="2rem"  ></AiOutlineLeftCircle></div>}
 
</div>











}

                            {/* PANEL DE CREAR ACTIVIDADES */}
{ this.state.ShowNewActivityPanel &&  <div className="containerNewPanelAct">

<div class="container">
  <div class="row">
<div class="col-lg-7 col-11 " >
<div className="SetpictureActivity">
{this.state.flagUpPicture && <img src={this.state.PictureActivityFilePreview} alt='Empty'
 style={{height:'100%', width:'100%', borderRadius:'5%'}} ></img>}
{!this.state.flagUpPicture && <img src='/images/ActivityPicture3.png' alt='Empty' style={{height: "190px", width: '220px', paddingTop: '35PX', opacity:'0.50'}} ></img>}   
</div>
</div>
<div class="col-lg-1 col-1 pl-0  align-self-end">

<input type="file" name="file" id="file" className="inputfile" accept=".jpg,.jpeg,.png, .gif" onChange={this.fileSelectedHandler} />
             
                   <label htmlFor="file" className="LabelUpload"
                         onMouseOver={()=>{this.setState({helpMouseOverUploadPicture:true})}}
                         onMouseOut={()=>{this.setState({helpMouseOverUploadPicture:false})}}>
                            <BsCloudUpload size="2rem" color="gray"></BsCloudUpload>
                    </label>
                   
              
</div>
<div class="col-lg-4 col-12 ">
<div class="container">
<div class="row " >
  <div class="col-lg-12  col-12 pt-3 pl-0">
<input className="textBoxStudent"  id="Utitle" name="titleNewAc" type='text' value={this.state.titleNewAc} onChange={this.Handleİnpt} onFocus={this.HandleFocus} />

  </div>

  <div class="col-lg-12 col-12 pt-3 pl-0">
  <input className="textBoxStudent"  id="UDescription" name="DescriptionNewAc" type='text' value={this.state.DescriptionNewAc} onChange={this.Handleİnpt} onFocus={this.HandleFocus}/>

  </div>
 
  <div class="col-lg-6  col-8 pt-4 pl-0">
  <GetDate setDate={this.state.dateNewActivity} handleDate ={this.NewActivityDate}/>
  </div>
  <div class="col-lg-6 col-4 pt-4 pl-0">
  <UpSelect Category={this.state.category} handleCategory ={this.handleChangeSelect}  ></UpSelect>
  </div>

  <div class="col-lg-12 col-8 pt-2 justify-content-end" style={{paddingLeft:'0px'}}>
  <button className="SaveActivityButton" onClick={this.SaveActivity}   > save</button>
  </div>
  <div class="col-lg-12 col-4  " style={{paddingLeft:'0px'}}>
  {this.state.loadingSave &&  <div style={{height: "50px", width: '50px'}}>
  <img alt='Empty ' style={{height: "50px", width: '50px'}} src='/images/loading.gif'></img>
  </div> }
  </div>

 
</div>
</div>




              
</div>

</div>

<div class="row">
{this.state.Admin && <div className="col-lg-3 col-12 mt-3">
<div className="SetCoursesActivity"> 
<MaterialTable title="" 
        data = {this.state.ListTeachers}
        columns ={[{title: " ", render: rowData => <UpAvatar  name={rowData.name}  picture={rowData.picture} ></UpAvatar>},
        {title : 'Category', field : 'category',lookup: { 1: 'Teacher', 2: 'Tutor', 3: 'Administrator'  }, hidden:true},
         {title : 'Name', field : 'name'}, {title : 'Surname', field : 'surname'},
        {title : 'User', field : 'username', hidden:true},{title : 'Phone', field : 'phone', hidden:true}, {title : 'Email', field : 'email', hidden:true},
        {title : 'Address', field : 'address', hidden:true},{title : 'id', field : 'idTeacher_Tutor', hidden:true},
        {title : 'idUser', field : 'idUser', hidden:true}, {title : 'Picture', field : 'picture', hidden:true},
        {title : 'Courses', field : 'courses', hidden:true}, {title : 'flagActivity', field : 'flagActivity', hidden:true},
        {title : 'childrens', field : 'childrens', hidden:true}, {title : 'flagChildren', field : 'flagChildren', hidden:true}]}
          options={{
            paging: false,
            headerStyle: {
                zIndex: 0,
                backgroundColor:'#DBA6A6'
              }, 
              rowStyle: rowData => ({
                backgroundColor: (this.state.selectionTeacher === rowData.tableData.id) ? '#FB9182' : '',
                fontSize: 11
              }),
              header: false, 
             

                   }}
           
                   onRowClick={((evt, selectedRow) => this.changeSelectionTeacher(selectedRow))}
                ></MaterialTable>
</div> 


</div> }
<div className="col-lg-1 col-1"></div>

<div className="col-lg-3 col-12 mt-3" >


<div className="SetCoursesActivity">
{this.state.CoursesFlag && <MaterialTable title="" 
        data = {this.state.ListCourses}
        columns ={[  {title : 'id_Course', field : 'id_Course', hidden:true}, {title : 'idGrade', field : 'idGrade', hidden:true},
        {title : 'idLesson', field : 'idLesson', hidden:true}, {title : 'activityDetail', field : 'activityDetail', hidden:true},
        {title : 'nameGrade', field : 'nameGrade'}, {title : 'nameLesson', field : 'nameLesson'}]}
          options={{
            paging: false,
            headerStyle: {
                zIndex: 0,
                backgroundColor:'#DBA6A6'
              }, 
              rowStyle: rowData => ({
                backgroundColor:   (() => {
                const getJustOneId =this.state.ListCoursesAssPivot.filter(item=> item.id_Course===rowData.id_Course) 
                 const getColor = getJustOneId.map(item => item)
                 if (getColor.length>0){

                     return '#DFF7E6'
                }
                 
                  })(),
                fontSize: 11
              }),
             
              header: false, 
             }}
             onRowClick={((evt, selectedRow) => this.changeSelectionCourse(selectedRow))}

                ></MaterialTable> }
{!this.state.CoursesFlag && <div><img alt='' src='/images/emptyCourses.png'  style={{height: "25%", width: '25%', paddingTop: '50PX', opacity:'0.60'}} ></img>
<p style={{fontSize:'12px', color:'black', opacity:'0.3'}} >choose a teacher with courses</p></div> }
</div>
</div>

<div className="col-lg-1 col-12  align-self-center ">
{this.state.buttonSend &&  <div className ="AssignmentCourseActivity" onClick={this.updateCoursesSelection} ><GrSend size="1.8rem"></GrSend></div>}

</div>

<div className="col-lg-3 col-12 mt-3" >
<div className="SetCoursesActivity">
{this.state.CoursesAssFlag && <MaterialTable title="" 
        data = {this.state.ListCoursesAss}
        columns ={[  {title : 'id_Course', field : 'id_Course', hidden:true}, {title : 'idGrade', field : 'idGrade', hidden:true},
        {title : 'idLesson', field : 'idLesson', hidden:true}, {title : 'activityDetail', field : 'activityDetail', hidden:true},
        {title : 'nameGrade', field : 'nameGrade'}, {title : 'nameLesson', field : 'nameLesson'}]}
          options={{
            paging: false,
            headerStyle: {
                zIndex: -1,
                backgroundColor:'#DBA6A6'
              }, 
              rowStyle: rowData => ({
                backgroundColor: '  #DFF7E6',
                fontSize: 11
              }),
             
              header: false, 
             }}

             editable={{
            
                  onRowDelete: (rowData) =>
                  new Promise((resolve) => this.DeleteRowAss(rowData,resolve))
      
              
              }}
               
                ></MaterialTable> }
                {!this.state.CoursesAssFlag && 
<div><img  alt='' src='/images/ListCoursesActivities.png'  style={{height: "25%", width: '25%', paddingTop: '15%', opacity:'0.50'}} ></img>
<p style={{fontSize:'12px', color:'black', opacity:'0.3'}} >Curses List</p></div>}


</div>





</div>



</div>
</div>




              {this.state.alertPicture && <div className="MessageAlertPicture">FAIL UPLOAD</div>}
           

{this.state.AlertMessage && <div style={{height: "30px", width: '250px', position:"absolute", left:  "45.5%",top: "40.5%", backgroundColor:'#F6F7DF', border:'1px',
 paddingTop:'8px', borderRadius:'5%', zIndex:'10'}}><AiOutlineWarning size='1.2rem' /> &nbsp; &nbsp;{this.state.messageAlert}</div>}
{this.state.SuccessMessage && <div style={{height: "30px", width: '250px', position:"absolute", left:  "45",top: "40.5%", backgroundColor:'#CBF5D0', border:'1px',
 paddingTop:'5px', borderRadius:'5%' }}><GrStatusGood size='1.2rem' /> &nbsp; &nbsp;Activity saved</div>}

{this.state.FailMessage && <div style={{height: "30px", width: '250px', position:"absolute", left:  "45%",top: "40.5%", backgroundColor:'#FB9673 ', border:'1px',
 paddingTop:'5px', borderRadius:'5%' }}><BsXCircle size='1.2rem' /> &nbsp; &nbsp;Ops.. Error</div>}


 



</div>

}

                            {/* SHOW ACTIVITY AND DELETE THEM */}

{ this.state.ShowNewActivityPanelDelete && <div className="containerSlidePanelAct">

<div className="pictureActivity"></div>
<div className="descriptionActivity"></div>
<div className="calendarActivity"></div>
{this.state.offActivityDelete && <div><img src='/images/emptyBox.png' alt='' style={{height: "220px", width: '250px', paddingTop: '125PX', opacity:'0.5'}} ></img>
<p style={{fontSize:'18px', color:'black', opacity:'0.3'}} >There is not activities</p></div>}
<br></br>

{this.state.ConfirmDelete && <div  style={{position:'absolute', left:'2%', zIndex:'10', top:'2%', width:'30%', height:'10%', border:'3.5px solid' , backgroundColor:'#FEE8E4 ', borderRadius:'4%', borderColor:'#FE5534', }}  >
  <div style={{position:'relative', width:'100%', height:'100%'}}>
  <div  style={{position:'absolute', left:'2%',  top:'20%', width:'65%'}} > 
  {(()=>{
switch (this.state.language) {
  case '0':
    return 'Bu aktiviteyi silmek istiyor musun?'
    
    case '1':
      return 'you want to delete this activity?'
      

      case '2':
        return 'Quieres eliminar esta actividad?'
        
        case '3':
          return 'Quieres eliminar esta actividad?'
         



  default:
    break;
}

  })()}

  
  
  </div>
  <div  style={{position:'absolute', left:'70%',  top:'20%', width:'10%' , cursor:'pointer'}} onClick={this.DeleteThisActivity} > <BsCheck size='1.5em'></BsCheck></div>
  <div  style={{position:'absolute', left:'85%',  top:'20%', width:'5%' , cursor:'pointer'}}  onClick={()=> {this.setState({ConfirmDelete:false})}} > <BsX size='1.5rem'></BsX></div>

  
  </div>
 
  </div>}
  
{!this.state.offActivityDelete && <div  className='PanelDeleteActivity'  >
<UpActivityDelete  language={this.state.language} Activities={this.state.ListActivitiesDelete} handleDelete ={this.handleDeleteAct}></UpActivityDelete></div>}




</div>   }
</div>    
   
</div>
);

}

updateCoursesSelection (){

const takeCoursesSelected = [...this.state.ListCoursesAss]
const takeIdCoursesSelected =[...this.state.ListIdCoursesAss]
this.state.ListCoursesAssPivot.map(item =>{
 takeCoursesSelected.push(item)
 takeIdCoursesSelected.push(item.id_Course)
 return 'true'
  }
  )
if(this.state.Admin){
  this.setState({
    ListCoursesAss:takeCoursesSelected,
    ListIdCoursesAss:takeIdCoursesSelected,
    CoursesAssFlag:true, 
    ListCoursesAssPivot:[],
    buttonSend:false,
    CoursesFlag:false,
    ListCourses:[], 
    selectionTeacher:null
  })
}else{
  this.setState({
    ListCoursesAss:takeCoursesSelected,
    ListIdCoursesAss:takeIdCoursesSelected,
    CoursesAssFlag:true, 
    ListCoursesAssPivot:[],
    buttonSend:false,
    selectionTeacher:null
  })
}


}

changeSelectionCourse(RowData){

 if( this.state.ListCoursesAss.filter(itemSelected=> itemSelected.id_Course===RowData.id_Course).length > 0){
  this.setState({AlertMessage:true, 
    messageAlert:'Course already added'})
  
  setTimeout(() => {
       this.setState({AlertMessage:false})
       
     }, 3000);
  }else{
  
      const  alreadyExist = [...this.state.ListCoursesAssPivot]
          const  ListCoursesAssPiv = [...this.state.ListCoursesAssPivot]
          
          if (alreadyExist.filter(item=> item.id_Course===RowData.id_Course).length>0){
            //se elimina
         
          let elimina=    this.state.ListCoursesAssPivot.filter(item=> item.id_Course!==RowData.id_Course)
          this.setState({
            ListCoursesAssPivot:elimina,
            selectionCourses:RowData.tableData.id
            })

           if(elimina.length === 0){
            this.setState({
              buttonSend:false
              })
            }

          }else{
            ListCoursesAssPiv.push(RowData)
            this.setState({
                ListCoursesAssPivot:ListCoursesAssPiv,
                 selectionCourses:RowData.tableData.id, 
                 buttonSend:true
                })
        }
         

      }

     
        
            }


changeSelectionTeacher(RowData){
this.setState({
        selectionTeacher:RowData.tableData.id, 
        gradeSelected:RowData.idgrade,
        CoursesFlag:false,
        ListCourses:[], 
        selectionCourse:null, 
        ListCoursesAssPivot:[],
        selectionCourses:null

    })
    if (RowData.courses.length>0) {
       
        this.setState({ListCourses:RowData.courses, CoursesFlag:true})  
       }}

DeleteRowAss(rowData, Resolve){
         
    
  
        if(this.state.ListCoursesAss.filter(item=>item.id_Course!==rowData.id_Course).length===0){
          this.setState({
            ListCoursesAss:[],
            CoursesAssFlag:false,
            ListCourses:this.state.ListCourses
            })

        }else{
          this.setState({
            ListCoursesAss:this.state.ListCoursesAss.filter(item=>item.id_Course!==rowData.id_Course),
            ListCourses:this.state.ListCourses
            })
  
        }
   

  Resolve()
       }

}

function UpAvatar(props) {
    const classes = useStyles();
   if(props.picture!=='null' || props.picture!==null ||props.picture!=='n' ){
 
            return   <Avatar  size={40} src= {props.picture} className = {classes.medium} ></Avatar>
            }
    
 }

function GetDate(props){

return( 
  


        <DatePicker
        value={props.setDate}
        onChange={date =>props.handleDate(date)}
      inputPlaceholder="Select a date" // placeholder
      formatInputText={props.formatInputValue} // format value
      inputClassName="my-custom-input" // custom class
      calendarPopperPosition="bottom"
      shouldHighlightWeekends
    />
         
          )
}

function UpSelect(props){
  const classes = useStyles();
return(
  <FormControl variant="outlined" className={classes.formControl}>
  <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
  <Select
    labelId="demo-simple-select-outlined-label"
    id="demo-simple-select-outlined"
    value={props.Category}
    onChange={props.handleCategory}
    label="Category..."
    style={{fontSize:'12px'}}
  >
  

<MenuItem value='Extern'>Extern</MenuItem>
<MenuItem value='Intern'>Intern</MenuItem>
)
    
</Select>
</FormControl>)
}

function UPActivity(props){
  const opacy='0.75'

 

let validatePicture = true
if(props.Photo ==='null'){
  validatePicture=false
}


let year = 2020
if (props.year === 2020){
  year = 2020
}else if(props.year === 2021){
  year = 2021
}else if(props.year === 2022){
  year = 2022
}else if(props.year === 2023){
  year = 2023
}else if(props.year === 2024){
  year = 2024
}else if(props.year === 2025){
  year = 2025
}

let bgColorCourses ='#C0EEB3'



if(props.SetbgColor === '#EFF8EB'){
  bgColorCourses='#E7EFC2 '
}
/* const for custom calendar */

let LanguageCalendar =[]

const myCustomLocaleEnglish = {
// months list by order
months: [
'January',
'February',
'March',
'April',
'May',
'June',
'July',
'August',
'September',
'October',
'November',
'December',
],

// week days by order
weekDays: [
  {
    name: 'Sunday', // used for accessibility 
    short: 'S', // displayed at the top of days' rows
    isWeekend: true, // is it a formal weekend or not?
  },
  {
    name: 'Monday',
    short: 'M',
  },
  {
    name: 'Tuesday',
    short: 'T',
  },
  {
    name: 'Wednesday',
    short: 'W',
  },
  {
    name: 'Thursday',
    short: 'T',
  },
  {
    name: 'Friday',
    short: 'F',
  },
  {
    name: 'Saturday',
    short: 'S',
    isWeekend: true,
  },
],

// just play around with this number between 0 and 6
weekStartingIndex: 0,

// return a { year: number, month: number, day: number } object
getToday(gregorainTodayObject) {
  return gregorainTodayObject;
},

// return a native JavaScript date here
toNativeDate(date) {
  return new Date(date.year, date.month - 1, date.day);
},

// return a number for date's month length
getMonthLength(date) {
  return new Date(date.year, date.month, 0).getDate();
},

// return a transformed digit to your locale
transformDigit(digit) {
  return digit;
},

// texts in the date picker
nextMonth: 'Next Month',
previousMonth: 'Previous Month',
openMonthSelector: 'Open Month Selector',
openYearSelector: 'Open Year Selector',
closeMonthSelector: 'Close Month Selector',
closeYearSelector: 'Close Year Selector',
defaultPlaceholder: 'Select...',

// for input range value
from: 'from',
to: 'to',


// used for input value when multi dates are selected
digitSeparator: ',',

// if your provide -2 for example, year will be 2 digited
yearLetterSkip: 0,

// is your language rtl or ltr?
isRtl: false,
}

const myCustomLocaleSpanish = {
// months list by order
months: [
'Enero',
'Febrero',
'Marzo',
'Abril',
'Mayo',
'Junio',
'Julio',
'Agosto',
'Septiembre',
'Octubre',
'Noviembre',
'Diciembre',
],

// week days by order
weekDays: [
  {
    name: 'Sunday', // used for accessibility 
    short: 'S', // displayed at the top of days' rows
    isWeekend: true, // is it a formal weekend or not?
  },
  {
    name: 'Lunes',
    short: 'L',
  },
  {
    name: 'Martes',
    short: 'M',
  },
  {
    name: 'Miercoles',
    short: 'M',
  },
  {
    name: 'Jueves',
    short: 'J',
  },
  {
    name: 'Viernes',
    short: 'V',
  },
  {
    name: 'Sabado',
    short: 'S',
    isWeekend: true,
  },
],

// just play around with this number between 0 and 6
weekStartingIndex: 0,

// return a { year: number, month: number, day: number } object
getToday(gregorainTodayObject) {
  return gregorainTodayObject;
},

// return a native JavaScript date here
toNativeDate(date) {
  return new Date(date.year, date.month - 1, date.day);
},

// return a number for date's month length
getMonthLength(date) {
  return new Date(date.year, date.month, 0).getDate();
},

// return a transformed digit to your locale
transformDigit(digit) {
  return digit;
},

// texts in the date picker
nextMonth: 'Next Month',
previousMonth: 'Previous Month',
openMonthSelector: 'Open Month Selector',
openYearSelector: 'Open Year Selector',
closeMonthSelector: 'Close Month Selector',
closeYearSelector: 'Close Year Selector',
defaultPlaceholder: 'Select...',

// for input range value
from: 'from',
to: 'to',


// used for input value when multi dates are selected
digitSeparator: ',',

// if your provide -2 for example, year will be 2 digited
yearLetterSkip: 0,

// is your language rtl or ltr?
isRtl: false,
}
const myCustomLocaleTurkish = {
// months list by order
months: [
'ocak',
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
],


// week days by order
weekDays: [
  {
    name: 'Pazar', // used for accessibility 
    short: 'PZR', // displayed at the top of days' rows
    isWeekend: true, // is it a formal weekend or not?
  },
  {
    name: 'Pazartesi',
    short: 'PZT',
  },
  {
    name: 'Salı',
    short: 'SL',
  },
  {
    name: 'Çarşamba',
    short: 'ÇSB',
  },
  {
    name: 'Perşembe',
    short: 'Pş',
  },
  {
    name: 'Cuma',
    short: 'CM',
  },
  {
    name: 'Cumartesi',
    short: 'CMT',
    isWeekend: true,
  },
],

// just play around with this number between 0 and 6
weekStartingIndex: 0,

// return a { year: number, month: number, day: number } object
getToday(gregorainTodayObject) {
  return gregorainTodayObject;
},

// return a native JavaScript date here
toNativeDate(date) {
  return new Date(date.year, date.month - 1, date.day);
},

// return a number for date's month length
getMonthLength(date) {
  return new Date(date.year, date.month, 0).getDate();
},

// return a transformed digit to your locale
transformDigit(digit) {
  return digit;
},

// texts in the date picker
nextMonth: 'Next Month',
previousMonth: 'Previous Month',
openMonthSelector: 'Open Month Selector',
openYearSelector: 'Open Year Selector',
closeMonthSelector: 'Close Month Selector',
closeYearSelector: 'Close Year Selector',
defaultPlaceholder: 'Select...',

// for input range value
from: 'from',
to: 'to',


// used for input value when multi dates are selected
digitSeparator: ',',

// if your provide -2 for example, year will be 2 digited
yearLetterSkip: 0,

// is your language rtl or ltr?
isRtl: false,
}

switch (props.language) {
case '0':
  LanguageCalendar=myCustomLocaleTurkish
  break;

case '1': 
LanguageCalendar=myCustomLocaleEnglish
break
case '2': 
LanguageCalendar=myCustomLocaleSpanish
break
case '3': 
LanguageCalendar=myCustomLocaleSpanish
break
default:
  break;
}  

  return (
  
<div className="panelShowActivity" style={{
backgroundColor:props.SetbgColor, borderRadius:'5%' }}>

<div class="container">
  <div class="row">
    <div class="col-lg-5 col-12 pl-4 pt-2 pb-3 text-left" style={{fontSize:'35px'}}>
    {props.Title}
    </div>
    <div class="col-lg-7 col-12 pt-3 pb-3 text-left" style={{ fontSize:'18px', paddingTop:'16px', color:'#7E7E7E' }}> 
     {props.Description}
    </div>
  </div>

  <div class="row">
  <div class="col-lg-5 col-12"  > 
     <div className="MainPanelPictureActivity"  >
    
    {validatePicture && <img alt='' src={props.Photo}  style={{height: "100%", width: '100%', borderRadius:'7%'}} ></img>}
    {!validatePicture && <img alt='' src='/images/ActivityPicture3.png' style={{height: "100%", width: '100%',  opacity:'0.5'}} ></img>}
    
    </div> 
    </div>
    
    <div class="col-lg-4 col-12"> 
    <div style={{  borderRadius:'10%', overflow:'block' }} >
  <Calendar
      value={ {
        year: year,
        month: props.month,
        day: props.day,
      }}
      
      locale={LanguageCalendar}
     
      shouldHighlightWeekends
    />
  </div>
    </div>
    
    <div class="col-lg-3 col-12"  > 
    <div style={{ borderRadius:'10%', paddingLeft:'15px', paddingTop:'15px', overflow:'auto' }} >


  
{
  props.Courses.map((item,i)=>
    <div  key={i} style={{width:'170px', height:'30px', paddingTop:'8px', fontSize:'15px', backgroundColor:bgColorCourses, marginTop:'5px', borderRadius:'6%'}}>
&nbsp;&nbsp;<BsFillCircleFill size='0.6rem'></BsFillCircleFill>&nbsp; {item.grade +' '+ item.lesson}
    </div>

 
  )
}

  </div>
    </div>
  </div>


 
</div>

{/*
 <div style={{position:'relative',  width:'100%', height:'100%'}}>
  <div style={{position:'absolute', top:'8%', left:'3.5%', width:'30%', height:'10%',textAlign:'right', fontSize:'30px' }} >
  {props.Title}
  </div>
  <div style={{position:'absolute', top:'8%', left:'36%', width:'2%', height:'5%',textAlign:'left', fontSize:'16px', paddingTop:'16px', color:'#7E7E7E' }}> <AiOutlineEye size='1rem'></AiOutlineEye></div>
  <div style={{position:'absolute', top:'7.5%', left:'38%', width:'50%', height:'7%',textAlign:'left', fontSize:'16px', paddingTop:'16px', color:'#7E7E7E' }} >
  {props.Description}
  
  </div>

  <div style={{position:'absolute', top:'25%', left:'2%', width:'45%', height:'60%', fontSize:'28px', backgroundColor:'transparent', borderRadius:'7%' }} >
    
  {validatePicture && <img alt='' src={props.Photo}  style={{height: "100%", width: '100%'}} ></img>}
  {!validatePicture && <img alt='' src='/images/ActivityPicture3.png' style={{height: "60%", width: '50%', paddingTop:'60px', paddingLeft:'125px', opacity:'0.5'}} ></img>}
  
  </div> 
  <div style={{position:'absolute', top:'25%', left:'50%', width:'28%', height:'60%', fontSize:'15px',  borderRadius:'10%', overflow:'block' }} >
  <Calendar
      value={ {
        year: year,
        month: props.month,
        day: props.day,
      }}
      
      locale={LanguageCalendar}
     
      shouldHighlightWeekends
    />
  </div>
  
 
  <div style={{position:'absolute', top:'25%', left:'80%', width:'15%', height:'60%', borderRadius:'10%', paddingLeft:'15px', paddingTop:'15px', overflow:'auto' }} >


  
{
  props.Courses.map((item,i)=>
    <div  key={i} style={{width:'170px', height:'30px', paddingTop:'8px', fontSize:'15px', backgroundColor:bgColorCourses, marginTop:'5px', borderRadius:'6%'}}>
&nbsp;&nbsp;<BsFillCircleFill size='0.6rem'></BsFillCircleFill>&nbsp; {item.grade +' '+ item.lesson}
    </div>

 
  )
}
{}
  </div>


 </div> */}

</div>

)

}

function UpActivityDelete(props){
  const setListbgColor =['#FBF3EB','#EFF8EB','#F7E6E5', '#F9EFFB' ]
  let cont=0;
  let month=[]
  switch (props.language) {
    case '1':
      
      month = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
      break;
      case '0':
      
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
    case '2':
      
      month = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
      break;
      case '3':
      
        month = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
      ];
        break;
        
    default:
      break;
  }

  return (
  props.Activities.map(item=>{
    const bgColor=setListbgColor[cont]
    let counterKey= item.id
    if(cont===3){
      cont=0
    }else{cont=cont+8}
    counterKey = counterKey +10
    
   return(<div  key={counterKey} style={{position:'relative', marginBottom:'5%', marginLeft:'5%',  width:'90%', height:'180px',  borderRadius:'3%',backgroundColor:bgColor}} >
     <div key={counterKey + 1} id= {item.id} style={{position:'absolute', right:'1%', top:'1.8%', cursor:'pointer'}} onClick={
    ()=> props.handleDelete(item.id)
       } >
       <AiOutlineDelete size='1.2rem'></AiOutlineDelete>
     </div>


     <div key={counterKey + 2} style={{position:'absolute',  left:'2%', padding:'4px', fontSize:'25px'}} >
    {item.title}
     </div>

     <div key={counterKey + 3} style={{position:'absolute', left:'2%', width:'25%', textAlign:'left', height:'60px',  top:'30%' , padding:'4px', fontSize:'15px', opacity:'0.5'}} >
    {item.description}
     </div>

     <div key={counterKey + 4} style={{position:'absolute', left:'2%', top:'72%' , padding:'6px', fontSize:'18px', border:'1px solid', borderRadius:'10%', opacity:'0.5'}} >
    {item.category}
     </div>

     <div key={counterKey + 5} style={{position:'absolute', left:'35%', top:'18%',  fontSize:'18px', }} >
    {(()=>{
      if(item.photo===null||item.photo==='null'){
return(<img alt='' src='/images/ActivityPicture3.png' style={{width:'175px', height:'130px', opacity:'0.5'}}></img>)
      }else{
        return(<img alt='' src={item.photo} style={{width:'175px', height:'125px'}}></img>)     
      }
    })()} 
   
     </div>

     <div key={counterKey + 6} style={{position:'absolute', left:'60%', top:'20%',  fontSize:'18px', }} >
    {(()=>{
     const date = new Date(item.dateActivity)
    const Gmonth= month[date.getMonth()]
    const day = date.getDate()
     return(<div>
       <div key={counterKey + 7}
     style={{position:'relative', height:'30px', width:'150px', fontSize:'20px', backgroundColor:'#FB3838', color:'#FFFFFF ' }}
     >{Gmonth}</div>
     <div key={counterKey + 8}
     style={{position:'relative', height:'70px', width:'150px', fontSize:'45px', fontWeight:'700', backgroundColor:'#FFFFFF', paddingTop:'5px', paddingBottom:'5px', boxShadow: '2.5px 5px #E3E3E3 ' }}
     >{day}</div>
     </div>
     
     )
    })()} 
   
     </div>

     
     <div key={counterKey + 9} className='PanelCoursesInDeleteActivity' >
     {
  item.idCourses.map((item,i)=>
    <div  key={i} style={{width:'170px', height:'30px', textAlign:'left', paddingLeft:'5px', paddingTop:'5px',  fontSize:'15px', backgroundColor:'#B3E5DE', marginTop:'5px', borderRadius:'6%'}}>
&nbsp;&nbsp;<BsFillCircleFill size='0.6rem'></BsFillCircleFill>&nbsp; {item.grade +' '+ item.lesson}
    </div>

 
  )
}
   
     </div>
    
     </div>)



  })

  )
}

function UpShowCounter(props){

  let position=5
let key=0;
return (
  <div className="contadordeActividades">


  <div class="container">
<div class="row"  >



 {
props.ListCourses.map((item, index)=>{
  position=position+2
key=key+1
  if(index===props.Actual){
    return(<div key={key} class="col-lg-1 col-1 pl-1"  ><FaCircle size='0.95rem' color= '#7586DC' ></FaCircle></div>)

  }else{
    return(<div key={key}class="col-lg-1 col-1 pl-1" ><FaRegCircle size='0.85rem' color='#DAE1F9 '></FaRegCircle></div>)

  }
 
})

 }
</div>
</div>
</div>
)



}


function UpAdmin(props){
  let language =''

switch (props.language) {

  case '0':

    
    language= 'Atanmak'
    break
    
    case '1':
      language= 'Assigned by '
      break

      case '2':
    language= 'Asignado por'
    break;

    case '3':
    language= 'atanmak'
    break;


  default:
    break;
}

 

  if(props.picture===null||props.picture==='null'||props.picture==='n'){

    return (<div  style={{position:'absolute',  top:'93%', width:'30%', right:'0%', opacity:'0.53', fontStyle:'oblique'}} > 
   { language+' '+ props.name + ' ' +props.surname}  </div>)
  }else{
    return (<div  style={{position:'absolute', right:'2%', top:'89%', width:'55%', height:'10%'}} >
      
      <div class="container">
        <div class="row">
        <div class="col-lg-5 col-0">
          
          </div>
          <div class="col-lg-6 col-9 pr-1 pt-2 text-end"  >
            { language +' ' + props.name}
          </div>
          <div class="col-lg-1 col-3 pl-1 pt-0 text-start"><UpAvatar picture={props.picture} ></UpAvatar>

        
          </div>
        </div>
      </div>
       { /*<div style={{position:'relative', with:'100%', height:'100%' }}>
          <div style={{position:'absolute', with:'60%', height:'90%', left:'50%' }} > <UpAvatar picture={props.picture} ></UpAvatar></div>
          <div style={{position:'absolute', with:'40%', height:'90%', left:'62%', paddingTop:'10px', opacity:'0.53', fontStyle:'oblique', marginRight:'2px' }} >  { language +' ' + props.name} </div>
          </div> */ }  </div>)
  }
  
}
export default withRouter(Program)