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

const obtenerGoleador = (listaAnotaciones) =>{
  nombres  = []
  goles = []
  listaAnotaciones.forEach((item) => {
      if (nombres.indexOf(item.apellido) === -1){
      nombres.push(item.apellido)
      goles.push(item.anotacion)
    }
    else{
      goles[nombres.indexOf(item.apellido)] += item.anotacion
    }
  },)
  return nombres[goles.indexOf(Math.max.apply(null, goles))]
}

console.log("Equipo ganador: "+equipoGanador(anotacionPorJugadorEnLog()))
console.log("Jugador que mas anoto: "+obtenerGoleador(anotacionPorJugadorEnLog()))




