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
}
let hora = document.getElementById('arrivalAirport').value
let search = document.getElementById('searchForm')
 search.addEventListener('submit', (evt)=>{
     
    console.log(hora)
 evt.preventDefault()
 })

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
                  console.log(j)
    } 
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
 