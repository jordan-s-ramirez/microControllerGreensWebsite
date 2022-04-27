import * as React from "react"
import {Chart, registerables} from 'chart.js'
import { Line } from 'react-chartjs-2'

Chart.register(...registerables);

class LightData extends React.Component {
  state = {
    readingTime: 0,
    light: 0,
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
        })
      })
  }

  render() {
    const {light, readingTime} = this.state
    var lightFixed = []
    var date = []
    for(var i = readingTime.length - 1; i >= 0; i--) {
      var lightItem = (Math.log(parseInt(light[i])) / 0.07)
      if(lightItem === 100) {
        lightFixed.push(100)
      }
      else {
        lightFixed.push(lightItem)
      }
      date.push(readingTime[i])
    }

    const data = {
        labels: date,
        datasets: [
        {
          label: 'Light Percent',
          data: lightFixed,
          fill: false,
          borderColor: 'rgb(226,135,67)',
          tension: 0.1
        },
        ]
        
      };
    return (
        // <p>Test This</p>
        <Line data = {data}></Line>
    )
  }
}

export default LightData
