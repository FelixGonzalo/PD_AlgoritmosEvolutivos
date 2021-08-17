import React from 'react'

export const RoutesContext = React.createContext()

const RoutesProvider = (props) => {

  const points = {
    OvaloLaFamilia: {
      name: "Ovalo la Familia",
      lat: -9.1282037,
      lng: -78.517,
      get latlng(){ return [this.lat, this.lng] }
    },
    ViveroNuevoChimbote: {
      name: "Vivero de Nuevo Chimbote",
      lat: -9.1291256,
      lng: -78.5121042,
      get latlng(){ return [this.lat, this.lng] }
    }
  } // puntos de referencia principales

  const [stateCollectionPoints, setStateCollectionPoints] = React.useState({
    points: [],
    loading: false
  })

  const [stateOptimalRoute, setStateOptimalRoute] = React.useState({
    distancia: 0,
    ruta: [],
    rutaFormateada: [],
    loading: false
  })

  const [stateOK, setStateOK] = React.useState(false)

  const showAlertOk = () => {
    setStateOK(true)
    setTimeout(() => setStateOK(false), 4000);
  }

  const createCollectionPoint = async (nombre, lat, lng) => {
    try {
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
    } catch (error) {
      console.log(error)
    }
  }

  const getCollectionPoints = async () => {
    try {
      setStateCollectionPoints({
        ...stateCollectionPoints,
        loading: true
      })
      const response = await fetch('https://viajerotsp.herokuapp.com/puntos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const data = await response.json();
      if (data.message !== "No existe puntos registrados") {
        setStateCollectionPoints({
          points: data,
          loading: false
        })
      } else {
        setStateCollectionPoints({
          ...stateCollectionPoints,
          loading: false
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const removeCollectionPoints = async () => {
    try {
      const response = await fetch('https://viajerotsp.herokuapp.com/eliminar/todo', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      setStateCollectionPoints({
        points: [],
        loading: false
      })
      setStateOptimalRoute({
        distancia: 0,
        ruta: [],
        rutaFormateada: [],
        loading: false
      })
    } catch (error) {
      console.log(error)
    }
  }

  const runExample = async () => {
    try {
      setStateCollectionPoints({
        ...stateCollectionPoints,
        loading: true
      })
      const response = await fetch('https://viajerotsp.herokuapp.com/poblar-puntos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
    } catch (error) {
      console.log(error)
    }
  }

  const getOptimalRoute = async () => {
    try {
      setStateOptimalRoute({ ...stateOptimalRoute, loading: true })
      const response = await fetch('https://viajerotsp.herokuapp.com/ruta', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const data = await response.json();
      const rutaFormateada = data.ruta.map((item) => {
        return [item.latitud, item.longitud]
      })
      setStateOptimalRoute({
        distancia: data.distancia,
        ruta: data.ruta,
        rutaFormateada: rutaFormateada,
        loading: false
      })
      showAlertOk()
    } catch (error) {
      setStateOptimalRoute({
        ...stateOptimalRoute,
        loading: false
      })
      console.log(error)
    }
  }



  /* ejemplos de demostracion */
  // const createExample1 = () => {
  //   createCollectionPoint(points.ViveroNuevoChimbote.name, points.ViveroNuevoChimbote.lat, points.ViveroNuevoChimbote.lng)
  //   createCollectionPoint("Vivero de Nuevo Chimbote", -9.1291256, -78.5121042)
  //   createCollectionPoint("Felix", -9.136431071364676, -78.51728512227766)
  //   createCollectionPoint("Chaufa Talico", -9.1294528147166, -78.51683476078561)
  //   createCollectionPoint("Gino Ascencio", -9.12104925874468, -78.51622301047843)
  //   createCollectionPoint("Angel", -9.123907515727065, -78.53695434223293)
  //   createCollectionPoint("Jordan", -9.120472086100033, -78.54145720714085)
  //   createCollectionPoint("Patrick", -9.120875805901418, -78.53130984640943)
  //   createCollectionPoint("Juan", -9.126542914577833, -78.52909564202912)
  //   createCollectionPoint("Lupe Flores", -9.12744634385097, -78.51132850008365)
  //   createCollectionPoint("Rosa", -9.133221718400645, -78.50820097548838)
  //   createCollectionPoint("Restauran Gonzalito", -9.140053393612543, -78.50245802599576)
  //   createCollectionPoint("Pedro", -9.145431915493127, -78.50641923958972)
  //   createCollectionPoint("Foto Felix", -9.115997867739274, -78.54011943497542)
  //   createCollectionPoint("Marisol", -9.113962210824935, -78.5379981822419)
  //   createCollectionPoint("Panaderia Don Pedrito", -9.119905179218225, -78.5279401654431 )
  //   createCollectionPoint("Gonzalo", -9.12302695324693, -78.51937298319774)
  //   createCollectionPoint("Sebastian", -9.120869018093508, -78.52185774200451)
  //   createCollectionPoint("Cevicheria Pescadito", -9.124005594635882, -78.5293550111817)
  //   createCollectionPoint("Teodoro", -9.12342842693463, -78.53014084257758)
  //   createCollectionPoint("Yessenia Cubas", -9.123731267830845, -78.52818824599588)
  //   createCollectionPoint("Ximena", -9.127151046290708, -78.53122342184238)
  //   createCollectionPoint("Mario", -9.126323158489592, -78.53212992222092)
  //   createCollectionPoint("Paula", -9.123133069733688, -78.53270785871882)
  //   createCollectionPoint("Milena", -9.139887987296426, -78.50152852625817)
  //   createCollectionPoint("Carlos", -9.137870102325, -78.50822666107541)
  //   createCollectionPoint("Julio", -9.136839856383366, -78.51263971724777)
  //   createCollectionPoint("Jaime Miranda", -9.134906142426487, -78.51794646983411)
  //   createCollectionPoint("Cesar Adolfo", -9.137053599520211, -78.52139791741868)
  //   createCollectionPoint("Pool Velasquez", -9.134545135954616, -78.52228724847704)
  //   createCollectionPoint("Andy Rosales", -9.134446563860122, -78.52369231269725)
  //   createCollectionPoint("Guillermo", -9.133348378106705, -78.52468613346109)
  // }

  return (
    <RoutesContext.Provider value={{ stateOK, points, getCollectionPoints, stateCollectionPoints, getOptimalRoute, stateOptimalRoute, removeCollectionPoints, runExample}}>
      {props.children}
    </RoutesContext.Provider>
  )
}

export default RoutesProvider
