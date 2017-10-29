import React, { Component } from 'react'
import axios from 'axios'
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

export default class CheckPointSettings extends Component {
  constructor() {
    super()
    this.state = {
      check_points: [],
      check_point_name: '',
    }
  }

  componentDidMount() {
    axios.get('/check_point/index')
      .then(res => {
        this.setState({
          check_points: res.data ? res.data : []
        })
      })
  }

  checkPointDelete(index) {
    this.setState({
      check_points: this.state.check_points.filter((check_point, i) => i !== index)
    })
  }

  onChangeName(e) {
    this.setState({
      check_point_name: e.target.value
    })
  }

  addCheckPoint() {
    this.setState({
      check_points: this.state.check_points.concat({ name: this.state.check_point_name }),
      check_point_name: ''
    })
  }

  saveCheckPoints() {
    axios.post('/check_point/set', { check_points: this.state.check_points })
      .then(() => {
        location.reload()
      })
  }

  render() {
    return (
      <Grid container>
        <Grid item xs={12}>
          <List>
            { this.state.check_points.map((check_point, i) => {
              return (
                <ListItem key={i}>
                  <ListItemText primary={check_point.name} />
                  <ListItemSecondaryAction>
                    <Button dense color='primary' onClick={this.checkPointDelete.bind(this, i)}>
                      Delete
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              )
            }) }
          </List>
        </Grid>
        <Grid container direction='row' alignItems='center'>
          <Grid item xs={10}>
            <TextField inputClassName='check-point-name'
              fullWidth label="Name" margin="none" value={this.state.check_point_name} onChange={this.onChangeName.bind(this)}/>
          </Grid>
          <Grid item xs={2}>
            <Button dense color='primary' onClick={this.addCheckPoint.bind(this)}>Add</Button>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button raised color='primary' onClick={this.saveCheckPoints.bind(this)}>Save</Button>
        </Grid>
      </Grid>
    )
  }
}
