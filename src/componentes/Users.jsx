import React, {Component} from 'react';
import './Users.css'


//import { AiFillPhone, AiTwotoneMail } from "react-icons/ai";
import { withRouter } from 'react-router'
import MaterialTable from 'material-table'
import Avatar from '@material-ui/core/avatar'
import {FaExchangeAlt} from 'react-icons/fa'

import { makeStyles } from '@material-ui/core/styles';
import AutenticationServices from './AutenticationServices.js';
import { green, red, lightBlue } from '@material-ui/core/colors';


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
      width: theme.spacing(7.5),
        height: theme.spacing(7.5),
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
  

class Users extends Component{
constructor(props){
super(props);

var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();


this.state ={
   ListUserDetail: [],
   ListUsersTeacher:[],
   ListUsersTutor:[],
   ShowColumns:[],
   idSchool: 0,
   showTableUser:true, 
   picture: '',
   ListCourses :[],
   dateToday: '',
   titlePanel: 'Teachers and Admins',
   panelStatus:1
   }

this.setState({
  dateToday:date

})



}

componentDidMount(){
  const schoolId = AutenticationServices.returnIdSchool();
  const Language = AutenticationServices.returnIdLanguage();
AutenticationServices.getAllUserById(schoolId)
.then(response => {
 const getTeachers = response.data.filter(item => item.category!==2)
 const getTutor = response.data.filter(item => item.category===2)
this.setState({
  ListUsersTeacher:getTeachers,
  ListUsersTutor:getTutor,
  ListUserDetail:getTeachers
})
   
})
.catch(error => {
    if (!error.response) {
    
       // console.log( "this.state.codeLoginFailed> " + this.state.codeLoginFailed)
    } else {
       
       }})
    
const columnsHidden =[
    {title: " ", render: rowData => <UpAvatar category ={rowData.category} name={rowData.name} sname={rowData.surname} picture={rowData.picture} ></UpAvatar>},
    {title : 'Category', field : 'category',lookup: { 1: 'Teacher', 2: 'Tutor', 3: 'Administrator'  }}, {title : 'Name', field : 'name'}, {title : 'Surname', field : 'surname'},
    {title : 'User', field : 'username'},{title : 'Phone', field : 'phone', hidden:true}, {title : 'Email', field : 'email'},
    {title : 'Address', field : 'address', hidden:true},{title : 'id', field : 'idTeacher_Tutor', hidden:true},
    {title : 'idUser', field : 'idUser', hidden:true}, {title : 'Picture', field : 'picture', hidden:true},
    {title : 'Courses', field : 'courses', hidden:true}, {title : 'factivity', field : 'factivity', hidden:true},
    {title : 'childrens', field : 'childrens', hidden:true}, {title : 'flagChildren', field : 'flagChildren', hidden:true}
    
    

    
]





this.setState({
ShowColumns:columnsHidden,
idSchool:schoolId
    })

    
    const getTitle =<UpLanguage turkish='yeni kullanıcı' english='A new user' 
    spanish='Nuevo Usuario' greek='Κατηγορία αποτελεσμάτων' 
    currentLanguage={Language}  />
    
this.props.title(getTitle)

this.changeTableState =this.changeTableState.bind(this)
}

changeTableState(){

if (this.state.panelStatus===1){
 const getTutor = this.state.ListUsersTutor 
this.setState({
  ListUserDetail:getTutor,
  titlePanel:'Tutors',
  panelStatus:2
})
}else{
  const getTeacher = this.state.ListUsersTeacher
  this.setState({
    ListUserDetail:getTeacher,
    titlePanel:'Teachers and Admins',
    panelStatus:1
  })

}

}

render(){
  
 
  return(
<div className = "PanelUsers" >
  <div className="containerPanel">
    <div className="navPanelUsers">
      <div className="ContainerNavPanel">
  <div className="shiftTutorUser" onClick={this.changeTableState}><FaExchangeAlt  ></FaExchangeAlt></div>
  <div className="TitleNavTutorUser" >{this.state.titlePanel}</div>
      </div>
    </div>
    <div className="UsersTeacher">
    <MaterialTable title="" 
        data = {this.state.ListUserDetail}
        columns ={[{title: " ", render: rowData => <UpAvatar category ={rowData.category} name={rowData.name} sname={rowData.surname} picture={rowData.picture} ></UpAvatar>},
        {title : 'Category', field : 'category',lookup: { 1: 'Teacher', 2: 'Tutor', 3: 'Administrator'  }}, {title : 'Name', field : 'name'}, {title : 'Surname', field : 'surname'},
        {title : 'User', field : 'username'},{title : 'Phone', field : 'phone', hidden:true}, {title : 'Email', field : 'email'},
        {title : 'Address', field : 'address', hidden:true},{title : 'id', field : 'idTeacher_Tutor', hidden:true},
        {title : 'idUser', field : 'idUser', hidden:true}, {title : 'Picture', field : 'picture', hidden:true},
        {title : 'Courses', field : 'courses', hidden:true}, {title : 'factivity', field : 'factivity', hidden:true},
        {title : 'childrens', field : 'childrens', hidden:true}, {title : 'flagChildren', field : 'flagChildren', hidden:true}]}
          options={{
            paging: false,
            headerStyle: {
              zIndex: 0,
              Height: 50
            }
                   }}
           

          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                this.AddnewRow(newData,resolve)
                }),
                        
                        
                onRowDelete: (rowData) =>
                  new Promise((resolve) => this.DeleteRow(rowData,resolve)),
                     }}


                  detailPanel={rowData => this.detailsRow(rowData)}
                  onRowClick={(event, rowData, togglePanel) => togglePanel()}

        ></MaterialTable>

    </div>
   </div>

