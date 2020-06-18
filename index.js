// "use strict"

import { get } from "https"


// let search = document.getElementById('searchForm')
// search.addEventListener('submit', (evt)=>{

// evt.preventDefault()

// let origin = document.getElementById('departureAirport').value 
// let destiny = document.getElementById('arrivalAirport').value
// let departureDate = document.getElementById('departureDate').value
// let returnDepartureDate = document.getElementById('returnDepartureDate').value
// let passengers = document.getElementById('passangers')



// let departureAirport = showOptions(origin)
// let arrivalAirport = showOptions(destiny)

// let petition = `http://localhost:8888/${departureAirport}/${arrivalAirport}/${departureDate}/${returnDepartureDate}/${passangersPerAge.Babies}/${passangersPerAge.Kids}/${passangersPerAge.Kids12}/${passangersPerAge.Kids13}/${passangersPerAge.Kids14}/${passangersPerAge.Kids15}/${passangersPerAge.Adults}`

// searchFlights(petition)
// })


let passengers = document.getElementById('passengersPax')
let btnPassengers = document.getElementById('btn').addEventListener('click', passengersPerAge)


function passengersPerAge() {
    let passengersPax = passengers.value

    //renderPassengersDivs(passengersPax)
    renderAgeOptions(passengersPax)
 
}

function renderAgeOptions(passengersPax){
  let j = 0
  let x = 0
  

  for (x = 0; x < passengersPax ; x++){

    let newDiv = document.createElement('div')
            newDiv.innerHTML = `<select name="passengerAge" id="allPassengersAge${x}" required>
                  <option value="" id="passangerAge${x}">Ingrese la edad del pasajero</option>
                  <option value="1" id="passangerAge${x}">Bebé (de 0 a 23 meses)</option>
            </select>`
            document.getElementById('passengersAge').appendChild(newDiv)
           

          for(j = 2; j < 101; j++) {
                  // console.log("iteraciones: " + i)
                  let newPassengerDiv = document.createElement('option')  
                  newPassengerDiv.setAttribute("value", `${j}`) 
                  newPassengerDiv.setAttribute("id", `passangerAge${j}`)
                  newPassengerDiv.text = `${j} años`
                  document.getElementById(`allPassengersAge${x}`).appendChild(newPassengerDiv)
                  //console.log(j)
                  let passenger = document.getElementById(`passangerAge${j}`)       
                  getPassengerAge     
                }

  }
}


let passengerAge0 = 1
let passengerAge1 = 0
let passengerAge2 = 0
let passengerAge3 = 0
let passengerAge4 = 0
let passengerAge5 = 0
let passengerAge6 = 0
let passengerAge7 = 0
let passengerAge8 = 0
let passengerAge9 = 0

let btnEachP

let passengerAge0 = document.getElementById('passangerAge0').addEventListener('input', getPassenger)
let passengerAge1 = document.getElementById('passangerAge1').addEventListener('input', getPassenger)
let passengerAge2 = document.getElementById('passangerAge2').addEventListener('input', getPassenger)
let passengerAge3 = document.getElementById('passangerAge3').addEventListener('input', getPassenger)
let passengerAge4 = document.getElementById('passangerAge4').addEventListener('input', getPassenger)
let passengerAge5 = document.getElementById('passangerAge5').addEventListener('input', getPassenger)
let passengerAge6 = document.getElementById('passangerAge6').addEventListener('input', getPassenger)
let passengerAge7 = document.getElementById('passangerAge7').addEventListener('input', getPassenger)
let passengerAge8 = document.getElementById('passangerAge8').addEventListener('input', getPassenger)
let passengerAge9 = document.getElementById('passangerAge9').addEventListener('input', getPassenger)





function arrayOfPassengers(e){
  let arrayPassengers = []
  let passenger = e.srcElement.value
  if(passenger !== null) {
    arrayPassengers.push(e.srcElement.value)
  }
  else {

  }
  
}

console.log(arrayPassangers)

// let hora = document.getElementById('arrivalAirport').value
// let search = document.getElementById('searchForm')
//  search.addEventListener('submit', (evt)=>{
//     console.log(hora)
//  evt.preventDefault()
//  })

