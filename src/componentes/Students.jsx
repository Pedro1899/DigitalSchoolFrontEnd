import React, {Component} from 'react';
import './Students.css'

import { withRouter } from 'react-router'
import {BsCloudUpload} from 'react-icons/bs'
import {AiOutlineRightCircle, AiOutlineLeftCircle, AiOutlineRollback} from 'react-icons/ai'
import {GrConfigure} from 'react-icons/gr'


import {FaExchangeAlt} from 'react-icons/fa'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import { makeStyles } from '@material-ui/core/styles';
import AutenticationServices from './AutenticationServices.js';
import MaterialTable from 'material-table'
import Avatar from '@material-ui/core/avatar'
import { green, red, lightBlue, deepPurple, yellow } from '@material-ui/core/colors';



import Config from './configStudent'
import ShiftStudent from './shiftStudentGrade'

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
    Lgreen: {
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
        width: theme.spacing(6.5),
          height: theme.spacing(6.5),
      },
      purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
        width: theme.spacing(9),
          height: theme.spacing(9),
      },
      red: {
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
        width: theme.spacing(6.5),
          height: theme.spacing(6.5),
      },

      yellow: {
        color: theme.palette.getContrastText(yellow[500]),
        backgroundColor: yellow[500],
        width: theme.spacing(6.5),
          height: theme.spacing(6.5),
      },
      Lblue: {
          color: theme.palette.getContrastText(lightBlue[500]),
          backgroundColor: lightBlue[500],
          width: theme.spacing(6.5),
          height: theme.spacing(6.5),
        },

      large: {
        width: theme.spacing(24),
        height: theme.spacing(24),
      }, 
      medium: {
        width: theme.spacing(15),
        height: theme.spacing(15),
      }, 
      formControl: {
        margin: theme.spacing(1),
        minWidth: 160,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
      alert: {
        width: '120px',
        height:'20px',
        fontSize:'20px'
      }
      
  }));
  

