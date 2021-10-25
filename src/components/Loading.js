import { ReactComponent as RecIcon } from '../assets/Recycle Icon(white).svg'
import '../styleSheets/productPage.css'

const Loading = () => {

  const style = {
      width: '10vw',
      height: '10vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      animation: 'loadingSpin 1.5s linear infinite',
  }

  return(
    <div style={{width: '15vw', height: '15vw', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <div style={style}>
          <RecIcon/>
        </div>
        <span style={{marginTop: '.5rem', color: 'white'}}>Searching...</span>
    </div>
  )
}

export default Loading
