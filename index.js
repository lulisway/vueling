// "use strict"


// let search = document.getElementById('searchForm')
// search.addEventListener('submit', (evt)=>{

// evt.preventDefault()

// let origin = document.getElementById('departureAirport').value 
// let destiny = document.getElementById('arrivalAirport').value
// let departureDate = document.getElementById('departureDate').value
// let returnDepartureDate = document.getElementById('returnDepartureDate').value
// let passengers = document.getElementById('passangers')\


// let departureAirport = showOptions(origin)
// let arrivalAirport = showOptions(destiny)

// let petition = `http://localhost:8888/${departureAirport}/${arrivalAirport}/${departureDate}/${returnDepartureDate}/${passangersPerAge.Babies}/${passangersPerAge.Kids}/${passangersPerAge.Kids12}/${passangersPerAge.Kids13}/${passangersPerAge.Kids14}/${passangersPerAge.Kids15}/${passangersPerAge.Adults}`

// searchFlights(petition)
// })


let passengers = document.getElementById('passengersPax')
let btnPassengers = document.getElementById('btn').addEventListener('click', passengersPerAge)


function passengersPerAge() {
    let passengersPax = passengers.value

    renderPassengersDivs(passengersPax)
}

function renderPassengersDivs(passengersPax){
    let quantity = passengersPax
    let i = 0
    document.getElementById("passengersAgeLabel").innerHTML = "Selecciona las edades";
    for(i = 0; i < quantity; i++) {
            console.log("iteraciones: " + i)
            let newDiv = document.createElement('div')
            newDiv.innerHTML = `<input type="number" id="passengerAge${i}" name="passengerAge"min="0" max="100">`
            document.getElementById('passengersAge').appendChild(newDiv)    
    } 
    
    return i
}
let hora = document.getElementById('arrivalAirport').value
let search = document.getElementById('searchForm')
 search.addEventListener('submit', (evt)=>{
    console.log(hora)
 evt.preventDefault()
 })

 function setPassengers() {
    location.href = '#modal';
  }

 function closeModalVisible(){
    document.getElementById("close").innerHTML = "ACEPTAR";
 };