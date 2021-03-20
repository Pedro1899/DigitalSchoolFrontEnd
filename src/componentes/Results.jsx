import React, {Component} from 'react';
import './Assistance.css'
import './Results.css'

import {AiOutlineWarning} from 'react-icons/ai'
import {BsListCheck} from 'react-icons/bs'
import { withRouter } from 'react-router'
import AutenticationServices from './AutenticationServices.js';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/avatar'
import {BiHappy} from 'react-icons/bi'
import {FaChalkboardTeacher} from 'react-icons/fa'

import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";
import ResultTeacher from './ResultsTeacher'
import ResultsStudent from './ResultsStudent'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(2),
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
    width: theme.spacing(7),
      height: theme.spacing(7),
  },

  small: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    width: theme.spacing(4.5),
      height: theme.spacing(4.5),
  },
  formControl: {
    fontSize:5,
    minWidth: 100,
    minHeight:50
  }
}));


class Results extends Component{

constructor(proops){
super(proops);


this.state ={
  IdSchool:0,
  titleNewCat:'',
language:0, 
idUser:'',
Admin:false,
currentLanguage:0,
flagNewNote:true,
flagCategory:false,
category :'Extern', 
getGradeLookUP:'',
flagNotes:false, 
ResultCategoryName:'',
TitleNewNotes:'',
//handle select
idCourseSelected:'',
idCourseSelectedGraph:'',
idGradeSelected:'',
idTeacherGraph:'',

chartData:{},
chartDataLine:{},


//form
dateNewActivity:null,


//Flags
AlertMessage:false,
messageAlert:'',
bgcolorAlert:'',
CoursesInAssFlag:false,
showStudents:false,
buttonFlag:true,
resultsGraph:false,
ShowCourses:false,
FlagShowResultXLesson:false,
ShowMediaGraph:false,
FlagShowTeacherGraph:false,
FlagShowStudentGraph:false,

//Lists 
ListCoursesAdminGraphs:[],
ListCoursesAdminGraphsPiv:[],
ListCatNotes:[],
ListStudents:[],
ListnewNotesResults:[],
ListGrades:[],
ListAss:[],
ListTeacher:[]
}

this.handleChangeSelect = this.handleChangeSelect.bind(this)
this.HandleFocus = this.HandleFocus.bind(this)
this.Handleİnpt = this.Handleİnpt.bind(this)
this.HandleİnptNewResult = this.HandleİnptNewResult.bind(this)
this.SaveNewCat = this.SaveNewCat.bind(this)
this.ShiftNewNote = this.ShiftNewNote.bind(this)
this.shiftResults = this.shiftResults.bind(this)
this.handleChangeSelectCourse = this.handleChangeSelectCourse.bind(this)
this.handleChangeSelectCourseGraph = this.handleChangeSelectCourseGraph.bind(this)
this.handleChangeGrade = this.handleChangeGrade.bind(this)
this.handleChangeTeacher = this.handleChangeTeacher.bind(this)
this.NewActivityDate = this.NewActivityDate.bind(this)
this.SaveNotes = this.SaveNotes.bind(this)

}


componentDidMount(){

  const UserId =AutenticationServices.returnUser(); 
  const schoolId = AutenticationServices.returnIdSchool();
  const Language = AutenticationServices.returnIdLanguage();
  const Category = AutenticationServices.returnCategory();
  const userName =AutenticationServices.returnUserName();
  let Admin = false

  AutenticationServices.getCatNotes(schoolId)
.then(response => {
   this.setState({
    ListCatNotes:response.data
})
})
.catch(error => {
if (!error.response) {
  
} else {

}})


// get all courses of this teacher
AutenticationServices.getCourseByUser(UserId)
.then(response => {
  if(response.data.length>0){
    this.setState({
      ListCourses:response.data,
     CoursesInAssFlag:true
})
  }else{
    this.setState({
      ListCourses:response.data,
    
})
  }
        
})
.catch(error => {
if (!error.response) {
   
// console.log( "this.state.codeLoginFailed> " + this.state.codeLoginFailed)
} else {

}})



  if(Category==='3'){
 Admin=true
  }
  this.setState({
    currentLanguage:Language,
    IdSchool:schoolId, 
    username:userName,
    Category:Category, 
    Admin:Admin,
    idUser:UserId
   
})

const getTitle =<UpLanguage turkish='Sonuçlar kategorisi' english='Results category' 
spanish='Categoria de resultados' greek='Κατηγορία αποτελεσμάτων' 
currentLanguage={Language}  />

//get all grades
AutenticationServices.getGradeBySchool(schoolId)
.then(response => {

this.setState({
         ListGrades:response.data
})


})
.catch(error => {
if (!error.response) {

// console.log( "this.state.codeLoginFailed> " + this.state.codeLoginFailed)
} else {

}})

//get all assignments
AutenticationServices.getAssignmnt(schoolId)
.then(response => {
        this.setState({
           ListAss:response.data
})
})
.catch(error => {
if (!error.response) {
   
// console.log( "this.state.codeLoginFailed> " + this.state.codeLoginFailed)
} else {

}})



     //getAllTeachers
AutenticationServices.getTeachersBySchool(schoolId)
.then(response => {
             this.setState({
                ListTeacher:response.data
     })

    })
.catch(error => {
 if (!error.response) {
   
    // console.log( "this.state.codeLoginFailed> " + this.state.codeLoginFailed)
 } else {

    }})

this.props.title(getTitle)



}

NewActivityDate(valueDate){

  this.setState({ dateNewActivity:valueDate})
  }

HandleFocus(){
  if(this.state.titleNewCat==='Category' || this.state.titleNewCat==='Kategori' || this.state.titleNewCat==='Categoria' ){
    this.setState({titleNewCat:''})
  }
}

callApi = async (id,arrayList) => {

  for (const item of arrayList) {
    await  AutenticationServices.newResults(id, item.idStudent,item.note)
    .then(response=>{
      })
  }

   
  };

Handleİnpt(event){
  this.setState({
    [event.target.name]: event.target.value
  })
 }

