const fs = require('fs')

//lee el archivo
const archivo = (ruta, delimitador) => {
  return fs.readFileSync(ruta).toString().split(delimitador)
}

//obtiene los apellidos de la lista de jugadores por equipo
const obtenerApellidos = (listaJugadores) => {
  apellidos = []
  listaJugadores.forEach(element => {
    apellidos.push(element.split(' ')[1])
  })
  return apellidos
}

const jugadoresEquipoA = obtenerApellidos(archivo('basket/equipo-A.txt', '\n'))
const jugadoresEquipoB = obtenerApellidos(archivo('basket/equipo-B.txt', '\n'))
const logs = archivo('basket/partido.log','\n')

//devuelve una lista de objetos, en la cual esta los apellidos y las anotaciones del log del partido
const anotacionPorJugadorEnLog = () => {
  datos = []
  logs.forEach(element => {
    let apellido =  element.split(',')[0]
    let anotacion = element.split(',')[1] === 'DOBLE'? 2 : 3
    datos.push({'apellido': apellido, 'anotacion': anotacion})
  });
  return datos
}

//busca el equipo ganador, iterando en la lista de log y sumando los goles por equipo
const equipoGanador = (listaAnotaciones) => {
  let puntosA = 0
  let puntosB = 0
  listaAnotaciones.forEach(jugador => {
    if (jugadoresEquipoA.includes(jugador.apellido)){
      puntosA += jugador.anotacion
    }
    if (jugadoresEquipoB.includes(jugador.apellido)){
      puntosB += jugador.anotacion
    }
  })
  return puntosA > puntosB? 'equipo A' : 'equipo B'
}  

//returna una lista con los puntos de cada uno de los 10 jugadores
const obtenerPuntosPorJugador = () => {
  let puntosPorJugador = []
  jugadoresEquipoA.concat(jugadoresEquipoB).forEach(element => {
    puntosPorJugador.push({'apellido': element, 'anotacion': 0})
  })
  return puntosPorJugador
}

//agarra a cada jugador, y recorre todo el log para ver cuantas veces aparece ese jugador y cuantos goles hizo, y los va sumando.
const goleador = (listaAnotaciones) => {
  let puntosPorApellidos = obtenerPuntosPorJugador()
  let max = 0
  let goleador = ''
  puntosPorApellidos.forEach(jugador => {
    listaAnotaciones.forEach(jugadorLog => {
      if (jugador.apellido === jugadorLog.apellido){
        jugador.anotacion += jugadorLog.anotacion
      }
    })
  })
  //una vez que tiene la lista por jugador, y cada una de sus anotaciones, busca el maximo.
  puntosPorApellidos.forEach(element => {
    if (element.anotacion > max ){
      max = element.anotacion
      goleador = element.apellido
    }
  })
  return goleador
}

console.log("Equipo ganador: "+equipoGanador(anotacionPorJugadorEnLog()))
console.log("Jugador que mas anoto: "+goleador(anotacionPorJugadorEnLog()))

