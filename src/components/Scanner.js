import React, { useState, useRef, useCallback } from 'react'
import Webcam from 'react-webcam'


const Scanner = () => {

  const [scanData, setScanData] = useState('')
  const [pic, setPic] = useState('') // won't need this, just for visual feedback

  const webCamRef = useRef(null)



  // credit:
  // https://stackoverflow.com/questions/16968945/convert-base64-png-data-to-javascript-file-objects/16972036
  const dataURLtoFile = (dataurl, filename) => {
      let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
      while(n--){
          u8arr[n] = bstr.charCodeAt(n)
      }
      const file = new File([u8arr], filename, {type:mime})
      setScanData(file)
  }


  const scan = useCallback(
    () => {
      const imgSrc = webCamRef.current.getScreenshot()
      setPic(imgSrc) // won't need this setPic(), just for visual feedback
      dataURLtoFile(imgSrc, 'barcode.png')
    },
    [webCamRef]
  )


  const styleForParent = {
    position: 'relative',
    height: '25rem',
  }

  const styleForChild = {
    postion: 'absolute',
    left: '0',
    top: '0',
    right: '0',
    bottom: '0',
    zIndex: '1000' // <--- NOT COOPERATING!!
  }

  console.log(scanData)

return(
    <>
        <div style={styleForParent} className='m-5'>

            <div style={styleForChild}>
              <h1>Z-index not working</h1>
            </div>

            <Webcam
                style={{position: 'absolute', top: '0', zIndex: '0'}}
                ref={webCamRef}
                screenshotFormat='image/jpeg'
            />

        </div>

        <button className='bg-gray-600 text-gray-200 m-5 p-2 rounded-sm' onClick={scan}>scan</button>

        {
          pic && (<img src={pic} />)
        }

    </>
  )
}

export default Scanner
