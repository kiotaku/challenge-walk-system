import React, { Component } from 'react'

export default class iOSQRScanner extends Component {
  medias = {
    audio: false,
    video: {
      facingMode: {
        exact: 'environment'
      }
    }
  }

  componentDidMount() {
    var my_awesome_script = document.createElement('script')
    my_awesome_script.setAttribute('src','https://cdn.jsdelivr.net/npm/jsqrcode@0.0.7/src/qrcode.min.js')
    document.head.appendChild(my_awesome_script)
    navigator.getUserMedia(this.medias, this.handleSuccess.bind(this), function() {})
    requestAnimationFrame(this.draw.bind(this))
    qrcode.callback = this.props.onScan
  }

  handleSuccess(stream) {
    this.video.srcObject = stream
  }

  draw() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.canvas.getContext('2d').drawImage(this.video, 0, 0)
    qrcode.decode()
    requestAnimationFrame(this.draw.bind(this))
  }

  render() {
    return (
      <div>
        <canvas style={{
          display: 'block',
          position: 'absolute',
          top: 0, left: 0,
          width: '100%', height: '100%' }}
          ref={(e) => this.canvas = e} id='qr-canvas'></canvas>
        <div style={{
          position: 'absolute',
          top: 10, left: 10,
          transformOrigin: 'left top',
          transform: 'scale(.1)' }}
          id='video-box'>
          <video style={{ display: 'block', transform: 'rotateZ(180deg)' }}
            ref={(e) => this.video = e} id="video" autoplay playsinline></video>
        </div>
      </div>
    )
  }
}
