import axios from "axios";

import {API_URL} from '../Constants.js'

class AutenticationService{

    /*
    **************************************  global references *****************************
    
    */
registerSuccessfulLogin(userId, idSchool, IdCountry, username, picture, category, language){
sessionStorage.setItem('authenticatedUser', userId)
sessionStorage.setItem('authenticatedSchool', idSchool)
sessionStorage.setItem('authenticatedCountry', IdCountry)
sessionStorage.setItem('authenticatedPicture', picture)
sessionStorage.setItem('authenticatedUserName', username)
sessionStorage.setItem('authenticatedCategory', category)
sessionStorage.setItem('authenticatedLanguage', language)

}

Logout(){
sessionStorage.removeItem('authenticatedUser')
sessionStorage.removeItem('authenticatedSchool')
sessionStorage.removeItem('authenticatedCountry')
sessionStorage.removeItem('authenticatedPicture')
sessionStorage.removeItem('authenticatedUserName')
sessionStorage.removeItem('authenticatedCategory')
sessionStorage.removeItem('authenticatedLanguage')

    }
    
chantePicture(picture){
    sessionStorage.setItem('authenticatedPicture', picture)
}
chanteLanguage(language){
    sessionStorage.setItem('authenticatedLanguage', language)
}
isUserLoggedİn(){
let user = sessionStorage.getItem('authenticatedUser')
    if (user === null) return false
    return true
}

returnUser(){
    let user = sessionStorage.getItem('authenticatedUser')
    return user
}

returnUserName(){
    let username = sessionStorage.getItem('authenticatedUserName')
    return username
}
returnIdSchool(){
    let school = sessionStorage.getItem('authenticatedSchool')
    return school
}
returnCategory(){
    let category = sessionStorage.getItem('authenticatedCategory')
    return category
}

returnIdCountry(){
    let idCountry = sessionStorage.getItem('authenticatedCountry')
    return idCountry
}


returnIdLanguage(){
    let idCountry = sessionStorage.getItem('authenticatedLanguage')
    return idCountry
}



returnPicture(){
    let picture = sessionStorage.getItem('authenticatedPicture')
    return picture
}



// Axios with Spring boot
ValidateUsernamePassword(username,password){

    
    return axios.get(`${API_URL}/managamentUser/Login/${username}/${password}`)
}


ValidateCredentialsSchool(username,password){

    
    return axios.get(`${API_URL}/managamentUser/NewSchoolCred/${username}/${password}`)
}


getSchoolProfile(idSchool){
   
    return axios.get(`${API_URL}/School/getSchool/${idSchool}`)
    }

getRol(IdUser){
   
return axios.get(`${API_URL}/managamentteacher/getTeacherByIdUser/${IdUser}`)
}

getAllUserById(idSchool){
    return axios.get(`${API_URL}/managamentUser/getDetailBySchool/${idSchool}`)
}


getCourseBySchool(idSchool){
    return axios.get(`${API_URL}/course/getcourses/${idSchool}`)
}

updateSchool(form){
    return axios.put(`${API_URL}/School/update/`,form)
}

CreateSchool(nameSchool, password){
    
    return axios.post(`${API_URL}/School/newSchool/${nameSchool}/${password}`)
}



getCourseByUser(idUser){
    return axios.get(`${API_URL}/course/getTeacherCourses/${idUser}`)
}
getCourseByTeacher(idTeacher){
    return axios.get(`${API_URL}/course/getTeacherCoursesByIdTeacher/${idTeacher}`)
}



getGradeBySchool(idSchool){
    return axios.get(`${API_URL}/managamentGrade/getGrade/${idSchool}`)
}

getLessonBySchool(idSchool){
    return axios.get(`${API_URL}/Lesson/getLesson/${idSchool}`)
}


deleteUser(idUser, idTeacherTutor, Categoryy){
    return axios.delete(`${API_URL}/managamentteacher/deleteteacher/${idUser}/${Categoryy}/${idTeacherTutor}`)
}

addNewUser(idSchool,name,surname,username,password,category,email, picture){
return axios.post(`${API_URL}/managamentUser/putuserWC/${idSchool}/${name}/${surname}/${username}/${password}/${category}/${email}/${picture}`)
}

addNewGrade(description, idSCHOOL){
    return axios.post(`${API_URL}/managamentGrade/putgrade/${description}/${idSCHOOL}`)
    }

deleteGrade(idGrade,idSchool){
    return axios.delete(`${API_URL}/managamentGrade/deleteGrade/${idGrade}/${idSchool}`)

}
deleteCourse(idCourse,idSchool){
    return axios.delete(`${API_URL}/course/deleteCourse/${idCourse}/${idSchool}`)

}
deleteAss(idAss){
    return axios.delete(`${API_URL}/TeacherCourse/DeleteAss/${idAss}`)

}

