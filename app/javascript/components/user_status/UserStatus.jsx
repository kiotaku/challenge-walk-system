import React, { Component } from 'react'
import axios from 'axios'
import Grid from 'material-ui/Grid'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import TextField from 'material-ui/TextField'
import Stepper from 'react-stepper-horizontal'

export default class UserStatus extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      check_points: [],
      view_users: [],
      search_text: ''
    }
  }

  componentDidMount() {
    axios.get('/user_status/index')
      .then((res) => {
        this.setState({
          users: res.data,
          view_users: res.data
        })
      })
    axios.get('/check_point/index')
      .then((res) => {
        this.setState({
          check_points: res.data
        })
      })
  }

  onChangeSearchtext(e) {
    this.setState({
      search_text: e.target.value
    })
    let cond = {
      numbers: [],
      not_pass: [],
      pass: [],
      state: ''
    }
    e.target.value.split(' ').forEach(x => {
      let found = null
      if (found = x.match(/not_pass:(.+)/i)) {
        if (NaN !== parseInt(found[1])) {
          cond.not_pass.push(parseInt(found[1]) - 1)
        }
      } else if (found = x.match(/pass:(.+)/i)) {
        if (NaN !== parseInt(found[1])) {
          cond.pass.push(parseInt(found[1]) - 1)
        }
      } else if (found = x.match(/status:(.*)/i)) {
        cond.state = found[1]
      } else {
        if (NaN !== parseInt(x)) {
          cond.numbers.push(parseInt(x))
        }
      }
    })
    this.setState({
      view_users: this.state.users.filter(user => {
        if (e.target.value == '') return true
        return cond.numbers.includes(user.number) ||
          cond.pass.reduce((acc, x) => acc || user.check_point_statuses[x].status === 'pass', false) ||
          cond.not_pass.reduce((acc, x) => acc || user.check_point_statuses[x].status === 'not pass', false) ||
          cond.state === user.state
      })
    })
  }

  renderStepper(check_points, statuses) {
    const activeStep = statuses.findIndex(x => x.status === 'not pass' || x.status === 'retire')
    const retired = statuses.filter(x => x.status === 'retire').length !== 0
    return (
      <Stepper
        steps={check_points.map(check_point => { return { title: check_point.name } })}
        defaultColor={retired ? '#F44336' : '#E0E0E0'}
        activeStep={activeStep != -1 ? activeStep - 1 : check_points.length }/>
    )
  }

  render() {
    return (
      <Grid container spacing={0}>
        <TextField inputClassName='search' fullWidth margin='none' label='search' value={this.state.search_text} onChange={this.onChangeSearchtext.bind(this)} />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Number</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Progress</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.view_users.map(user => {
              return (
                <TableRow key={user.id}>
                  <TableCell>{user.number}</TableCell>
                  <TableCell>{user.state}</TableCell>
                  <TableCell>{this.renderStepper(this.state.check_points, user.check_point_statuses)}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Grid>
    )
  }
}
