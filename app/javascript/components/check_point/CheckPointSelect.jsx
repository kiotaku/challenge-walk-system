import React, { Component } from 'react'
import axios from 'axios'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Pass from 'check_point/Pass'

export default class CheckPointSelect extends Component {
  constructor() {
    super()
    this.state = {
      check_points: [],
      check_point_id: '',
      qr_scanning: false
    }
  }

  componentDidMount() {
    axios.get('/check_point/index')
      .then(res => {
        this.setState({
          check_points: res.data
        })
      })
  }

  selectCheckPoint(check_point_id) {
    this.setState({
      check_point_id: check_point_id,
      qr_scanning: true
    })
  }

  stopQRScanning() {
    this.setState({
      qr_scanning: false
    })
  }

  render() {
    return (
      <div>
        <List hidden={this.state.qr_scanning}>
          {this.state.check_points.map((check_point, i) => {
            return (
              <ListItem button key={i} onClick={this.selectCheckPoint.bind(this, check_point.id)}>
                <ListItemText inset primary={check_point.name}/>
              </ListItem>
            )
          })}
        </List>
          {this.state.qr_scanning ?
            <Pass checkPointId={this.state.check_point_id} onCancel={this.stopQRScanning.bind(this)}/> :
            null}
      </div>
    )
  }
}
