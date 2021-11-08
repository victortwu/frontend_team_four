import { Link }  from 'react-router-dom'
import Loading from '../components/Loading'
import GreenerChoices from '../components/GreenerChoices'
import card_style from '../cssModules/productCard.module.css'
import { ReactComponent as Message } from '../assets/CTA - Yes, recyclable.svg'
import style from '../cssModules/productPage.module.css'



const ProductPage = props => {

    return(
        <div className={style.parentContainer}>
          <div className={`${style.container} shadow-lg`}>
          <button className={style.closeBtn} onClick={()=> {props.setShowProductPage(false)}}>X</button>
            <div className={style.grid}>

              <div className={style.box1}>
                  {props.isLoading ?  <Loading/>
                    :   <div className={card_style.container}>
                            <img className={card_style.image} src={props.productData.map(item=> {return item.images[0]})} alt='no photo'/>
                            <div className={card_style.content}>
                              {(props.productData !== [])
                                    ? <h4>
                                        {props.productData.map(item=> {return item.brand})}
                                      </h4>

                                    : <h4 style={{color: 'red'}}>Product not found.</h4>}
                              <div>
                              <span>{props.productData.map(item=> {return item.title})}</span>
                              <div className={card_style.svgContainer}><Message/></div>
                              </div>
                            </div>
                      </div>}
              </div>

                {props.isLoading ? <div className={style.box2}>| | |</div> : <div className={style.box2}>

                      {(props.barcodeData.Successfull || props.productData !== []) ?

                                                        <div>
                                                          <h2>Number 1  *  PETE</h2>
                                                          <span style={{fontSize: '.8rem', fontStyle: 'italic'}}>(Polyethylene terephthalate)</span>
                                                        </div>

                                                        : <h2 style={{color: 'red'}}>
                                                                Could not read scanned image.
                                                          </h2>}
                </div>}

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
//
