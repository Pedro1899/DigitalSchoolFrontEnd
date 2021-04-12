import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import {  AiFillHome,AiOutlineCarryOut } from "react-icons/ai";

import { BsGraphUp, BsCalendar,BsBook } from "react-icons/bs";
import { FaGraduationCap, FaUserCog, FaSchool} from "react-icons/fa";


import 'bootstrap/dist/css/bootstrap.min.css';

import Assistance from './Assistance'
import Results from './Results'
import AutenticationServices from './AutenticationServices.js';
import Courses from './Courses'
import Students from './Students'
import Program from './Program'
import Settings from './settings'
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/avatar'

import Users from './Users'
import SchoolManager from './SchoolConfig'

import  './WelcomeCenter.css'
import Activity from './Activity';
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
     medium: {
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
        fontSize:18,
        width: theme.spacing(6),
        height: theme.spacing(6),
      }, 
      small: {
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
        fontSize:18,
        width: theme.spacing(4),
        height: theme.spacing(4),
      },

      xsmall: {
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
        fontSize:18,
        width: theme.spacing(3.2),
        height: theme.spacing(3.2),
      }
  }));
  

class WelcomeCenterAdministrator extends Component{

constructor(){
super()

this.state ={
    Rol_Adm: false,
    username: '',
    idTeacher: 0,
    language:[{}],
    IdSchool: '', 
    picture:'',
    title:'',
    admin:false,
    currentIdLanguage:0

 }

//this.getUserInformation = this.getUserInformation.bind(this)
this.changeTitle = this.changeTitle.bind(this)
this.changeLanguage = this.changeLanguage.bind(this)
  
}





componentDidMount(){
   
    const schoolId = AutenticationServices.returnIdSchool();
    const Languate = AutenticationServices.returnIdLanguage();
    const Category = AutenticationServices.returnCategory();
    const userName =AutenticationServices.returnUserName();
    const LanguageList = [{ id: 0, text: 'turkish', picture: "/images/turkishFlag.png" },
    { id: 1, text: 'english', picture: "/images/englishFlag.jpg" },
    { id: 2, text: 'spanish', picture: "/images/spanishFlag.png" },
    { id: 3, text: 'greek', picture: "/images/greekFlag.png" }]
    let Admin = false
 if(Category==='3'){
Admin=true
 }

    this.setState({
        currentIdLanguage:Languate,
        IdSchool:schoolId, 
        username:userName,
        Category:Category, 
        admin:Admin,
        language:LanguageList


    })

    

    /*AutenticationServices.getRol(UserId)
    .then(response => this.getUserInformation(response))*/
   
    this.changePicture = this.changePicture.bind(this)
    this.changePicture(AutenticationServices.returnPicture())

    
}

  changeTitle(message){
   this.setState({
       title:message
        })  }

        changePicture(getPicture){
            
            this.setState({
               picture:getPicture
                }) }  
                
                
                changeLanguage(idLanguage){
                    
                    AutenticationServices.chanteLanguage(idLanguage);
                    window.location.reload(false);
                }
        

render(){

return(
<div className='Welcome'> 

<Router>
<>
<Menu deslogear={this.props.history} admin= {this.state.admin} title={this.state.title}  
     idCountry={this.state.CountryId} idschool={this.state.IdSchool} name={this.state.username}
      picture={this.state.picture} Language={this.state.language} 
      currentLanguage={this.state.currentIdLanguage} changeLanguage={this.changeLanguage}></Menu>
<Switch>
                    <Route path = "/Welcome/Assistance"  render={ props=> <Assistance {...props}  title={this.changeTitle} currentLanguage={this.state.currentIdLanguage} ></Assistance> }></Route>
                    <Route path = "/Welcome/Results" render={ props=> <Results {...props}  title={this.changeTitle} currentLanguage={this.state.currentIdLanguage} ></Results> }></Route>
                    <Route path = "/Welcome/Program" render={ props=> <Program {...props}  title={this.changeTitle} currentLanguage={this.state.currentIdLanguage} ></Program> }></Route>
{this.state.admin && <Route path = "/Welcome/Courses" render={ props=> <Courses {...props}  title={this.changeTitle} currentLanguage={this.state.currentIdLanguage}></Courses> }   ></Route>}
                     <Route path = "/Welcome/School" render={ props=> <SchoolManager {...props}  title={this.changeTitle} ></SchoolManager> }   ></Route>

{this.state.admin && <Route path = "/Welcome/Students" render={ props=> <Students {...props}  title={this.changeTitle} currentLanguage={this.state.currentIdLanguage} ></Students> }></Route>}
                    <Route path = "/Welcome/Settings" render={ props=> <Settings {...props}  picture={this.changePicture} title={this.changeTitle} currentLanguage={this.state.currentIdLanguage} ></Settings> }  ></Route>
{this.state.admin && <Route path = "/Welcome/Users" render={ props=> <Users {...props}  title={this.changeTitle}  ></Users> }></Route>}
                     <Route path = "/Welcome" render={ props=> <Activity {...props}  title={this.changeTitle} ></Activity> }></Route>
</Switch>
</>
</Router>
</div>
)

}
}


