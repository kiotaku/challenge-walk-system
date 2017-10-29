import React, { Component } from 'react'
import Instascan from 'instascan'

export default class AndroidQRScanner extends Component {
  componentDidMount() {
    let scanner = new Instascan.Scanner({ video: this.preview })
    scanner.addListener('scan', content => {
      console.info(content)
      this.props.onScan(content)
      scanner.stop()
    })
    Instascan.Camera.getCameras().then(cameras => {
      if (cameras.length > 0) {
        scanner.start(cameras[0])
      } else {
        console.error('No cameras found.')
      }
    }).catch(function (e) {
      console.error(e)
    })
  }

  render() {
    return (
      <video style={{
        display: 'block',
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%' }}
        ref={el => this.preview = el}></video>
    )
  }
}
