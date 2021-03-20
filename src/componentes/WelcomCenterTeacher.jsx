import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import {  AiFillHome,AiOutlineCarryOut } from "react-icons/ai";

import { BsGraphUp, BsCalendar,BsBook } from "react-icons/bs";
import { FaGraduationCap, FaUserCog} from "react-icons/fa";




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
      }
  }));
  

class WelcomeCenterAdministrator extends Component{

constructor(){
super()




this.state ={
    Rol_Adm: false,
    username: '',
    idTeacher: 0,
    CountryId: 0,
    IdSchool: '', 
    picture:'',
    title:'', 
    Category:null
    
 }

//this.getUserInformation = this.getUserInformation.bind(this)
this.changeTitle = this.changeTitle.bind(this)
  
}





componentDidMount(){
    const UserId =AutenticationServices.returnUser(); 
    const schoolId = AutenticationServices.returnIdSchool();
    const countryId = AutenticationServices.returnIdCountry();
    const Category = AutenticationServices.returnCategory();
    const userName =AutenticationServices.returnUserName();
 

    this.setState({
        CountryId:countryId,
        IdSchool:schoolId, 
        username:userName,
        Category:Category


    })
    
console.log('get category ' +Category)
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
        

render(){

return(
<div className='Welcome'> 

<Router>
<>
<Menu deslogear={this.props.history} title={this.state.title}   idCountry={this.state.CountryId} idschool={this.state.IdSchool} name={this.state.username} picture={this.state.picture}  ></Menu>
<Switch>
<Route path = "/Welcome/Assistance" exact component ={Assistance} ></Route>
<Route path = "/Welcome/Results" exact component ={Results} ></Route>
<Route path = "/Welcome/Program" render={ props=> <Program {...props}  title={this.changeTitle} ></Program> }></Route>
<Route path = "/Welcome/Courses" render={ props=> <Courses {...props}  title={this.changeTitle} ></Courses> }   ></Route>
<Route path = "/Welcome/Students" render={ props=> <Students {...props}  title={this.changeTitle} ></Students> }></Route>
<Route path = "/Welcome/Settings" render={ props=> <Settings {...props}  picture={this.changePicture} title={this.changeTitle} ></Settings> }  ></Route>
<Route path = "/Welcome/Users" render={ props=> <Users {...props}  title={this.changeTitle} ></Users> }></Route>
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
         <p></p>
         <p></p>   
         <Link  to="/Welcome/Activity"><AiFillHome></AiFillHome> </Link>  
        <p></p>
        {/*onClick={this.MthShowWorkSpace}*/}
        <Link  to="/Welcome/Courses"  onMouseOver={() => this.AssistanceHover(3)} onMouseOut={ () => this.AssistanceHoverOut(3)}><BsBook size="1.5rem"></BsBook></Link>
        <Link  to="/Welcome/Assistance"  onMouseOver={() => this.AssistanceHover(0)} onMouseOut={ () => this.AssistanceHoverOut(0)}><AiOutlineCarryOut size="1.5rem"></AiOutlineCarryOut>  </Link> 
        <Link to="/Welcome/Results" onMouseOver={() => this.AssistanceHover(1)} onMouseOut={ () => this.AssistanceHoverOut(1)}><BsGraphUp size="1.5rem" ></BsGraphUp>  </Link>{/*[results]*/ }
        <Link to="/Welcome/Program"  onMouseOver={() => this.AssistanceHover(2)} onMouseOut={ () => this.AssistanceHoverOut(2)}><BsCalendar size="1.5rem"></BsCalendar> </Link>{/*Program*/ }
        <Link to="/Welcome/Users" onMouseOver={() => this.AssistanceHover(4)} onMouseOut={ () => this.AssistanceHoverOut(4)}><FaUserCog size="1.5rem"></FaUserCog> </Link>
        <Link to="/Welcome/Students" onMouseOver={() => this.AssistanceHover(5)} onMouseOut={ () => this.AssistanceHoverOut(5)}><FaGraduationCap size="1.5rem"></FaGraduationCap> </Link>
                
         

          
        </div>



    {this.state.AssistanceTraslate && <span className="traslateAssistance" > Assistance </span> }
    {this.state.CoursesTraslate && <span className="traslateCourses" > Courses </span> }
    {this.state.ResultTraslate && <span className="traslateNotes" > Notes </span> }
    {this.state.ProgramTraslate && <span className="traslateActivities" > Activities </span> }
    {this.state.StudentTranslate && <span className="traslateStudents" > Students </span> }
    {this.state.UsersTraslate && <span className="traslateUser" > Users </span> }
    {this.state.StudentTranslate && <span className="traslateStudents" > Students </span> }


    <div className = "main">

            <label className="title" >{this.props.title}</label>
 
<div className="MenuUser" >
<div className="dropdown">
  <span  ><UpAvatar name={this.props.name} picture={this.props.picture} ></UpAvatar></span>
  <div className="dropdown-content">
  <div onClick={this.Logout} className="itemsMenuUser">logout</div>
  <div className="itemsMenuUser">
  <Link  to="/Welcome/Settings"  > Settings </Link>
      </div>
  
  
  </div>
</div>

</div>




    
  <br></br>
  <br></br>
  <br></br>

 
</div>



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

                default: return ''
             }
             
            }

                   

}


    function UpAvatar(props) {
        
        
        const classes = useStyles();
       if(props.picture===null || props.picture==="null"){
        return <Avatar  size={40} className = {classes.medium}  >{props.name.substring(0, 1)}</Avatar>
              }else{
                return   <Avatar  size={40} src= {props.picture} className = {classes.medium} ></Avatar>
                }
        
     }

   
export default WelcomeCenterAdministrator