class Menu extends Component{

    constructor(){
        super();
        
        this.state ={
        AssistanceTraslate:false,
        ResultTraslate:false,
        ProgramTraslate:false,
        CoursesTraslate:false,
        UsersTraslate:false,
        StudentTranslate:false,
        SchoolTranslate:false,
        AssistanceWorkSpace:false, 
      
        }
  
        this.AssistanceHover = this.AssistanceHover.bind(this)
        this.AssistanceHoverOut = this.AssistanceHoverOut.bind(this)
        this.Logout =this.Logout.bind(this) 
       this.showSomething = this.showSomething.bind(this)
    }
        

      

            render(){
           
               
            return(
                        
        <div className="welcome" >
        <div className="sidebar">
        <div class="container" >
                <div class="row">
                    <div class="col-lg-12 col-2 pt-0 pl-0" >
                    <Link  to="/Welcome"><AiFillHome></AiFillHome> </Link> 
                    </div>
                    {this.props.admin  &&
                    
                    <div class="col-lg-12 col-2 pl-0" >
                    <Link  to="/Welcome/Courses"  ><BsBook size="1.5rem"></BsBook></Link>
                    </div>
                   }
                   
                    <div class="col-lg-12 col-2 pl-0" >
                    <Link to="/Welcome/Results" ><BsGraphUp size="1.5rem" ></BsGraphUp>  </Link>{/*[results]*/ } 
                    </div>
                    <div class="col-lg-12 col-2 pl-0" >
                    <Link to="/Welcome/Program" ><BsCalendar size="1.5rem"></BsCalendar> </Link>{/*Program*/ }
                    </div>
                    {this.props.admin  &&
                    <div class="col-lg-12 col-2 pl-0" >
                    <Link to="/Welcome/Users" ><FaUserCog size="1.5rem"></FaUserCog> </Link>
                    </div>
                    }
                    
                    {this.props.admin  &&   <div class="col-lg-12 col-2  pl-0" >
                    <Link to="/Welcome/Students" ><FaGraduationCap size="1.5rem"></FaGraduationCap> </Link>
                    </div>
                     }

                </div>

        </div>
      
       
        
        {/*onClick={this.MthShowWorkSpace}
        
        {this.props.admin  && <Link  to="/Welcome/Courses"  ><BsBook size="1.5rem"></BsBook></Link>}
        <Link  to="/Welcome/Assistance"  ><AiOutlineCarryOut size="1.5rem"></AiOutlineCarryOut>  </Link> 
        <Link to="/Welcome/Results" ><BsGraphUp size="1.5rem" ></BsGraphUp>  </Link>
        <Link to="/Welcome/Program" ><BsCalendar size="1.5rem"></BsCalendar> </Link>
        {this.props.admin  && <Link to="/Welcome/Users" ><FaUserCog size="1.5rem"></FaUserCog> </Link>}
        {this.props.admin  && <Link to="/Welcome/Students" ><FaGraduationCap size="1.5rem"></FaGraduationCap> </Link>}
        <Link to="/Welcome/School"  ><FaSchool size="1.5rem"></FaSchool> </Link>{/*schoolmanager*/ } 
        
        
                            {/* bar to show wich language */}


        <div className= "divLanguage" onClick={()=>{
            if(this.state.showLanguageMenu===true){
                this.setState({showLanguageMenu:false})
            }else{
                this.setState({showLanguageMenu:true})
            }
         
            
            }} >
            <UpAvatar name='Currentlanguage' picture={this.props.Language[this.props.currentLanguage].picture} ></UpAvatar>
        </div>
       {this.state.showLanguageMenu && 
       <div style={{position:'absolute', left:'17%', top:'74.3%' , width:'4%', height:'7%', zIndex:'10',
                        }} >
       {this.props.Language.map(item=>{

           if(parseInt(item.id)!==parseInt(this.props.currentLanguage)){
return(<div key={item.id} style={{marginBottom:'15px', cursor:'pointer'}} onClick={()=>{
    this.setState({showLanguageMenu:false})
    this.props.changeLanguage(item.id)
}}> <UpAvatar name='LenguageOption' picture= {item.picture} ></UpAvatar></div>)
           }else {
               return ""
           }

       }
        
       )}
       
       </div> }
        
      
     
         

          
        </div>



    {this.state.AssistanceTraslate && ((this.props.admin ===true) ? <span className="traslateAssistance" > <UpLanguage turkish='program' english='schedual' spanish='horario' greek='βγες' currentLanguage={this.props.currentLanguage} /> </span> : <span className="traslateAssistanceTeac" > <UpLanguage turkish='program' english='schedual' spanish='horario' greek='βγες' currentLanguage={this.props.currentLanguage} /> </span>) }
    {this.state.CoursesTraslate && <span className="traslateCourses" > <UpLanguage turkish='dersler' english='courses' spanish='cursos' greek='βγες' currentLanguage={this.props.currentLanguage} /> </span> }
    {this.state.ResultTraslate && ((this.props.admin ===true) ? <span className="traslateNotes" > <UpLanguage turkish='sonuçlar' english='results' spanish='resultados' greek='βγες' currentLanguage={this.props.currentLanguage} /> </span> : <span className="traslateNotesTeach" > <UpLanguage turkish='notlar' english='notes' spanish='notas' greek='βγες' currentLanguage={this.props.currentLanguage} /> </span>) }
                                         
    {this.state.ProgramTraslate &&   ((this.props.admin ===true) ? <span className="traslateActivities" > <UpLanguage turkish='aktiviteler' english='activities' spanish='actividades' greek='βγες' currentLanguage={this.props.currentLanguage} /> </span> : <span className="traslateActivitiesTeach" > <UpLanguage turkish='aktiviteler' english='activities' spanish='actividades' greek='βγες' currentLanguage={this.props.currentLanguage} /></span>) }
    {this.state.StudentTranslate && <span className="traslateStudents" >  <UpLanguage turkish='öğrenciler' english='students' spanish='estudiantes' greek='βγες' currentLanguage={this.props.currentLanguage} /> </span> }
    {this.state.UsersTraslate && <span className="traslateUser" > <UpLanguage turkish='kullanıcılar' english='users' spanish='usuarios' greek='βγες' currentLanguage={this.props.currentLanguage} /> </span> }
    
    {this.state.SchoolTranslate && ((this.props.admin ===true) ? <span className="traslateSchool" >  <UpLanguage turkish='Okul' english='School' spanish='Colegio' greek='βγες' currentLanguage={this.props.currentLanguage} /> </span> : <span className="traslateSchoolTeach" >  <UpLanguage turkish='Okul' english='School' spanish='Colegio' greek='βγες' currentLanguage={this.props.currentLanguage} /> </span> ) }

<div class="container" >
    <div class="row">
       <div class="col-lg-2 col-" ></div>
       <div class="col-lg-7  col-9"  >
       <label className="title" >{this.props.title}</label>
       </div >
       <div class="col-lg-3 col-3 justify-content-end" >
       <div className="MenuUser" >
<div className="dropdown">
  <span  ><UpAvatar name={this.props.name} picture={this.props.picture} ></UpAvatar></span>
  <div className="dropdown-content">
  <div onClick={this.Logout} className="itemsMenuUser">
  <UpLanguage turkish='çıkış' english='logout' spanish='salir' greek='βγες' currentLanguage={this.props.currentLanguage} ></UpLanguage>
    
      
      </div>

      
  <div className="itemsMenuUserSettings">
  <Link  to="/Welcome/Settings"  >  <UpLanguage turkish='ayarlar' english='settings' spanish='ajustes' greek='βγες' currentLanguage={this.props.currentLanguage} ></UpLanguage>  </Link>
      </div>
  
  
  </div>
</div>

</div>


       </div>
    </div>

</div>
    <div className = "main">

{/*    <label className="title" >{this.props.title}</label>
 
<div className="MenuUser" >
<div className="dropdown">
  <span  ><UpAvatar name={this.props.name} picture={this.props.picture} ></UpAvatar></span>
  <div className="dropdown-content">
  <div onClick={this.Logout} className="itemsMenuUser">
  <UpLanguage turkish='çıkış' english='logout' spanish='salir' greek='βγες' currentLanguage={this.props.currentLanguage} ></UpLanguage>
    
      
      </div>


  <div className="itemsMenuUserSettings">
  <Link  to="/Welcome/Settings"  >  <UpLanguage turkish='ayarlar' english='settings' spanish='ajustes' greek='βγες' currentLanguage={this.props.currentLanguage} ></UpLanguage>  </Link>
      </div>
  
  
  </div>
</div>

</div>*/}
         




</div>



    
  <br></br>
  <br></br>
  <br></br>

 
</div>





    );
    }

