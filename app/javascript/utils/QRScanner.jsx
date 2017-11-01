import React, { Component } from 'react'
import isMobile from 'ismobilejs'
import IOSQRScanner from './qr_scanner/iOSQRScanner'
import AndroidQRScanner from './qr_scanner/AndroidQRScanner'

export default class QRScanner extends Component {
  render() {
    if (isMobile.apple.device) {
      return (
        <IOSQRScanner onScan={this.props.onScan} />
      )
    } else {
      return (
        <AndroidQRScanner onScan={this.props.onScan} />
      )
    }
  }
}