 HandleİnptNewResult(event){



 }


 SaveNotes(){

  if(this.state.TitleNewNotes==='' ){
this.setState({
  AlertMessage:true,
  messageAlert:'please insert a title',
  bgcolorAlert:'#F4EEC0'
})
setTimeout(() => {
  this.setState({  AlertMessage:false,
    messageAlert:'',
  })


}, 2000);

  }else if(this.state.dateNewActivity===null){
    this.setState({
      AlertMessage:true,
      messageAlert:'please choose a date',
      bgcolorAlert:'#F4EEC0'
    })
    setTimeout(() => {
      this.setState({  AlertMessage:false,
        messageAlert:'',
      })
    
    
    }, 2000);
 
    
  }else{
this.setState({buttonFlag:false, loadingSave:true })
let NewNote =[]

this.state.ListStudents.forEach(item =>
  {
    let iterationNewNote={}
    if(document.getElementById(item.id).value!=='')
    {iterationNewNote ={"idStudent":parseInt(item.id), "note":parseInt(document.getElementById(item.id).value)}}
    else{ iterationNewNote ={"idStudent":parseInt(item.id), "note":-1} }
    NewNote.push(iterationNewNote)
  }
  
  )





    let form = new FormData()
    form.append('idCategoryNote', this.state.getGradeLookUP)
    form.append('idCourse', this.state.idCourseSelected)
     
    const CovertDate= this.state.dateNewActivity.year + '-' +this.state.dateNewActivity.month + '-'+this.state.dateNewActivity.day
   
    form.append('getDate', CovertDate)
    form.append('title', this.state.TitleNewNotes)
   
    
    AutenticationServices.newNotes(form)
    .then(response=>
      {

        this.callApi(response.data.id,NewNote)
    .then(res => {
      this.setState({
        buttonFlag:true,
       loadingSave:false,
      AlertMessage:true,
      messageAlert:'information saved',
      bgcolorAlert: '#BFF8C1 ',
      ListStudents:[],
     showStudents:false
    })

    setTimeout(() => {
      this.setState({
        buttonFlag:true,
       loadingSave:false,
      AlertMessage:false,
      messageAlert:'',
     bgcolorAlert:''
    })
    }, 2000);
  
    
    })

        
      
      
      }
      )
    .catch(error=>{
            this.setState({
              buttonFlag:true,
              loadingSave:false,
        AlertMessage:true,
        messageAlert:'opss something went wrong',
        bgcolorAlert:'#F4EEC0'
      })
      setTimeout(() => {
        this.setState({  AlertMessage:false,
          messageAlert:'',
        })
      
      
      }, 2000);
   

    })

  
  }


 }


