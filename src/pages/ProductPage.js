import Loading from '../components/Loading'
import ProductCard from '../components/ProductCard'
import style from '../cssModules/productPage.module.css'

const ProductPage = props => {


  return(
          <div className={`${style.container} shadow-lg`}>
          <button className={style.closeBtn} onClick={()=> {props.setShowProductPage(false)}}>X</button>
            <div className={style.grid}>
              <div className={style.box1}>
                  {props.isLoading ? <ProductCard/> : <Loading/>}
              </div>
              <div className={style.box2}>
                  <h2>Do you see a plastic type number?</h2>
              </div>
              <div className={style.box3}>
                  <div className={style.mapBtn}/>
                  <div className={style.plasticTypeBtn}/>
              </div>

            </div>
          </div>
        )
}

export default ProductPage
// onClick={props.setShowProductPage(false)}


// {
//   props.isLoading ?    <Loading/>
//
//   : <>
//   <p>Barcode: {`${props.barcodeString}`}</p>
//
//   <p>Product info: {`${props.productData?.description}`}</p>
//     </>
// }
