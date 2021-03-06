import * as React from "react"
import {Tabs, Row, Col} from "antd"
import Status from "../components/status.js"
import Analytics  from "../components/analytics.js"
import LightSettings from "../components/lightSettings.js"

const { TabPane } = Tabs;

class MainTab extends React.Component {
  render() {
    return (
      <Row align="top" justify="center">
        <Col>
          <Tabs defaultActiveKey="1" size="large">
            <TabPane tab="Statsus" key="1">
              <Status></Status>
            </TabPane>
            <TabPane tab="Analytics" key="2">
              <Analytics></Analytics>
            </TabPane>
            <TabPane tab="Configure Settings" key="3">
              <LightSettings></LightSettings> 
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    )
    
  }
}

export default MainTab
