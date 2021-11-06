import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import '../App.css'
import style from '../cssModules/map.module.css'
import { ReactComponent as ListIcon } from '../assets/listButton.svg'



const MapPage = () => {

  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [recCenters, setRecCenters] = useState([]) // need this?? Yes bc it has ids
  const [recCenterData, setRecCenterData] = useState([])
  const [activeCenter, setActiveCenter] = useState(null)
  const [locationIds, setLocationIds] = useState([])
  


    const getDetails = (query) => {
      axios.get(`http://localhost:5000/details/${query}`)
        .then(res => {
          console.log(res)
          setRecCenterData(res.data.result)
        })
        .catch(err => { console.error(err.message) })
    }


    const getLocation = () => {

        if (!navigator.geolocation) {
          console.log('Geolocation is not supported by your browser')

        } else {

          navigator.geolocation.getCurrentPosition((position) => {

            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)

            axios.get(`http://localhost:5000/locations/${position.coords.latitude}/${position.coords.longitude}`)
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
      console.log(recCenters)

    }

  useEffect(()=> {
    getLocation()
  }, [])

  console.log(recCenterData)
  return(
    <div className={style.container}>

      <Map center={[latitude, longitude]} zoom={10}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[latitude, longitude]} />

          {recCenters.map(loc=> (

            <Marker
                key={loc.location_id}
                position={[loc.latitude, loc.longitude]}
                onClick={()=> setActiveCenter(loc)}
            />
          ))}

          {activeCenter && (
            <Popup position={[activeCenter.latitude, activeCenter.longitude]} onClose={()=> {setActiveCenter(null)}}>
              <h2>{activeCenter.description}</h2>
              <span>{activeCenter.distance} miles</span>
            </Popup>
          )}

      </Map>
        <div onClick={()=> listRecLocations()} className={`${style.listBtn} shadow-lg`}>
          <div style={{marginTop: '.2rem'}}>
            <ListIcon/>
          </div>
        </div>
    </div>
  )
}

export default MapPage
