import '../styleSheets/productPage.css'

const ProductPage =(props) => {

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

export default ProductPage