</div>
);

}




detailsRow(rowData){


  
if(rowData.category ===1 ||rowData.category ===3 ) {

  return (
    <div className='detailPanel'>
        <div className='detailPanelRow'>
     
     
      {/*DetailPanelRowCellPicture contains the picture and the name of the user */}

           <div className='detailPanelRowCellPicture'>
              <div className='DivPicturePanelDetail'>  
               <UpAvatar picture= {rowData.picture} category={4} name={rowData.name}></UpAvatar> 
               
              </div>
              <div className='DivNameInfoPanelDetail'> {rowData.name}&nbsp;{rowData.surname}</div> 
           </div>

      {/*  ************************************************************************* */}

{/*Class Detail PanelRow Cell Courses contains the title 'Courses' and the courses of the profesor */}

                          <div className='detailPanelRowCellCourses'>

            <div className='titleCourseCell'> COURSES    </div>

  <div className='DetailCoursesCell'>
{
rowData.courses.map( data => {
  return(<p >{data.nameLesson +  '  with  ' + data.nameGrade}</p>)})
}

{(() => {
        if (rowData.courses.length>0) {
          rowData.courses.map( data => {
            return(<p >{data.nameLesson +  '  with  ' + data.nameGrade}</p>)})
        }else{
          return(<div  ><img alt=''  style={{height: "130px", width: '130px'}} src= "/images/notFound.png" ></img>
          <p>no courses found</p></div>)
        }
      })()}
      
  </div>
          </div>

        {/*   A    C   T   I   V  I   T  I  E  S   */}

        <div className='detailPanelRowCellActivities'>
        <div className='titleCourseCell'> ACTIVITIES </div>
        <br></br>
  <div className='DetailActivityCell'> 
  {
    (()=>{
if(rowData.flagActivity===false){
  return(<div><img alt='' style={{height: "130px", width: '130px'}} src= "/images/notFound.png" ></img>
  <p>no activities found</p></div>)

}else{

 return(

  rowData.courses.map(courses => {
    return (
      <div>
        {
          (()=>{
            if(courses.activityDetail.length>0){
             return (
      <div>
        <div className="CourseActivity" >  {courses.nameLesson + '  ' + courses.nameGrade }</div>
        <p />
        
        {
          courses.activityDetail.map(item => {
            return(
              <div>
              <div className="itemActivityRow">
                   <div className="itemActivityRowPicture">
                      <img  alt='' style={{height: "135px", width: '320px'}} src= {item.activityfoto} ></img>
                    </div>
            <div className="itemActivityRowInformation">
                <p className="titleActivity">{item.activityDescription}</p>
                <p>Category:  {item.activityCategory}</p>
                <p>Date: {item.activityDate}</p>
               
                    </div>
                 
                    <br></br>
                    <br></br>
                </div>
                 <br></br>
                  <br></br>
                
                </div>)
          })}</div>)}})()}
      </div>)}))}})()}

   </div></div></div></div>
  )


}
else{

  return (
   <div className='detailPanelStudent'>
   <div className='detailPanelRow'>


{/*DetailPanelRowCellPicture contains the picture and the name of the user */}

     <div className='detailPanelRowCellPicture'>
        <div className='DivPicturePanelDetail'>  
         <UpAvatar picture= {rowData.picture} category={4} name={rowData.name}></UpAvatar> 
         
        </div>
        <div className='DivNameInfoPanelDetail'> {rowData.name}&nbsp;{rowData.surname}</div> 
     </div>



  <div className='detailPanelRowCellChildren'>

            <div className='titleCourseCell'> students    </div>
  
            <div className='DetailStudentCell'>
            {(()=>{
              
              

                    if(rowData.flagChildren === true){

                          return(

                            rowData.childrens.map(item => 
                             {return(
                              <div>
                              <div className="itemActivityRow">
                                   <div className="itemAvatarStudent">
                                      <UpAvatar  picture= {item.picture} category={5} name={item.name} ></UpAvatar>
                                    </div>
                            <div className="itemStudentRowInformation">
                                <p className="titleStudent">{item.name + "  " + item.surname}</p>
                                <p>ID:  {item.id}</p>
                                <p>Grade: {item.grade}</p>
                               
                                    </div>
                                    </div>
                                 
                                  <br></br>
                                  <br></br>
                                  
                                
                                </div>
                            )} 
                              )

                          )
                    }else{
                        return(<div><img alt='' style={{height: "130px", width: '130px'}} src= "/images/notFound.png" ></img>
                        <p>no student found</p></div>)

                    }

            }
            
            
            )()}


            </div>

  </div>
     </div>
     </div>
   
)

}



 

}




 AddnewRow(newData, resolve){
  
  
  //validation
  let errorList = []
  if(newData.category === undefined){
    errorList.push("Please enter Category [Teacher, Tutor, or Administrator]")
  }

  if(newData.name === undefined){
    errorList.push("Please enter name")
  }
  if(newData.surname === undefined){
    errorList.push("Please enter surname")
  }
  if(newData.username === undefined){
    errorList.push("Please enter username")
  }

  if(newData.email === undefined ){
    errorList.push("Please enter a valid email")
  }



if(errorList.length < 1){

const picture = 'n'
  AutenticationServices.addNewUser(this.state.idSchool,newData.name,newData.surname,newData.username,newData.username,newData.category,newData.email,picture)
.then(response => {
  let ListUserDetailPivot = [...this.state.ListUserDetail]


  ListUserDetailPivot.push(response.data)
  this.setState({
    ListUserDetail:ListUserDetailPivot
        })
resolve()
})
.catch(error => {
  if (!error.response) {
     
     alert(error)  
     // console.log( "this.state.codeLoginFailed> " + this.state.codeLoginFailed)
  } else {
     
     alert(error) 

     }
    
     resolve()
    })

      }else{
     
        alert(errorList[0])
        resolve()

      }

}



