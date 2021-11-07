
import React, { useState, useEffect } from 'react'
import style from '../cssModules/productCard.module.css'
import { ReactComponent as Message } from '../assets/CTA - Yes, recyclable.svg'

const ProductCard = (props) => {


  const [image, setImage] = useState(false)

  const checkForImage = () => {
    if ( !props.productData.images ) {
      setImage(false)
    } else {
      setImage(true)
    }
  }

  const isProduct = !props.productData.brand ? false : true

  useEffect(()=> {
    setTimeout(()=> {
      checkForImage()
    }, 2000)

  }, [])


  return(
    <div className={style.container}>
    <img className={style.image} src={image ? props.productData.images[0] : ''} alt='no photo'/>
      <div className={style.content}>
        {isProduct ? <h4>{props.productData.brand}</h4> : <h4 style={{color: 'red'}}>Product not found.</h4>}
        <div>
        <span>{props.productData.title}</span>
        <div className={style.svgContainer}><Message/></div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
