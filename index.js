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

    for(i = 0; i < quantity; i++) {
            // console.log("iteraciones: " + i)
            let newDiv = document.createElement('div')
            newDiv.innerHTML = `<select name="passengerAge" id="passengerAge${i}">
            <option value="">Selecciona la edad del Pasajero</option>
            <option value="1">Bebé (0 a 23 meses)</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>`
            document.getElementById('passengersAge').appendChild(newDiv)
    } 
    
    return i
}



// function totalPassengers(renderPassengersDivs(passengersPax)) {
    
// }

// function totalPassengers(){
//     let passengerAge1 = document.getElementById(`passengerAge1`).addEventListener('input', )
    



//     return edad



// }


// `<input type="number" id="passengerAge${i}" name="passengerAge" min="2" max="100">`
