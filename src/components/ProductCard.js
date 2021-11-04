import style from '../cssModules/productCard.module.css'
import { ReactComponent as Message } from '../assets/CTA - Yes, recyclable.svg'

const ProductCard = () => {
  return(
    <div className={style.container}>
      <img className={style.image} src='https://imgur.com/4KswcfD.jpg'/>
      <div className={style.content}>
        <h4>Soda Bottle</h4>
        <div>
        <span>Coca Cola 32 fl oz</span>
        <div className={style.svgContainer}><Message/></div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
