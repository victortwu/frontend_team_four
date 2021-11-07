import { Link }  from 'react-router-dom'
import Loading from '../components/Loading'
import ProductCard from '../components/ProductCard'
import GreenerChoices from '../components/GreenerChoices'
import style from '../cssModules/productPage.module.css'

const ProductPage = props => {
console.log(props.productData)



console.log(props.isLoading)
  return(
        <div className={style.parentContainer}>
          <div className={`${style.container} shadow-lg`}>
          <button className={style.closeBtn} onClick={()=> {props.setShowProductPage(false)}}>X</button>
            <div className={style.grid}>

              <div className={style.box1}>
                  {props.isLoading ?  <Loading/> : <ProductCard productData={props.productData}/>}
              </div>

              <div className={style.box2}>
                  {props.barcodeData.Successfull ? <div>
                            <h2>Number 1  *  PETE</h2>
                            <span style={{fontSize: '.8rem', fontStyle: 'italic'}}>(Polyethylene terephthalate)</span>
                    </div> : <h2 style={{color: 'red'}}>Could not read scanned image.</h2>}
              </div>

              <div className={style.box3}>
                  <Link to='/map'><div className={style.mapBtn}/></Link>
                  <div onClick={()=> props.setShowRecycleSymbols(true)} className={style.plasticTypeBtn}/>
              </div>

            </div>
          </div>

          <div className={style.containerTwo}>

            <GreenerChoices/>


          </div>

        </div>
        )
}

export default ProductPage
// onClick={props.setShowProductPage(false)}
//