 handleChangeTeacher(event){
  this.setState({
    idTeacherGraph:event.target.value
     })

 
     AutenticationServices.getCourseByTeacher(event.target.value)
     .then(response => {

         this.setState({
          ListCoursesAdminGraphsPiv:response.data,
          ShowCourses:true
     })
      
             
     })
     .catch(error => {
     if (!error.response) {
   
     // console.log( "this.state.codeLoginFailed> " + this.state.codeLoginFailed)
     } else {
 
     }})
     
     

 }
  handleChangeSelect(event){
    this.setState({
   getGradeLookUP:event.target.value
    })

  if(this.state.idCourseSelected!=='' ){

    

    let idGrade =0
// get all students from this course
 this.state.ListCourses.forEach(element => {
  if(element.id_Course===this.state.idCourseSelected){
idGrade=element.idGrade
  }
})


AutenticationServices.getStudent(idGrade)
.then(response => {

  if(response.data.length>0){
    this.setState({
      ListStudents:response.data,
      showStudents:true
})
  }else{
    this.setState({
      ListStudents:response.data,
      showStudents:false
    
})
  }
        
})
.catch(error => {
if (!error.response) {
  
// console.log( "this.state.codeLoginFailed> " + this.state.codeLoginFailed)
} else {

}})
  }
  }

  handleChangeGrade(event){
 

if(this.state.getGradeLookUP!==null){
  let getTitleLesson=[]
  let getResult=[]
  AutenticationServices.getResultsByNotes(event.target.value, this.state.getGradeLookUP)
  .then(response => {

 response.data.forEach(item=>{
      getTitleLesson.push(item.nameLesson)
      getResult.push(item.result)
    })
  
  })
.catch(error => {
  if (!error.response) {

  // console.log( "this.state.codeLoginFailed> " + this.state.codeLoginFailed)
  } else {

  }})

  setTimeout(() => {
    this.getChartData(getTitleLesson,getResult)
  }, 3500);
  
}

   
    this.setState({
      idGradeSelected:event.target.value,
      ListCoursesAdminGraphsPiv:this.state.ListCoursesAdminGraphs.filter(item=>item.idGrade===event.target.value),
      idCourseSelectedGraph:'',
      FlagShowResultXLesson:false,
      ShowCourses:true, 
    })




  }

  handleChange = (e) => {

   
    
    if(!(e.target.value.match(/^[0-9.]+$/)) && e.target.value.length>0 ){
     this.setState({AlertMessage:true, 
    messageAlert:'please just use numbers',
  bgcolorAlert:'#F4EEC0'})

  setTimeout(() => {
    this.setState({AlertMessage:false, 
     })
  }, 2000);
  e.target.value=''
    }else if(parseInt(e.target.value)>100){
      this.setState({AlertMessage:true, 
        messageAlert:'number has to be < 100',
      bgcolorAlert:'#F4EEC0', 
      
    })
    e.target.value=''
    
      setTimeout(() => {
        this.setState({AlertMessage:false, 
         })
      }, 2000);
    }

    
    
  }

