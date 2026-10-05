//AQUI TODA LA LOGICA DE LAS FUNCIONES DEL NEGOCIO
function calcularDisponible(ingresos, egresos) {
  let disponible = ingresos - egresos;

  if (disponible < 0) {
    return 0;
  }

  return disponible;
}

function calcular(){
  let ingresos = recuperarFloat("txtIngresos");
  let egresos = recuperarFloat("txtEgresos");

  let disponible = calcularDisponible(ingresos, egresos);

  mostrarTextoSpan("spnDisponible", disponible);
}

function calcularCapacidadPago(){
  1
}

//funciones de utilidades

function recuperarTexto(idComponente) {

  let componente = document.getElementById(idComponente);
  let valor = componente.value;

  return valor
}

function recuperarFloat(idComponente) {

  let valorTexto = recuperarTexto(idComponente);
  let valorFloat = parseFloat(valorTexto);

  return valorFloat;
}

function mostrarTextoSpan(idSpan, texto) {
  const span = document.getElementById(idSpan);
  if (span) {
    span.textContent = texto;
  } else {
    console.error(`No se encontró un elemento con id "${idSpan}"`);
  }
}

//fin de funciones de utilidades