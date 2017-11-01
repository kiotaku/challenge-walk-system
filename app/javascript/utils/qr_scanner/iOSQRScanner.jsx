import React, { Component } from 'react'
import QRCode from 'qrcode-reader'

export default class IOSQRScanner extends Component {
  medias = {
    audio: false,
    video: {
      facingMode: {
        exact: 'environment'
      }
    }
  }

  constructor() {
    super()
  }

  componentDidMount() {
    const qr = new QRCode()
    qr.callback = (error, result) => {
      if (error) {
        return
      }
      this.props.onScan(result.result)
    }
    navigator.mediaDevices.getUserMedia(this.medias)
      .then((stream) => {
        this.video.srcObject = stream
      })
      .catch((error) => {
        console.error(error)
      })
    requestAnimationFrame(this.draw.bind(this, qr))
  }

  draw(qr) {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.canvas.getContext('2d').drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height)
    qr.decode(this.canvas.getContext('2d').getImageData(0, 0, this.canvas.width, this.canvas.height))
    requestAnimationFrame(this.draw.bind(this, qr))
  }

  render() {
    return (
      <div>
        <canvas style={{
          display: 'block',
          position: 'absolute',
          top: 0, left: 0 }}
          ref={(e) => this.canvas = e} id='qr-canvas'></canvas>
        <div style={{
          position: 'absolute',
          top: 10, left: 10,
          transformOrigin: 'left top',
          transform: 'scale(.1)' }}
          id='video-box'>
          <video style={{ display: 'block' }}
            ref={(e) => this.video = e} id="video" autoPlay playsInline></video>
        </div>
      </div>
    )
  }
}
