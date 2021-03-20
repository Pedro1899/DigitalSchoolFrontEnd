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
import {FaRegCircle,FaCircle} from 'react-icons/fa'
import { AiOutlineRightCircle, AiOutlineLeftCircle, AiOutlineLeft, AiOutlineRight}  from 'react-icons/ai';

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
    }
  }));
  
class ResultsTeacher extends Component{
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

            dateStart:null,
            dateFinish:null,
            iteration:0, 
            iteratorDates:[],
            currentInterval:'',


            idUser:0,
           

        }

        this.handleChangeTeacher = this.handleChangeTeacher.bind(this)
        this.handleChangeCategory = this.handleChangeCategory.bind(this)
        this.handleChangeCourse = this.handleChangeCourse.bind(this)
        this.ChangeLeftResult = this.ChangeLeftResult.bind(this)
        this.ChangeRightResult = this.ChangeRightResult.bind(this)
        this.ShiftMediaResults = this.ShiftMediaResults.bind(this)
        this.saveMedia = this.saveMedia.bind(this)
        this.FixDates= this.FixDates.bind(this)
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
this.nextDateInterval = this.nextDateInterval.bind(this)
this.PreDateInterval = this.PreDateInterval.bind(this)
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
       idCourse:null,
     
       showStudents:false,
       ListStudents:[],
       ListResultsMedia:[],
       amountResults:0, 
       Media:false,
       bgColorMedia:''})
 

this.getCurrentInterval(GetList[interval].StartDate.getMonth(),GetList[interval].FinishDate.getMonth())

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
     showStudents:false,
     ListStudents:[],
     idCourse:null,
     
     ListResultsMedia:[],
     amountResults:0, 
     Media:false,
     bgColorMedia:''})


this.getCurrentInterval(GetList[interval].StartDate.getMonth(),GetList[interval].FinishDate.getMonth())
  }
 



}
      

    

handleChangeCategory(event){
        this.setState({
       category:event.target.value,
       idCourse:'',
       ShowGraph:false,
       ShowGraphGr:false, 
       showStudents:false,
     ListStudents:[],
       ListResultsMedia:[],
       amountResults:0, 
       Media:false,
       bgColorMedia:''
        })
    
    
      }