    addNewLesson(description, idSCHOOL){
        return axios.post(`${API_URL}/Lesson/putLesson/${description}/${idSCHOOL}`)
        }

        addNewCourse(form){
            return axios.post(`${API_URL}/course/putcourse`, form)
            
        }

getActivitiesUser(idTeacher){
return axios.get(`${API_URL}/TeacherCourse/getDetailTeacher/${idTeacher}`)
}

getActivitiesUser_Group(idTeacher){
    return axios.get(`${API_URL}/Activity/getActivity/${idTeacher}`)
    }

    getActivitiesOfAdmin(idTeacher){
        return axios.get(`${API_URL}/Activity/getActivityAdmin/${idTeacher}`)
        }

    


getTeachersBySchool(idSchool){
    return axios.get(`${API_URL}/managamentteacher/GetbyIDSchool/${idSchool}`)
}

getAllTutorbySchool(idSchool){

    return axios.get(`${API_URL}/managamenttutors/getalltutor/${idSchool}`)
    

}

newStudent(form){

    return axios.post(`${API_URL}/managamentStudent/greeting`,form)
    
}
ChangeStudent(form){

    return axios.put(`${API_URL}/managamentStudent/putStudent`,form)
    
}

ChangeStudentGrade(idStudent, idGrade){

    return axios.put(`${API_URL}/managamentStudent/putNewGrade/${idStudent}/${idGrade}`)
    
}


newNotes(form){

    return axios.post(`${API_URL}/Notes/setNotes`,form)
    
}

newResults(idNotes, idStudent, note){

    return axios.post(`${API_URL}/Notes/setResults/${idStudent}/${note}/${idNotes}`)
    
}
getOneStudent(idStudent){
    return axios.get(`${API_URL}/managamentStudent/getOneStudent/${idStudent}`)
}
getStudent(idGrade){
    return axios.get(`${API_URL}/managamentStudent/getstudentsByGrade/${idGrade}`)
}
deleteStudent(idStudent){
return(axios.delete(`${API_URL}/managamentStudent/deleteStudent/${idStudent}`))

}
getAssignmnt(idSchool){
    return axios.get(`${API_URL}/TeacherCourse/getDetailAssignment/${idSchool}`)
}

AddAssignmnt(form){
    return axios.post(`${API_URL}/TeacherCourse/putAss`, form)
}

deleteLesson(Lesson, idSchool){

    return axios.delete(`${API_URL}/Lesson/deleteLesson/${Lesson}/${idSchool}`)
}

addActivity(form){
   
    return axios.post(`${API_URL}/Activity/setActivity`,form)
    
}

deleteActivity(idActivity){
    return axios.delete(`${API_URL}/Activity/deleteActivity/${idActivity}`)
    
    
}


updateUser(form){
    return axios.put(`${API_URL}/managamentUser/putuser`,form)
 
}

getCatNotes(idSchool){
    return axios.get(`${API_URL}/Notes/getNotes/${idSchool}`)
}

NewCatNotes(idSchool, Description){
    return axios.post(`${API_URL}/Notes/putCategoryNote/${Description}/${idSchool}`)
}

getResultsByCourse(idCourse,idCategory,dayS, MonthS, YearS, dayF, MonthF, YearF){
    return axios.get(`${API_URL}/Notes/GetResultsByCourses/${idCourse}/${idCategory}/${dayS}/${MonthS}/${YearS}/${dayF}/${MonthF}/${YearF}`)
}

GetResultsByStudent(idStudent,idCategory,dayS, MonthS, YearS, dayF, MonthF, YearF){
    return axios.get(`${API_URL}/Notes/GetResultsByStudent/${idStudent}/${idCategory}/${dayS}/${MonthS}/${YearS}/${dayF}/${MonthF}/${YearF}`)
}

}






export default new AutenticationService()