    showSomething(){

console.log("success")

    }
    Logout(){
        console.log("desloguea")
        AutenticationServices.Logout()
        this.props.deslogear.push('/')
      
    }
   
    AssistanceHover(id){
        
        if (id === 0){
        
            this.setState({
                AssistanceTraslate:true
                })
        }else if (id === 1){
        
            this.setState({
                ResultTraslate:true
                })
               
        }else if (id === 2){
        
            this.setState({
                ProgramTraslate:true
                })
        }else if (id === 3){
        
            this.setState({
                CoursesTraslate:true
                })
        }else if (id === 4){
        
            this.setState({
                UsersTraslate:true
                })

                
        }else if (id === 5){
        
            this.setState({
                StudentTranslate:true
                })

                
        }else if (id === 6){
        
            this.setState({
                SchoolTranslate:true
                })

                
        }
        }
        

        
        AssistanceHoverOut(id){
            switch (id){
                case 0:
                    this.setState({
                        AssistanceTraslate:false
                        })
                        break
                case 1:
                    this.setState({
                        ResultTraslate:false
                        })
                        break
                case 2:
                    this.setState({
                        ProgramTraslate:false
                        })
                        break
                case 3:
                    this.setState({
                        CoursesTraslate:false
                    })
                    break
                case 4:
                    this.setState({
                    UsersTraslate:false
                    })   
                    break
                case 5:
                    this.setState({
                        StudentTranslate:false
                        })
                        break
                        case 6:
                    this.setState({
                    SchoolTranslate:false
                    })   
                    break

                default: return ''
             }
             
            }

                   

}


    function UpAvatar(props) {
        
        
        const classes = useStyles();
   if(props.name==='Currentlanguage'){
    return   <Avatar  size={40} src= {props.picture} className = {classes.small} ></Avatar>
   }else if(props.name==='LenguageOption'){
    return   <Avatar  size={40} src= {props.picture} className = {classes.xsmall} ></Avatar>
   }

             if(props.picture==="n"){
        return <Avatar  size={40} className = {classes.medium}  >{props.name.substring(0, 1)}</Avatar>
              }else{
                return   <Avatar  size={40} src= {props.picture} className = {classes.medium} ></Avatar>
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

   
export default WelcomeCenterAdministrator