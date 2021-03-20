import React, { Component } from "react";
import AutenticationServices from './AutenticationServices.js';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/avatar'
import Chart from './Chart';

import { AiOutlineLeft, AiOutlineRight}  from 'react-icons/ai';

import './ResultsTeacher.css'
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(2),
      },
    },
    Lgreen: {
      color: theme.palette.getContrastText(green[500]),
      backgroundColor: green[500],
      width: theme.spacing(5),
        height: theme.spacing(5),
    }, 
  
    medium: {
      color: theme.palette.getContrastText(green[500]),
      backgroundColor: green[500],
      width: theme.spacing(8.5),
        height: theme.spacing(8.5),
    },
    big: {
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
        width: theme.spacing(10.5),
          height: theme.spacing(10.5),
      },
  
    small: {
      color: theme.palette.getContrastText(green[500]),
      backgroundColor: green[500],
      width: theme.spacing(4.5),
        height: theme.spacing(4.5),
    },
    formControl: {
      fontSize:5,
      minWidth: 100,
      minHeight:50
    },

    formLesson: {
        fontSize:4,
        minWidth: 60,
        minHeight:40
      }

  }));
  
class ResultsStudent extends Component{
constructor(props){
        super(props)
    
        this.state={
            idSchool:'',
            currentLanguage:0,

            //LISTS 
            ListCatNotes:[],
            ListTeacher:[],
            ListCourses:[],
            ListResults:[],
            ListResultsPiv:[],
            ListResultsMedia:[],
            ListGrades:[],
            ListStudents:[],
            ListLesson:[],
            PictureStudent:null,
            NameStudent:'',

            amountResults:0,             
            //HANDLE CHANGE SELECT
            idCourse:'',
            idTeacher:'',
            category:'',
            TituloResultado:'',
            dayResult:'',
            MonthResult:'',
            BgColorCat:'#FFFFFF',
            bgColorMedia:'',
            contadorResults:0,
            Media:false,
            ChartCurrentData:[],
            ChartCurrentLabels:[],
            ChartCurrentColors:[],
            idStudent:'',
            lesson:0,


            //chart
            chartData:{},

            //flags
            ShowAvatar:true,
            PictureTeacher:'', 
            nameTeacher:'',
            surnameTeacher:'',
            ShowMediaGraph:false,
            ShowGraph:false,
            ShowGraphGr:false,
            CicleFinishDates:false,
            NotExpand:true,

            dateStart:null,
            dateFinish:null,
            iteration:0, 
            iteratorDates:[],
            currentInterval:'',


            idUser:0,
           

        }

        this.handleChangeGrade = this.handleChangeGrade.bind(this)
        this.handleChangeCategory = this.handleChangeCategory.bind(this)
        this.handleChangeCourse = this.handleChangeCourse.bind(this)
        this.handleChangeLesson = this.handleChangeLesson.bind(this)
        this.saveMedia = this.saveMedia.bind(this)
        this.FixDates= this.FixDates.bind(this)
        this.handleChangeStudent = this.handleChangeStudent.bind(this)
        this.getChartDataLesson = this.getChartDataLesson.bind(this)
            }

componentDidMount(){
     
        const schoolId = AutenticationServices.returnIdSchool();
        const Language = AutenticationServices.returnIdLanguage();
        const UserId =AutenticationServices.returnUser(); 
        const Picture = AutenticationServices.returnPicture();
        AutenticationServices.getCatNotes(schoolId)
        .then(response => {
           this.setState({
            ListCatNotes:response.data
        })
        })
        .catch(error => {
        if (!error.response) {
          
        } else {
        
        }})


        AutenticationServices.getTeachersBySchool(schoolId)
.then(response => {
             this.setState({
                ListTeacher:response.data,
                currentLanguage:Language
     })

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


AutenticationServices.getSchoolProfile(schoolId)
    .then(response => {
     
      const Start = new Date(response.data.dateStart)
      const finish = new Date(response.data.datefinish)
      this.FixDates(Start, finish, response.data.cicle, Start, 0)
   
        })
    .catch(error => {
     if (!error.response) {
    
        // console.log( "this.state.codeLoginFailed> " + this.state.codeLoginFailed)
     } else {
        
        }})
    
if(!this.props.admin){
  AutenticationServices.getCourseByUser(UserId)
  .then(response => {

      this.setState({
       ListCourses:response.data,
        PictureTeacher:Picture
       
  })
   
          
  })
  .catch(error => {
  if (!error.response) {
  
  // console.log( "this.state.codeLoginFailed> " + this.state.codeLoginFailed)
  } else {

  }})
}
  
this.setState({idSchool:schoolId,currentLanguage:Language })
this.FixDates= this.FixDates.bind(this)  
this.getCurrentInterval = this.getCurrentInterval.bind(this) 
this.PreDateInterval = this.PreDateInterval.bind(this)
this.nextDateInterval = this.nextDateInterval.bind(this)
this.ShiftExpand = this.ShiftExpand.bind(this)
    }


    
FixDates(dateStart, dateFinish, cicle, start, count){
      let getList = this.state.iteratorDates
  
 if(start.getTime()>=dateFinish.getTime()){
      
       this.setState({CicleFinishDates:true})
              }else {
             
                let month = start.getMonth() 
                let year = start.getFullYear()
                let day = start.getDate()
                let NewMonth = parseInt(month) + parseInt(cicle) + 1
               
                if(NewMonth>11){
                 
                  NewMonth= NewMonth-11
                 
                  year = year+1
                  
                }
                
                const newDate = year+'-'+NewMonth+'-'+day
                const Start = new Date(newDate)
                const iteratorList = {StartDate:start, FinishDate:Start, id:count}
                getList.push(iteratorList)
                const currentDate = new Date()
         
                
                if (currentDate.getTime()>=start.getTime() && currentDate.getTime()<=Start.getTime()){
                  

                  const getMonthStartCurrentInterval = start.getMonth()
                  const getMothFinishCurrentInterval = Start.getMonth()
                  
                  this.getCurrentInterval(getMonthStartCurrentInterval,getMothFinishCurrentInterval )
                  this.setState({
                    iteratorDates:getList,
                    iteration:count
                  })
                }else{
                  this.setState({
                    iteratorDates:getList
                  })
                }
               

                let newCount = count + 1
                this.FixDates(dateStart, dateFinish, cicle, Start,newCount)


      }

   
     
    
    }

getCurrentInterval(idstart, idfinish){

 

let month=[]
  switch (this.state.currentLanguage) {
    case '1':
      
      month = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
      break;
      case '0':
      
      month = ['ocak','şubat','Mart','Nisan','Mayıs','Haziran','temmuz','Ağustos',
      'Eylül','ekim','kasım','aralık',];
    break
    case '2':
      
      month = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
      break;
      case '3':
      
        month = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
      ];
        break;
        
    default:
      break;
  }
const getMonth = month[idstart] + ' / ' + month[idfinish]

this.setState({
  currentInterval:getMonth
})
  
}


ShiftExpand(){

if (this.state.NotExpand===true){
    this.setState({NotExpand:false})

}else{
    this.setState({NotExpand:true})
}

}

nextDateInterval(){
 
    let GetList = this.state.iteratorDates
    const getSize = this.state.iteratorDates.length
    let interval = this.state.iteration
 
  
  interval = interval + 1
    if(interval===getSize){
      interval = interval -1
  
    }else{
  
       this.setState({iteration:interval, 
        ShowGraph:false,
         ShowGraphGr:false,
        })
   this.getCurrentInterval(GetList[interval].StartDate.getMonth(),GetList[interval].FinishDate.getMonth())
 }

 if(this.state.category!=='' && this.state.idStudent!==''){

    this.foundStudent(this.state.idStudent, this.state.category, interval) 
    }
   
   
  }
  
  
  PreDateInterval(){
    let GetList = this.state.iteratorDates
   let interval = this.state.iteration
    
  
  interval = interval - 1
    if(interval<0){
      interval = interval + 1
    }else{
  
  
    this.setState({iteration:interval, 
      ShowGraph:false,
       ShowGraphGr:false,
})
  
  this.getCurrentInterval(GetList[interval].StartDate.getMonth(),GetList[interval].FinishDate.getMonth())
  
  }
  if(this.state.category!=='' && this.state.idStudent!==''){
     this.foundStudent(this.state.idStudent, this.state.category, interval) 
    }
   
  
  
  
  }
        

    

handleChangeCategory(event){
        this.setState({
       category:event.target.value,
       ShowGraph:false,
       ShowGraphGr:false, 
       
        })

        if(this.state.idStudent!==''){
            this.foundStudent(this.state.idStudent, event.target.value, this.state.iteration)
        }
    
    
      }

handleChangeGrade(event){


        AutenticationServices.getStudent(event.target.value)
        .then(response => {

            this.setState({
            
             ListResultsMedia:[],
             ShowGraph:false,
             ShowGraphGr:false,
             showStudents:false,
     ListStudents:response.data,
     idStudent:''
        })
        
         
                
        })
        .catch(error => {
        if (!error.response) {
          
        // console.log( "this.state.codeLoginFailed> " + this.state.codeLoginFailed)
        } else {
       
        }})
    
     


      }

saveMedia(id, note){
        
//existe este estudiante?
        if(this.state.ListResultsMedia.filter(filter=>filter.id===id).length>0){
        // capta la nota acumulada
          let gnote = this.state.ListResultsMedia.filter(filter=>filter.id===id).map(item=>{return item.note})
          let size = this.state.ListResultsMedia.filter(filter=>filter.id===id).map(item=>{return item.size})
         //le suma la nota actual y su contador
          gnote = parseInt(gnote)+parseInt(note)
          size =parseInt(size) +1

          //elimina el registro anterior
          let NewListResultMedia =  this.state.ListResultsMedia.filter(filter=>filter.id!==id)
        //crea el nuevo registro
          const iteration ={"id":id, "note":gnote, "size":size}

          //lo guarda
          NewListResultMedia.push(iteration)

          this.setState({
            ListResultsMedia:NewListResultMedia
          })
        }else{
     
          let ListResultPivot =this.state.ListResultsMedia
          const iteration ={"id":id, "note":note, "size":1}
          ListResultPivot.push(iteration)
          this.setState(
            {
              ListResultsMedia:ListResultPivot
            }
          )


        }

        

      }

handleChangeCourse(event){

    

        this.setState({
       idCourse:event.target.value,
       ShowGraphGr:false, 
       showStudents:false,
     ListStudents:[],
       ListResultsMedia:[],
       amountResults:0, 
       Media:false,
       bgColorMedia:''


        
        })

}

foundStudent(idStudent, category, iterator){

    const GetList = this.state.iteratorDates
       
const StartDate = GetList[iterator].StartDate 
const FinishDate = GetList[iterator].FinishDate
let ThereIsResult =0

          AutenticationServices.GetResultsByStudent(idStudent, category, StartDate.getDate(),StartDate.getMonth(),
           StartDate.getFullYear(), FinishDate.getDate(),FinishDate.getMonth(), FinishDate.getFullYear()   )
          .then(response => {
         
           let getNameStudent=[]
           let  getResult=[]
           let getcolors=[]
           let Lessons=[]
           const inicial = {"id":0, "description":"general"}
           Lessons.push(inicial)

           response.data.forEach(item=>{
            if(item.reporte.length>0){
                ThereIsResult=ThereIsResult+1
                let colors =''
                if(parseInt(item.reporte[item.reporte.length-1].result)>60 && parseInt(item.reporte[item.reporte.length-1].result)<=85  ){
                    colors='rgba(43, 100, 202, 0.6)'}
                    else if(parseInt(item.reporte[item.reporte.length-1].result)<=60 ){
                        colors='rgba(202, 64, 43, 0.6)'
                    }else if(parseInt(item.reporte[item.reporte.length-1].result)>85 ){
                        colors ='rgba( 51, 202, 43, 0.6)'
                       
                    }
                const iteracion = {"id":ThereIsResult, "description":item.lesson}
                Lessons.push(iteracion)
                getNameStudent.push(item.lesson) 
                getResult.push(item.reporte[item.reporte.length-1].result) 
                getcolors.push(colors)
             
            }

           })
           if(ThereIsResult>0){
               this.getChartData(getNameStudent,getResult, getcolors, Lessons)
             this.setState({ListResults:response.data})
            }
           
           
        
          })
          .catch(error => {
         
            alert('something went wrong')
         })
}

handleChangeStudent(event){

  let  GPictureStudent = ''
  let GNameStudent=''
  this.state.ListStudents.filter(item=>item.id===event.target.value).map(item=> {
      GPictureStudent= item.photo
      GNameStudent = item.name + ' ' + item.surname
      return ""
      
    })
 
    this.setState({idStudent:event.target.value, PictureStudent:GPictureStudent, 
        NameStudent:GNameStudent,   ShowGraph:false,
        ShowGraphGr:false,})
    
    if(this.state.category!==''){
        this.foundStudent(event.target.value, this.state.category, this.state.iteration)
      }else{
          this.setState({BgColorCat:'#7C7C79'})
          
          setTimeout(() => {
              this.setState({BgColorCat:'#FFFFFF'})
          }, 300);
          setTimeout(() => {
              this.setState({BgColorCat:'#7C7C79'})
          }, 600);

          setTimeout(() => {
              this.setState({BgColorCat:'#FFFFFF'})
          }, 900);
      }
}

handleChangeLesson(event){

this.setState({
    
   ShowGraphGr:false, lesson:event.target.value}) 

  if(event.target.value === 0){
    
    let ThereIsResult =0
 let getNameStudent=[]
      let  getResult=[]
      let getcolors=[]
    this.state.ListResults.forEach(item=>{
     
      if(item.reporte.length>0){
          ThereIsResult=ThereIsResult+1
          let colors =''
          if(parseInt(item.reporte[item.reporte.length-1].result)>60 && parseInt(item.reporte[item.reporte.length-1].result)<=85  ){
              colors='rgba(43, 100, 202, 0.6)'}
              else if(parseInt(item.reporte[item.reporte.length-1].result)<=60 ){
                  colors='rgba(202, 64, 43, 0.6)'
              }else if(parseInt(item.reporte[item.reporte.length-1].result)>85 ){
                  colors ='rgba( 51, 202, 43, 0.6)'
                 
              }
         
      
          getNameStudent.push(item.lesson) 
          getResult.push(item.reporte[item.reporte.length-1].result) 
          getcolors.push(colors)
       
      }

     })
     setTimeout(() => {
     
       if(ThereIsResult>0){
         this.getChartData(getNameStudent,getResult, getcolors, this.state.ListLesson)
      }
     }, 200);

     

  }else{


   
let getName =''
 this.state.ListLesson.filter(item=>parseInt(item.id)===parseInt(event.target.value)).forEach(item=>{getName=item.description})
let ResultLesson = []
this.state.ListResults.filter(filter=>filter.lesson===getName).forEach(item=>{ResultLesson=item.reporte})



if(ResultLesson.length>0  ){
   

 let   getNameStudent=[]
 let   getResult=[]
let  getcolors=[]
    ResultLesson.forEach(item=>{
        let colors =''
        if(parseInt(item.result)>60 && parseInt(item.result)<=85  ){
            colors='rgba(43, 100, 202, 0.6)'}
            else if(parseInt(item.result)<=60 ){
                colors='rgba(202, 64, 43, 0.6)'
            }else if(parseInt(item.result)>85 ){
                colors ='rgba( 51, 202, 43, 0.6)'
               
            }
       
        getNameStudent.push(item.title) 
        getResult.push(item.result) 
        getcolors.push(colors)

    })
   

   setTimeout(() => {
    this.setState({
        chartData:{
            labels:getNameStudent,
              datasets:[
                {
                  label:'current result',
                  minBarLength: 0,
                  data:getResult,
                  backgroundColor:getcolors
                }
              ], 
              options: {
                  scales: {
                      yAxes: [{
                          ticks: {
                              suggestedMin: 0,
                              suggestedMax: 100
                          }
                      }]
                  }
              }
            },
        ShowGraph:true,
       ShowGraphGr:true}) 
   }, 100);
  
}
  } 




}

getChartData(glabels,gdata, gColores, lessons){

  
    this.setState({
      chartData:{
      labels:glabels,
        datasets:[
          {
            label:'current result',
            minBarLength: 0,
            data:gdata,
            backgroundColor:gColores
          }
        ], 
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                }]
            }
        }
      }, 
      ShowGraph:true,
      ShowGraphGr:true,
      ChartCurrentColors:gColores,
      ChartCurrentData:gdata,
      ChartCurrentLabels:glabels,
      ListLesson:lessons,
    });
    
  

    
  }

