import '../styleSheets/productPage.css'
import Loading from './Loading'

const ProductPage = props => {
console.log(props.isLoading)
  return(


    <div className='mainWrapper'>

        <div className='productWrapper'>

          <div className='boxOne'>
            {
              props.isLoading ?    <Loading/>

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
