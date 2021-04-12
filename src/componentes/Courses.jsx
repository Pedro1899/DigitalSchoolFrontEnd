import React, {Component} from 'react';
import './courses.css'


import {AiOutlineWarning } from "react-icons/ai";
import { withRouter } from 'react-router'

import Avatar from '@material-ui/core/avatar'
import AutenticationServices from './AutenticationServices.js';
import MaterialTable from 'material-table'
import { makeStyles } from '@material-ui/core/styles';

import { green, red, lightBlue } from '@material-ui/core/colors';

import {FiLink, FiList} from "react-icons/fi";
import {FaLink, FaUnlink} from "react-icons/fa";
import {GrSend} from "react-icons/gr";

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
      width: theme.spacing(6.5),
        height: theme.spacing(6.5),
    },
    red: {
      color: theme.palette.getContrastText(red[500]),
      backgroundColor: red[500],
      width: theme.spacing(7.5),
        height: theme.spacing(7.5),
    },
    Lblue: {
        color: theme.palette.getContrastText(lightBlue[500]),
        backgroundColor: lightBlue[500],
        width: theme.spacing(7.5),
        height: theme.spacing(7.5),
      },

      large: {
        width: theme.spacing(19),
        height: theme.spacing(19),
      }, 
      medium: {
        width: theme.spacing(15),
        height: theme.spacing(15),
      }
  }));
  

