// DEPRECATED DO NOT USE

import React from 'react'

const WebCam = () => {
  // to get video element
  const displayElement = React.useRef()

  // just thinking in the near future size can be dynamic
  const style = {
    marginTop: '5rem',
    margin: 'auto',
    width: '75%'
  }

  // This is using javascript MediaStream API
  // the next step is to get snapshops

  // perhaps... https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/captureStream

  // perhaps... npm Zxing library for barcode reading

  React.useEffect(()=> {
    navigator.mediaDevices.enumerateDevices()
      .then(devs => {
        const cam = devs.find(dev => dev.kind === 'videoinput')
        if ( cam ) {
          const constraints = { deviceId: { exact: cam.deviceId } }
          return navigator.mediaDevices.getUserMedia( { video: constraints } )
        }
      })
      .then(stream => (displayElement.current.srcObject = stream))
      .catch(err => console.error(err))
  }, [])

  return(
    <video ref={displayElement} id='camDisplay' autoPlay style={style}></video>
  )
}

export default WebCam
