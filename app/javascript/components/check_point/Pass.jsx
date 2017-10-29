import React, { Component } from 'react'
import axios from 'axios'
import Grid from 'material-ui/Grid'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import Icon from 'material-ui/Icon'
import QRScanner from 'QRScanner'

export default class Pass extends Component {
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

  pass() {
    axios.post('/check_point/pass', {
      number: this.state.number,
      status: 'pass',
      check_point_id: this.props.checkPointId
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
                <Typography component='p'>this user passed this check point</Typography>
              </CardContent>
              <CardActions>
                <Button dense onClick={this.cancel.bind(this)}>No</Button>
                <Button dense onClick={this.pass.bind(this)}>Yes</Button>
              </CardActions>
            </Card>
          </Grid> :
          <div>
            <QRScanner onScan={this.onScan.bind(this)}/>
            <Button fab color='primary' aria-label='back' onClick={this.props.onCancel}>
              <Icon>undo</Icon>
            </Button>
          </div>
        }
      </div>
    )
  }
}
