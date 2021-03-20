import React,{Component} from 'react'


import AutenticationServices from './AutenticationServices.js'
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/avatar'
import {BsCloudUpload} from 'react-icons/bs'
import {FaUserGraduate} from 'react-icons/fa'
import {AiOutlineExclamationCircle} from 'react-icons/ai'
import {GrStatusGood, GrStatusDisabled} from 'react-icons/gr'
import MaterialTable from 'material-table'

import {AiOutlineWarning} from 'react-icons/ai'


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
        width: theme.spacing(30),
        height: theme.spacing(30),
      },
      small: {
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
        fontSize:18,
        width: theme.spacing(5.5),
        height: theme.spacing(5.5),
      }
  }));
class configStudent extends Component{
constructor(props){
    super(props)

    this.state={
        ListGrades:[],
        ListStudents:[],
        flagStudents:false,
        
        FlagChangeStudent:false,

        //grade
        selectionGrade:null,
        gradeSelected:'',

        //picture
        ChildrenPicture:'',
        file:null, 

        //children
        currentChildrenName:'',
        currentChildrenSurname:'',
        currentChildrenPhoto:'',
        currentChildrenId:'',
        idChildrenTable:'',


        //flags
        loadingPicture:false,
        alertSuccess:false,
        alert:false,
        messageAlert:''


    }

}

componentDidMount(){
  
    const Language =AutenticationServices.returnIdLanguage();
    const schoolId = AutenticationServices.returnIdSchool();

//get all Grades in the school
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

this.setState({idSchool:schoolId, 
                currentLanguage:Language})


this.fileSelectedHandler = this.fileSelectedHandler.bind(this)
this.Handleİnpt = this.Handleİnpt.bind(this)
this.SaveActivity = this.SaveActivity.bind(this)
this.changeSelectionGrade = this.changeSelectionGrade.bind(this)
this.DeleteStudent = this.DeleteStudent.bind(this)
}

Handleİnpt(event){
    this.setState({
[event.target.name]: event.target.value
    })
   }



