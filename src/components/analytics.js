import React from "react"
import { Card, Row, Col, Tabs } from "antd"
import AllData from "../components/stats/allData.js"
import HumidityData from "./stats/humidityData.js"
import LightData from "./stats/lightData.js"

const { TabPane } = Tabs;

class Analytics extends React.Component {
  render() {
    return (
      <Row align="middle" justify="center">
        <Col>
          <Card title="Microcontroller Greens Current Analytics">
            <Tabs type="card">
              <TabPane tab="All Data" key="1">
                <AllData></AllData>
              </TabPane>
              <TabPane tab="Humidity Data" key="2">
                <HumidityData></HumidityData>
              </TabPane>
              <TabPane tab="Light Data" key="3">
                <LightData></LightData>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    )
  }
}

export default Analytics
