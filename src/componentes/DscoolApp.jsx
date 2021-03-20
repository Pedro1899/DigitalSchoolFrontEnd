import React, {Component} from 'react';


import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import login from './login';
import WelcomeCenterAdministrator from './WelcomeCenterAdministrator';
import NewSchool from './NewSchool'

import AuthenticatedRoute from './AuthenticatedRoute'



class DschoolApp extends Component{

render(){
return(
<div className='todoApp'> 
<Router>
<>
<Switch>
<Route path = "/" exact component ={login} ></Route>
<Route path = "/login"  component ={login} ></Route>
<Route path = "/NewSchool" exact component ={NewSchool} ></Route>
<AuthenticatedRoute path = "/Welcome" exact component ={WelcomeCenterAdministrator} ></AuthenticatedRoute>
<AuthenticatedRoute path = "/Welcome/Assistance" exact component ={WelcomeCenterAdministrator} ></AuthenticatedRoute>
<AuthenticatedRoute path = "/Welcome/Results" exact component ={WelcomeCenterAdministrator} ></AuthenticatedRoute>
<AuthenticatedRoute path = "/Welcome/Program" exact component ={WelcomeCenterAdministrator} ></AuthenticatedRoute>
<AuthenticatedRoute path = "/Welcome/Users" exact component ={WelcomeCenterAdministrator} ></AuthenticatedRoute>
<AuthenticatedRoute path = "/Welcome/Courses" exact component ={WelcomeCenterAdministrator} ></AuthenticatedRoute>
<AuthenticatedRoute path = "/Welcome/Students" exact component ={WelcomeCenterAdministrator} ></AuthenticatedRoute>
<AuthenticatedRoute path = "/Welcome/Settings" exact component ={WelcomeCenterAdministrator} ></AuthenticatedRoute>
<AuthenticatedRoute path = "/Welcome/Activity" exact component ={WelcomeCenterAdministrator} ></AuthenticatedRoute>
<AuthenticatedRoute path = "/Welcome/School" exact component ={WelcomeCenterAdministrator} ></AuthenticatedRoute>
<Route path = ""  component ={error} ></Route>
</Switch>
</>
</Router>

</div>

);

}

}

class error extends Component{
render(){
return(
<div>error</div>

);


}


}



export default DschoolApp