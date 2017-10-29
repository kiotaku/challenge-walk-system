import React, { Component } from 'react'
import isMobile from 'ismobilejs'
import iOSQRScanner from './qr_scanner/iOSQRScanner'
import AndroidQRScanner from './qr_scanner/AndroidQRScanner'

export default class QRScanner extends Component {
  render() {
    if (isMobile.apple.device) {
      return (
        <iOSQRScanner onScan={this.props.onScan} />
      )
    } else {
      return (
        <AndroidQRScanner onScan={this.props.onScan} />
      )
    }
  }
}