DeleteRow(rowData,Resolve){
AutenticationServices.deleteUser(rowData.idUser, rowData.idTeacher_Tutor, rowData.category )
.then(response => {
//get the riwIndex to delete it
const index = rowData.tableData.id
const ListUserDetailPivot = [...this.state.ListUserDetail] //use a pivot table to add the originalTable
ListUserDetailPivot.splice(index,1)  //delete in the pivot
//change the state of the original table
this.setState({
  ListUserDetail:ListUserDetailPivot
      })
})
.catch(error => {
    if (!error.response) {
    
       // console.log( "this.state.codeLoginFailed> " + this.state.codeLoginFailed)
    } else {
       console.log("codigo de error " + error.response.data.code)
       }})
Resolve()
        }


}




function UpAvatar(props) {
    const classes = useStyles();
    
    switch(props.category){

        case 1:
          if(props.picture==='n'  ){
    return <Avatar  size={40} className = {classes.Lgreen}  >{props.name.substring(0, 1)}</Avatar>
          }else{
            return   <Avatar  size={40} src= {props.picture} className = {classes.Lgreen} ></Avatar>
            }
        case 2:
          if(props.picture==='n' ){
            return <Avatar  size={40} className = {classes.red}  >{props.name.substring(0, 1)}</Avatar>
          }else{
            return   <Avatar  size={40} src= {props.picture}  className = {classes.red} ></Avatar>
            }
        case 3:
          if(props.picture==='n'  ){
            return <Avatar  size={40}  className = {classes.Lblue}  >{props.name.substring(0, 1)}</Avatar>
          }else{
            return   <Avatar  size={40} src= {props.picture}  className = {classes.Lblue} ></Avatar>
            }
        case 4:
          if(props.picture==='n' ){
                return   <Avatar  size={40} className = {classes.large}    ></Avatar>
            }else{
                return   <Avatar  size={40} className = {classes.large} src= {props.picture}   >{props.name.substring(0, 1)}</Avatar>

            }

            case 5:
              if(props.picture==='n' ){
                  return   <Avatar  size={40} className = {classes.medium}    ></Avatar>
              }else{
                  return   <Avatar  size={40} className = {classes.medium} src= {props.picture}   ></Avatar>
  
              }

            default: return    <Avatar  size={40} className = {classes.medium}    ></Avatar>
        
    }
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






export default withRouter(Users)