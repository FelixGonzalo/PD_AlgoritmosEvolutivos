import React from 'react'
export const UserLocationContext = React.createContext()

const UserLocationProvider = (props) => {

  const [stateUserlocation, setStateUserLocation] = React.useState({
    username: "Punto actual",
    lat: -9.1282037,
    lng: -78.517,
    get latlng() {
      return [this.lat, this.lng]
    },
    loading: false
  })

  const [stateUserOK, setStateUserOK] = React.useState(false)

  const showAlertOk = () => {
    setStateUserOK(true)
    setTimeout(() => setStateUserOK(false), 4000);
  }

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      alert("Tecnología de localización no soportada por su navegador")
    } else {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          var lat = position.coords.latitude;
          var lng = position.coords.longitude;
          setStateUserLocation({
            ...stateUserlocation,
            lat: lat,
            lng: lng
          })
        },
        function (error) {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
        }
      )
    }
  }

  const createUserLocation = async (nombre, lat, lng) => {
    try {
      setStateUserLocation({ ...stateUserlocation, loading: true })
      var newPunto = {
        "nombre": nombre,
        "latitud": lat,
        "longitud": lng
      }
      const response = await fetch('https://viajerotsp.herokuapp.com/punto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPunto)
      })
      setStateUserLocation({
        ...stateUserlocation,
        username: nombre,
        lat: lat,
        lng: lng,
        loading: false
      })
      if (response.status !== 500) {
        showAlertOk()
      }
    } catch (error) {
      console.log("error")
      console.log(error)
    }
  }

  return (
    <UserLocationContext.Provider value={{ stateUserOK, stateUserlocation, setStateUserLocation, getUserLocation, createUserLocation}}>
      {props.children}
    </UserLocationContext.Provider>
  )
}

export default UserLocationProvider