  handleChangeSelectCourseGraph(event){
    this.setState({
      idCourseSelectedGraph:event.target.value,
      FlagShowResultXLesson:true
    })
  }

handleChangeSelectCourse(event){
      this.setState({
        idCourseSelected:event.target.value
      })
    
      if(this.state.getGradeLookUP!==''){
// get all students from this course

let idGrade =0
// get all students from this course
 this.state.ListCourses.forEach(element => {
  if(element.id_Course===event.target.value){
idGrade=element.idGrade
  }
})


AutenticationServices.getStudent(idGrade)
.then(response => {

  if(response.data.length>0){
    this.setState({
      ListStudents:response.data,
      showStudents:true
})
  }else{
    this.setState({
      ListStudents:response.data,
      showStudents:false
    
})
  }
        
})
.catch(error => {
if (!error.response) {

// console.log( "this.state.codeLoginFailed> " + this.state.codeLoginFailed)
} else {

}})
        
      }
    }
  

SaveNewCat(){



  if(this.state.titleNewCat==='' ||this.state.titleNewCat==='Category' ||
  this.state.titleNewCat==='Kategori' ||this.state.titleNewCat==='Categoria'||this.state.titleNewCat==='Κατηγορία' ){
    const message = <UpLanguage turkish ='lütfen bir başlık yaz'
                                 spanish='por favor, escribe un titulo' 
                                 english='please write a message' 
                                 greek='lütfen bir başlık yaz' currentLanguage={this.props.currentLanguage}></UpLanguage>
    this.setState({AlertMessage:true, 
      messageAlert:message, 
      bgcolorAlert: '#F6F7DF'})
    
    setTimeout(() => {
         this.setState({AlertMessage:false})
         
       }, 3000);
      }else{
        AutenticationServices.NewCatNotes(this.state.IdSchool, this.state.titleNewCat)
        .then(response => {
          const message = <UpLanguage turkish ='kategori kaydedildi'
                                 spanish='Se guardo esta categoria' 
                                 english='Category saved ' 
                                 greek='kategori kaydedildi' currentLanguage={this.props.currentLanguage}></UpLanguage>
    
          this.setState({AlertMessage:true, 
            messageAlert:message, 
            bgcolorAlert: '#BFF8C1 ', 
            titleNewCat:'Category'
          })
          
          setTimeout(() => {
               this.setState({AlertMessage:false})
               
             }, 3000);
        })
        .catch(error => {
        if (!error.response) {
          const message = <UpLanguage turkish ='Hoop! Birşeyler yanlış gitti'
          spanish='Opps algo salio mal' 
          english='oops something went wrong' 
          greek='Hoop! Birşeyler yanlış gitti' currentLanguage={this.props.currentLanguage}></UpLanguage>

this.setState({AlertMessage:true, 
messageAlert:message, 
bgcolorAlert: '#F6F7DF '
})

setTimeout(() => {
this.setState({AlertMessage:false})

}, 3000);

        } else {
          if(error.response.data.code === 404){
 
            const message = <UpLanguage turkish ='bu kategori zaten var'
            spanish='Esta categoria ya existe' 
            english='this category already exist' 
            greek='bu kategori zaten var' currentLanguage={this.props.currentLanguage}></UpLanguage>
  
  this.setState({AlertMessage:true, 
  messageAlert:message, 
  bgcolorAlert: '#F6F7DF '})
  
  setTimeout(() => {
  this.setState({AlertMessage:false})
  
  }, 3000);

   }else{
    const message = <UpLanguage turkish ='Hoop! Birşeyler yanlış gitti'
    spanish='Opps algo salio mal' 
    english='oops something went wrong' 
    greek='Hoop! Birşeyler yanlış gitti' currentLanguage={this.props.currentLanguage}></UpLanguage>

this.setState({AlertMessage:true, 
messageAlert:message, 
bgcolorAlert: '#F6F7DF '})

setTimeout(() => {
this.setState({AlertMessage:false})

}, 3000);
    
   }
         
        
        }})
          
      }
  



    }


ShiftNewNote(){

  AutenticationServices.getCatNotes(this.state.IdSchool)
  .then(response => {
     this.setState({
      ListCatNotes:response.data
  })
  })

  this.setState({
    flagNewNote:true,
    flagCategory:false
  })

}
  
shiftResults(){

  AutenticationServices.getCourseBySchool(this.state.IdSchool)
  .then(response => {
      this.setState({
        ListCoursesAdminGraphs:response.data
      
})})
this.setState({resultsGraph:true, flagNewNote:false, idGradeSelected:null, getGradeLookUP:null})

}





render(){

 

  return(


 <div style={{ position:'relative', width:'90%', height:'575px', marginTop:'5px',  marginLeft:'7%'}}>
     {/*          ******************  ADD A NEW ROW OF NOTES    *****************                           */}
     {this.state.flagNewNote && <div>
     
      {this.state.AlertMessage && <div style={{height: "30px", width: '250px', position:"absolute", left:  "50.5%",top: "5.5%", backgroundColor:this.state.bgcolorAlert, border:'1px',
 paddingTop:'8px', borderRadius:'5%', zIndex:'10'}}><AiOutlineWarning size='1.2rem' /> &nbsp; &nbsp;{this.state.messageAlert}</div>}
      <div onClick={this.shiftResults}   style={{position:'absolute', width:'5%', height:'7%', top:'10%', left:'15%', cursor:'pointer', opacity:'0.75'}}  >
      <img alt='' src='/images/Results.gif' style={{width:'55px', height:'55px'}}></img>
    </div>
      {this.state.Admin && <div onClick={()=>{
        this.setState({flagCategory:true, flagNewNote:false})
        
        }}  style={{position:'absolute', width:'5%', height:'7%', top:'25%', left:'15%', cursor:'pointer', opacity:'0.75'}}  >
      <img alt='' src='/images/category.gif' style={{width:'23px', height:'23px'}}></img>
    </div> }
 
  <div style={{ position:'absolute', width:'800px', height:'550px', marginTop:'20px', 
               left:'20%', top:'0%',  backgroundColor:'#F9FDF6 ', borderRadius:'7%', 
               border:'1px solid #E7E7E7 ' }}  >
   
    
  <div style={{position:'relative', width:'100%', height:'100%'}} >
   
   <div style={{position:'absolute', top:'15%', left:'3%'}} >

   <UpSelect  age={this.state.getGradeLookUP} handle={this.handleChangeSelect} ListGrades={this.state.ListCatNotes} language={this.state.currentLanguage} ></UpSelect>      
   </div>
              {/* 
                      D a t e       p I C K E R      O F    N E W      N O T  E
              
              */}

   {this.state.CoursesInAssFlag  && <div style={{position:'absolute', top:'65%', left:'3%'}} >
   <GetDate setDate={this.state.dateNewActivity} handleDate ={this.NewActivityDate}
        />
  </div>}
  
{ this.state.showStudents && (this.state.buttonFlag && <div style={{position:'absolute', top:'82%', left:'3%',}} ><button className="SaveActivityButton" onClick={this.SaveNotes}   > save</button></div> ) }
{this.state.loadingSave &&  <div style={{height: "50px", width: '50px', position:"absolute", left:  "3%",top: "82%"}}><img alt='Empty ' style={{height: "50px", width: '50px'}} src='/images/loading.gif'></img></div> }
{ /*   
                                  t i t l e     N e w       N o t e s                                
                                  
                                  */ }
{this.state.CoursesInAssFlag  &&   <div style={{position:'absolute', top:'50%', left:'3%', width:'15%',  opacity:'0.7'}}> 
                   
                <input  style={{width:'200px', background:'transparent',  borderTop: 'none',  borderLeft: 'none' , borderRight: 'none', fontSize:'18px', outline: 'none'}}
                  onChange={this.Handleİnpt} type="text" value= {this.state.TitleNewNotes} name='TitleNewNotes' placeholder="Title" />
                   
                  
               </div>}

{this.state.CoursesInAssFlag  &&  <div style={{position:'absolute', top:'30%', left:'3%'}} >

<UpSelectCourses  course={this.state.idCourseSelected} handle={this.handleChangeSelectCourse} ListCourses={this.state.ListCourses} language={this.state.currentLanguage} ></UpSelectCourses>      
</div> }

{!this.state.CoursesInAssFlag  &&  <div style={{position:'absolute', top:'29%', left:'9%', opacity:'0.5', fontSize:'12px'}} >
<img src='/images/empryActivities.png' alt="" style={{width:'40px', height:'40px'}} ></img><p>courses</p>

</div> }

{this.state.showStudents && <div className='PanelStudentNewNotes' >
          {
          
          this.state.ListStudents.map((item) =>{

              return(

              <div  key={item.id} style={{position:'relative',width:'90%', height:'14%', marginLeft:'8px',  marginBottom:'8px'}} >
                <div style={{position:'absolute', top:'10%'}}> <UpAvatar picture={item.photo} name={item.name} ></UpAvatar>   </div>
                <div style={{position:'absolute', top:'31%', left:'18%', width:'135px', textAlign:'left', opacity:'0.7'}}> {item.name + ' ' +item.surname}   </div>
                <div style={{position:'absolute', top:'31%', left:'60%', width:'15%',  opacity:'0.7'}}> 
                   
                <input id={item.id} style={{width:'50px', background:'transparent',  borderTop: 'none',  borderLeft: 'none' , borderRight: 'none'}}
                  onChange={this.handleChange} type="text" name={`${item.id}-Name`} placeholder="N/A" />
                   
                  
               </div>
                </div>
              )

          })}
       </div>}


  </div>
  </div>
     </div> }

{/*          ******************  ADD A NEW CATEGORY   *****************                           */}
      {this.state.flagCategory && <div>
      <div style={{position:'absolute', width:'5%', height:'7%', top:'15%', left:'32%', cursor:'pointer', opacity:'0.75'}}  >
      <img alt='' src='/images/Results.gif' style={{width:'55px', height:'55px'}}></img>
    </div>
 
    {this.state.Admin && <div onClick={this.ShiftNewNote}  style={{position:'absolute', width:'5%', height:'7%', top:'30%', left:'32%', cursor:'pointer', opacity:'0.6'}}  >
      <img alt='' src='/images/newFile.png' style={{width:'23px', height:'23px'}}></img>
    </div>}
  <div style={{ position:'absolute', width:'25%', height:'300px', marginTop:'20px', 
               left:'38%', top:'10%',  backgroundColor:'#F6F8FD  ', borderRadius:'7%', 
               border:'1px solid #E7E7E7 ' }}  >
   
    
  <div style={{position:'relative', width:'100%', height:'100%'}} >
   
   <div style={{position:'absolute', top:'2%', left:'3%', fontSize:'18px' , color:'#929292'}} >
     <UpLanguage turkish='Yeni kategori' english='New category' spanish='Nueva Categoria' greek='Yeni kategori' currentLanguage={this.state.currentLanguage} ></UpLanguage>
   </div>
   {this.state.AlertMessage && <div style={{height: "30px", width: '250px', position:"absolute", left:  "50.5%",top: "10.5%", backgroundColor:this.state.bgcolorAlert, border:'1px',
 paddingTop:'8px', borderRadius:'5%', zIndex:'10'}}><AiOutlineWarning size='1.2rem' /> &nbsp; &nbsp;{this.state.messageAlert}</div>}
  
                {/*                TITLE OF NEW Category          */ }

   <div style={{position:'absolute', top:'35%', left:'15%', width:'50%', height:'40%'}}>
   <input className="textBoxStudent"  id="Utitle" name="titleNewCat" type='text' value={this.state.titleNewCat} onChange={this.Handleİnpt} onFocus={this.HandleFocus} />
   </div>

   <div style={{position:'absolute', top:'58%', left:'8%', width:'50%', height:'40%'}}>
   <button className="SaveActivityButton" onClick={this.SaveNewCat}   > save</button>
   </div>
   
     
  </div>
  </div>
     </div>}

{/******************************  new graphic             */}
        {this.state.resultsGraph && <div>  
             <div onClick={()=>{
               this.setState({resultsGraph:false,
             flagNewNote:true, 
             FlagShowTeacherGraph:false,
             FlagShowStudentGraph:false
             
            })
            
            }}
         style={{position:'absolute', width:'5%', height:'7%', top:'0%', left:'-3%', cursor:'pointer', opacity:'0.6'}}  >
          <img alt='' src='/images/newFile.png' style={{width:'23px', height:'23px'}}></img>
        </div>
    
        <div onClick={()=>{this.setState({FlagShowStudentGraph:true, FlagShowTeacherGraph:false})}}
         style={{position:'absolute', width:'5%', height:'7%', top:'10%', left:'-3%', cursor:'pointer', opacity:'0.6'}}  >
          <BiHappy size='1.5rem'></BiHappy>
        </div>
    
        <div onClick={()=>{this.setState({FlagShowTeacherGraph:true,FlagShowStudentGraph:false })}}
         style={{position:'absolute', width:'5%', height:'7%', top:'20%', left:'-3%', cursor:'pointer', opacity:'0.6'}}  >
         {this.state.Admin && <FaChalkboardTeacher size='1.5rem'></FaChalkboardTeacher> } 
         {!this.state.Admin && <BsListCheck size='1.5rem'></BsListCheck>}
        </div>
    
        
        </div>}

        {this.state.FlagShowTeacherGraph && <ResultTeacher admin={this.state.Admin}></ResultTeacher>}
        {this.state.FlagShowStudentGraph && <ResultsStudent admin={this.state.Admin}></ResultsStudent>}
        
        

</div>

);

}




}