getChartDataLesson(glabels,gdata, gColores){

  
    this.setState({
      chartData:{
      labels:glabels,
        datasets:[
          {
            label:'current result',
            minBarLength: 0,
            data:gdata,
            backgroundColor:gColores
          }
        ], 
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                }]
            }
        }
      }, 
      ShowGraph:true,
      ShowGraphGr:true,
     
    });
    
  

    
  }






    render(){
return(
    <div>

             <div style={{ position:'absolute', width:'97%', height:'105%', marginTop:'-5px', 
               left:'2%', top:'0%'}}  >
                  
                 <div style={{position:'relative', width:'98%', height:'94%'}}>
                 
                 
                 {this.state.NotExpand && <div style={{position:'absolute', top:'0%', left:'1%'}} >
                 <UpSelect  age={this.state.category}
                  handle={this.handleChangeCategory} 
                  ListGrades={this.state.ListCatNotes} 
                  language={this.state.currentLanguage}
                  BgColorCat={this.state.BgColorCat} ></UpSelect>      
                </div>}




        {/*           List of teachers. Just for Admin         */}

    

        {this.state.NotExpand &&    <div style={{position:'absolute', top:'12%', left:'1%'}} >

<UpSelectGrade  grade={this.state.idGrade} 
                   handle={this.handleChangeGrade}
                ListGrades={this.state.ListGrades}
                 language={this.state.currentLanguage} ></UpSelectGrade>      
    </div>}


     
    {this.state.NotExpand &&  <div style={{position:'absolute', top: '24%', left:'1%'}} >

        <UpSelectStudents  student={this.state.idStudent} 
                          handle={this.handleChangeStudent}
                          ListStudents={this.state.ListStudents}
                          language={this.state.currentLanguage} ></UpSelectStudents>      
</div> 
    }






 
 

{/*                seleccion de intervalo de fecha                          */}

{this.state.CicleFinishDates && this.state.NotExpand  && <div style={{position:'absolute',
 top:'-10%', left:'2%', width:'160px',
  height:'25px', border:'1px solid', borderLeft:'none', borderRight:'none', borderTop:'none', opacity:'0.9',
   color:'#B37474', fontStyle:'oblique', fontSize:'12px'}}>
  {this.state.currentInterval
  }
  </div>}

  {this.state.CicleFinishDates  && this.state.NotExpand  && <div onClick={this.nextDateInterval} style={{position:'absolute',
 top:'-10%', left:'15%', width:'25px', cursor:'pointer',
  height:'25px' , color:'#B37474'}}>
  <AiOutlineRight size='0.75rem' color='#B37474'></AiOutlineRight>
  </div>}
  {this.state.CicleFinishDates &&   this.state.NotExpand && <div  onClick={this.PreDateInterval}  style={{position:'absolute',
 top:'-10%', left:'0.2%', width:'25px', cursor:'pointer',
  height:'25px' , color:'#B37474'}}>
  <AiOutlineLeft size='0.75rem' color='#B37474'></AiOutlineLeft>
  </div>}


   {/*             A V A T A R        */}

    {this.state.ShowGraph && <div style={{position:'absolute', top:(this.state.NotExpand)?'0%':'-3%', left:(this.state.NotExpand)?'40%':'8%'}}>
   
   {this.state.NotExpand && <UpAvatar picture={this.state.PictureStudent}  ></UpAvatar> } 
   {!this.state.NotExpand && <UpAvatar cat='1' picture={this.state.PictureStudent}  ></UpAvatar> } 
     </div> }

   


{/*           title of Student Name     */}

    {this.state.ShowGraph &&
     <div style={{position:'absolute', top:(this.state.NotExpand)?'2%':'0%', left:(this.state.NotExpand)?'48%':'17%', border:'1px solid #D4D3D3  ', borderTop:'none', borderLeft:'none', borderRight:'none', textAlign:'left', fontSize:(this.state.NotExpand)?'30px':'40px', opacity:'0.6', fontStyle:'oblique'}} >
   {this.state.NameStudent}</div>}

{/*                 select different lesson */}
  {this.state.ShowGraph && <div style={{position:'absolute',top:(this.state.NotExpand)?'0%':'0%', left:(this.state.NotExpand)?'70%':'42%'}} >

<UpLesson  lesson={this.state.lesson} 
                 handle={this.handleChangeLesson}
                 lista={this.state.ListLesson}
                 language={this.state.currentLanguage} ></UpLesson>   
  
</div> } 

   {/*              GRAFO                */}

{this.state.ShowGraphGr &&
     <div style={{position:'absolute', top:'10%', left:(this.state.NotExpand)?'25%':'5%', width:(this.state.NotExpand)?'76.5%':'92%', height:(this.state.NotExpand)?'87%':'95%'}} >
    <Chart chartData={this.state.chartData} 
    location="Massachusetts" legendPosition="bottom"/></div>}

{/*                     M E D I A                    */}
    
{this.state.ShowGraphGr &&

     <div onClick={this.ShiftExpand} style={{position:'absolute', cursor:'pointer',top:'21%', 
      left:(this.state.NotExpand)?'21%':'3%', width:'3%', height:'4.2%'}} >
    <img src='/images/expand.png' alt="" style={{width:'25px', height:'25px', cursor:'pointer'}}   ></img></div>}


{/*                         option List button         */}















 {  /*                       show graphics             */  }

 {!this.state.ShowGraph && <div style={{position:'absolute', top:'-10%', left:'20%', width:'76.5%', height:'87%'}}>
 <img src='/images/empryActivities.png' alt='' style={{height: "250px", width: '250px', paddingTop: '125PX', opacity:'0.75'}} >
     </img><p style={{fontSize:'18px', color:'black', opacity:'0.3'}} ><UpLanguage
                     turkish='Sonuçlar yok' english='there is not results'
                    spanish='no hay resultados' greek='no hay resultados' currentLanguage={this.state.currentLanguage} 
                    ></UpLanguage></p>  </div>}



 





                 </div>
                 
                 
                 </div>
                 
               
                 </div>)

    }

}






