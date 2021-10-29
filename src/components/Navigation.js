import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../styleSheets/nav.css'

const Navigation =(props)=> {

  const [dropLinks, setDropLinks] = useState(false)
  const hamburgerButton = useRef(null)

  const spinHamburger =()=> {
    hamburgerButton.current.style = dropLinks ? 'animation: spinX .5s' : 'animation: spinE .5s'
  }

  const toggleDropDown =(e)=> {
      setDropLinks(!dropLinks)
  }

  const toggleNavClass = dropLinks ? 'showMenu' : 'hideMenu'

  const home = <Link
                  onClick={()=>{
                          toggleDropDown()
                          spinHamburger()
                          props.closeRecMenu(100)
                              }} id='navLink' to='/'
                                    >
                        <span className='text-dkG'>Home</span>
                    </Link>

  const map = <Link
                  onClick={()=>{
                        toggleDropDown()
                        spinHamburger()
                      }}id='navLink' to='/map'
                          >
                    <span className='text-dkG'>Map</span>
                </Link>

// this is a work around to get close button to work from all places
// just OPENS the materials modal from here
  const materials = <span className='text-dkG'
                            onClick={()=>{
                                toggleDropDown()
                                spinHamburger()
                                props.setShowRecycleSymbols(true)
                                }}
                                >
                      Recycling Code #
                     </span>

  return(

    <>
    <nav className='navBar'>
      <div className='logoCnt'>
        <Link to='/'>
            <div onClick={()=> props.closeRecMenu()} className='appLogo'></div>
        </Link>
      </div>



      <div ref={hamburgerButton} className='hamburger' onClick={()=> {
        toggleDropDown()
        spinHamburger()
      }}>
          {
            dropLinks ?
              <div id='xBurger'>
                <div id='xLine1'/>
                <div id='xLine2'/>
              </div>
            :  <>
              <div id='hamburgerLine'/>
              <div id='hamburgerLine'/>
              <div id='hamburgerLine'/>
              </>
          }
      </div>
    </nav>

    <div onClick={()=> {setDropLinks(false)
                        spinHamburger()}} className={toggleNavClass}>

        <div onClick={(e)=> e.stopPropagation()} className='menuBody'>
          <ul className='links'>

            <li>
              {home}
            </li>

            <li>
              {materials}
            </li>

            <li>
              {map}
            </li>

            <li onClick={()=> {
                toggleDropDown()
                spinHamburger()
              }}>
              Greener Choices
            </li>

            <li onClick={()=> {
                toggleDropDown()
                spinHamburger()
              }}>
              More Resources
            </li>

            <li onClick={()=> {
                toggleDropDown()
                spinHamburger()
              }}>
              About Us
            </li>

            <li onClick={()=> {
                toggleDropDown()
                spinHamburger()
              }}>
              Contact
            </li>

          </ul>
        </div>

    </div>
    </>
  )
}

export default Navigation
