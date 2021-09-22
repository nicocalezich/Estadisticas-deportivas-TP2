const fs = require('fs')

//lee el archivo
const archivo = (ruta, delimitador) => {
  return fs.readFileSync(ruta).toString().split(delimitador)
}

const obtenerEquipoA = () =>{
  return obtenerApellidos(archivo('basket/equipo-A.txt','\n'))
}

const obtenerEquipoB = () =>{
  return obtenerApellidos(archivo('basket/equipo-B.txt','\n'))
}

const obtenerLog = () =>{
  return archivo('basket/partido.log','\n')
}

//obtiene los apellidos de la lista de jugadores por equipo
const obtenerApellidos = (listaJugadores) => {
  apellidos = []
  listaJugadores.forEach(element => {
    apellidos.push(element.split(' ')[1])
  })
  return apellidos
}

//devuelve una lista de objetos, en la cual esta los apellidos y las anotaciones del log del partido.
const anotacionPorJugadorEnLog = () => {
  datos = []
  obtenerLog().forEach(element => {
    let apellido =  element.split(',')[0]
    let anotacion = element.split(',')[1] === 'DOBLE'? 2 : 3
    datos.push({apellido, anotacion})
  });
  return datos
}

//devuelve el equipo ganador, dependiendo de cual hizo mas puntos
const equipoGanador = (listaAnotaciones) => {
  let puntosA = contarPuntos(obtenerEquipoA(), listaAnotaciones)
  let puntosB = contarPuntos(obtenerEquipoB(), listaAnotaciones)
  return  puntosA > puntosB ? 'equipo A' : 'equipo B'
}

//recibe un equipo y la lista total de anotaciones del partido y devuelve los puntos que hizo ese equipo.
const contarPuntos = (equipo, listaAnotaciones) => {
  let puntos = 0 
  listaAnotaciones.forEach(jugador => {
    if (equipo.includes(jugador.apellido)){
      puntos += jugador.anotacion
    }
  })
  return puntos
}

//returna una lista con los puntos de cada uno de los 10 jugadores
const obtenerTodosLosJugadores = (jugadoresA, jugadoresB) => {
  let totalJugadores = []
  listasConcatenadas(jugadoresA,jugadoresB).forEach(element => {
    totalJugadores.push({'apellido': element, 'anotacion': 0})
  })
  return totalJugadores
}

const listasConcatenadas = (lista1, lista2) =>{
  return lista1.concat(lista2)
}

//agarra a cada jugador, y recorre todo el log para ver cuantas veces aparece ese jugador y cuantos goles hizo, y los va sumando.
const obtenerAnotacionPorJugador = (listaAnotaciones, jugadores) =>{
  jugadores.forEach(jugador => {
    listaAnotaciones.forEach(jugadorLog => {
      if (jugador.apellido === jugadorLog.apellido){
        jugador.anotacion += jugadorLog.anotacion
      }
    })
  })
  return jugadores
}

//una vez que tiene la lista por jugador, y cada una de sus anotaciones, busca el maximo.
const goleador = (listaAnotaciones, jugadoresA, jugadoresB) => {
  let max = 0
  let goleador = ''
  let anotacionPorJugador = obtenerAnotacionPorJugador(listaAnotaciones, obtenerTodosLosJugadores(jugadoresA, jugadoresB))
  anotacionPorJugador.forEach(jugador => {
    if (jugador.anotacion > max ){
      max = jugador.anotacion
      goleador = jugador.apellido
    }
  })
  return goleador
}

console.log("Equipo ganador: "+equipoGanador(anotacionPorJugadorEnLog()))
console.log("Jugador que mas anoto: "+goleador(anotacionPorJugadorEnLog(), obtenerEquipoA(), obtenerEquipoB()))