class Students extends Component{
constructor(proops){
super(proops);
this.state ={
newStudent : true,
picture : '/images/newUser.jpg',
file:null,
loadingPicture:false, 
hideNext:true, 
alreadyUpdate:false, 
//form to add new Student
ID:'',
name:'',
surname:'',
Bday:null,
selectedDay:undefined,
//flags to change the view of the form (add Grade and tutor)
steepOneAddNew:true,
steepTwoAddNew:false,
showAllStudentPanel:false, 

//form second steep 
lookUpCoursesState:{},
idSchool:'',
ListGrades:[], 
CollumnsGrades:[], 
ListTutor:[],
CollumnsTutor:[],
selectionGrade:null, 
selectionTutor:null,
gradeSelected:null,
tutorSelected:null, 
success:false, 

//students
showPanelStudents:false, 
getGradeLookUP:'3yAS',
ListStudents:[],
flagStudents:false,


//variables used to show error message
alertId:false,
alertName:false,
alertSurname:false,
alertDate:false,
messageId:'',
alertPicture:false,

//show information over
helpMouseOverUploadPicture:false,
helpMouseOverAllStudents:false,
helpMouseOverNewStudent:false,

}
this.Handleİnpt = this.Handleİnpt.bind(this)
this.fileSelectedHandler = this.fileSelectedHandler.bind(this)
this.NextSteep =this.NextSteep.bind(this)
this.goBack = this.goBack.bind(this)
this.Save = this.Save.bind(this)

this.previewPicture = this.previewPicture.bind(this)
this.uploadPicture = this.uploadPicture.bind(this)

this.handleDayChange = this.handleDayChange.bind(this);
}


componentDidMount(){
  const Language = AutenticationServices.returnIdLanguage();
  const schoolId = AutenticationServices.returnIdSchool();
  this.setState({
      idSchool:schoolId
  })
//get all courses in the School
AutenticationServices.getGradeBySchool(schoolId)
.then(response => {
   
         
        this.setState({
         ListGrades:response.data
})
})
.catch(error => {
if (!error.response) {
  
} else {

}})

//get all tutors
AutenticationServices.getAllTutorbySchool(schoolId)
.then(response => {
   
        
        this.setState({
            ListTutor:response.data
})
})
.catch(error => {
if (!error.response) {
   

} else {

}})


const GradeCollumn =[
    {title : 'idgrade', field : 'idgrade', hidden:true}, {title : 'grade', field : 'description'}]

      const tutorCollumn =[
        {title : 'idTeacher', field : 'idTeacher', hidden:true},
        {title: " ", render: rowData => <UpAvatar category ={3} name={rowData.name}  picture={rowData.picture} ></UpAvatar>},
         {title : 'name', field : 'name', hidden:true},{title : 'surname', field : 'surname'},
         {title : 'picture', field : 'picture', hidden:true}
      ]
      
      this.setState({
          CollumnsGrades:GradeCollumn,
          CollumnsTutor:tutorCollumn
        })
        const getTitle =<UpLanguage turkish='öğrenci yönetimi' english='Student manager' 
        spanish='Manejo de estudiantes' greek='Κατηγορία αποτελεσμάτων' 
        currentLanguage={Language}  />
        
this.props.title(getTitle);

    }



fileSelectedHandler(event){
   const file = event.target.files[0]
  this.setState({
    file: file
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

NextSteep(){

  if((!this.state.ID.match(/^[0-9]+$/)) || (this.state.ID==='') ){
  this.setState({
  alertId:true,
  messageId:'not valid [123]'
  })
  setTimeout(
  () => { this.setState({
    alertId:false,
    messageId:''
    })},
  3500
  );

  }else if((!this.state.name.match(/^[a-zA-ZüğşçöĞŞÇÖİÜı]+$/)) || (this.state.name==='') ) {
    this.setState({
      alertName:true,
      })

      
  setTimeout(
    () => { this.setState({
    alertName:false
      })}
   ,
    3500
  );
    
    }else if((!this.state.surname.match(/^[a-zA-ZüğşçöĞŞÇÖİÜı]+$/))|| (this.state.surname==='') ){
      
      this.setState({
        alertSurname:true,
      })

      setTimeout(
        () => { this.setState({
          alertSurname:false
          })}
       ,
        3500
      );
    }else if(this.state.Bday===null) {
     
      this.setState({
        alertDate:true,
      })

      setTimeout(
        () => { this.setState({
          alertDate:false
          })}
       ,
        3500
      );

    }else{

    if(this.state.file!==null && this.state.alreadyUpdate ===false){
      this.setState({loadingPicture:true, 
      hideNext:false})

    this.uploadPicture(this.state.picture)
  }else{

    this.setState({
      steepTwoAddNew:true,
      steepOneAddNew:false,
     })
  }


    }




}

async uploadPicture  (base64EncodedImage){
 
  try {
    this.callApi(base64EncodedImage)
    .then(res => { this.setState({
      steepTwoAddNew:true,
      steepOneAddNew:false,
      loadingPicture:false, 
      hideNext:true,
      file:res.message, 
      alreadyUpdate:true
  })
})
    .catch(err => {
     
      this.setState({
        loadingPicture:false, 
        hideNext:true,
        file:null, 
        
        alertPicture:true,
        picture : '/images/newUser.jpg',
    })
    
    setTimeout(
      () => { this.setState({
        
        alertPicture:false,
        })}
     ,
        2500
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

goBack(){
this.setState({
        steepTwoAddNew:false,
        steepOneAddNew:true
    })  
}

Save(){
if(this.state.gradeSelected === null || this.state.tutorSelected === null ){

    alert('please select a grade and tutor')
}else{
  const formData = new FormData();
formData.append('Id',this.state.ID );
formData.append('name', this.state.name);
formData.append('surname', this.state.surname);
formData.append('birthday', this.state.Bday.toLocaleDateString());
formData.append('photo', this.state.file);
formData.append('idTutor', this.state.tutorSelected);
formData.append('idGrade', this.state.gradeSelected);

AutenticationServices.newStudent(formData)
.then(response => {
   
  this.setState({
  success:true})

  setTimeout(
    () => { this.setState({
      selectionGrade:null, 
      selectionTutor:null,
      gradeSelected:null,
      tutorSelected:null, 
      ID:'',
      name:'',
      surname:'',
      date:'',
      steepOneAddNew:true,
      steepTwoAddNew:false,
      success:false, 
      file:null,
      picture: '/images/newUser.jpg', 
      alreadyUpdate:false, 
      Bday:null

      })}
   ,
    1900
  );

         
        
})
.catch(error => {
if (!error.response) {


alert("internal error server")
this.setState({
selectionGrade:null, 
selectionTutor:null,
gradeSelected:null,
tutorSelected:null, 
ID:'',
name:'',
surname:'',
date:'',
steepOneAddNew:true,
steepTwoAddNew:false,
})
} else {

if(error.response.status===404){
  this.setState({
    alertId:true,
    messageId:'id already exist', 
    steepOneAddNew:true,
steepTwoAddNew:false,
    })
    this.goBack()
    setTimeout(
    () => { this.setState({
      alertId:false,
      messageId:''
      })}
    ,
    3000
    );
  
}
 

}})
}
   
}


changeSelectionGrade(RowData){


    this.setState({
        selectionGrade:RowData.tableData.id, 
        gradeSelected:RowData.idgrade
    })

 
}

changeSelectionTutor(RowData){

    this.setState({
        selectionTutor:RowData.tableData.id, 
        tutorSelected:RowData.idTeacher
    })
}


render(){return(

<div className="PanelStudents">
  <div className="conteinerPanels">
    {/*                    Create a student                      */}
 {this.state.steepOneAddNew && <div className="newStudent">
     <div className="conteinerNewStudent">
     <div className="container">
       <div className="row">
         <div className="col-lg-12">

                    <div className="ConfigStudentButton"
onClick={()=>{this.setState({ steepOneAddNew:false, helpMouseOverAllStudents:false, ChangeStudent:true})}}
>
  
   <GrConfigure size="1.3rem"></GrConfigure></div>
 {this.state.helpMouseOverAllStudents && <div className="divShiftHelp">all students</div>}

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
                
  <div className="newId">ID<input className="textBoxStudent"  type="text" id="id" name="ID"  value ={this.state.ID} onChange={this.Handleİnpt}  /></div>
   </div>
   
  </div>
</div>


<div className="row pt-2">
  <div className="col-lg-12 ">
  <div className="centerBlock">
                
  <div className="newName">Name<input className="textBoxStudent"  id="uname" name="name" type='text' value={this.state.name} onChange={this.Handleİnpt} /></div>
   </div>
   
  </div>
</div>
<div className="row pt-2">
  <div className="col-lg-12 ">
  <div className="centerBlock">
                
  <div className="newSurname">Surname<input className="textBoxStudent"  id="usname" name="surname" type='text' value={this.state.surname} onChange={this.Handleİnpt}></input></div>
   </div>
   
  </div>
</div>

<div className="row pt-2">
  <div className="col-lg-12 " >
  <div className="centerBlock">
                
  <div className="newDate">Birth Day  <Calendar Bday={this.state.Bday} changeDate={this.handleDayChange}  />{/*<input className="textBoxStudent" id="udate" name="date"  type='text' value={this.state.date} onChange={this.Handleİnpt}></input><DayPickerInput onDayChange={this.handleDayChange} /> */} </div>
   </div>
</div>
</div>


<div className="row pt-0">
  <div className="col-lg-12" >
  
  {this.state.hideNext &&  <div className="next" onClick={this.NextSteep}><AiOutlineRightCircle size="2rem" style={{float:'right'}} ></AiOutlineRightCircle></div>} 
  {this.state.loadingPicture && <UpAvatarLoad  picture='/images/loading.gif' ></UpAvatarLoad> }
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
             {this.state.helpMouseOverUploadPicture && <div className="DivUploadHelp">choose a picture</div>}
           

{this.state.alertId && <div className="MessageAlertId">{this.state.messageId}</div> }

       
        {this.state.alertName && <div className="MessageAlertName">Not valid [Saray]</div> }
      
        {this.state.alertSurname && <div className="MessageAlertSurname">Not valid [Sincal]</div> }
        
        {this.state.alertDate && <div className="MessageAlertSurBday">Not valid [date]</div> }

                               
       
     </div>
     </div>}

 {this.state.steepTwoAddNew && <div className="newStudentTwo" >
     
   <div className="container">
     <div className="row">
       <div className="col-lg-12">
         <div className="container">
           <div className="row">
             <div className="col-lg-6 col-12 ">
               <div className="GDiv">
  <div className="titleSteepTwoGrade"> Choose a grade
 </div> 
 <div className = "GradesMaterialTable">
    <MaterialTable title="" 
        data = {this.state.ListGrades}
        columns ={this.state.CollumnsGrades}
       

       
        options={{
          rowStyle: rowData => ({
            backgroundColor: (this.state.selectionGrade === rowData.tableData.id) ? '#FB9182' : '#BEECDD',
            fontSize: 11
          }),
          paging: false,
            header: false, 
        }}
        onRowClick={((evt, selectedRow) => this.changeSelectionGrade(selectedRow))}
            
        ></MaterialTable>
        </div>
               </div>
        
            
             </div>
             <div className="col-lg-6 col-12 ">
          <div className="TutorDiv">
                     <div className="titleSteepTwoGrade"> Choose a tutor
 </div>
<div className = "GradesMaterialTable">
    <MaterialTable title="" 
        data = {this.state.ListTutor}
        columns ={
        [{title : 'idTeacher', field : 'idTeacher', hidden:true},
        {title: " ", render: rowData => <UpAvatar category ={3} name={rowData.name}  picture={rowData.picture} ></UpAvatar>},
         {title : 'name', field : 'name'},{title : 'surname', field : 'surname'},
         {title : 'picture', field : 'picture', hidden:true}]           
        }
         
        options={{
            rowStyle: rowData => ({
              backgroundColor: (this.state.selectionTutor === rowData.tableData.id) ? '#FB9182' : '',
              fontSize: 11
            }),
            paging: false,
              header: false, 
          }}
          onRowClick={((evt, selectedRow) => this.changeSelectionTutor(selectedRow))}
            
        ></MaterialTable>

        
</div>
          </div>

    
             </div>

           </div>

         </div>
       </div>
     </div>
   </div>
   
   


<div className="goBack" onClick={this.goBack} ><AiOutlineLeftCircle size = "2rem"  ></AiOutlineLeftCircle></div>
<div className="SaveUser"   ><button className="SaveButton" onClick={this.Save}>GO!</button></div>
 {this.state.success && <div className="StudentSaved"> <UpAvatar category ={1} picture='/images/source.gif' ></UpAvatar> </div>}
   
     
        
     </div>
     }

 


    {this.state.ChangeStudent &&<div style={{position:'absolute', left:'3%', top:'0%', width:'90%', height:'99%'}}>
      <div style={{position:'relative', height:'100%', width:'100%'}}>
<div onClick={()=>{this.setState({ChangeStudent:false,steepOneAddNew:true })}}  style={{position:'absolute', left:'2%', top:'6%', cursor:'pointer'}}  ><AiOutlineRollback size='1.3rem'></AiOutlineRollback></div>
<div onClick={()=>{this.setState({ChangeStudent:false,shiftStudent:true })}} style={{position:'absolute', left:'2%', top:'14%', cursor:'pointer'}}  ><FaExchangeAlt size='1.3rem'></FaExchangeAlt></div>
<div  style={{position:'absolute', left:'4%', top:'0%', width:'95%', height:'98%' }}   >
<Config></Config>
</div>
     
      </div>
      
      </div>  }

      {this.state.shiftStudent &&<div style={{position:'absolute', left:'3%', top:'0%', width:'90%', height:'99%'}}>
      <div style={{position:'relative', height:'100%', width:'100%'}}>
<div onClick={()=>{this.setState({shiftStudent:false,steepOneAddNew:true })}}  style={{position:'absolute', left:'2%', top:'6%', cursor:'pointer'}}  ><AiOutlineRollback size='1.3rem'></AiOutlineRollback></div>
<div onClick={()=>{this.setState({shiftStudent:false,ChangeStudent:true })}} style={{position:'absolute', left:'2%', top:'14%', cursor:'pointer'}}  ><FaExchangeAlt size='1.3rem'></FaExchangeAlt></div>
<div  style={{position:'absolute', left:'4%', top:'0%', width:'95%', height:'98%' }}   >
<ShiftStudent></ShiftStudent>
</div>
     
      </div>
      
      </div>  }
 </div>  

  
</div>

);

}


Handleİnpt(event){
    this.setState({
[event.target.name]: event.target.value
    })
   }

   handleDayChange(date) {

    this.setState({ Bday: date });
   
  }

}

function UpAvatar(props) {
    const classes = useStyles();

    switch(props.category){

      //preview New User
        case 1:
            return   <Avatar  size={40} src= {props.picture} className = {classes.large} ></Avatar>
      //students
        case 2:
          if(props.picture==='n' ){
            return <Avatar  size={40} className = {classes.purple}  >{props.name.substring(0, 1).toUpperCase()}</Avatar>
          }else{
            return   <Avatar  size={40} src= {props.picture}  className = {classes.purple} ></Avatar>
            }
        //tutors
        case 3:
            if(props.picture==='n'  ){
                return <Avatar  size={40} className = {classes.red}  >{props.name.substring(0, 1).toUpperCase()}</Avatar>
                      }else{
                        return   <Avatar  size={40} src= {props.picture} className = {classes.Lgreen} ></Avatar>
                        }
//loading avatar

case 4:
  return   <Avatar  size={40} src= {props.picture} className = {classes.icono} ></Avatar>
default:  return   <Avatar  size={40}  className = {classes.large} ></Avatar>

}

        



 }

 function UpAvatarLoad(props) {
  const classes = useStyles();


          return   <Avatar  size={40} src= {props.picture} className = {classes.icono} style={{float:'right'}}></Avatar>
    //students
     
      



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


function Calendar(props){

    const years =["2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020"];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    return (
      <DatePicker
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled
        }) => (
          <div
            style={{
              margin: 10,
              display: "flex",
              justifyContent: "center"
            }}
          >
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              {"<"}
            </button>
            <select
              value={years[date.getYear()]}
              onChange={({ target: { value } }) => changeYear(value)}
            >
              {years.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
  
            <select
              value={months[date.getMonth]}
              onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
              }
            >
              {months.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
  
            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              {">"}
            </button>
          </div>
        )}
        selected={props.Bday}
        onChange={props.changeDate}
      />
    );
  
}

export default withRouter(Students)