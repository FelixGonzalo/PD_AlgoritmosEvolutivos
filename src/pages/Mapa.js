import React from 'react'
import { MapContainer, TileLayer, Polyline } from 'react-leaflet'
import Markers from '../components/leafletmap/Markers'
import IconLocation from '../components/leafletmap/IconLocation'
import 'leaflet/dist/leaflet.css'

import { RoutesContext } from '../context/RoutesProvider'

const Mapa = () => {
  const { stateOK, points, getCollectionPoints, stateCollectionPoints, getOptimalRoute, stateOptimalRoute, removeCollectionPoints, runExample } = React.useContext(RoutesContext)

  const limeOptions = { color: '#ec3131' }

  React.useEffect(() => {
    getCollectionPoints()
    getOptimalRoute()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const eliminarTodosPuntos = ()  => {
    removeCollectionPoints()
  }

  const ejecutarEjemplo = () => {
    runExample()
  }

  return (
    <main className="mapview-fullscreen">
      <MapContainer
        center={points.ViveroNuevoChimbote.latlng}
        zoom={15}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          stateCollectionPoints.points.map((item, index) => (
            <Markers
              key={index}
              location={[item.latitud, item.longitud]}
              info={item.nombre}
              icon={IconLocation('./icons/marker.svg')}
            />
          ))
        }
        <Polyline pathOptions={limeOptions} positions={stateOptimalRoute.rutaFormateada} />
      </MapContainer>
      <div className="alerts-container">
        {
          stateOptimalRoute.loading && (
            <div className="alert">
              <p><i className="fas fa-spinner"></i> Cargando ruta optima</p>
            </div>
          )
        }
        {
          stateCollectionPoints.loading && (
            <div className="alert">
              <p><i className="fas fa-spinner"></i> Cargando marcadores</p>
            </div>
          )
        }
        {
          stateOK && (
            <div className="alert alert-ok">
              <p><i className="far fa-check-circle"></i> Listo Ruta optima</p>
            </div>
          )
        }
      </div>
      <div className="mapview-menu">
        <button onClick={() => eliminarTodosPuntos()} className="btn btn-secondary">Eliminar todos los puntos</button>
        <button onClick={() => ejecutarEjemplo()} className="btn btn-secondary">Ejecutar ejemplo</button>
      </div>
    </main>
  )
}

export default Mapa
