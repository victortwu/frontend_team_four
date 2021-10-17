import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../nav.css'

const Navigation =()=> {

  const [dropLinks, setDropLinks] = useState(false)
  const hamburgerButton = useRef(null)

  const spinHamburger =()=> {
    hamburgerButton.current.style = dropLinks ? 'animation: spinX .5s' : 'animation: spinE .5s'
  }

  const toggleDropDown =()=> {
    dropLinks ? setDropLinks(false) : setDropLinks(true)
  }

  const toggleNavClass = dropLinks ? 'dropMenu' : 'hideMenu'

  const home = <Link id='navLink' to='/'>Home</Link>
  const scanner = <Link id='navLink' to='/scanner'>Scan Barcode</Link>
  const map = <Link id='navLink' to='/map'>Map</Link>
  const materials = <Link id='navLink' to='/materials'>Materials</Link>

  return(
    <nav className='navBar'>
    <Link to='/'>
        <h1 className='appLogo'>greenScan</h1>
    </Link>


      <div className={toggleNavClass}>
        <ul className='links'>

          <li onClick=
          {
            ()=> {
              toggleDropDown()
              spinHamburger()
            }
          }>
            {home}
          </li>

          <li onClick=
          {
            ()=> {
              toggleDropDown()
              spinHamburger()
            }
          }>
            {scanner}
          </li>

          <li onClick=
          {
            ()=> {
              toggleDropDown()
              spinHamburger()
            }
          }>
            {map}
          </li>

          <li onClick=
          {
            ()=> {
              toggleDropDown()
              spinHamburger()
            }
          }>
            {materials}
          </li>

        </ul>
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
  )
}

export default Navigation
