import { ReactComponent as RecIcon } from '../assets/Recycle Icon(white).svg'
import style from '../cssModules/loading.module.css'

const Loading = () => {

  return(
    <div className={style.container}>
          <div className={style.subContainer}>
              <div className={style.iconContainer}>
                <RecIcon/>
              </div>
          </div>
          <span style={{marginTop: '.5rem', color: 'white'}}>Searching...</span>


    </div>
  )
}

export default Loading
