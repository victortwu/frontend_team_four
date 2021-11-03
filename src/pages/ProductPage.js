import Loading from '../components/Loading'
import ProductCard from '../components/ProductCard'
import style from '../cssModules/productPage.module.css'

const ProductPage = props => {
console.log(props.isLoading)
  return(






          <div className={style.container}>
            <div className={style.grid}>
              <div className={style.box1}>
                  <ProductCard/>
              </div>
              <div className={style.box2}>
                  <h2>Some title</h2>
              </div>
              <div className={style.box3}>
                  2 buttons
              </div>
                
            </div>
          </div>



  )
}

export default ProductPage
// {
//   props.isLoading ?    <Loading/>
//
//   : <>
//   <p>Barcode: {`${props.barcodeString}`}</p>
//
//   <p>Product info: {`${props.productData?.description}`}</p>
//     </>
// }
