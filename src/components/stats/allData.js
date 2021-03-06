import * as React from "react"
import {Chart, registerables} from 'chart.js'
import { Line } from 'react-chartjs-2'

Chart.register(...registerables);

class AllData extends React.Component {
  state = {
    readingTime: 0,
    light: 0,
    moisture: 0,
    breakBeam: 0,
    PWM: 0,
  }

  componentDidMount() {
    fetch("https://microcontrollergreens.live/getAllData.php")
      .then(respose => {
        console.log(respose)
        return respose.json()
        // return JSON.parse(respose);
      })
      .then(json => {
        // console.log(date)
        // console.log(json.readingTime[0]);
        this.setState({
          readingTime: json.readingTime,
          light: json.light,
          moisture: json.moisture,
          breakBeam: json.breakBeam,
          PWM: json.PWM,
        })
      })
  }

  render() {
    const {light, moisture, readingTime, breakBeam, PWM} = this.state
    var lightFixed = []
    var moistureFixed = []
    var date = []
    var breakBeamFixed = []
    var PWMfixed = []
    for(var i = light.length - 1; i >= 0; i--) {
      var lightItem = 0;
      if(parseInt(light[i]) !== 0) {
        lightItem = Math.log(parseInt(light[i]), 10) / 0.06
      }

      // If light is over 100%
      if(lightItem > 100) {
        lightFixed.push(100)
      }
      else {
        lightFixed.push(lightItem)
      }
      PWMfixed.push(PWM[i])
      moistureFixed.push(100-((parseInt(moisture[i], 10) - 1200)/16))
      date.push(readingTime[i])
      if(parseInt(breakBeam[i]) === 1) {
        breakBeamFixed.push(100)
      }
      else {
        breakBeamFixed.push(0)
      }
    }

    const data = {
        labels: date,
        datasets: [{
          label: 'Moisture Percent',
          data: moistureFixed,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        },
        {
          label: 'LUX Normalized',
          data: lightFixed,
          fill: false,
          borderColor: 'rgb(226,135,67)',
          tension: 0.1
        },
        {
          label: 'Break Beam Percent',
          data: breakBeamFixed,
          fill: false,
          borderColor: 'rgb(53,255,51)',
          tension: 0.1
        }, 
        {
          label: 'LED Intensity Percent',
          data: PWMfixed,
          fill: false,
          borderColor: 'rgb(252,3,36)',
          tension: 0.1
        }
        ]
        
      };
    return (
        // <p>Test This</p>
        <Line data = {data}></Line>
    )
  }
}

export default AllData
