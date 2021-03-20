import React, {Component} from 'react';

import './program.css'


import {FaRegCircle,FaCircle} from 'react-icons/fa'
import {BsFillCircleFill} from 'react-icons/bs'



import {  AiOutlineEye, AiOutlineRightCircle, AiOutlineLeftCircle}  from 'react-icons/ai'

import Avatar from '@material-ui/core/avatar'
import AutenticationServices from './AutenticationServices.js';

import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

import "react-modern-calendar-datepicker/lib/DatePicker.css";


import { Calendar } from "react-modern-calendar-datepicker";

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

class Activity extends Component{
constructor(){
    super()
    this.state={ListCoursesThisTeacher:[],
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
        OffActivities:true,
        
        
        //
        pictureAdminOfThisActivity:'',
        nameAdminOfThisActivity:'',
        surnameAdminOfThisActivity:''}

        this.handleNextActivity = this.handleNextActivity.bind(this)
        this.handlePreActivity = this.handlePreActivity.bind(this)
}

componentDidMount(){
const idUser = AutenticationServices.returnUser();
              
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
       const language = AutenticationServices.returnIdLanguage();
       this.setState({language:language})
       
        switch (language) {
          case '0':
           this.props.title('Hoşgeldiniz')
            break;
           case '1':
            this.props.title('Welcome back')
             break
             case '2':
               this.props.title('Bienvenido')
               break
            case '3':
             this.props.title('καλως ΗΡΘΑΤΕ')
             break
            
       
          default:
            break;
        }

      

}


handleNextActivity(){

    // const getActivity = this.state.ListActivitiesOfThisTeacher
     
     let count = this.state.ActivityCounter
     count = count +1
     if(count ===this.state.ListActivitiesOfThisTeacher.length){
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
   
     
render(){
    return (
       
<div className="PanelActivity">




<div style={{position:'relative', height:'96%', with:'100%',marginTop:'20px'}}>

        <div className="containerSlidePanelAct">

<div className="pictureActivity"></div>
<div className="descriptionActivity"></div>
<div className="calendarActivity"></div>
{this.state.OffActivities && <div><img src='/images/empryActivities.png' alt='' style={{height: "250px", width: '250px', paddingTop: '125PX', opacity:'0.75'}} ></img>
<p style={{fontSize:'18px', color:'black', opacity:'0.3'}} >There is not activities</p></div>}
{!this.state.OffActivities &&<div className='NextActivity' onClick={this.handleNextActivity}  >
<AiOutlineRightCircle size="2rem"  ></AiOutlineRightCircle></div> }
{ !this.state.OffActivities && <UpShowCounter
                                   Actual={this.state.ActivityCounter} 
                                  ListCourses={this.state.ListActivitiesOfThisTeacher}
                                  SetbgColor ={this.state.bgColorActivity}
></UpShowCounter> }

{ !this.state.OffActivities && <UpAdmin
                                   picture={this.state.pictureAdminOfThisActivity} 
                                  name={this.state.nameAdminOfThisActivity}
                                  surname ={this.state.surnameAdminOfThisActivity}
                                  language ={this.state.language}
></UpAdmin> }
{!this.state.OffActivities &&<div className='PrevActivity' onClick={this.handlePreActivity} >
 <AiOutlineLeftCircle size="2rem"  ></AiOutlineLeftCircle></div>}
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
                                         language ={this.state.language}
                                ></UPActivity>

                                          }
</div> 
</div>
</div>



    )
}

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
  'Nissan',
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
    
  <div style={{position:'absolute', top:'4%', left:'2%', width:'96%', height:'86%', borderBottom:'1px', opacity:opacy,textAlign:'left', 
  backgroundColor:props.SetbgColor, borderRadius:'7%' }}>
  
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
  
  
   </div>
  
  </div>
  
  )
  
  }
  
  
  function UpShowCounter(props){
  
    let position=3.5
  
  return (
  props.ListCourses.map((item, index)=>{
    position=position+2
  
    if(index===props.Actual){
      return(<div key={index} style={{position:'absolute', left:`${position}%`, top:'93.1%'}} ><FaCircle size='0.95rem' color= '#7586DC' ></FaCircle></div>)
  
    }else{
      return(<div key={index} style={{position:'absolute', left:`${position}%`, top:'93%'}} ><FaRegCircle size='0.85rem' color='#DAE1F9 '></FaRegCircle></div>)
  
    }
   
  })
  )
  
  
  
  }

  function UpAdmin(props){
    let language =''

  switch (props.language) {

    case '0':
    
      language= 'atanmak'
      break
      
      case '1':
        language= 'Assigned by'
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
  
 
    if(props.picture===null||props.picture==='null'){
      return (<div  style={{position:'absolute',  top:'93%', width:'30%', right:'0%', opacity:'0.53', fontStyle:'oblique',}} > 
     { language+' '+ props.name + ' ' +props.surname}  </div>)
    }else{
      return (<div  style={{position:'absolute', right:'0%', top:'91%', width:'40%', height:'8%'}} >
          <div style={{position:'relative', with:'100%', height:'100%' }}>
            <div style={{position:'absolute', with:'30%', height:'90%', left:'50%' }} > <UpAvatar picture={props.picture} ></UpAvatar></div>
            <div style={{position:'absolute', with:'60%', height:'90%', left:'62%',  paddingTop:'14px', opacity:'0.53', fontStyle:'oblique', marginRight:'2px' }} >  { language +' ' + props.name} </div>
            </div>    </div>)
    }
    
  }

  function UpAvatar(props) {
    const classes = useStyles();
   if(props.picture==='null' || props.picture===null ||props.picture==='un' ){
    return <Avatar  size={40} className = {classes.medium}  >{props.name.substring(0, 1)}</Avatar>
          }else{
            return   <Avatar  size={40} src= {props.picture} className = {classes.medium} ></Avatar>
            }
    
 }

export default Activity