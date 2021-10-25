import '../styleSheets/productPage.css'
import Loading from './Loading'

const ProductPage = props => {

  return(


    <div className='mainWrapper'>

        <div className='productWrapper'>

          <div className='boxOne'>
            {
              props.isLoading ?    <div style={{top: '4rem', left: '50%', transform: 'translateX(-50%)'}}>
                                      <Loading/>
                                    </div>
              : <>
              <p>Barcode: {`${props.barcodeString}`}</p>

              <p>Product info: {`${props.productData?.description}`}</p>
                </>
            }



            <button onClick={props.closePrPg}>BACK</button>
          </div>

        </div>

    </div>
  )
}

export default ProductPage
