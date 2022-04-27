import * as React from "react"
import {Card, Row, Col} from "antd"

class Status extends React.Component {
  state = {
    breakBeam: "",
    readingTime: "",
    light: "",
    moisture: "",
  }

  componentDidMount() {
    fetch("https://microcontrollergreens.live/getCurrData.php")
      .then(respose => {
        console.log(respose);
        return respose.json();
        // return JSON.parse(respose);
      })
      .then(json => {
        // console.log(json.readingTime)
        var string = ""
        if(json.breakBeam.localeCompare("0")) {
          string = "Yes"
        }
        else {
          string = "No"
        }
        var lightItem = Math.log(parseInt(json.light)) / 0.05301029996;
        if(lightItem > 100) {
          lightItem = 100
        }
        // Date
        this.setState({
          breakBeam: string,
          readingTime: json.readingTime,
          light: lightItem,
          moisture: parseInt(json.moisture)/40
        })
      })
  } 

  render () {
    const {breakBeam, light, moisture, readingTime} = this.state

    return (
      <Row align="middle" justify="center">
        <Col>
          <Card title="Microcontroller Greens Current Status">
            <p>Data last received: {readingTime}</p>
            <p>Light Sensor: {light}%</p>
            <p>Moisture Sensor: {moisture}%</p>
            <p>Ready to harvest: {breakBeam}</p>
          </Card>
        </Col>
      </Row>
    )
  }
} 

export default Status
