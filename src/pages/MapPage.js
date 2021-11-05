import React, { useState, useEffect } from 'react'
import { Map, TileLayer, Marker } from 'react-leaflet'
import '../App.css'




const MapPage = () => {

  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)

  const getLocation = () => {
      if (!navigator.geolocation) {
        console.log('Geolocation is not supported by your browser');
      } else {

        navigator.geolocation.getCurrentPosition((position) => {

          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        }, () => {
          console.log('Unable to retrieve your location');
        })
        }
  }

  useEffect(()=> {
    getLocation()
  }, [])

  console.log(`lat: ${latitude}, long: ${longitude}`)

  return(
    <>
    <Map center={[latitude, longitude]} zoom={10}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]} />
    </Map>
    </>
  )
}

export default MapPage
