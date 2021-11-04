import { Link }  from 'react-router-dom'
import Loading from '../components/Loading'
import ProductCard from '../components/ProductCard'
import style from '../cssModules/productPage.module.css'

const ProductPage = props => {
console.log(props.productData)
console.log(props.isLoading)
  return(
          <div className={`${style.container} shadow-lg`}>
          <button className={style.closeBtn} onClick={()=> {props.setShowProductPage(false)}}>X</button>
            <div className={style.grid}>
              <div className={style.box1}>
                  {props.isLoading ?  <Loading/> : <ProductCard productData={props.productData}/>}
              </div>
              <div className={style.box2}>
                  <h2>Do you see a plastic type number?</h2>
              </div>
              <div className={style.box3}>
                  <Link to='/map'><div className={style.mapBtn}/></Link>
                  <div onClick={()=> props.setShowRecycleSymbols(true)} className={style.plasticTypeBtn}/>
              </div>

            </div>
          </div>
        )
}

export default ProductPage
// onClick={props.setShowProductPage(false)}