handleChangeTeacher(event){

    this.state.ListTeacher.forEach(item=>{
  
if(parseInt(item.idTeacher)===parseInt(event.target.value)){

this.setState({PictureTeacher:item.picture,
     idTeacher:event.target.value, 
     
     nameTeacher:item.name,
     surnameTeacher:item.surname

     })
}
    })


        AutenticationServices.getCourseByTeacher(event.target.value)
        .then(response => {

            this.setState({
             ListCourses:response.data,
             ListResultsMedia:[],
             ShowGraph:false,
             ShowGraphGr:false,
             showStudents:false,
     ListStudents:[],
        })
         
                
        })
        .catch(error => {
        if (!error.response) {
          
        // console.log( "this.state.codeLoginFailed> " + this.state.codeLoginFailed)
        } else {
        console.log("codigo de error " + error.response.data.code)
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

        if(this.state.category!==''){
          const GetList = this.state.iteratorDates
          const getIterator = this.state.iteration
  const StartDate = GetList[getIterator].StartDate 
const FinishDate = GetList[getIterator].FinishDate

       
 
            AutenticationServices.getResultsByCourse(event.target.value, this.state.category, StartDate.getDate(),StartDate.getMonth(),
             StartDate.getFullYear(), FinishDate.getDate(),FinishDate.getMonth(), FinishDate.getFullYear()   )
            .then(response => {
            
                if(response.data.length>0){
                   const Month = new Date(response.data[response.data.length-1].date).getMonth()
                   const day = new Date(response.data[response.data.length-1].date).getDate()
                 
                   const title = response.data[response.data.length-1].title
                    this.setState({ShowMediaGraph:true,
                    ListResults:response.data,
                    ListResultsPiv:response.data[response.data.length-1], 
                    ListStudents:response.data[response.data.length-1].result,
                    contadorResults:response.data.length-1, 
                    TituloResultado:title, 
                    MonthResult:Month,
                    dayResult:day
                    })
                    
                  let getNameStudent=[]
                   let  getResult=[]
                   let colors=[]
                   
                    response.data[response.data.length-1].result.forEach(item=>{
                      if(parseInt(item.note)>=0){
                        getNameStudent.push(item.nameStudent  + ' ' +item.surnameStudent)
                        getResult.push(item.note )
                       if(parseInt(item.note)>60 && parseInt(item.note)<=85  ){
                            colors.push('rgba(43, 100, 202, 0.6)')}
                            else if(parseInt(item.note)<=60 ){
                                colors.push('rgba(202, 64, 43, 0.6)')
                            }else if(parseInt(item.note)>85 ){
                                colors.push('rgba( 51, 202, 43, 0.6)')
                               
                            }}

                      })
                        let contResults=0
                      response.data.forEach(item=>{
                        contResults+=1
                        item.result.forEach(itemResult=>{
                          if(parseInt(itemResult.note)>=0){
                             this.saveMedia(itemResult.idSLong, itemResult.note)
                          }

                         
                        })

                      })
                      this.setState({amountResults:contResults})
                      this.getChartData(getNameStudent,getResult, colors)
                   }else{
   
                    this.setState({
                        ShowGraph:false,
                        ShowGraphGr:false,
                        showStudents:false,
                        ListStudents:[],
                        ListResults:[],
                        ListResultsPiv:[],
                        contadorResults:0,
                        chartData:{}
                        })
                   }
              
            })
            .catch(error => {
            if (!error.response) {
              
            } else {
            
            }})
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

  

ChangeRightResult(){

  let count = this.state.contadorResults
  
  if(count!==(this.state.ListResults.length-1)){
      count=count+1
 
      
       

           const Month = new Date(this.state.ListResults[count].date).getMonth()
           const day = new Date(this.state.ListResults[count].date).getDate()
           
           const title = this.state.ListResults[count].title
            this.setState({
           contadorResults:count,
            TituloResultado:title, 
            MonthResult:Month,
            dayResult:day,
            chartData:{},
            ListStudents:this.state.ListResults[count].result,
            ShowGraphGr:false,
            showStudents:false,
           
            })
            
          let getNameStudent=[]
           let  getResult=[]
           let colors=[]
           const countListResults = this.state.ListResults[count].result.length
           this.state.ListResults[count].result.forEach(item=>{
            if(parseInt(item.note)>=0){
                getNameStudent.push(item.nameStudent  + ' ' +item.surnameStudent)
                getResult.push(item.note )
                if(parseInt(item.note)>60 && parseInt(item.note)<=85  ){
                    colors.push('rgba(43, 100, 202, 0.6)')}
                    else if(parseInt(item.note)<=60 ){
                        colors.push('rgba(202, 64, 43, 0.6)')
                    }else if(parseInt(item.note)>85 ){
                        colors.push('rgba( 51, 202, 43, 0.6)')
                       
                    }}

              })

              setTimeout(() => {
                if(countListResults ===colors.length ){
                   this.getChartData(getNameStudent, getResult,colors)
                 
                   }else{
setTimeout(() => {
this.getChartData(getNameStudent, getResult,colors)
}, 300);
                   }
              }, 300);
             
   

          

                    }
   }

ChangeLeftResult(){
  let count = this.state.contadorResults
  if(count!==0){
      count=count-1
   
    const Month = new Date(this.state.ListResults[count].date).getMonth()
                const day = new Date(this.state.ListResults[count].date).getDate()
                
                const title = this.state.ListResults[count].title
                 this.setState({
                contadorResults:count,
                 TituloResultado:title, 
                 MonthResult:Month,
                 dayResult:day,
                 chartData:{},
                 ShowGraphGr:false,
                 ListStudents:this.state.ListResults[count].result,
                 showStudents:false,

                 })
                 
               let getNameStudent=[]
                let  getResult=[]
                let colors=[]
                const countListResults = this.state.ListResults[count].result.length
                this.state.ListResults[count].result.forEach(item=>{
                  if(parseInt(item.note)>=0){
                     getNameStudent.push(item.nameStudent  + ' ' +item.surnameStudent)
                     getResult.push(item.note )
                     

                     if(parseInt(item.note)>60 && parseInt(item.note)<=85  ){
                         colors.push('rgba(43, 100, 202, 0.6)')}
                         else if(parseInt(item.note)<=60 ){
                             colors.push('rgba(202, 64, 43, 0.6)')
                         }else if(parseInt(item.note)>85 ){
                             colors.push('rgba( 51, 202, 43, 0.6)')
                            
                         }}

                   })


                  setTimeout(() => {
                    if(countListResults ===colors.length ){
                       this.getChartData(getNameStudent, getResult,colors)
                     
                       }else{
setTimeout(() => {
  this.getChartData(getNameStudent, getResult,colors)
}, 300);
                       }
                  }, 300);
                  
        

               
                }
                  
                  
                 
}

ShiftMediaResults(){
 
  if(this.state.Media){
  this.setState({    ShowGraphGr:false, Media:false, bgColorMedia:''})

setTimeout(() => {

  this.getChartData(this.state.ChartCurrentLabels, this.state.ChartCurrentData, this.state.ChartCurrentColors)
}, 10);
}else{ 
  this.setState({    ShowGraphGr:false, Media:true, bgColorMedia:'#FC830A '})
setTimeout(() => {
  this.getChartData(this.state.ChartCurrentLabels, this.state.ChartCurrentData, this.state.ChartCurrentColors)
}, 10);

}



}

getChartData(glabels,gdata, gColores){

  if(this.state.Media){
    let MediaData =[]
    let colorsMedia=[]
    
    this.state.ListResultsMedia.forEach(item=>{
     
      let data = parseInt(item.note)/parseInt(item.size)
      MediaData.push(~~data)
      colorsMedia.push('#FC830A')
    })

    setTimeout(() => {
      this.setState({
        chartData:{
        labels:glabels,
          datasets:[
            {
              label:'current result',
              minBarLength: 0,
              data:gdata,
              backgroundColor:gColores
            },
            {
              label:'Media',
              minBarLength: 0,
              data:MediaData,
              backgroundColor:colorsMedia
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
        ChartCurrentLabels:glabels
      })
    }, 100);
    


  }else{
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
      ChartCurrentLabels:glabels
    });
    
  }

    
  }




    render(){
return(
    <div>

             <div style={{ position:'absolute', width:'97%', height:'105%', marginTop:'-5px', 
               left:'2%', top:'0%'}}  >
                  
                 <div style={{position:'relative', width:'98%', height:'94%'}}>
                 <div style={{position:'absolute', top:'0%', left:'1%'}} >
                 <UpSelect  age={this.state.category}
                  handle={this.handleChangeCategory} 
                  ListGrades={this.state.ListCatNotes} 
                  language={this.state.currentLanguage}
                  BgColorCat={this.state.BgColorCat} ></UpSelect>      
                </div>




        {/*           List of teachers. Just for Admin         */}
  {this.props.admin && <div style={{position:'absolute', top:'12%', left:'1%'}} >

 <UpSelectTeachers  teacher={this.state.idTeacher} 
                    handle={this.handleChangeTeacher}
                 ListTeacher={this.state.ListTeacher}
                  language={this.state.currentLanguage} ></UpSelectTeachers>      
     </div>}
    
  


 
    <div style={{position:'absolute', top:(this.props.admin===true) ? '24%':'12%', left:'1%'}} >

        <UpSelectCourses  course={this.state.idCourse} 
                          handle={this.handleChangeCourse}
                          ListCourses={this.state.ListCourses}
                          language={this.state.currentLanguage} ></UpSelectCourses>      
</div> 

{/*                seleccion de intervalo de fecha                          */}

{this.state.CicleFinishDates && <div style={{position:'absolute',
 top:'-10%', left:'2%', width:'160px',
  height:'25px', border:'1px solid', borderLeft:'none', borderRight:'none', borderTop:'none', opacity:'0.9',
   color:'#B37474', fontStyle:'oblique', fontSize:'12px'}}>
  {this.state.currentInterval
  }
  </div>}
  {this.state.CicleFinishDates && <div onClick={this.nextDateInterval} style={{position:'absolute',
 top:'-10%', left:'15%', width:'25px', cursor:'pointer',
  height:'25px' , color:'#B37474'}}>
  <AiOutlineRight size='0.75rem' color='#B37474'></AiOutlineRight>
  </div>}
  {this.state.CicleFinishDates && <div  onClick={this.PreDateInterval}  style={{position:'absolute',
 top:'-10%', left:'0.2%', width:'25px', cursor:'pointer',
  height:'25px' , color:'#B37474'}}>
  <AiOutlineLeft size='0.75rem' color='#B37474'></AiOutlineLeft>
  </div>}


   {/*             A V A T A R        */}

    {(this.state.ShowGraph && this.props.admin) && (<div style={{position:'absolute', top:'0%', left:'40%'}}>
    <UpAvatar picture={this.state.PictureTeacher}  ></UpAvatar>  </div>) }

{/*           title of this exam      */}

    {this.state.ShowGraph &&
     <div style={{position:'absolute', top:'2%', left:'48%', border:'1px solid #D4D3D3  ', borderTop:'none', borderLeft:'none', borderRight:'none', textAlign:'left', fontSize:'30px', opacity:'0.6', fontStyle:'oblique'}} >
   {this.state.TituloResultado}</div>}

{this.state.ShowGraphGr &&
     <div style={{position:'absolute', top:'17%', left:'25%', width:'76.5%', height:'87%'}} >
    <Chart chartData={this.state.chartData} 
    location="Massachusetts" legendPosition="bottom"/></div>}

{/*                     M E D I A                    */}
    
{this.state.ShowGraphGr &&
     <div onClick={this.ShiftMediaResults} style={{position:'absolute', cursor:'pointer',top:'21%', left:'21%', width:'3%', height:'4.2%', border:'1px solid #E9E8E8 ', borderRadius:'100%', paddingTop:'4px', paddingBottom:'4px', background:this.state.bgColorMedia }} >
    <img src='/images/media.png' alt='' style={{width:'10px', height:'12px', cursor:'pointer'}}   ></img></div>}


{/*                         option List button         */}

{this.state.ShowGraphGr && <div onClick={()=>{this.setState({ShowGraphGr:false,showStudents:true})}} style={{position:'absolute', top:'32%', zIndex:'10', left:'21.2%', opacity:'0.6'}}>
    <img src='/images/ListIcon.png' alt='' style={{width:'35px', height:'35px', cursor:'pointer'}} ></img>  </div> }

    {this.state.showStudents && <div onClick={()=>{this.setState({ShowGraphGr:true,showStudents:false})}} style={{position:'absolute', top:'25%', zIndex:'10', left:'29%', opacity:'0.6'}}>
    <img src='/images/grafica2.png' alt='' style={{width:'25px', height:'25px', cursor:'pointer'}} ></img>  </div> }



{/*                       Left                       */}
{this.state.ShowGraph && <div onClick={this.ChangeLeftResult}
 style={{position:'absolute', top:'75%', left:'-2%', fontSize:'21px', fontStyle:'oblique', opacity:'0.6', cursor:'pointer'}}>
 <AiOutlineLeftCircle></AiOutlineLeftCircle> </div>}


{/*                       Right                       */}

{this.state.ShowGraph && <div onClick={this.ChangeRightResult} 
style={{position:'absolute', top:'75%', left:'17%', fontSize:'21px', fontStyle:'oblique', opacity:'0.6', cursor:'pointer'}}>
 <AiOutlineRightCircle></AiOutlineRightCircle> </div>}

{/*                      Counter                                    */}
 { this.state.ShowGraph &&  <UpShowCounter
                                   Actual={this.state.contadorResults} 
                                  ListCourses={this.state.ListResults}
                                 
></UpShowCounter>  }

{/*                    Calendar                       */}

 {this.state.ShowGraph &&
     <div style={{position:'absolute', top:'55%', left:'3.75%'}} >
    <GetCalendar M={this.state.MonthResult} D = {this.state.dayResult} Language={this.state.currentLanguage} ></GetCalendar></div>}





 {  /*                       show graphics             */  }

 {!this.state.ShowGraph && <div style={{position:'absolute', top:'-10%', left:'20%', width:'76.5%', height:'87%'}}>
 <img src='/images/empryActivities.png' alt='' style={{height: "250px", width: '250px', paddingTop: '125PX', opacity:'0.75'}} >
     </img><p style={{fontSize:'18px', color:'black', opacity:'0.3'}} ><UpLanguage
                     turkish='Sonuçlar yok' english='there is not results'
                    spanish='no hay resultados' greek='no hay resultados' currentLanguage={this.state.currentLanguage} 
                    ></UpLanguage></p>  </div>}



  {/*      
  
  S H O W         S  T  U  D  E  N  T  S 
  
 
  */}

  
{this.state.showStudents && <div className='divStudentsResultGraph' >
          {
          
          this.state.ListStudents.map((item) =>{
            if(parseInt(item.note)>=0){return(

              <div  key={item.idSLong} style={{position:'relative',width:'90%', height:'17%', marginLeft:'8px',  marginBottom:'10px'}} >
               <div style={{position:'absolute', top:'10%'}}> <UpAvatar picture={item.pictureStudent} name={item.nameStudent} ></UpAvatar>   </div>
                <div style={{position:'absolute', top:'31%', left:'25%', width:'130px', textAlign:'left', fontSize:'18px', opacity:'0.7'}}> {item.nameStudent + ' ' +item.surnameStudent}   </div>
                <div style={{position:'absolute', top:'31%', left:'70%', width:'15%',  opacity:'0.7', fontSize:'18'}}> 
                   {item.note}
                  
               </div> 
                </div>
              )}else{
                return ""
              }
              

          })}
       </div>}



                 </div>
                 
                 
                 </div>
                 
               
                 </div>)

    }

}


function GetCalendar(props){

    let month=[]
  switch (props.Language) {
    case '1':
      
      month = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
      break;
      case '0':
      
      month = ['ocak',
      'şubat',
      'Mart',
      'Nisan',
      'Mayıs',
      'Haziran',
      'temmuz',
      'Ağustos',
      'Eylül',
      'ekim',
      'kasım',
      'aralık',
    ];
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

  const GetMonth =month[props.M];
  return(<div style={{position:'relative', width:'120px', height:'100px', border:'1px solid #E1E1E1', borderRadius:'7%'}}>
      <div style={{position:'relative', width:'101.5%', marginLeft:'-0.5%', height:'30%', backgroundColor:'#F55E43', color:'#FFFEFE ', paddingTop:'10px', fontSize:'17px'}} >{GetMonth}
</div>
<div style={{position:'relative', width:'100%', height:'70%', fontSize:'37px'}} >
    {props.D}
</div>
  </div>) 


}




function UpSelectCourses(props){
    const classes = useStyles();
  return(
    <FormControl variant="outlined" className={classes.formControl}>
    <InputLabel id="demo-simple-select-outlined-label"><UpLanguage turkish='bir ders seçin' english='choose a course' spanish='elige un curso' greek='choose a ctegory' currentLanguage={AutenticationServices.returnIdLanguage()} ></UpLanguage></InputLabel>
    <Select
    defaultValue=""
      labelId="demo-simple-select-outlined-label"
      id="demo-simple-select-outlined"
      value={props.course}
      onChange={props.handle}
      label="choose a Category."
      style={{width:'200px', height:'50px'}}
    >
    {
    props.ListCourses.map(item=>
  <MenuItem key={item.id_Course}  defaultValue="" value={item.id_Course}>{item.nameGrade + ' ' +item.nameLesson }</MenuItem>
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
  <MenuItem key={item.id}  defaultValue="" value={item.id}>{item.categoryDescription}</MenuItem>
  )
  }    
  </Select>
  </FormControl>)
  }

  function UpSelectTeachers(props){
    const classes = useStyles();
  return(
    <FormControl variant="outlined" className={classes.formControl}>
    <InputLabel id="demo-simple-select-outlined-label"><UpLanguage turkish='bir Oreg seçin' english='choose a teacher' spanish='elige un maestro' greek='choose a ctegory' currentLanguage={AutenticationServices.returnIdLanguage()} ></UpLanguage></InputLabel>
    <Select
    defaultValue=""
      labelId="demo-simple-select-outlined-label"
      id="demo-simple-select-outlined"
      value={props.teacher}
      onChange={props.handle}
      label="choose a Category."
      style={{width:'200px', height:'50px'}}
    >
  
  
    {
    props.ListTeacher.map(item=>
  <MenuItem key={item.idTeacher}  defaultValue="" value={item.idTeacher}>   { item.name + ' ' + item.surname } </MenuItem>
  )
  }    
  </Select>
  </FormControl>)
  }

  function UpAvatar(props) {
    const classes = useStyles();
   if(props.picture==='null' || props.picture===null ||props.picture==='un' ){
    return <Avatar  size={40} className = {classes.medium}  ></Avatar>
          }else{
            return   <Avatar  size={40} src= {props.picture} className = {classes.medium} ></Avatar>
            }
    
 }

 function UpShowCounter(props){

  let position=0

return (
props.ListCourses.map((item, index)=>{
  position=position+1.1

  if(index===props.Actual){
    return(<div key={index} style={{position:'absolute', left:`${position}%`, top:'75%'}} ><FaCircle size='0.9rem' color= '#7586DC' ></FaCircle></div>)

  }else{
    return(<div key={index} style={{position:'absolute', left:`${position}%`, top:'75%'}} ><FaRegCircle size='0.9rem' color='#DAE1F9 '></FaRegCircle></div>)

  }
})
)




}
export default (ResultsTeacher)
