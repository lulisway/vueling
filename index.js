//"use strict"

// import { writeHeapSnapshot } from "v8"


let arrayPassengers = []
function writePassengers(arrayPassengers){
  let i
  let passengersUrl
  let result = ""
    for (i=0; i < arrayPassengers.length; i++){
      passengersUrl = arrayPassengers[i].toString()
      result += `/${passengersUrl}`
      console.log(result)
      
    }
<<<<<<< HEAD
    return result
    
}

let search = document.getElementById('searchForm')
search.addEventListener('submit', (evt)=>{

evt.preventDefault()

// let departureAirport = document.getElementById('departureAirport').value
// let arrivalAirport = document.getElementById('arrivalAirport').value

let departureDate = getDepartureDate()
let returnDepartureDate = getReturnDepartureDate()
console.log(getDepartureDate())
console.log(getReturnDepartureDate())

let aditionalPassengers = writePassengers(arrayPassengers)
function writePassengers(arrayPassengers){
  let i
  let passengersUrl
  let result = ""
    for (i=0; i < arrayPassengers.length - 1; i++){
      result += `${arrayPassengers[i].toString()}-`
      console.log(result)
    }
    result += `${arrayPassengers[i].toString()}`
    return result   
}


//let returnDepartureDate = document.getElementById('returnDepartureDate').value


let departureAirport= getDepartureAirport();
// console.log(departureAirport);

let arrivalAirport= getArrivalAirport();
// console.log(arrivalAirport);

let petition = `http://localhost:8888/search/D/${departureAirport}/A/${arrivalAirport}/DD/${departureDate}/AD/${returnDepartureDate}/PA/${aditionalPassengers}`

console.log("petition: " + petition)

searchFlights(petition)

})


function searchFlights(petition){
  fetch(petition, { method : 'GET'})
    .then(response => response.json())
    .then(data => {
      if (data.msg  ){
      //renderNotFound(data.msg)
      console.log(data.msg)
      }
      else{
      console.log("La data que llega a front: ", data)
      renderResult(data)
    }
    })
  }

// ------------ RENDER VIEW FUNCTIONS ------------ //

// const renderNotFound = (msg) => {
//   document.getElementById('labelDeparture').innerHTML = msg
// }
function renderResult(data) {
  let departureAirport = document.getElementById("labelDeparture")
  let arrivalAirport = document.getElementById("labelArrival")
  let departureDate = document.getElementById("labelDepartureDate")
  let departureTime = document.getElementById("departureTime")
  let arrivalTime = document.getElementById("arrivalTime")
  let returnDepartureAirport = document.getElementById("labelReturnDA")
  let returnArrivalAirport = document.getElementById("labelReturnAA")
  let returnDate = document.getElementById("labelReturnDate")
  let returnDepartureTime = document.getElementById("returnDepartureTime")
  let returnArrivalTime = document.getElementById("returnArrivalTime")
  departureAirport.innerHTML = data.departureAirport
  arrivalAirport.innerHTML = data.arrivalAirport
  departureDate.innerHTML = data.departureDate
  departureTime.innerHTML = data.departureTime
  arrivalTime.innerHTML = data.arrivalTime
  returnDepartureAirport.innerHTML = data.returnDepartureAirport
  returnArrivalAirport.innerHTML = data.returnArrivalAirport
  returnDate.innerHTML = data.returnDate
  returnDepartureTime.innerHTML = data.returnDepartureTime
  returnArrivalTime.innerHTML = data.returnArrivalTime
}

function functDir(){
  if(document.getElementById('selectDir').value == "departure") {
    document.getElementById("returnDepartureDateDiv").style.display = "none";
    returnDepartureDate=null;
  }
  else{document.getElementById("returnDepartureDateDiv").style.display = "flex";
  }
}

function LabelAges(){
  document.getElementById("label-ages").innerHTML = "Selecciona sus edades";
}

function callResponse(){
  var x = document.getElementById("response");
  if (x.style.display === "none") {
    x.style.display = "flex";
    location.href = '#response';
  } else {
    x.style.display = "none";
  }
 }


