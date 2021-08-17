import React from 'react'
import { RoutesContext } from '../context/RoutesProvider'
import { UserLocationContext } from '../context/UserLocationProvider'
import { MapContainer, TileLayer, Marker, Popup, Tooltip  } from 'react-leaflet'
import IconLocation from '../components/leafletmap/IconLocation'

const FormSolicitudReciclaje = () => {
  const { points } = React.useContext(RoutesContext)
  const { stateUserOK, stateUserlocation, setStateUserLocation, getUserLocation, createUserLocation } = React.useContext(UserLocationContext)

  const procesarDatos = e => {
    e.preventDefault()
    let username = e.target.username.value
    let exp = /^(-?\d+\.)?-?\d+$/
    if (!username.trim()) {
      alert("Ingrese su nombre correctamente !!")
      return
    }
    if (!exp.test(stateUserlocation.lat) || !exp.test(stateUserlocation.lng)) {
      alert("Ingrese su ubicación correctamente !!")
      return
    }
    createUserLocation(username, stateUserlocation.lat, stateUserlocation.lng)
  }

  const obtenerUbicacion = () => {
    getUserLocation()
  }

  return (
    <main className="wrapper">
      <h1>Nuevo punto de recolección</h1>
      <p className="subtitle">Formulario para crear un nuevo punto de recolección de reciclaje</p>
      <form className="form" autoComplete="off" onSubmit={procesarDatos}>
        <label htmlFor="name">Nombre:</label>
        <input type="text" id="username" value={stateUserlocation.username} onChange={(e) => setStateUserLocation({ ...stateUserlocation, username: e.target.value })} />
        <div className="form-column">
          <p>Ubicación</p>
          <button type="button" className="btn btn-secondary" onClick={() => obtenerUbicacion()}>Obtener ubicación</button>
        </div>
        <label htmlFor="lat">Lat: </label>
        <input type="text" id="lat" value={stateUserlocation.lat} onChange={(e) => setStateUserLocation({ ...stateUserlocation, lat: e.target.value })} className="readonly" readOnly/>
        <label htmlFor="lng">Lng: </label>
        <input type="text" id="lng" value={stateUserlocation.lng} onChange={(e) => setStateUserLocation({ ...stateUserlocation, lng: e.target.value })} className="readonly" readOnly/>
        <p>Mapa</p>
        <div className="map-default">
          <MapContainer
            center={points.OvaloLaFamilia.latlng}
            zoom={13}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
              (stateUserlocation.lat && stateUserlocation.lng) && (
                <Marker
                  position={[stateUserlocation.lat, stateUserlocation.lng]}
                  icon={IconLocation('./icons/marker.svg')}
                  eventHandlers={{
                    click: (e) => {
                      setStateUserLocation({ ...stateUserlocation, lat: e.latlng.lat, lng: e.latlng.lng})
                    },
                  }}
                  draggable={true}
                  className="marker"
                >
                  <Popup>
                    <p>{stateUserlocation.username}</p>
                  </Popup>
                  <Tooltip direction="bottom" offset={[0, 18]} opacity={1} permanent className="marker-tooltip">{stateUserlocation.username}</Tooltip>
                </Marker>
              )
            }
          </MapContainer>
        </div>
        <button type="submit" className="btn btn-primary">Crear punto</button>
      </form>
      <div className="alerts-container">
        {
          stateUserlocation.loading && (
            <div className="alert">
              <p><i className="fas fa-spinner"></i> Creando nuevo punto</p>
            </div>
          )
        }
        {
          stateUserOK && (
            <div className="alert alert-ok">
              <p><i className="far fa-check-circle"></i> Creación correcta !!</p>
            </div>
          )
        }
      </div>
    </main>
  )
}

export default FormSolicitudReciclaje