import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import '../App.css'
import style from '../cssModules/map.module.css'
import { ReactComponent as ListIcon } from '../assets/listButton.svg'
import { ReactComponent as MapIcon } from '../assets/Map Icon.svg'
import { ReactComponent as AcceptsIcon } from '../assets/Recycling Items Accepted Bar.svg'
import { config } from '../Constants'

const url = config.url.baseUrl


const MapPage = () => {

  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [recCenters, setRecCenters] = useState([]) // need this?? Yes bc it has ids
  const [recCenterData, setRecCenterData] = useState([])
  const [activeCenter, setActiveCenter] = useState(null)
  const [showList, setShowList] = useState(false)



    const getDetails = (query) => {
      axios.get(`${url}/details/${query}`)
        .then(res => {
          
          setRecCenterData(res.data.result)
        })
        .catch(err => { console.error(err.message) })
    }


    const getLocations = () => {

        if (!navigator.geolocation) {
          console.log('Geolocation is not supported by your browser')

        } else {

          navigator.geolocation.getCurrentPosition((position) => {

            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)

            axios.get(`${url}/locations/${position.coords.latitude}/${position.coords.longitude}`)
              .then(res=> {
                setRecCenters(res.data.result)
                let tempArr = []

                res.data.result.map(loc=> {
                  tempArr.push(`&location_id[]=${loc.location_id}`)
                })
                getDetails(tempArr.join(''))

              })
              .catch(err=> {console.error(err.message)})
          }, () => {
            console.log('Unable to retrieve your location')
          })
        }

      }



    const listRecLocations = () => {
        setShowList(!showList)
    }

  useEffect(()=> {
    getLocations()
  }, [])


  return(
    <div className={style.container}>

      <Map center={[latitude, longitude]} zoom={10}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />


          {recCenters.map(loc=> (

            <Marker
                key={loc.location_id}
                position={[loc.latitude, loc.longitude]}
                onClick={()=> setActiveCenter(recCenterData[loc.location_id])}
            />
          ))}

          {activeCenter && (
            <Popup position={[activeCenter.latitude, activeCenter.longitude]} onClose={()=> {setActiveCenter(null)}}>
              <h2>{activeCenter.description}</h2>
              <span>{activeCenter.address}</span>
            </Popup>
          )}

      </Map>
        <div onClick={()=> listRecLocations()} className={`${style.listBtn} shadow-lg`}>
          <div style={{marginTop: '.2rem'}}>
            {showList ? <MapIcon/> : <ListIcon/>}
          </div>
        </div>

      { showList &&
        <div className={style.listContainer}>
        {  recCenters.map((loc, i)=> {
            return(
              <div className={`${style.card} shadow-md transition duration-500 ease-in-out`} key={i + loc.location_id}>
                <h1>{recCenterData[loc.location_id]?.description}</h1>
                <span>{recCenterData[loc.location_id]?.address}</span>
                <div className={style.cardSymbols}>
                  <AcceptsIcon/>
                </div>
              </div>
            )
          })}
        </div> }

    </div>
  )
}

export default MapPage
