import React from 'react'
import { Marker, Popup, Tooltip } from 'react-leaflet'

const Markers = (props) => {
  return (
    <Marker
      position={props.location}
      icon={props.icon}
      draggable={false}
      className="marker"
    >
      <Popup>
        <p>{props.info}</p>
        {/* <img className="foto" src={props.img} alt="foto"/> */}
      </Popup>
      <Tooltip direction="bottom" offset={[0, 18]} opacity={1} permanent className="marker-tooltip">{props.info}</Tooltip>
    </Marker>
  )
}

export default Markers
