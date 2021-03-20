import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';

class Chart extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData:props.chartData,
      chartOptions: {
        legend: {
          display: true
        },                                                                                             
        scales: {
          yAxes: [{id: 'y-axis-1', type: 'linear', position: 'left', ticks: {min: 0, max:100}}]
        }
      }
    }
  }

  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
    location:'City'
  }

  

  render(){
    return (
      <div className="chart" style={{width:'95%', height:'90%'}}>
        <Bar
          data={this.state.chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              fontSize:25
            },

            scales: {
              yAxes: [{
                  display: true,
                  ticks: {
                      suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                      // OR //
                     suggestedMax:100
                  }
              }]
          }
          ,
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />

{/*<Line
          data={this.state.chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Largest Cities In '+this.props.location,
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        /> */}
        

        {/*<Pie
          data={this.state.chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Largest Cities In '+this.props.location,
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        /> */}
      </div>
    )
  }
}

export default Chart;
