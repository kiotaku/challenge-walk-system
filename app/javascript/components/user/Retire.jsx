import React, { Component } from 'react'
import axios from 'axios'
import Grid from 'material-ui/Grid'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import QRScanner from 'QRScanner'

export default class Retire extends Component {
  constructor() {
    super()
    this.state = {
      scaned: false,
      number: 0
    }
  }

  onScan(number) {
    this.setState({
      scaned: true,
      number: parseInt(number)
    })
  }

  cancel() {
    this.setState({
      scaned: false
    })
  }

  retire() {
    axios.post('/user/retire', {
      number: this.state.number
    })
      .then(() => {
        this.setState({
          scaned: false
        })
      })
  }

  render() {
    return (
      <div>
        { this.state.scaned ?
          <Grid>
            <Card>
              <CardContent>
                <Typography type='headline'>{this.state.number}</Typography>
                <Typography component='p'>this user retired this check point</Typography>
              </CardContent>
              <CardActions>
                <Button dense onClick={this.cancel.bind(this)}>No</Button>
                <Button dense onClick={this.retire.bind(this)}>Yes</Button>
              </CardActions>
            </Card>
          </Grid> :
          <QRScanner onScan={this.onScan.bind(this)}/>
        }
      </div>
    )
  }
}
