import React, { Component } from 'react'
import axios from 'axios'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table'

export default class UserImport extends Component {
  constructor() {
    super()
    this.state = {
      file_content: '',
      count: 0,
      user_numbers: []
    }
    axios.get('/user_status/index')
      .then((res) => {
        this.setState({
          user_numbers: res.data.map(user => user.number)
        })
      })
  }

  fileOnLoad(reader) {
    this.setState({
      file_content: reader.result,
      count: reader.result.split('\n').length - 1
    })
  }

  handleFileUpload(e) {
    const reader = new FileReader()
    reader.readAsText(e.target.files[0])
    reader.addEventListener('load', this.fileOnLoad.bind(this, reader), false)
  }

  import() {
    const user_datas = this.state.file_content.split('\n')
      .map(line => line.split(','))
    const users = user_datas.filter(data => data[1] && data[2] )
      .map(data => {
        return { identify: data[1], name: data[2] }
      })
    axios.post('/user/import', {
      users
    })
      .then(res => {
        const rows = res.data.users.map(user => [user.number].concat(user_datas.find(data => user.identify == data[1])))
        const bom = new Uint8Array([0xEF, 0xBB, 0xBF])
        const csvContent = rows.map(row => row.join(",")).join('\n')
        const encodedUri = URL.createObjectURL(new Blob([bom, csvContent], {type: 'text/csv'}))
        let link = document.createElement("a")
        link.setAttribute("href", encodedUri)
        link.setAttribute("download", "user_data.csv")
        link.click()
      })
      .then(() => {
        axios.get('/user_status/index')
          .then((res) => {
            this.setState({
              user_numbers: res.data.map(user => user.number)
            })
          })
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
      <Grid container spaceing={0}>
        <Grid item xs={12}>number of data : {this.state.count}</Grid>
        <Grid item xs={12}>
          <input onChange={this.handleFileUpload.bind(this)} id="file" type="file"/>
          <Button raised color='primary' onClick={this.import.bind(this)}>Create</Button>
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
      </Grid>
    )
  }
}
