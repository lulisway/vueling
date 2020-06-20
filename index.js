"use strict"

// import { writeHeapSnapshot } from "v8"

let arrayPassengers = []

let search = document.getElementById('searchForm')
search.addEventListener('submit', (evt)=>{

evt.preventDefault()

// let origin = document.getElementById('departureAirport').value 
// let destiny = document.getElementById('arrivalAirport').value


let departureDate = getDepartureDate()
let returnDepartureDate = getReturnDepartureDate()
console.log(getDepartureDate())
console.log(getReturnDepartureDate())

let aditionalPassengers = writePassengers(arrayPassengers)



//let returnDepartureDate = document.getElementById('returnDepartureDate').value
let passengers = document.getElementById('passangers')


// let departureAirport = showOptions(origin)
// let arrivalAirport = showOptions(destiny)

// let petition = `http://localhost:8888/search/${departureAirport}/${arrivalAirport}/${departureDate.DepartureYear}/${departureDate.DepartureMonth}/${departureDate.DepartureDay}/${returnDepartureDate.ReturnDepartureYear}/${returnDepartureDate.ReturnDepartureMonth}/${returnDepartureDate.ReturnDepartureDay}/${arrayPassengers[0]}&p2=${arrayPassengers[1]}&p3=${arrayPassengers[2]}/${arrayPassengers[3]}/${arrayPassengers[4]}/${arrayPassengers[5]}/${arrayPassengers[6]}/${arrayPassengers[7]}/${arrayPassengers[8]}/${arrayPassengers[9]}`

let petition = `http://localhost:8888/search/${departureAirport}/${arrivalAirport}/${departureDate}/${returnDepartureDate}${aditionalPassengers}`

console.log("petition: " + petition)

// searchFlights(petition)

})



let passengers = document.getElementById('passengersPax')
let btnPassengers = document.getElementById('passengersPax').addEventListener('change', passengersPerAge)
let labelAges=document.getElementById('passengersPax').addEventListener('change', LabelAges)

function LabelAges(){
  document.getElementById("label-ages").innerHTML = "Selecciona sus edades";
}

function borrarChilds () {
    var div = document.getElementById('passengersAge');
while (div.firstChild) {
    div.removeChild(div.firstChild);
}
}

function passengersPerAge() {
    let passengersPax = passengers.value
    borrarChilds()
    renderPassengersDivs(passengersPax)
}

function renderPassengersDivs(passengersPax){
    let quantity = passengersPax
    let i = 0;
    for(i = 0; i < quantity; i++) {
            console.log("iteraciones: " + i)
            let newDiv = document.createElement('div')
            newDiv.innerHTML = `<input type="number" id="passengerAge${i}" name="passengerAge"min="0" max="100">`
            document.getElementById('passengersAge').appendChild(newDiv)
    } 
    
    return i

function passengersPerAge() {
    
    let passengersPax = document.getElementById('passengersPax').value
    
    //renderPassengersDivs(passengersPax)
    renderAgeOptions(passengersPax)
}
let hora = document.getElementById('arrivalAirport').value
let search = document.getElementById('searchForm')
 search.addEventListener('submit', (evt)=>{
     
    console.log(hora)
 evt.preventDefault()
 })




function renderAgeOptions(passengersPax){
  // Función hija
  function generatePassengersOptions(value, content){
    let newPassengerDiv = document.createElement('option') 

    newPassengerDiv.setAttribute("value", value) 
    newPassengerDiv.text = content
    
    
    return newPassengerDiv
  }

   
  let j = 0
  let x = 0
  
  // document.getElementById("passengersAgeLabel").innerHTML = "Selecciona las edades";
  for (x = 0; x < passengersPax ; x++){
    let newDiv = document.createElement('div')
    newDiv.innerHTML = `<select name="passengerAge" id="passengersAge${x}" required></select>`
    document.getElementById('passengersAge').appendChild(newDiv)
    drawPassengers(x)

    document.getElementById(`passengersAge${x}`).appendChild(generatePassengersOptions("","Ingrese la edad del pasajero"))
    document.getElementById(`passengersAge${x}`).appendChild(generatePassengersOptions("1","Bebé (de 0 a 23 meses)"))
     
    
        for(j = 2; j < 101; j++) {
          document.getElementById(`passengersAge${x}`).appendChild(generatePassengersOptions(j.toString(),j.toString()))
          
        } 
  }
  
  function drawPassengers(x){

    
    
    let passenger = document.getElementById(`passengersAge${x}`)
    passenger.addEventListener('change', () =>{
    let newPassengerAge = document.createElement('p')
    newPassengerAge.setAttribute("value", x)
    newPassengerAge.setAttribute("id", x) 
    newPassengerAge.innerHTML = `Pasajero ${x+1}: ${passenger.value}`
    document.getElementById('selectedPassengers').appendChild(newPassengerAge)
    arrayPassengers.push(`${passenger.value}`)
    console.log("valor de cada pasajero: " + passenger.value)
    console.log("Array of pass: " + arrayPassengers)
    })
    }
  }

  // function aditionalPassengers(arrayPassengers){
  //   let optionalPassengers = arrayPassengers.
  // }



      function writePassengers(arrayPassengers){
        let i
        let passengersUrl
        let result = ""
          for (i=0; i < arrayPassengers.length; i++){
            passengersUrl = arrayPassengers[i].toString()
            result += `/${passengersUrl}`
            console.log(result)
            
          }
          return result
          
      }

      

  
  




// ---- VENTANA MODAL ---- //
 function setPassengers() {
    location.href = '#modal';
  }
    return j
}

 function setPassengers() {
    location.href = '#modal';
  }

 function closeModal(){
  location.href = '#';
 };

 function callResponse(){
  var x = document.getElementById("response");
  if (x.style.display === "none") {
    x.style.display = "flex";
    location.href = '#response';
  } else {
    x.style.display = "none";
  }
 }
 

 function closeModalVisible(){
    document.getElementById("close").innerHTML = "ACEPTAR";
 };






 // ---- FECHAS IDA Y VUELTA ---- //
 /// ACORDARSE DE CONTARLES LA ALTERNATIVA CON LAS FECHAS A TODO EL GRUPO ///


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
  //return departureDateObj

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

  console.log("fecha" + returnDepartureDate)
  return returnDepartureDate
  //return returnDepartureDateObj
  
};

// ---- SEGUNDA VERSION DE FECHA ---- //

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