// ------------ AIRPORTS INPUTS FUNCTIONS ------------ //
/// SELECT ORIGEN Y DESTINO ///

//--- --- origen --- ---- //
function getDepartureAirport(){
  let returnDepartureAirport= document.getElementById('departureOptions').value;
console.log(returnDepartureAirport)

  return returnDepartureAirport;
}

function getArrivalAirport(){
  let returnArrivalAirport= document.getElementById('arrivalOptions').value;
  console.log(returnArrivalAirport)
  return returnArrivalAirport;
}
  console.log(getArrivalAirport());
  console.log(getDepartureAirport());

=======
    return result 
}

let search = document.getElementById('searchForm')
search.addEventListener('submit', (evt)=>{
>>>>>>> Nora

evt.preventDefault()
//funcion ventana de espera style.display=block

<<<<<<< HEAD
// -------------- DATES INPUTS FUNCTIONS ------------- //

function getDepartureDate(){
  let departureDate = document.getElementById('departureDate').value;
  let departureYear = parseInt(departureDate.toString().substr(0,4));
  let departureMonth = parseInt(departureDate.toString().substr(5,2));
  let departureDay = parseInt(departureDate.toString().substr(8,2));
  let departureDateObj = {
                          DepartureYear : departureYear,
                          DepartureMonth : departureMonth,
                          DepartureDay : departureDay
                        }
  return departureDate
};





function getReturnDepartureDate(){
  let returnDepartureDate= document.getElementById('returnDepartureDate').value;
  let returnDepartureYear=parseInt(returnDepartureDate.toString().substr(0,4));
  let returnDepartureMonth=parseInt(returnDepartureDate.toString().substr(5,2));
  let returnDepartureDay=parseInt(returnDepartureDate.toString().substr(8,2));
  let returnDepartureDateObj = {
                                ReturnDepartureYear : returnDepartureYear,
                                ReturnDepartureMonth : returnDepartureMonth,
                                ReturnDepartureDay : returnDepartureDay
                              }
  //return returnDepartureDateObj
  return returnDepartureDate
  
};


// ------------ PASSENGERS INPUTS FUNCTIONS ------------ //


let passengersNo = document.getElementById('passengersPax')
let passengers = document.getElementById('passengersPax').addEventListener('change', passengersPerAge)
let labelAges = document.getElementById('passengersPax').addEventListener('change', LabelAges)

function deleteChilds () {
  let div = document.getElementById('passengersAge');
    while (div.firstChild) {
          div.removeChild(div.firstChild);
}
}

function passengersPerAge() {

  let passengersPax = passengersNo.value
=======
let departureAirport = document.getElementById('departureAirport').value
let arrivalAirport = document.getElementById('arrivalAirport').value

let departureDate = getDepartureDate()
let returnDepartureDate = getReturnDepartureDate()
console.log(getDepartureDate())
console.log(getReturnDepartureDate())

let aditionalPassengers = writePassengers(arrayPassengers)
function writePassengers(arrayPassengers){
  let i
  let passengersUrl
  let result = ""
    for (i=0; i < arrayPassengers.length - 1; i++){
      result += `${arrayPassengers[i].toString()}-`
      console.log(result)
    }
    result += `${arrayPassengers[i].toString()}`
    return result   
}


//let returnDepartureDate = document.getElementById('returnDepartureDate').value


// let departureAirport= getDepartureAirport();
// console.log(departureAirport);

// let arrivalAirport= getArrivalAirport();
// console.log(arrivalAirport);

let petition = `http://localhost:8888/search/D/${departureAirport}/A/${arrivalAirport}/DD/${departureDate}/AD/${returnDepartureDate}/PA/${aditionalPassengers}`

console.log("petition: " + petition)

searchFlights(petition)

})


function searchFlights(petition){
  fetch(petition, { method : 'GET'})
    .then(response => response.json())
    .then(data => {
      if (data.msg){
      //renderNotFound(data.msg)
      // //funcion ventana de espera style.display=none
      alert(data.msg)
      console.log(data.msg)
      }
      else{
      console.log("La data que llega a front: ", data)
      // //funcion ventana de espera style.display=none

      renderResult(data)
    }
    })
  }

// ------------ RENDER VIEW FUNCTIONS ------------ //

// const renderNotFound = (msg) => {
//   document.getElementById('labelDeparture').innerHTML = msg
// }
function renderResult(data) {
  document.getElementById('response').style.display = "flex"
  let departureAirport = document.getElementById("labelDeparture")
  let arrivalAirport = document.getElementById("labelArrival")
  let departureDate = document.getElementById("labelDepartureDate")
  let departureTime = document.getElementById("departureTime")
  let arrivalTime = document.getElementById("arrivalTime")
  let returnDepartureAirport = document.getElementById("labelReturnDA")
  let returnArrivalAirport = document.getElementById("labelReturnAA")
  let returnDate = document.getElementById("labelReturnDate")
  let returnDepartureTime = document.getElementById("returnDepartureTime")
  let returnArrivalTime = document.getElementById("returnArrivalTime")
  departureAirport.innerHTML = data.departureAirport
  arrivalAirport.innerHTML = data.arrivalAirport
  departureDate.innerHTML = data.departureDate
  departureTime.innerHTML = data.departureTime
  arrivalTime.innerHTML = data.arrivalTime
  returnDepartureAirport.innerHTML = data.returnDepartureAirport
  returnArrivalAirport.innerHTML = data.returnArrivalAirport
  returnDate.innerHTML = data.returnDate
  returnDepartureTime.innerHTML = data.returnDepartureTime
  returnArrivalTime.innerHTML = data.returnArrivalTime
  
  // funcion ventana resultados = style.display = block
}



function LabelAges(){
  document.getElementById("label-ages").innerHTML = "Selecciona sus edades";
}

function callResponse(){
  var x = document.getElementById("response");
  if (x.style.display === "none") {
    x.style.display = "flex";
    location.href = '#response';
  } else {
    x.style.display = "none";
  }
 }


// ------------ AIRPORTS INPUTS FUNCTIONS ------------ //
/// SELECT ORIGEN Y DESTINO ///

//--- --- origen --- ---- //
function getDepartureAirport(){
  let returnDepartureAirport= document.getElementById("departureOptions").addEventListener('click', (e) => {
    let option = e.target.value
    search1.value= option
    let text = e.target.textContent
    depOptions.placeholder = text
    console.log(text)
    document.getElementById("departureOptions").style.display = "none";
    })
  return returnDepartureAirport;
}

function getArrivalAirport(){
  let returnArrivalAirport = document.getElementById("arrivalOptions").addEventListener('click', (e) => {
    let option = e.target.value
    search2.value = option
    let text = e.target.text
    arrOptions.placeholder = text
    console.log(text)
    document.getElementById("arrivalOptions").style.display = "none";
  })
  return returnArrivalAirport;
}
  console.log(getArrivalAirport());
  console.log(getDepartureAirport());

// -------------- DATES INPUTS FUNCTIONS ------------- //

function getDepartureDate(){
  let departureDate = document.getElementById('departureDate').value;
    return departureDate
};

function getReturnDepartureDate(){
  if (document.getElementById('selectDir').value == "departure"){
    let returnDepartureDate = null;
    return returnDepartureDate
  }
  else {
  let returnDepartureDate= document.getElementById('returnDepartureDate').value;
    return returnDepartureDate
  }
  
};

/// SELECT DEPARTURE & ARRIVAL ///
const cities = [];
const search1 = document.querySelector("#departureAirport");
const depOptions = document.querySelector('#departureOptions');
const search2 = document.querySelector('#arrivalAirport');
const arrOptions = document.querySelector('#arrivalOptions');

// -- DEPARTURE -- //
fetch('./airport.json')
  .then(data => data.json())
  .then(data => {
    cities.push(...data)
  });

function findMatches(wordToMatch, cities) {
  wordToMatch = wordToMatch.split(",");
  return cities.filter(place => {
    if (wordToMatch.length === 1) {
      const regex = new RegExp(wordToMatch[0], 'gi');
      return (place.city.match(regex) ||
        place.iata.match(regex));
    } else {
      const regex0 = new RegExp(wordToMatch[0], 'gi');
      const regex1 = new RegExp(wordToMatch[1].substr(1, wordToMatch[1].length), 'gi');
      return (place.city.match(regex0) &&
        place.iata.match(regex1));
    }
  });
}

function displayMatches(e) {
  console.log(e.target.value);
  const html = findMatches(e.target.value, cities).map(place => {
    if (place.iata !== "" || place.iata !== null || place.iata !== undefined) {
      return `
                    <option value="${place.iata}"id="${place.iata}" >${place.city}, ${place.iata}</option>
            `
    } console.log("lo que devuelve displayMatches: ", displayMatches(e))
  }).join('');
  depOptions.style.display = "block";
  depOptions.innerHTML = html;
}

search1.addEventListener('keyup', (e) => displayMatches(e));
console.log(search1)
// -- ARRIVAL -- //
const cities2 = [];
// console.log(cities2);
fetch('./airport.json')
  .then(data => data.json())
  .then(data => {
    cities2.push(...data)
  });

function findMatches2(wordToMatch, cities2) {
  wordToMatch = wordToMatch.split(",");
  return cities2.filter(place => {
    if (wordToMatch.length === 1) {
      const regex = new RegExp(wordToMatch[0], 'gi');
      return (place.city.match(regex) ||
        place.iata.match(regex));
    } else {
      const regex0 = new RegExp(wordToMatch[0], 'gi');
      const regex1 = new RegExp(wordToMatch[1].substr(1, wordToMatch[1].length), 'gi');
      return (place.city.match(regex0) &&
        place.iata.match(regex1));
    }
  });
}

function displayMatches2(e) {
  const html2 = findMatches2(e.target.value, cities).map(place => {
    return `<option value="${place.iata}" id="${place.city}">${place.city}, ${place.iata}</option>
            `
  }).join('');
  arrOptions.style.display = "block";
  arrOptions.innerHTML = html2;
}
search2.addEventListener('keyup', (e) => displayMatches2(e));

function functDir(){
  if(document.getElementById('selectDir').value == "departure") {
    document.getElementById("returnDepartureDateDiv").style.display = "none";
  }
  else{
    document.getElementById("returnDepartureDateDiv").style.display = "flex";
  }
}


// ------------ PASSENGERS INPUTS FUNCTIONS ------------ //

let passengersNumber = document.getElementById('passengersPax')
let passengers = document.getElementById('passengersPax').addEventListener('change', passengersPerAge)
let labelAges = document.getElementById('passengersPax').addEventListener('change', LabelAges)

function deleteChilds () {
  let div = document.getElementById('passengersAge');
    while (div.firstChild) {
          div.removeChild(div.firstChild);
    }
}

function passengersPerAge() {
  let passengersPax = passengersNumber.value
>>>>>>> Nora
    //renderPassengersDivs(passengersPax)
    deleteChilds()
    renderAgeOptions(passengersPax)
}


function renderAgeOptions(passengersPax){
  // Función hija -- Closure
  function generatePassengersOptions(value, content){
<<<<<<< HEAD
    let newPassengerDiv = document.createElement('option') 

    newPassengerDiv.setAttribute("value", value) 
    newPassengerDiv.text = content
    return newPassengerDiv
  }

   
  let j = 0
  let x = 0
  
  // document.getElementById("passengersAgeLabel").innerHTML = "Selecciona las edades";
=======
    let newPassengerDiv = document.createElement('option')
    if(value === "1"){
      newPassengerDiv.setAttribute("value", "1") 
      newPassengerDiv.text = "Bebé (de 0 a 23 meses)"
      return newPassengerDiv
    }
    else{
      newPassengerDiv.setAttribute("value", value) 
      newPassengerDiv.text = content
      return newPassengerDiv
    }
  }
  let j = 0
  let x = 0
>>>>>>> Nora
  for (x = 0; x < passengersPax ; x++){
    let newDiv = document.createElement('div')
    newDiv.innerHTML = `<select name="passengerAge" id="passengersAge${x}" required></select>`
    document.getElementById('passengersAge').appendChild(newDiv)
    drawPassengers(x)
<<<<<<< HEAD

    document.getElementById(`passengersAge${x}`).appendChild(generatePassengersOptions("","Ingrese la edad del pasajero"))
    document.getElementById(`passengersAge${x}`).appendChild(generatePassengersOptions("1","Bebé (de 0 a 23 meses)"))
     
    
        for(j = 2; j < 101; j++) {
          document.getElementById(`passengersAge${x}`).appendChild(generatePassengersOptions(j.toString(),j.toString()))
          
=======
    document.getElementById(`passengersAge${x}`).appendChild(generatePassengersOptions("","Ingrese la edad del pasajero"))
    document.getElementById(`passengersAge${x}`).appendChild(generatePassengersOptions("1","Bebé (de 0 a 23 meses)"))
     
        for(j = 2; j < 100; j++) {
          document.getElementById(`passengersAge${x}`).appendChild(generatePassengersOptions(j.toString(),j.toString()))
>>>>>>> Nora
        } 
  }
  
  //TO DO: faltaría: if bebé, no pintar 1, si no bebé de 0 a 23 meses. Recoger 1 como value
  function drawPassengers(x){
<<<<<<< HEAD

    var passenger = document.getElementById(`passengersAge${x}`)
    passenger.addEventListener('change', () =>{
    var newPassengerAge = document.createElement('p')
    newPassengerAge.setAttribute("value", x)
    newPassengerAge.setAttribute("id", x) 
    newPassengerAge.text = `Pasajero n°${x+1}: ${passenger.value}`
    newPassengerAge.innerHTML = `Pasajero nº ${x+1}: ${passenger.value} años`
    document.getElementById('selectedPassengers').appendChild(newPassengerAge)
    arrayPassengers.push(`${passenger.value}`)
    // console.log("valor de cada pasajero: " + passenger.value)
    // console.log("Array of pass: " + arrayPassengers)
=======
    let passenger = document.getElementById(`passengersAge${x}`)
    passenger.addEventListener('change', () =>{
    let newPassengerAge = document.createElement('p')
    newPassengerAge.setAttribute("value", x)
    newPassengerAge.setAttribute("id", x) 
    // newPassengerAge.text = `Pasajero n°${x+1}: ${passenger.value}`
    if(passenger.value == 1 || passenger.value.length > 2){
      newPassengerAge.innerHTML = `Pasajero nº ${x+1}: Bebé (de 0 a 23 meses)`
      document.getElementById('selectedPassengers').appendChild(newPassengerAge)
      arrayPassengers.push(`${passenger.value}`)
      console.log("estoy en el if", passenger.value)
    }
    else{
      newPassengerAge.innerHTML = `Pasajero nº ${x+1}: ${passenger.value} años`
      document.getElementById('selectedPassengers').appendChild(newPassengerAge)
      arrayPassengers.push(`${passenger.value}`)
      console.log("estoy en el else", passenger.value)
    }
>>>>>>> Nora
    })
    }
    return j
  }

 function setPassengers() {
    location.href = '#modal';
    var x = document.getElementById("0");
    if (x!==null) {
      let passengersPreviewDiv = document.getElementById("passengersPreview");
      passengersPreviewDiv.style.display = "none";
      document.getElementById("selectedPassengers").innerHTML="";
      deleteChilds() 
    } 
}
// ----------- VENTANA MODAL ----------- //

let btnPassengers = document.getElementById('btn-modal')
btnPassengers.addEventListener('click', (e) =>{
    e.preventDefault()
    location.href = '#modal';
})

//  function setPassengers(e) {
//     e.preventDefault()
//     location.href = '#modal';
//   }

 function closeModal(){
  location.href = '#';
  let passengersPreviewDiv = document.getElementById("passengersPreview");
  passengersPreviewDiv.style.display = "block";

 };

 function closeModalVisible(){
    document.getElementById("close").innerHTML = "ACEPTAR";
 };













