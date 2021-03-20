import React,{Component} from 'react'


import AutenticationServices from './AutenticationServices.js'
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/avatar'

import {GrStatusGood,GrSend} from 'react-icons/gr'
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
class shiftStudentGrade extends Component{
constructor(props){
    super(props)

    this.state={
        ListGrades:[],
        ListStudents:[],
        ListStudentsPivot:[],
        flagStudents:false,
        
        FlagChangeStudent:false,

        //grade
        selectionGrade:null,
        selectionGradeSend:null,
        gradeSelected:'',
        gradeSelectedSend:'',




        //flags
  
        alertSuccess:false,
        alert:false,
        alertSend:false,
        messageAlert:'',
        Send:false,

    }

    this.UpdateGrades= this.UpdateGrades.bind(this)

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

// console.log( "this.state.codeLoginFailed> " + this.state.codeLoginFailed)
} else {

}})

this.setState({idSchool:schoolId, 
                currentLanguage:Language})

this.UpdateGrades = this.UpdateGrades.bind(this)

}





UpdateGrades(){


this.callApi(this.state.gradeSelectedSend, this.state.ListStudents, this.state.ListStudentsPivot )
.then(res => {
  this.setState({
    ListStudents:[],
    ListStudentsPivot:[],
    flagStudents:false,
    Send:false, 
    gradeSelected:'',
    gradeSelectedSend:'',
    selectionGradeSend:'',
    selectionGrade:'',
    alertSuccess:true,
})
setTimeout(() => {
    this.setState({alertSuccess:false})
}, 2000);

})



}



callApi = async () => {

    for (const item of this.state.ListStudents) {

        if(this.state.ListStudentsPivot.filter(filter=>filter===item).length===0){
        
         await   AutenticationServices.ChangeStudentGrade(item.id,this.state.gradeSelectedSend )
            .then(response=>{
                })
            .catch(error=>{})
        }
    
     
    }
  
     
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

changeSelectionGradeSend(RowData){
    
   if(this.state.selectionGrade!==null){
       if(this.state.gradeSelected===RowData.idgrade){
this.setState({alertSend:true})

setTimeout(() => {
    this.setState({alertSend:false})   
}, 1500);

}else{


    this.setState({selectionGradeSend:RowData.tableData.id, 
                    gradeSelectedSend:RowData.idgrade,
                    Send:true})


}
    
   }else{
this.setState({alert:true})
setTimeout(() => {
    this.setState({alert:false}) 
}, 1500);
   }

            
                        
                        }
            

changeSelectionStudent(RowData){

 //consulta si en la lista pivot de cursos a asignar existe el elemento que se ha clickeado, si es asi se cambia el color
 if (this.state.ListStudentsPivot.filter(item=> item.id===RowData.id).length>0){
    //se elimina
    
 
  this.setState({
    ListStudentsPivot:this.state.ListStudentsPivot.filter(item=> item.id!==RowData.id)
    
    })
     //si no hay mas elementos marcados se elimina el boton para agregar la lista 
 

  }else{
 //se marca con color la leccion seleccionada y se agrega a la lista pivote 
   const ListStudentsPivotLocal = [...this.state.ListStudentsPivot]
   ListStudentsPivotLocal.push(RowData)
   
   this.setState({
    ListStudentsPivot:ListStudentsPivotLocal
        })
}

}

render(){

    return(
            
     <div style={{height:'550px', width:'95%', marginLeft:'40px', overflow:'block'}}>


{/*                                    Lista de grados                          */}

  {this.state.alertSuccess && <div style={{height: "40px", width: '250px', position:"absolute", left:  "75%",top: "0%", backgroundColor:'#8FE777', border:'1px',
 paddingTop:'8px', borderRadius:'5%', zIndex:'10', fontSize:'17px'}}><GrStatusGood size='1.5rem' /> &nbsp; &nbsp; Change saved</div>}

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
{this.state.alert && <div style={{height: "30px", width: '250px', position:"absolute", left:  "5%",top: "7%", backgroundColor:'#F6F7DF', border:'1px',
 paddingTop:'8px', borderRadius:'5%', zIndex:'10'}}><AiOutlineWarning size='1.2rem' /> &nbsp; &nbsp;choose a grade</div>}

{this.state.alertSend && <div style={{height: "30px", width: '250px', position:"absolute", left:  "85%",top: "7%", backgroundColor:'#F6F7DF', border:'1px',
 paddingTop:'8px', borderRadius:'5%', zIndex:'10'}}><AiOutlineWarning size='1.2rem' /> &nbsp; &nbsp;choose other grade</div>}

{/*         List Students                         */}

<div style={{position:'absolute', left:'30%', top:'5%', width:'25%', height:'70%', border:'1px solid #E9E9E9 ', borderRadius:'8%', overflow:'auto'}} >
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
                        backgroundColor:   (() => {
                        const getJustOneId =this.state.ListStudentsPivot.filter(item=> item.id===rowData.id) 
                         const getColor = getJustOneId.map(item => item)
                         if (getColor.length>0){
                          
                             return '#3A3A3A '
                        }else{
                         return ''
                        }
                         
                          })(),
                          fontSize:13, 
                          color:   (() => {
                            const getJustOneId =this.state.ListStudentsPivot.filter(item=> item.id===rowData.id) 
                             const getColor = getJustOneId.map(item => item)
                             if (getColor.length>0){
                              
                                 return '#FFFFFF'
                            }else{
                             return ''
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
       
        onRowClick={((evt, selectedRow) => this.changeSelectionStudent(selectedRow))}
        ></MaterialTable>

    }
    {!this.state.flagStudents && <div >
        <img alt='' src='/images/emptyCourses.png'  style={{height: "75px", width: '75px', paddingTop: '140px', opacity:'0.60'}} ></img>
        <p style={{opacity:'0.6'}}>choose a course with students</p>
    </div>}

  
</div>
       
{this.state.Send && <div onClick={this.UpdateGrades} style={{height: "30px", width: '250px', position:"absolute", left:  "55%",top: "30%", cursor:'pointer'}}>
    <GrSend size='3.5rem'></GrSend></div>}
       
        {/*  DIV TO CHANGE THE STUDENT of grade */}


        <div style={{position:'absolute', left:'75%', top:'5%', width:'20%', height:'70%', border:'1px solid #E9E9E9 ', borderRadius:'8%', overflow:'auto'}} >
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
              backgroundColor: (this.state.selectionGradeSend === rowData.tableData.id) ? '#A3C3E1' : '#BEECDD',
              
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
            

                onRowClick={((evt, selectedRow) => this.changeSelectionGradeSend(selectedRow))}
        ></MaterialTable>

</div>



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

export default (shiftStudentGrade)