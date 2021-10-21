

const ShowScanned =(props) => {

  return(
    <div className='bg-cl4 h-full'>
      Barcode: {`${props.barcodeString}`}

      Product info: {`${props.productData.description}`}

      <button onClick={props.closePrPg}>BACK</button>
    </div>
  )
}

export default ShowScanned
