import '../productPage.css'

const ShowScanned =(props) => {

  return(


    <div className='mainWrapper'>

        <div className='productWrapper'>

          <div className='boxOne'>
            <p>Barcode: {`${props.barcodeString}`}</p>

            <p>Product info: {`${props.productData?.description}`}</p>

            <button onClick={props.closePrPg}>BACK</button>
          </div>

        </div>

    </div>
  )
}

export default ShowScanned