class Courses extends Component{
constructor(proops){
super(proops);

//var today = new Date();
//var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();


this.state ={
   ListCourses: [],
   ListCoursesPiv:[],
   ListCoursesAll:[],
   ListCoursesLessonPiv:[],
   ListGrades:[],
   ListLesson:[],
   ListTeacher:[],
   ListAss:[],
   ListTeacherCourse:[],
   ColumnsCourses:[],
   ColumnsGrades:[],
   ColumnsLessons:[],
   ColumnsTeachers:[],
   ColumnsTeacherCourse:[],
   idSchool: 0,
   showTableUser:true, 
   picture: '',
   ButtonAddNewCourse:false,
   CoursesFlag:false,
   loadingSave:false,
   CoursesInAssFlag:false,
   BGColorCoursesIn:'#9BDEB4 ',
   BGColorCourses:'',


   title:'Crea tus propios cursos', 
   showInformation : false,
   showCoursesDiv : true,
   showAssignDiv : false,
   lookupGradesState:{},
   lookupLessonState:{},
   lookUpCoursesState:{},
   lookUpTeachersState: {},

   //alertas
   messageAlert:'',
   AlertMessage:false,

   //variables used to assignment teacher-course
  AssFlag:false,
  ListCoursesToAssign:[],

  
selectionTeacher:null,
  selectionGrade:null,
  AlertMessageTeacher:false,

  language:0
   }



}

componentDidMount(){
  

  const schoolId = AutenticationServices.returnIdSchool();
  this.setState({
      idSchool:schoolId
  })
//get all courses in the School
    AutenticationServices.getCourseBySchool(schoolId)
        .then(response => {
          if(response.data.length>0){
            this.setState({
              ListCourses:response.data,
              ListCoursesAll:response.data,
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
    


//get all Grades in the school
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


// get all lesson in school
      AutenticationServices.getLessonBySchool(schoolId)
      .then(response => {
              this.setState({
                  ListLesson:response.data
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


    //getAllAssignmt
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



    const LessonCollumn =[
                {title : 'id', field : 'id', hidden:true}, {title : 'L E S S O N', field : 'description', 
                cellStyle: {
                  
                   
                    color: '#090909'
                  }
            }
        ]
      
        const GradeCollumn =[
                {title : 'idgrade', field : 'idgrade', hidden:true}, {title : 'GRADE', field : 'description',
               
                  headerStyle: {
                    backgroundColor: '#D19090',
                  }}, 
                
            ]


            const CourseCollumn =[
                {title : 'id_Course', field : 'id_Course', hidden:true}, {title : 'idGrade', field : 'idGrade', hidden:true},
                {title : 'idLesson', field : 'idLesson', hidden:true}, {title : 'activityDetail', field : 'activityDetail', hidden:true},
                {title : 'nameGrade', field : 'nameGrade'}, {title : 'nameLesson', field : 'nameLesson'}
                
            ]    

            const TeacherCollumn =[
                {title : 'idTeacher', field : 'idTeacher', hidden:true},
                {title: " ", render: rowData => <UpAvatar category ={1} name={rowData.name}  picture={rowData.picture} ></UpAvatar>},
                {title : 'Name', field : 'name'},
                {title : 'surname', field : 'surname'}, 
                {title : 'picture', field : 'picture',  hidden:true}
                
            ]    

          
this.setState({
CollumnsGrades:GradeCollumn,
CollumnsLessons:LessonCollumn,
CollumnsCourses:CourseCollumn,
ColumnsTeachers:TeacherCollumn,

    })

   this.sendCoursesPivot = this.sendCoursesPivot.bind(this)
   this.sendAssPivot = this.sendAssPivot.bind(this)
   this.FilterCoursesNotAss = this.FilterCoursesNotAss.bind(this)
   this.FilterCoursesAss = this.FilterCoursesAss.bind(this)
   const language = AutenticationServices.returnIdLanguage();
this.setState({language:language})

 switch (language) {
   case '0':
    this.props.title('kurslarınızı oluşturun')
     break;
    case '1':
      this.props.title('Create your courses')
      break
      case '2':
        this.props.title('crea tus cursos')
        break
     case '3':
      this.props.title('δημιουργήστε τα μαθήματά σας')
      break
     

   default:
     break;
 }
   
}

changeSelectionGrade(RowData){
  this.setState({
          selectionGrade:RowData.tableData.id, 
          gradeSelected:RowData.idgrade,
          CoursesFlag:false,
          
          selectionLesson:null, 
          ListCoursesPiv:[],
         ListCoursesLessonPiv:[]
          
  
      })
   
     if(this.state.ListCoursesAll.filter(item=>item.idGrade===RowData.idgrade).length>0){
    this.setState({ListCoursesPiv:this.state.ListCoursesAll.filter(item=>item.idGrade===RowData.idgrade),
      
       CoursesFlag:true})  
     }}
    


  changeSelectionLesson(RowData){
   if(this.state.selectionGrade!==null){
//consulta a la lista de cursos existentes si el curso que se quiere asignar ya existe
if( this.state.ListCoursesPiv.filter(itemSelected=> itemSelected.idLesson===RowData.id).length > 0){

  switch (this.state.language) {
    case '0':
      this.setState({AlertMessage:true, 
        messageAlert:'bu ders zaten eklendi'})
      break;
     case '1':
      this.setState({AlertMessage:true, 
        messageAlert:'Course already added'})
       break
       case '2':
        this.setState({AlertMessage:true, 
          messageAlert:'ya se anadio este curso'})
         break
      case '3':
       this.props.title('δημιουργήστε τα μαθήματά σας')
       break
      
 
    default:
      break;
  }

  
  setTimeout(() => {
       this.setState({AlertMessage:false})
       
     }, 3000);
  }else{
  
     
          //consulta si en la lista pivot de cursos a asignar existe el elemento que se ha clickeado, si es asi se cambia el color
          if (this.state.ListCoursesLessonPiv.filter(item=> item.id===RowData.id).length>0){
            //se elimina
       
         
         
          this.setState({
           ListCoursesLessonPiv:this.state.ListCoursesLessonPiv.filter(item=> item.id!==RowData.id)
            
            })
             //si no hay mas elementos marcados se elimina el boton para agregar la lista 
           if(this.state.ListCoursesLessonPiv.filter(item=> item.id!==RowData.id).length === 0){
            this.setState({
             ButtonAddNewCourse:false
              })
            }

          }else{
         //se marca con color la leccion seleccionada y se agrega a la lista pivote 
           const ListCoursesSelectPivot = [...this.state.ListCoursesLessonPiv]
           ListCoursesSelectPivot.push(RowData)
           
           this.setState({
             ListCoursesLessonPiv:ListCoursesSelectPivot,
                 ButtonAddNewCourse:true
                })
        }
         

      }

   }else{
    switch (this.state.language) {
      case '0':
        this.setState({AlertMessageGrade:true, 
          messageAlert:'bir derece seç'})
        break;
       case '1':
        this.setState({AlertMessageGrade:true, 
          messageAlert:'choose a grade'})
         break
         case '2':
           this.props.title('elige un grado')
           break
        case '3':
         this.props.title('bir derece seç')
         break
        
   
      default:
        break;
    }
    
    
    setTimeout(() => {
         this.setState({AlertMessageGrade:false})
         
       }, 3000);
    
   }
      
          
             
                 }

sendCoursesPivot(){

  this.setState({loadingSave:true,
    ListCoursesLessonPiv:[],
    ButtonAddNewCourse:false
  })

  let arrayLessons=[]

  this.state.ListCoursesLessonPiv.forEach(item=>{arrayLessons.push(item.id)})
  
    const formData = new FormData()
 
    formData.append('idGrade',this.state.gradeSelected )
    formData.append('idCourses', arrayLessons)

    AutenticationServices.addNewCourse(formData)
.then(response => {
  
     const schoolId = AutenticationServices.returnIdSchool();
    
    AutenticationServices.getCourseBySchool(schoolId)
  .then(responseQuery => {
 
            this.setState({
                ListCoursesAll:responseQuery.data,
                ListCoursesPiv:responseQuery.data.filter(item=>item.idGrade===this.state.gradeSelected),
                loadingSave:false, 
                CoursesFlag:true,
                CoursesInAssFlag:true
    })

 
  })
  .catch(error => {
  if (!error.response) {
   
   // console.log( "this.state.codeLoginFailed> " + this.state.codeLoginFailed)
   this.setState({
    
    loadingSave:false, 
    CoursesFlag:true
})
  } else {
   
   this.setState({
    
    loadingSave:false, 
    CoursesFlag:true
})
   }})



})
.catch(error => {
  if (!error.response) {
    this.setState({
     
      loadingSave:false, 
      CoursesFlag:true
}) 
     alert(error)  
     // console.log( "this.state.codeLoginFailed> " + this.state.codeLoginFailed)
  } else {
    
   if(error.response.data.code === 404){
    this.setState({
     
      loadingSave:false, 
      CoursesFlag:true
})
    alert("this course already exists") 
    

   }
     

     }
    
   
    })
    this.setState({
      
      ButtonAddNewCourse:false
    })

                 }


changeSelectionTeacher(RowData){
  this.setState({
    //get the id of table to mark with color
    selectionTeacher:RowData.tableData.id,
    //get the id of teacher to save it in the list when assign a Course
    TeacherSelected:RowData.idTeacher,
    //make disapear the table of Assignamnts
    AssFlag:false,
    //?
    selectionLesson:null,
    //restart the List of courses who belong to this teacher 
    ListAssPiv:[],
    //restart the list of courses choosen before of this click
  

   ListCoursesToAssign:[]
    

})
//if the list of assignment filter by the id of this teacher is bigger than cero, we pass this filter to the list to show it and make
//the list appear
if(this.state.ListAss.filter(item=>item.idTeacher===RowData.idTeacher).length>0){
this.setState({ListAssPiv:this.state.ListAss.filter(item=>item.idTeacher===RowData.idTeacher),

  AssFlag:true})  
}}


changeSelectionCoursesAss(RowData){
if(this.state.selectionTeacher!==null){

  this.setState({
    ButtonAddNewAss:true

  })
//ask if this course its already selected (two click on the same row)
  if(this.state.ListCoursesToAssign.filter(item=>item.id_Course===RowData.id_Course).length>0){
    //if the size of the list without this element is cero, make disapear the element to save the empty list
    if(this.state.ListCoursesToAssign.filter(item=>item.id_Course!==RowData.id_Course).length>0){
      this.setState({
        ListCoursesToAssign:this.state.ListCoursesToAssign.filter(item=>item.id_Course!==RowData.id_Course),
       
      })
    }else{
     this.setState({
      ListCoursesToAssign:this.state.ListCoursesToAssign.filter(item=>item.id_Course!==RowData.id_Course),
      ButtonAddNewAss:false
      }) 
    }

}else{
//if the element is already assigned to ListAss

if(this.state.ListAssPiv.filter(item=>item.idCourseLong ===RowData.id_Course).length>0){
  switch (this.state.language) {
    case '0':
      this.setState({AlertMessageAss:true, 
        messageAlert:'Bu ders zaten size atanmış',
        ButtonAddNewAss:false})
      break;
     case '1':
      this.setState({AlertMessage:true, 
        messageAlert:'this course is assigned to you already'})
       break
       case '2':
        this.setState({AlertMessage:true, 
          messageAlert:'Este curso ya se te asigno previamente'})
         break
      case '3':
       this.props.title('δημιουργήστε τα μαθήματά σας')
       break
      
 
    default:
      break;
        }

  
  
  setTimeout(() => {
       this.setState({AlertMessageAss:false})
       
     }, 3000);

}else if(this.state.ListAss.filter(item=>item.idCourseLong ===RowData.id_Course).length>0){
 
  const teacherId = this.state.ListAss.filter(item=>item.idCourseLong ===RowData.id_Course).map(item=>{return(item.idTeacher)})

  let getName=''
  this.state.ListTeacher.forEach(item=>{

      if(item.idTeacher===parseInt(teacherId)){
        getName=item.name + ' ' +item.surname
        }
})

switch (this.state.language) {
  case '0':
    this.setState({AlertMessageAss:true, 
      messageAlert:'zaten atandı ' + getName,
      ButtonAddNewAss:false })
    break;
   case '1':
    this.setState({AlertMessageAss:true, 
      messageAlert:'Already assigned to ' + getName,
      ButtonAddNewAss:false })
     break
     case '2':
      this.setState({AlertMessageAss:true, 
        messageAlert:'Ya se asigno a ' + getName,
        ButtonAddNewAss:false })
       break
    case '3':
     this.props.title('δημιουργήστε τα μαθήματά σας')
     break
    

  default:
    break;
      }

  

  
  setTimeout(() => {
       this.setState({AlertMessageAss:false})
       
     }, 3000);

}else{

let getListPivot = this.state.ListCoursesToAssign
getListPivot.push(RowData)
this.setState({
  ListCoursesToAssign:getListPivot

})

 
}

}

}else{
  switch (this.state.language) {
    case '0':
      this.setState({AlertMessageTeacher:true, 
        messageAlert:'bir öğretmen seç',
        ButtonAddNewAss:false}
        )
      break;
     case '1':
      this.setState({AlertMessageTeacher:true, 
        messageAlert:'choose a teacher',
        ButtonAddNewAss:false}
        )
       break
       case '2':
        this.setState({AlertMessageTeacher:true, 
          messageAlert:'Elige a un profesor',
          ButtonAddNewAss:false}
          )
         break
      case '3':
        this.setState({AlertMessageTeacher:true, 
          messageAlert:'bir öğretmen seç',
          ButtonAddNewAss:false}
          )
       break
      
 
    default:
      break;
  }

  
  setTimeout(() => {
       this.setState({AlertMessageTeacher:false})
       
     }, 3000);

}

 

}


sendAssPivot(){

  this.setState({loadingSave:true,
    ButtonAddNewAss:false
  })

  let arrayLessons=[]
let arrayCoursesToShow=this.state.ListCourses
  this.state.ListCoursesToAssign.forEach(item=>{
    arrayLessons.push(item.id_Course)
    arrayCoursesToShow = arrayCoursesToShow.filter(filter=>filter.id_Course!==item.id_Course)
  })
  
    const formData = new FormData()
    formData.append('idTeacher',this.state.TeacherSelected )
    formData.append('idCourses', arrayLessons)

    AutenticationServices.AddAssignmnt(formData)
.then(response => {
  
  this.setState({ListCoursesToAssign:[], 
    loadingSave:false})

     const schoolId = AutenticationServices.returnIdSchool();
   
   //getAllAssignmt
   AutenticationServices.getAssignmnt(schoolId)
   .then(getResponse => {


           this.setState({
              ListAss:getResponse.data,
              ListAssPiv:getResponse.data.filter(item=>item.idTeacher===parseInt(this.state.TeacherSelected)),
              ListCoursesToAssign:[], 
              ListCourses:arrayCoursesToShow,
              AssFlag:true
   })
}

 
 
 )
.catch(error => {
if (!error.response) {
  alert('Opps... seems like we have a problem. Contact us')   
  // console.log( "this.state.codeLoginFailed> " + this.state.codeLoginFailed)
} else {
  alert('Opps... seems like we have a problem. Contact us')  
  }})



})
.catch(error => {
  if (!error.response) {
    this.setState({
     
      loadingSave:false, 
      CoursesFlag:true
}) 
     alert("We have a problem with DB, please contact us")  
     
  } else {
     
   if(error.response.data.code === 404){
    this.setState({
     
      loadingSave:false, 
      CoursesFlag:true
})
    alert("We have a problem with DB, please contact us") 
    

   }
     

     }
    
   
    })
    this.setState({
      
      ButtonAddNewAss:false
    })

}

FilterCoursesNotAss(){
  let CoursesPiv = [...this.state.ListCoursesAll]
this.state.ListAss.forEach(item=>{
CoursesPiv = CoursesPiv.filter(itemCourse=>
  itemCourse.id_Course!==item.idCourseLong
)
})

this.setState({ListCourses:CoursesPiv,
  BGColorCourses:'#9BDEB4',
  BGColorCoursesIn:'',})
}

FilterCoursesAss(){

  let CouresesToFill=[]



    this.state.ListCoursesAll.forEach(item=>{
     
      this.state.ListAss.forEach(getAss=>{


        if(item.id_Course===getAss.idCourseLong){
          
CouresesToFill.push(item)}
      })
    })


this.setState({ListCourses:CouresesToFill,
  BGColorCourses:'',
  BGColorCoursesIn:'#9BDEB4',})
}
               
render(){
  return(
<div className="PanelCourses">
 {this.state.showCoursesDiv &&  <div className = "ManagemntCourses" >

  
     <div className="row">
       <div className="col-lg-11" ></div>
       <div className="col-lg-1" >
       <div className="ShiftCourseTeacher"
   
   onClick={()=>{
     this.FilterCoursesAss()
     this.setState({showCoursesDiv:false, showAssignDiv:true}
      )
      
 switch (this.state.language) {
  case '0':
   this.props.title('öğretmenleri ve Kursları')
    break;
   case '1':
    this.props.title('Bind teachers and courses')
     break
     case '2':
       this.props.title('Vincula cursos y profesores')
       break
    case '3':
     this.props.title('συνδέστε μαθήματα και εκπαιδευτικούς')
     break
    

  default:
    break;
}

     
      }} > 
  <FiLink size="1.5rem"></FiLink>
    </div>
       </div>
     </div>
 
 
  <div className="row">
      <div className="col-lg-4  " >
        <div className="ContainerDivTables">
        <div className="GradeDiv">  

<MaterialTable title="" 
      data = {this.state.ListGrades}
      columns ={this.state.CollumnsGrades}
        options={{
          rowStyle: rowData => ({
            backgroundColor: (this.state.selectionGrade === rowData.tableData.id) ? '#A3C3E1' : '#BEECDD',
            
            fontSize: (this.state.selectionGrade === rowData.tableData.id) ? 14.5 : 13.5,
          }),
          paging: false,
          headerStyle: {
            zIndex: 0,
            backgroundColor:'#DBA6A6'
          }, 
          header: false, 
          actionsCellStyle: {
            
              backgroundColor:'#8CCEB9'
          }
      }}
          editable={{
              onRowAdd: (newData) =>
                new Promise((resolve) => {
                  this.AddnewRow(newData,resolve)
                  }),
                  onRowDelete: (rowData) =>
                  new Promise((resolve) => this.DeleteRowGrade(rowData,resolve))

              
              }}

              onRowClick={((evt, selectedRow) => this.changeSelectionGrade(selectedRow))}
      ></MaterialTable>
      </div>
     {(()=>{
      
switch (this.state.language) {

case '0':

return 'dersane'


case '1':
  return 'Classroom'
 

  case '2':
    return 'Salon'


case '3':
  return 'derece'



default:

}})()} 
        </div>
      


      </div>

      <div className="col-lg-4  " >
        <div className="ContainerDivTables">
        <div className="GradeDiv">  


        <MaterialTable title="" 
      data = {this.state.ListLesson}
      columns ={this.state.CollumnsLessons}
        options={{
            rowStyle: rowData => ({
                backgroundColor:   (() => {
                const getJustOneId =this.state.ListCoursesLessonPiv.filter(item=> item.id===rowData.id) 
                 const getColor = getJustOneId.map(item => item)
                 if (getColor.length>0){
                  
                     return '#A3C3E1'
                }else{
                 return '#EECDCD'
                }
                 
                  })(),
                fontSize: (() => {
                  const getJustOneId =this.state.ListCoursesLessonPiv.filter(item=> item.id===rowData.id) 
                   const getColor = getJustOneId.map(item => item)
                   if (getColor.length>0){
                   
                       return 14.5
                  }else{
                   return 13.5
                  }
                   
                    })()
              }),
          paging: false,
          headerStyle: {
            zIndex: 0,
            backgroundColor:'#DBA6A6'
          }, 
          header: false, 
          actionsCellStyle: {

              backgroundColor:'#ECBEBE'
          }
      }}
          editable={{
              onRowAdd: (newData) =>
                new Promise((resolve) => {
                  this.AddnewRowLesson(newData,resolve)
                  }),
                  onRowDelete: (rowData) =>
                  new Promise((resolve) => this.DeleteRowLesson(rowData,resolve))

              
              }}
              onRowClick={((evt, selectedRow) => this.changeSelectionLesson(selectedRow))}

      ></MaterialTable>
      </div>
      {(()=>{
       
       switch (this.state.language) {
       
       case '0':
       
         return 'Sınıf'
       
         
         case '1':
           return 'Lesson'
           
       
           case '2':
             return 'Lecciones'
         
       
         case '3':
           return 'Sınıf'
         
       
       
       default:
         break;
       }})()}


{this.state.ButtonAddNewCourse &&  <div style={{position:'absolute', left:'70%', top:'60%', width:'100px',height:'100px', opacity:'0.5', cursor:'pointer' }} onClick={this.sendCoursesPivot}  ><GrSend size="2.7rem"></GrSend></div>}
            {this.state.loadingSave &&  <div style={{position:'absolute', left:'70%', top:'60%', width:'100px',height:'100px', opacity:'0.5', cursor:'pointer'}}><img alt='Empty ' style={{height: "50px", width: '50px'}} src='/images/loading.gif'></img></div> }

            {this.state.AlertMessage && <div style={{height: "80px", width: '400px', fontSize:"18px", fontWeight:'300', fontStyle:"normal" ,position:"absolute", left:  "25",top: "5%", backgroundColor:'#F6F7DF', border:'1px',
 paddingTop:'8px', borderRadius:'5%', zIndex:'10', textAlign:'center'}}><AiOutlineWarning size='1.2rem' /> &nbsp; &nbsp;{this.state.messageAlert}</div>}
      
      {this.state.AlertMessageGrade && <div style={{height: "80px", width: '400px', fontSize:"18px", fontWeight:'300', fontStyle:"normal" ,position:"absolute", left:  "25",top: "5%", backgroundColor:'#F6F7DF', border:'1px',
 paddingTop:'8px', borderRadius:'5%', zIndex:'10', textAlign:'center'}}><AiOutlineWarning size='1.2rem' /> &nbsp; &nbsp;{this.state.messageAlert}</div>}
      

      
        </div>
      


      </div>

      <div className="col-lg-4  " >
        <div className="ContainerDivTables">
        <div className="GradeDivAss">  
        {!this.state.CoursesFlag && <div><img alt='' src='/images/emptyCourses.png'  style={{height: "200px", width: '150px', paddingTop: '100PX', opacity:'0.60'}} ></img>
<p style={{fontSize:'13.5px', color:'black', opacity:'0.3'}} >
choose a grade and assign lessons</p></div> }
{this.state.CoursesFlag &&
<MaterialTable title="" 
      data = {this.state.ListCoursesPiv}
      columns={[ {title : 'id_Course', field : 'id_Course', hidden:true},
      
      {title : 'idGrade', field : 'idGrade', lookup:(()=>{
        const getLookUp=[]
           this.state.ListGrades.forEach(item=>{
            getLookUp[item.idgrade]=item.description
          })
         
         return getLookUp
         })(),
    
      cellStyle: {
        
        backgroundColor: '#BEECDD ',
        color: '#090909'
      }
    

    },
      {title : 'idLesson', field : 'idLesson', lookup:(()=>{
        const getLookUp=[]
           this.state.ListLesson.forEach(item=>{
           getLookUp[item.id]=item.description
          })
         
         return getLookUp
         })(),
      cellStyle: {
        backgroundColor: '#EECDCD',
        color: '#090909'
      }
     },
      
      {title : 'activityDetail', field : 'activityDetail', hidden:true},
      {title : 'nameGrade', field : 'nameGrade', hidden:true}, {title : 'nameLesson', field : 'nameLesson', hidden:true}]}
      options={{
        rowStyle: {
            fontSize: 13.5,
          },
        paging: false,
        headerStyle: {
          zIndex: 0,
          backgroundColor:'#DBA6A6'
        }, 
        header: false, 
        actionsCellStyle: {

            backgroundColor:'#F3F4F5'
        }
    }}

    editable={{
  
            onRowDelete: (rowData) =>
            new Promise((resolve) => this.DeleteRowCourse(rowData,resolve))

        
        }}
         
      ></MaterialTable>
      } 

  
      </div>
      {(()=>{
   
   switch (this.state.language) {
   
   case '0':
   
     return 'dersler'
   
     
     case '1':
       return 'Courses'
       
   
       case '2':
         return 'Cursos'
     
   
     case '3':
       return 'dersler'
     
   
   
   default:
     break;
   }})()}
        </div>
      


      </div>


  </div>

{/****************************************** GRADES   ********************* */}
 
{/*
 ********************************************************* LESSONS **********************************************

 */}

     

            

      {/* ***************************************** C O U R S E S ************************************ */}


    
      

</div>
}

{/*           ***********************                 ASSIGNMENTS    ********************************* */}


{this.state.showAssignDiv && <div className='ManagemntCourses' >
<div className="row">
       <div className="col-lg-11" ></div>
       <div className="col-lg-1" >
       <div className="ShiftCourseTeacher"
    onClick={()=>{
      this.setState({showCoursesDiv:true, showAssignDiv:false, 
                     ListAssPiv:[], selectionTeacher:null, ListCoursesToAssign:[], AssFlag:false, ButtonAddNewAss:false
      })
      this.props.title('Create courses')
      }} > 
  <FiList size="1.5rem"></FiList>
    </div>
       </div>
     </div>

    
    {/*  *******************************Cursos ***************************  */}
    <div className="row">

    <div className="col-lg-4  " >
        <div className="ContainerDivTables">
        <div className="GradeDiv">  
        <MaterialTable title="" 
      data = {this.state.ListTeacher}
      columns={[

        {title : 'idTeacher', field : 'idTeacher', hidden:true},
        {title: " ", render: rowData => <UpAvatar category ={1} name={rowData.name}  picture={rowData.picture} ></UpAvatar>},
        {title : 'Name', field : 'name' },
        {title : 'Surname', field : 'surname'}, 
        {title : 'picture', field : 'picture',  hidden:true}, 
        


      ]}

      options={{
        rowStyle: rowData => ({
          backgroundColor: (this.state.selectionTeacher === rowData.tableData.id) ? '#F9B6B6' : '',
          fontSize:13
          
        }),
        paging: false,
        headerStyle: {
          zIndex: 0,
          backgroundColor:'#DBA6A6'
        }, 
        header: false, 
        actionsCellStyle: {

            backgroundColor:'#F3F4F5'
        }
    }}
 

    onRowClick={((evt, selectedRow) => this.changeSelectionTeacher(selectedRow))}
 
      ></MaterialTable>

    </div>
     {(()=>{
      
switch (this.state.language) {

case '0':

return 'öğretmenler'


case '1':
  return 'Teachers'
 

  case '2':
    return 'Profesores'


case '3':
  return 'öğretmenler'



default:

}})()} 
        </div>
      


      </div>



    <div className="col-lg-4  " >
        <div className="ContainerDivTables">
        <div className="GradeDiv"> 
        {this.state.CoursesInAssFlag && 
  <MaterialTable title="" 
      data = {this.state.ListCourses}
      columns={[ {title : 'id_Course', field : 'id_Course', hidden:true},
      
      {
        
        title : 'idGrade', field : 'idGrade', lookup: (()=>{
        const getLookUp=[]
         this.state.ListGrades.forEach(item=>{
           getLookUp[item.idgrade]=item.description
 
         })
        
         return getLookUp
         
       })(), 
    
 

    },
      {title : 'idLesson', field : 'idLesson', lookup:(()=>{
        const getLookUp=[]
           this.state.ListLesson.forEach(item=>{
           getLookUp[item.id]=item.description
          })
         
         return getLookUp
         })(),
  
     },
      
      {title : 'activityDetail', field : 'activityDetail', hidden:true},
      {title : 'nameGrade', field : 'nameGrade', hidden:true}, {title : 'nameLesson', field : 'nameLesson', hidden:true}]}

      options={{
       rowStyle: rowData => ({
        backgroundColor:   (() => {
          const getJustOneId =this.state.ListCoursesToAssign.filter(item=> item.id_Course===rowData.id_Course) 
          
          const getColor = getJustOneId.map(item => item)
          
          if (getColor.length>0){
            
               return '#A3C3E1'
          }else{
           return '#D1E1F0'
          }
           
            })(),

            fontSize:   (() => {
              const getJustOneId =this.state.ListCoursesToAssign.filter(item=> item.id_Course===rowData.id_Course) 
              
              const getColor = getJustOneId.map(item => item)
              
              if (getColor.length>0){
                
                   return 14
              }else{
               return 13.5
              }
               
                })()
       })
          
          ,

          
        paging: false,
        headerStyle: {
          zIndex: 0,
          backgroundColor:'#DBA6A6'
        }, 
        header: false, 
        actionsCellStyle: {

            backgroundColor:'#F3F4F5'
        }
    }}

    onRowClick={((evt, selectedRow) => this.changeSelectionCoursesAss(selectedRow))}
      ></MaterialTable>}
    </div>

    {(()=>{
      
      switch (this.state.language) {
      
      case '0':
      
      return 'dersler'
      
      
      case '1':
        return 'Courses'
       
      
        case '2':
          return 'Cursos'
      
      
      case '3':
        return 'dersler'
      
      
      
      default:
      
      }})()} 


{this.state.ButtonAddNewAss &&  <div style={{position:'absolute', left:'70%', top:'60%', width:'100px',height:'100px', opacity:'0.5', cursor:'pointer' }} onClick={this.sendAssPivot}  ><GrSend size="2.7rem"></GrSend></div>}
{this.state.loadingSaveAss &&  <div style={{height: "100px", width: '100px', position:"absolute", left:  "80%",top: "90%"}}><img alt='Empty ' style={{height: "100px", width: '100px'}} src='/images/loading.gif'></img></div> }



    {this.state.CoursesInAssFlag&&<div style={{position:'absolute',  top:'20%', left:'80%', borderRadius:'75%', paddingTop:'0px', paddingLeft:'10px',  paddingRight:'10px',  paddingBottom:'0px', opacity:'0.5', cursor:'pointer',  backgroundColor:this.state.BGColorCourses, border:'0.5px solid', borderColor:'#C3C3C3 '}} onClick={this.FilterCoursesNotAss}><FaUnlink size='1rem'></FaUnlink></div>  }
{this.state.CoursesInAssFlag&&<div style={{position:'absolute',  top:'30%', left:'80%', borderRadius:'75%', paddingTop:'0px', paddingLeft:'10px',  paddingRight:'10px',  paddingBottom:'0px', opacity:'0.5', cursor:'pointer',  backgroundColor:this.state.BGColorCoursesIn, border:'0.5px solid', borderColor:'#C3C3C3 '}}  onClick={this.FilterCoursesAss} ><FaLink size='1rem'></FaLink></div>  }    
    {!this.state.CoursesInAssFlag &&<div><img alt='' src='/images/emptyCourses.png'  style={{height: "180px", width: '150px', paddingTop: '100PX', opacity:'0.60'}} ></img>
<p style={{fontSize:'13.5px', color:'black', opacity:'0.3'}} >
Create Courses</p></div> } 


{this.state.AlertMessageAss && <div style={{height: "80px", width: '400px', fontSize:"18px", fontWeight:'300', fontStyle:"normal" ,position:"absolute", left:  "25",top: "5%", backgroundColor:'#F6F7DF', border:'1px',
 paddingTop:'8px', borderRadius:'5%', zIndex:'10', textAlign:'center'}}><AiOutlineWarning size='1.2rem' /> &nbsp; &nbsp;{this.state.messageAlert}</div>}

 
{this.state.AlertMessageTeacher && <div style={{height: "80px", width: '400px', position:"absolute", left:  "25%",top: "5%", backgroundColor:'#F6F7DF', border:'1px',
 paddingTop:'8px', borderRadius:'5%', zIndex:'10'}}><AiOutlineWarning size='1.2rem' /> &nbsp; &nbsp;{this.state.messageAlert}</div>}
   
        </div>
      


      </div>


      <div className="col-lg-4  " >
        <div className="ContainerDivTables">
        <div className="GradeDivAss"> 
        
        {!this.state.AssFlag && <div><img alt='' src='/images/emptyCourses.png'  style={{height: "200px", width: '165px', paddingTop: '100PX', opacity:'0.60'}} ></img>
<p style={{fontSize:'13.5px', color:'black', opacity:'0.3'}} >
choose a teacher and assign courses</p></div> }
  
{this.state.AssFlag &&  <MaterialTable title="" 
      data = {this.state.ListAssPiv}
      columns={[ {title : 'idAssignment', field : 'idAssignment', hidden:true},
      
      {title : 'idTeacher', field : 'idTeacher', lookup:(()=>{
        const getLookUp=[]
           this.state.ListTeacher.forEach(item=>{
            getLookUp[item.idTeacher] = item.name + ' ' + item.surname

          })
         
         return getLookUp
         })(), 
      cellStyle: {
        backgroundColor: '#EEEEEE',
        color: '#090909'
      }
      
    },
      {title : 'idCourseLong', field : 'idCourseLong', lookup:(()=>{
        const getLookUp=[]
           this.state.ListCoursesAll.forEach(item=>{
            getLookUp[item.id_Course] = item.nameGrade + ' ' + item.nameLesson
            })
         return getLookUp
         })(),
      cellStyle: {
        backgroundColor: '#D1E1F0',
        color: '#090909'
      }
     }
    ]}
      options={{
        rowStyle: {
            fontSize: 13.5,
          },
        paging: false,
        headerStyle: {
          zIndex: 0,
          backgroundColor:'#DBA6A6'
        }, 
        header: false, 
        actionsCellStyle: {

            backgroundColor:'#F3F4F5'
        }
    }}

    editable={{
     
            
            onRowDelete: (rowData) =>
            new Promise((resolve) => this.DeleteRowAss(rowData,resolve))

        
        }}
         
      ></MaterialTable>
      }
   
    </div>
    {(()=>{
      
      switch (this.state.language) {
      
      case '0':
      
      return 'ödevler'
      
      
      case '1':
        return 'assignments'
       
      
        case '2':
          return 'asignaciones'
      
      
      case '3':
        return 'ödevler'
      
      
      
      default:
      
      }})()} 

        </div>
      


      </div>


    </div>
  



{/* ************************************* TEACHERS ****************************  */}
 






{/************************COURSES ASSIGNED TO TEACHER  *************                                   */}


    </div>}
</div>
);

}

                
DeleteRowCourse(rowData,Resolve){
  
 
 
  AutenticationServices.deleteCourse(rowData.id_Course, rowData.id_Course )
  .then(response => {
    const filtroPiv =this.state.ListCoursesPiv.filter(item=>item.id_Course!==rowData.id_Course)
    const filtro =this.state.ListCoursesAll.filter(item=>item.id_Course!==rowData.id_Course)
    const filtroAss = this.state.ListAss.filter(item=>item.idCourseLong!==rowData.id_Course)
    
    if(this.state.ListCoursesPiv.filter(item=>item.id_Course!==rowData.id_Course).length>0){
     
      this.setState({
        ListCoursesPiv:filtroPiv,
        ListCoursesAll:filtro,
        ListAss:filtroAss, 
        
        })
    }else{
      this.setState({
        ListCoursesPiv:filtroPiv,
        ListCoursesAll:filtro,
        ListAss:filtroAss, 
        CoursesFlag:false, 
        CoursesInAssFlag:false
        })
    }

   
  
  
  
  })
  .catch(error => {
      if (!error.response) {
         alert('ops... there is a problem... contact us')

      } else {
        alert('ops... there is a problem... contact us')
         }})
  Resolve()
                }
        
DeleteRowAss(rowData,Resolve){
  

  AutenticationServices.deleteAss(rowData.idAssignment)
  .then(response => {
  
    const filter = this.state.ListAss.filter(item=>item.idAssignment!==rowData.idAssignment)
    const filterPiv = this.state.ListAssPiv.filter(item=>item.idAssignment!==rowData.idAssignment)
    if(filterPiv.length>0){
      this.setState({
        ListAss:filter,
        ListAssPiv:filterPiv
      })
    }else{
      this.setState({
        ListAss:filter,
        ListAssPiv:filterPiv, 
        AssFlag:false
      })
    }
  
  
  
  })
  .catch(error => {
      if (!error.response) {
        
       
         // console.log( "this.state.codeLoginFailed> " + this.state.codeLoginFailed)
      } else {
        
         }})
  Resolve()
                }
        









AddnewRowCourse(newData, resolve){
  
  
  //validation
  let errorList = []
  let lookUpCourse =this.state.lookUpCoursesState
  if(newData.idGrade === undefined){
    errorList.push("Please enter Grade")
  }

  if(newData.idLesson === undefined){
    errorList.push("Please enter Lesson")
  }


 
if(errorList.length < 1){
 
 
    AutenticationServices.addNewCourse(newData.nameGrade,newData.nameLesson, newData.idGrade, newData.idLesson )
.then(response => {
let ListCoursePivot = [...this.state.ListCourses]

lookUpCourse[response.data.id_Course] = response.data.nameGrade + ' ' + response.data.nameLesson

ListCoursePivot.push(response.data)
  this.setState({
    ListCourses:ListCoursePivot,
      lookUpCoursesState:lookUpCourse
        })
resolve()
})
.catch(error => {
  if (!error.response) {
  
     alert(error)  
     // console.log( "this.state.codeLoginFailed> " + this.state.codeLoginFailed)
  } else {
    
   if(error.response.data.code === 404){
    alert("this course already exists") 

   }
     

     }
    
     resolve()
    })

      }else{
     
        alert(errorList[0])
        resolve()

      }

}





AddnewRowLesson(newData, resolve){
  
  
    //validation
    let errorList = []
    let lookUpLesson =this.state.lookupLessonState
    if(newData.description === undefined){
      errorList.push("Please enter Description")
    }

   
  if(errorList.length < 1){
  
      AutenticationServices.addNewLesson(newData.description, this.state.idSchool )
  .then(response => {
  let ListLessonPivot = [...this.state.ListLesson]

  lookUpLesson[response.data.id] = response.data.description
  
  ListLessonPivot.push(response.data)
    this.setState({
        ListLesson:ListLessonPivot,
        lookupLessonState:lookUpLesson
          })
  resolve()
  })
  .catch(error => {
    if (!error.response) {
      
       alert(error)  
       // console.log( "this.state.codeLoginFailed> " + this.state.codeLoginFailed)
    } else {
     
       if (error.response.data.code===404){
         alert("this Lesson already exists")
       }
  
       }
      
       resolve()
      })
  
        }else{
       
          alert(errorList[0])
          resolve()
  
        }
  
  }
  



 AddnewRow(newData, resolve){
  
  
  //validation
  let lookUpGrade =this.state.lookupGradesState
  let errorList = []
  if(newData.description === undefined){
    errorList.push("Please enter Category [Teacher, Tutor, or Administrator]")
  }

 
if(errorList.length < 1){

    AutenticationServices.addNewGrade(newData.description, this.state.idSchool )
.then(response => {
let ListGradesPivot = [...this.state.ListGrades]

lookUpGrade[response.data.idgrade]=response.data.description
ListGradesPivot.push(response.data)
  this.setState({
    ListGrades:ListGradesPivot,
    lookupGradesState:lookUpGrade
        })
resolve()
})
.catch(error => {
  if (!error.response) {
      
     alert(error)  
     // console.log( "this.state.codeLoginFailed> " + this.state.codeLoginFailed)
  } else {
  
     if (error.response.data.code===404){
      alert('this grade already exists') 
     }
    

     }
    
     resolve()
    })

      }else{
     
        alert(errorList[0])
        resolve()

      }

}



DeleteRowLesson(rowData,Resolve){
  let newLookUpLesson ={}
  let newLookUpCourses ={}
AutenticationServices.deleteLesson(rowData.id, rowData.id )
.then(response => {
//get the riwIndex to delete it
let coursesList = [...this.state.ListCourses]
let coursesDeleted = coursesList.filter(item => item.idLesson===rowData.id)
let CourseListPivot =[]
 CourseListPivot = coursesList.filter(item => item.idLesson!==rowData.id)

 CourseListPivot.forEach(item=>{ newLookUpCourses[item.id_Course] = item.nameGrade + ' ' + item.nameLesson})

const index = rowData.tableData.id
const ListLessonPivot = [...this.state.ListLesson] //use a pivot table to add the originalTable
ListLessonPivot.splice(index,1)  //delete in the pivot
//change the state of the original table
ListLessonPivot.forEach(item=>{
newLookUpLesson[item.id]=item.description
  })


  /* en esta seccion de codigo se elimina de la asignacion con el profesor */
  let ListAss =[...this.state.ListAss]
 
  coursesDeleted.forEach(item=> {
    ListAss = ListAss.filter(itemFilter=> itemFilter.idCourseLong!==item.id_Course)
    })

this.setState({
  ListLesson:ListLessonPivot,
  ListCourses:CourseListPivot,
  lookupLessonState:newLookUpLesson,
  ListAss:ListAss, 
  lookUpCoursesState:newLookUpCourses
      })



})
.catch(error => {
    if (!error.response) {
        
       // console.log( "this.state.codeLoginFailed> " + this.state.codeLoginFailed)
    } else {
      
       }})
Resolve()
        }


 DeleteRowGrade(rowData,Resolve){
  let newLookUpLesson ={}
  let newLookUpCourses ={}
  AutenticationServices.deleteGrade(rowData.idgrade, rowData.idgrade )
  .then(response => {
  //get the riwIndex to delete it
  let coursesList = [...this.state.ListCourses]
  let coursesDeleted = coursesList.filter(item => item.idGrade===rowData.idgrade)
   let CourseListPivot = coursesList.filter(item => item.idGrade!==rowData.idgrade)
     
     
   CourseListPivot.forEach(item=>{ newLookUpCourses[item.id_Course] = item.nameGrade + ' ' + item.nameLesson})
  
    
    const index = rowData.tableData.id
    const ListLessonPivot = [...this.state.ListGrades] //use a pivot table to add the originalTable
    ListLessonPivot.splice(index,1)  //delete in the pivot
    //change the state of the original table
    ListLessonPivot.forEach(item=>{
    newLookUpLesson[item.idgrade]=item.description
      })
    
      let ListAss =[...this.state.ListAss]
   
    coursesDeleted.forEach(item=> {
      ListAss = ListAss.filter(itemFilter=> itemFilter.idCourseLong!==item.id_Course)
      })
    
    this.setState({
      ListGrades:ListLessonPivot,
      ListCourses:CourseListPivot,
      lookupGradesState:newLookUpLesson,
    ListAss:ListAss, 
    lookUpCoursesState:newLookUpCourses
          })
  
  
  
  })
  .catch(error => {
      if (!error.response) {
       
         // console.log( "this.state.codeLoginFailed> " + this.state.codeLoginFailed)
      } else {
      
         }})
  Resolve()
                }
    
                



}




function UpAvatar(props) {
    const classes = useStyles();
   if(props.picture==="n"){
    return <Avatar  size={40} className = {classes.Lgreen}  >{props.name.substring(0, 1)}</Avatar>
          }else{
            return   <Avatar  size={40} src= {props.picture} className = {classes.Lgreen} ></Avatar>
            }
    
 }







export default withRouter(Courses)