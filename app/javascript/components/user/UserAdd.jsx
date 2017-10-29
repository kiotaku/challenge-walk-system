import React, { Component } from 'react'
import axios from 'axios'
import Grid from 'material-ui/Grid'
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table'
import Button from 'material-ui/Button'

export default class UserAdd extends Component {
  constructor() {
    super()
    this.state = {
      user_numbers: [],
    }
    axios.get('/user_status/index')
      .then((res) => {
        this.setState({
          user_numbers: res.data.map(user => user.number)
        })
      })
  }

  addUser() {
    axios.post('/user/new')
      .then(axios.get('/user_status/index'))
      .then((res) => {
        this.setState({
          user_numbers: res.data.map(user => user.number)
        })
      })
      .catch((e) => {
        console.error(e);
      })
  }

  render() {
    const { user_numbers } = this.state
    const slice_length = Math.ceil(user_numbers.length / 3)
    const users_three_line = [
      user_numbers.slice(0, slice_length),
      user_numbers.slice(slice_length, slice_length * 2),
      user_numbers.slice(slice_length * 2, slice_length * 3)
    ]
    const view_users_line = users_three_line[0].map((u, i) => {
      return [u, users_three_line[1][i], users_three_line[2][i]]
    })
    return (
      <Grid container spacing={0}>
        <Table>
          <TableBody>
            {view_users_line.map((line, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>{line[0]}</TableCell>
                  <TableCell>{line[1]}</TableCell>
                  <TableCell>{line[2]}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <Button raised color='primary' onClick={this.addUser.bind(this)}>Add</Button>
      </Grid>
    )
  }
}