function UpSelectStudents(props){
    const classes = useStyles();
  return(
    <FormControl variant="outlined" className={classes.formControl}>
    <InputLabel id="demo-simple-select-outlined-label"><UpLanguage turkish='bir ders seçin' english='choose a course' spanish='elige un curso' greek='choose a ctegory' currentLanguage={AutenticationServices.returnIdLanguage()} ></UpLanguage></InputLabel>
    <Select
    defaultValue=""
      labelId="demo-simple-select-outlined-label"
      id="demo-simple-select-outlined"
      value={props.student}
      onChange={props.handle}
      label="choose a Category."
      style={{width:'200px', height:'50px'}}
    >
    {

    props.ListStudents.map(item=>
  <MenuItem key={item.id} value={item.id}>{item.name + ' ' +item.surname }</MenuItem>
  )
  }    
  </Select>
  </FormControl>)
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
  
function UpSelect(props){
    const classes = useStyles();
  return(
    <FormControl variant="outlined" className={classes.formControl}>
    <InputLabel id="demo-simple-select-outlined-label"><UpLanguage turkish='bir kategori seçin' english='choose a category' spanish='elige una categoria' greek='choose a ctegory' currentLanguage={AutenticationServices.returnIdLanguage()} ></UpLanguage></InputLabel>
    <Select
    defaultValue=""
      labelId="demo-simple-select-outlined-label"
      id="demo-simple-select-outlined"
      value={props.age}
      onChange={props.handle}
      label="choose a Category."
      style={{width:'200px', height:'50px', background:props.BgColorCat}}
    >
    {
    props.ListGrades.map(item=>
  <MenuItem key={item.id} value={item.id}>{item.categoryDescription}</MenuItem>
  )
  }    
  </Select>
  </FormControl>)
  }

  function UpSelectGrade(props){
              
    const classes = useStyles();
  return(
    <FormControl variant="outlined" className={classes.formControl}>
    <InputLabel id="demo-simple-select-outlined-label"><UpLanguage turkish='bir Oreg seçin' english='choose a grade' spanish='elige un grado' greek='choose a ctegory' currentLanguage={AutenticationServices.returnIdLanguage()} ></UpLanguage></InputLabel>
    <Select
    defaultValue=""
      labelId="demo-simple-select-outlined-label"
      id="demo-simple-select-outlined"
      value={props.grade}
      onChange={props.handle}
      label="choose a grade..."
      style={{width:'200px', height:'50px'}}
    >
  
  
    {
    props.ListGrades.map(item=>
  <MenuItem  key={item.idgrade} value={item.idgrade}>   { item.description} </MenuItem>
  )
  }    
  </Select>
  </FormControl>)
  }


  function UpLesson(props){
    const classes = useStyles();
    return(
      <FormControl  className={classes.formLesson}>
      <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
      <Select
      defaultValue=""
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={props.lesson}
        onChange={props.handle}
        label="choose a grade..."
     
      >
    
    
      {
      props.lista.map(item=>
    <MenuItem  key={item.id} value={item.id}>   { item.description} </MenuItem>
    )
    }    
    </Select>
    </FormControl>)

  }

  function UpAvatar(props) {
    const classes = useStyles();
   if(props.picture==='null' || props.picture===null ||props.picture==='un' ){
    return <Avatar  size={40} className = {classes.medium}  ></Avatar>
          }else if(props.cat==='1'){
            return   <Avatar  size={40} src= {props.picture} className = {classes.big} ></Avatar>
            }else{
                return   <Avatar  size={40} src= {props.picture} className = {classes.medium} ></Avatar>
            }
    
 }

 
export default (ResultsStudent)
