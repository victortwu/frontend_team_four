import style from '../cssModules/greenerChoices.module.css'
import glass from '../assets/glassbottle.jpg'
import alum from '../assets/aluminum.jpg'
import bag from '../assets/shoppingbag.jpg'
import waterBtl from '../assets/waterbottle.jpg'

const GreenerChoices = () => {

const grnChoices = [
  {name: 'Glass Bottles', image: glass},
  {name: 'Aluminum Cans', image: alum},
  {name: 'Reusable Bags', image: bag},
  {name: 'Permanent Water Bottle', image: waterBtl},
  {name: 'Pikachu', image: 'https://imgur.com/N60aCtD.png'},
  {name: 'Optimus Prime', image: 'https://imgur.com/4KswcfD.png'},
  {name: 'Megatron', image: 'https://imgur.com/Mj4ED7x.png'},
]

  return(

    <div className={style.container}>
      <h1>Greener Choices</h1>
      <div className={style.scrollContainer}>

          {grnChoices.map(c=> {
            return(
              <div key={c.image} className={`${style.card} shadow-md`}>
                <img src={c.image} alt='no photo'/>
                <h2>{c.name}</h2>
              </div>
            )
          })}

      </div>

    </div>
  )
}

export default GreenerChoices
