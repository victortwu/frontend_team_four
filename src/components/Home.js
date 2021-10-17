import { Link } from 'react-router-dom'
import '../home.css'


const Home = () => {



  return(
    <div className='homeCnt'>
        <div style={{height: '20%'}}/>
        <div className='mx-6'>
            <header>
                <h3>Scan & Sea</h3>
                <p>your plastic our oceans</p>
            </header>

            <Link to='/scanner'>
                <div id='scanBtnLink' className='rounded-full'>
                    <div id='searchIcon'>ic</div>
                    <p>Search Product</p>
                    <div id='bcodeIcon'>ic</div>
                </div>
            </Link>
        </div>

        <div className='flex justify-evenly mx-4'>
            <Link to='/map'>
            <div id='mapBtn'>map div</div>
            </Link>

            <Link to='/materials'>
            <div id='materialsBtn'>materials div</div>
            </Link>
        </div>

    </div>
  )
}

export default Home