   fileSelectedHandler(event){
    const file = event.target.files[0]
   this.setState({
     file: file,
     helpMouseOverUploadPicture:false
   })
 this.previewPicture(file)
 }



previewPicture(file){
    const reander = new FileReader();
    reander.readAsDataURL(file)
    reander.onloadend = () =>{
      this.setState({
        currentChildrenPhoto:reander.result,
      alreadyUpdate:false
      })
    }
    
    }

SaveActivity(){

      this.setState({loadingPicture:true})
      if((!this.state.currentChildrenName.match(/^[a-zA-ZüğşçöĞŞÇÖİÜı]+$/))){
        this.setState({
        alert:true,
        messageAlert:'not valid Name: [ABC] no spaces',
        loadingPicture:false
        })
        setTimeout(
        () => { this.setState({
          alert:false,
          messageAlert:''
          })},
        3500
        );
      
        }else if((!this.state.currentChildrenSurname.match(/^[a-zA-ZüğşçöĞŞÇÖİÜı]+$/)) ) {
          this.setState({
            alert:true,
            messageAlert:'not valid Surname: [ABC] no spaces',
            loadingPicture:false
            })
            setTimeout(
            () => { this.setState({
              alert:false,
              messageAlert:''
              })},
            3500
            );
          
          
          }else {

            if(this.state.file!==null){
            
          
              this.uploadPicture(this.state.currentChildrenPhoto)
  
          
                }else {

                  const formData = new FormData();
                  formData.append('Id', this.state.currentChildrenId)
                  formData.append('name', this.state.currentChildrenName)
                  formData.append('surname',this.state.currentChildrenSurname );
                  formData.append('photo', this.state.currentChildrenPhoto);
                
                
                   AutenticationServices.ChangeStudent(formData)
                   .then(response=>{
                     
                    AutenticationServices.getStudent(this.state.gradeSelected)
                    .then(response => {
                        this.setState({
                        ListStudents:response.data,
                        alertSuccess:true, 
                       loadingPicture:false
                     })
                    })
                   .catch(error => {
                   if (!error.response) {
                      // 
                   } else {
                   
                   }})

                    


                     setTimeout(() => {
                       this.setState({alertSuccess:false})
                     }, 1500);
                   })
                   .catch(error=>{
              
                     this.setState({alertFail:true, 
                       loadingPicture:false})
                     setTimeout(() => {
                       this.setState({alertFail:false})
                     }, 2500);
                   })
                  
                }

          }
    }

async uploadPicture(base64EncodedImage){

        try {
          this.callApi(base64EncodedImage)
          .then(res => {
     
           const formData = new FormData();
           
           formData.append('Id', this.state.currentChildrenId)
           formData.append('name', this.state.currentChildrenName)
           formData.append('surname',this.state.currentChildrenSurname );
           formData.append('photo', res.message);
           
            AutenticationServices.ChangeStudent(formData)
            .then(response=>{
                AutenticationServices.getStudent(this.state.gradeSelected)
                .then(response => {
             
                 
                  this.setState({
                    ListStudents:response.data,
                    alertSuccess:true, 
                   loadingPicture:false
                 })
                 setTimeout(() => {
                    this.setState({alertSuccess:false})
                  }, 2500);
                })
               .catch(error => {
               if (!error.response) {
                  // 
               } else {
               
               }})
            })
            .catch(error=>{
              
              this.setState({alertFail:true, 
                loadingPicture:false})
              setTimeout(() => {
                this.setState({alertFail:false})
              }, 2500);
            })
           
                
          })
          .catch(error => {
           
            this.setState({alertFail:true, 
              loadingPicture:false})
            setTimeout(() => {
              this.setState({alertFail:false})
            }, 2500);
            })
        
        }
        catch {
          this.setState({alertFail:true, 
            loadingPicture:false})
          setTimeout(() => {
            this.setState({alertFail:false})
          }, 2500);

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

changeSelectionGrade(RowData){
   
    AutenticationServices.getStudent(RowData.idgrade)
    .then(response => {

     if(response.data.length>0){
      this.setState({
        ListStudents:response.data,
        flagStudents:true,
        selectionGrade:RowData.tableData.id, 
        gradeSelected:RowData.idgrade,
        FlagChangeStudent:false, 
        idChildrenTable:'',
     })
     }else{
      this.setState({
        ListStudents:[],
        flagStudents:false,
        selectionGrade:RowData.tableData.id, 
          gradeSelected:RowData.idgrade,
          FlagChangeStudent:false,
          idChildrenTable:''
     })
     }   
   })
   .catch(error => {
   if (!error.response) {
      
   // 
   } else {
   
   }})
            
            }


changeSelectionStudent(RowData){
    
AutenticationServices.getOneStudent(RowData.id)
.then(response=>{
    this.setState({
        currentChildrenName:response.data.name,
        idChildrenTable:RowData.tableData.id,
        currentChildrenId:response.data.id,
        currentChildrenPhoto:response.data.photo,
        currentChildrenSurname:response.data.surname,
        FlagChangeStudent:true
    })
}
    )
}


DeleteStudent(){

  AutenticationServices.deleteStudent(this.state.currentChildrenId)
  .then(response => {

    let ListStudentPiv = [...this.state.ListStudents]
    ListStudentPiv = ListStudentPiv.filter(item=>parseInt(item.id)!==parseInt(this.state.currentChildrenId))

    if(ListStudentPiv.filter(item=>parseInt(item.id)!==parseInt(this.state.currentChildrenId)).length===0){

      this.setState({
        ListStudents: ListStudentPiv,
        FlagChangeStudent:false, 
        flagStudents:false,
      currentChildrenId:'',
    currentChildrenName:'',
  currentChildrenPhoto:'',
currentChildrenSurname:'',
idChildrenTable:''  })
    }else{
      this.setState({
        ListStudents: ListStudentPiv,
        FlagChangeStudent:false,
        currentChildrenId:'',
        currentChildrenName:'',
      currentChildrenPhoto:'',
    currentChildrenSurname:'',
    idChildrenTable:''
         })
    }


   })
.catch(error => {
  if (!error.response) {
     
    alert("internal server error")   
    

  } else {
     alert("ups... something get wrong")
    
     }})
  

}

render(){

    return(
            
     <div style={{height:'550px', width:'95%', marginLeft:'40px', overflow:'block'}}>


{/*                                    Lista de grados                          */}


<div style={{position:'absolute', left:'3%', top:'5%', width:'20%', height:'70%', border:'1px solid #E9E9E9 ', borderRadius:'8%', overflow:'auto'}} >
<MaterialTable title="" 
        data = {this.state.ListGrades}
        columns ={[
            {title : 'idgrade', field : 'idgrade', hidden:true}, {title : 'GRADE', field : 'description',
           
              headerStyle: {
                backgroundColor: '#D19090',
              }}, 
            
        ]}
          options={{
            rowStyle: rowData => ({
              backgroundColor: (this.state.selectionGrade === rowData.tableData.id) ? '#A3C3E1' : '#BEECDD',
              
              fontSize:  13.5,
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
            

                onRowClick={((evt, selectedRow) => this.changeSelectionGrade(selectedRow))}
        ></MaterialTable>

</div>

{/*         List Students                         */}

<div style={{position:'absolute', left:'27%', top:'5%', width:'25%', height:'70%', border:'1px solid #E9E9E9 ', borderRadius:'8%', overflow:'auto'}} >
{this.state.flagStudents && 
<MaterialTable title="" 
            data = {this.state.ListStudents}
            columns ={[
            
                {title: " ", render: rowData => <UpAvatar category ='1' name={rowData.name}  picture={rowData.photo} ></UpAvatar>},
               {title : 'name', field : 'name'},{title : 'surname', field : 'surname'},{title : 'birthday', field : 'birthday', hidden:true}, 
               {title : 'Id', field : 'id', hidden:true},
                 {title : 'idTutor', field : 'idTutor', hidden:true}, {title : 'idGrade', field : 'idGrade', hidden:true}, ]  }
       
           


                 options={{
                    rowStyle: rowData => ({
                      backgroundColor: (this.state.idChildrenTable === rowData.tableData.id) ? '#F4A877 ' : '',
                      
                      fontSize:  13.5,
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
       
        onRowClick={((evt, selectedRow) => this.changeSelectionStudent(selectedRow))}
        ></MaterialTable>

    }
    {!this.state.flagStudents && <div >
        <img alt='' src='/images/emptyCourses.png'  style={{height: "75px", width: '75px', paddingTop: '140px', opacity:'0.60'}} ></img>
        <p style={{opacity:'0.6'}}>choose a course with students</p>
    </div>}

  
</div>
   
   
        {/*  DIV TO CHANGE THE STUDENT */}

{this.state.FlagChangeStudent && <div style={{height:'560px', width:'450px', position:'absolute',
                                                    top:'5%', left:'60%', border:'1px solid', 
                                                    borderColor:'rgb(145, 184, 145)',
                                                    backgroundColor:'rgb(245, 229, 229)'}} >

<div style={{position:'relative', width:'99%', height:'99.5%'}}>
    <div style={{position:'absolute', left:'1%', top:'96%', opacity:'0.5', fontSize:'14px' }}>
        # {this.state.currentChildrenId}
    </div>

    {this.state.alertSuccess && <div style={{height: "30px", width: '250px', position:"absolute", left:  "40%",top: "50%", backgroundColor:'#8FE777', border:'1px',
 paddingTop:'8px', borderRadius:'5%', zIndex:'10'}}><GrStatusGood size='1.2rem' /> &nbsp; &nbsp; Change saved</div>}

    
{this.state.alertFail && <div style={{height: "35px", width: '175px', position:"absolute", left:  "40%",top: "50%", backgroundColor:'#F99696 ', border:'1px',
 paddingTop:'8px', borderRadius:'5%', zIndex:'10'}}><GrStatusDisabled size='1.2rem' /> &nbsp; &nbsp; Fail! contact us</div>}

{this.state.alert && <div style={{height: "60px", width: '250px', position:"absolute", left:  "60%",top: "50%", backgroundColor:'#F6F7DF', border:'1px',
 paddingTop:'8px', borderRadius:'5%', zIndex:'10'}}><AiOutlineWarning size='1.2rem' /> &nbsp; &nbsp;{this.state.messageAlert}</div>}


<div style={{position:'absolute', width:'240px',
        height:'250px', top:'50px', left:'100px', }} > 
        <UpAvatar picture={this.state.currentChildrenPhoto} name={this.state.currentChildrenName}  ></UpAvatar> </div>
       
            <input type="file" name="file" id="file" className="inputfile" accept=".jpg,.jpeg,.png, .gif" onChange={this.fileSelectedHandler} />
            <div style={{
        position: 'absolute',
        top: '48%',
        left: '69%'

     }}>
                  <label for="file" className="LabelUpload">
                           <BsCloudUpload size="2rem" color="gray"></BsCloudUpload>
                   </label>

                
             </div>

             <div style={{position:'absolute', left:'25%', top:'59%',width:'100px' , textAlign:'left' }}>Name<input className="textBoxStudent"  id="uname" name="currentChildrenName" type='text' value={this.state.currentChildrenName} onChange={this.Handleİnpt} /></div>
       <div style={{position:'absolute', left:'25%', top:'74%' ,width:'100px' , textAlign:'left'}}>Surname<input className="textBoxStudent"  id="usname" name="currentChildrenSurname" type='text' value={this.state.currentChildrenSurname} onChange={this.Handleİnpt}></input></div>
       {!this.state.loadingPicture && <div style={{position:'absolute', width:'100px', height:'80px', top:'89%', left:'25%'}}><button className="SaveActivityButton" onClick={this.SaveActivity}   > save change</button></div>}
       {this.state.loadingPicture && <div style={{position:'absolute', width:'100px', height:'50px', top:'89%', left:'25%'}}> <img src='/images/loading.gif' alt="" style={{width:'55px', height:'50px'}} ></img> </div>}
       {!this.state.loadingPicture && <div onClick={this.DeleteStudent} style={{position:'absolute', width:'100px', height:'20px', top:'1%', left:'0%', cursor:'pointer', color:'#FD0F03 ', fontStyle:'oblique', opacity:'0.7'}}><AiOutlineExclamationCircle size='1rem'></AiOutlineExclamationCircle> Delete</div>}

    </div>                                                        

    </div>}


{!this.state.FlagChangeStudent && <div style={{height:'500px', width:'450px', position:'absolute',
                                                    top:'5%', left:'60%', border:'1px solid #E9E9E9 ', borderRadius:'8%' 
                                                   
                                                    }} >
                    <div style={{position:'relative', marginTop:'200px', opacity:'0.6'}}>
                    <FaUserGraduate size='3rem'></FaUserGraduate>
                    </div>
                 
        <p style={{opacity:'0.6'}}>Student information</p>

    </div>}

     </div>

   
     
    
        )
}


}

function UpAvatar(props) {
    

    const classes = useStyles();
    if(props.category==='1'){

        if(props.picture===null || props.picture==="null"){
            return<Avatar  size={40} src='/images/newUser.jpg' className = {classes.small} ></Avatar>
                  }else{
                    return   <Avatar  size={40} src= {props.picture} className = {classes.small} ></Avatar>
                    }
    }else{
   if(props.picture===null || props.picture==="null"){
    return<Avatar  size={40} src='/images/newUser.jpg' className = {classes.medium} ></Avatar>
          }else{
            return   <Avatar  size={40} src= {props.picture} className = {classes.medium} ></Avatar>
            }
        }
 }

export default (configStudent)