function UpSelect(props){
  const classes = useStyles();
return(
  <FormControl variant="outlined" className={classes.formControl}>
  <InputLabel id="demo-simple-select-outlined-label"><UpLanguage turkish='bir kategori seçin' english='choose a category' spanish='elige una categoria' greek='choose a ctegory' currentLanguage={AutenticationServices.returnIdLanguage()} ></UpLanguage></InputLabel>
  <Select
  defaultValue=""
    labelId="demo-simple-select-outlined-label"
    id="demo-simple-select-outlined"
    value={props.age}
    onChange={props.handle}
    label="choose a Category."
    style={{width:'200px', height:'50px'}}
  >
  {
  props.ListGrades.map(item=>
<MenuItem   defaultValue="" key={item.id} value={item.id}>{item.categoryDescription}</MenuItem>
)
}    
</Select>
</FormControl>)
}


function UpSelectCourses(props){
  const classes = useStyles();
return(
  <FormControl variant="outlined" className={classes.formControl}>
  <InputLabel id="demo-simple-select-outlined-label"><UpLanguage turkish='bir ders seçin' english='choose a course' spanish='elige un curso' greek='choose a ctegory' currentLanguage={AutenticationServices.returnIdLanguage()} ></UpLanguage></InputLabel>
  <Select
  defaultValue=""
    labelId="demo-simple-select-outlined-label"
    id="demo-simple-select-outlined"
    value={props.course}
    onChange={props.handle}
    label="choose a Category."
    style={{width:'200px', height:'50px'}}
  >
  {
  props.ListCourses.map(item=>
<MenuItem   defaultValue="" key={item.id_Course}  value={item.id_Course}>{item.nameGrade + ' ' +item.nameLesson }</MenuItem>
)
}    
</Select>
</FormControl>)
}










function GetDate(props){

  return( 
    
  
  
          <DatePicker
          defaultValue=""
          value={props.setDate}
          onChange={date =>props.handleDate(date)}
        inputPlaceholder="Select a date" // placeholder
        formatInputText={props.formatInputValue} // format value
        inputClassName="my-custom-input" // custom class
        shouldHighlightWeekends
      />
           
            )
  }


function UpLanguage(props){
      
 
         
  switch (parseInt(props.currentLanguage)) {
              case 0:
               return props.turkish
               
               case 1:
                 return props.english
                 
                 case 2:
                   return props.spanish
                   
                case 3:
                return props.greek

                
           
              default: return 'nada'
                
  
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
export default withRouter(Results)