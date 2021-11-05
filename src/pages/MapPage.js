import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Map, TileLayer, Marker } from 'react-leaflet'
import '../App.css'
import style from '../cssModules/map.module.css'
import { ReactComponent as ListIcon } from '../assets/listButton.svg'



const MapPage = () => {

  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [recCenters, setRecCenters] = useState([])

    const getLocation = () => {

        if (!navigator.geolocation) {
          console.log('Geolocation is not supported by your browser')

        } else {

          navigator.geolocation.getCurrentPosition((position) => {

            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)

          }, () => {
            console.log('Unable to retrieve your location')
          })
        }
      }


    const listRecLocations = () => {
      console.log('List rec called')
      
    }



  useEffect(()=> {
    getLocation()
    axios.get(`http://localhost:5000/locations/${latitude}/${longitude}`)
      .then(res=> {
        console.log(res)
        setRecCenters(res.data.result)
      })
      .catch(err=> {console.error(err.message)})
  }, [])

  console.log(`lat: ${latitude}, long: ${longitude}`)
  console.log(recCenters)
  return(
    <div className={style.container}>

      <Map center={[latitude, longitude]} zoom={10}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[latitude, longitude]} />
          {recCenters.map(loc=> (
            <Marker key={loc.location_id} position={[loc.latitude, loc.longitude]} />
          ))}
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
