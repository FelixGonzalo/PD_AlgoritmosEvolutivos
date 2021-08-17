import React from 'react'
import {Link} from 'react-router-dom'

const UserLocation = () => {

  const [state, setState] = React.useState({
    lat:0,
    lng: 0,
  })

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      },
      function (error) {
        console.log(error)
      },
      {
        enableHighAccuracy: true
      }
    )
  }, [])

  return (
    <div>
      <h1>Ubicación</h1>
      <p>lat: {state.lat}</p>
      <p>lng: {state.lng}</p>
      <Link
        to={{
          pathname: '/map',
          state
        }}
      >Ver mapa</Link>
    </div>
  )
}

export default UserLocation
