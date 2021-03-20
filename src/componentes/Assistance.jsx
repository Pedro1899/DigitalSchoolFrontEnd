import React, {Component} from 'react';
import './Assistance.css'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AutenticationServices from './AutenticationServices.js'
//import { AiFillPhone, AiTwotoneMail } from "react-icons/ai";
import { withRouter } from 'react-router'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 80,
  },
}));


class Assistance extends Component{
constructor(proops){
super(proops);
this.state ={
time:null,
ListGrades:[],
ListCoursesAll:[],
ListCourses:[],
preDivGrade:null,
NoLessonFlag:false
}


this.handleChange = this.handleChange.bind(this)
this.handeChoosenCourse = this.handeChoosenCourse.bind(this)
}



componentDidMount(){

  //get all Grades in the school

  const schoolId = AutenticationServices.returnIdSchool();
  AutenticationServices.getGradeBySchool(schoolId)
  .then(response => {

  this.setState({
           ListGrades:response.data
  })
 

}).catch(error => {
if (!error.response) {

} else {
 }})


 AutenticationServices.getCourseBySchool(schoolId)
 .then(response => {
 this.setState({
       ListCoursesAll:response.data,
      })
   })
.catch(error => {
if (!error.response) {

} else {

}})

this.props.title('Our Schedual')


}


handeChoosenCourse(event){
 let previousDiv = this.state.preDivGrade

  if(previousDiv!==null){
    previousDiv.style.background='#BEECDD'
  }
  event.target.style.background='#F5CAA7  '
  this.setState({
    preDivGrade:event.target
  })


  if(this.state.ListCoursesAll.length>0){

  

    
    if(this.state.ListCoursesAll.filter(filter=>event.target.id===(filter.idGrade).toString()).length>0){
     
      this.setState({
        ListCourses :this.state.ListCoursesAll.filter(filter=>event.target.id===(filter.idGrade).toString()),
        NoLessonFlag:true
      })
    }else{
      this.setState({
        ListCourses :[],
        NoLessonFlag:false
      })
    }
  }


  
  

}



handleChange (event){

  this.setState({time: event.target.value }) 
}

handleDay(event){

  
  if(event.target.style.background==='rgb(75, 75, 75)'){
    event.target.style.background=''
    event.target.style.color=''
    event.target.style.opacity='0.6'
  }else{
    event.target.style.background='#4B4B4B'
    event.target.style.color='#F8F5F5 '
    event.target.style.opacity=''
    
  }

}

render(){return(
<div style={{position:'absolute', left:'80px', top:'10%', height:'650px', width:'90%'}}>
  <div style={{position:'relative',height:'100%', width:'100%',}}>
<div className='CourseContainer' >
 
<UpGrades ListGrades={this.state.ListGrades} handeChoosenCourse={this.handeChoosenCourse}></UpGrades>
</div>

<div className='CoursesLessonContainer' >
{/* <UpTimer time={this.state.time} handleChange={this.handleChange}></UpTimer>*/}
{!this.state.NoLessonFlag && <div><img src='/images/noActivity.png' alt='' style={{width:'140px', height:'140px', paddingTop:'140px'}}></img>
<p style={{opacity:'0.3'}}>Choose a grade with lessons </p> 
</div>}
{this.state.NoLessonFlag && <UpLessons ListCourses={this.state.ListCourses} time={this.state.time}  handleChange={this.handleChange} handleChangeDay={this.handleDay}></UpLessons>}

</div>


</div>
</div>


);

}

}

function UpGrades(props){

  return(
    props.ListGrades.map(item=>{
   return (<div  style={{width:'120px', height:'40px', paddingTop:'10px',
                       background:'#BEECDD', marginBottom:'15px',
                        borderRadius:'5%', cursor:'pointer'}} 
                        
                key={item.idgrade} id={item.idgrade} onClick={props.handeChoosenCourse} >{item.description}</div>)
    })
  )

}

function UpLessons(props){

  return(
    props.ListCourses.map(item=>{
   return (<div  style={{width:'90%', height:'55px', paddingTop:'7px', marginLeft:'5%', 
                        marginBottom:'15px',
                        borderBottom:'1px solid', marginTop:'5%',  borderColor:'#E1E1E1'}} 
                        
                key={item.id_Course} id={item.id_Course} onClick={props.handeChoosenCourse}  >
                  <div style={{position:'relative', with:'100%', height:'100%'}}>
                    <div style={{position:'absolute', left:'2%',  with:'14%', top:'10%', fontSize:'20px', padding:'18px'}}>
                    {item.nameLesson}
                    </div>
                    <div style={{position:'absolute', left:'18%', with:'12%', top:'0%', opacity:'0.6' }}>
                    <UpTimer
                    id={item.id_Course} description='Start' handleChange={props.handleChange} time={props.time}
                    ></UpTimer>
                
                    </div>

                    <div style={{position:'absolute', left:'40%', with:'12%', top:'0%', opacity:'0.6' }}>
                    <UpTimer
                    id={item.id_Course} description='Finish' handleChange={props.handleChange} time={props.time}
                    ></UpTimer>
                </div>

                <div id={'PZT'+item.id_Course } name='name'  onClick={props.handleChangeDay} style={{position:'absolute', left:'60%', top:'20%', with:'50px', height:'20px',padding:'8px', opacity:'0.6',
                             borderRadius:'10%', fontSize:'12px',cursor:'pointer', border:'1px solid' }}>
                  PZT
                   
                </div>
                <div id={'SAL'+item.id_Course } onClick={props.handleChangeDay} style={{position:'absolute', left:'68%', top:'20%', with:'50px', height:'20px',padding:'8px', opacity:'0.6',
                             borderRadius:'10%', fontSize:'12px',cursor:'pointer', border:'1px solid' }}>
                  SAL
                </div>

                <div id={'CAR'+item.id_Course } onClick={props.handleChangeDay} style={{position:'absolute', left:'76%', top:'20%', with:'50px', height:'20px',padding:'8px', opacity:'0.6',
                             borderRadius:'10%', fontSize:'12px',cursor:'pointer', border:'1px solid' }}>
                  ÇAR
                </div>

                <div id={'PER'+item.id_Course } onClick={props.handleChangeDay} style={{position:'absolute', left:'84%', top:'20%', with:'50px', height:'20px',padding:'8px', opacity:'0.6',
                             borderRadius:'10%', fontSize:'12px',cursor:'pointer', border:'1px solid' }}>
                  PER
                </div>

                <div id={'CUM'+item.id_Course } onClick={props.handleChangeDay} style={{position:'absolute', left:'92%', top:'20%', with:'50px', height:'20px',padding:'8px', opacity:'0.6',
                             borderRadius:'10%', fontSize:'12px',cursor:'pointer', border:'1px solid' }}>
                  CUM
                </div>

            

                  </div>
                 
                  
                  </div>)
    })
  )
}


function UpTimer(props){
  const classes = useStyles();
  return( <form className={classes.container} noValidate>
    <TextField
      id={props.id}
      label={props.description}
      type="time"
     
      className={classes.textField}
    value={props.getTime}
      onChange = {props.handleChange}
      InputLabelProps={{
        shrink: true,
      }}
      inputProps={{
        step: 300, // 5 min
      }}
    />
  </form>)
 
}


export default withRouter(Assistance)