// "use strict"

import {
    honeydew
  } from "color-name";
  
  
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
  
  
  
  function borrarChilds() {
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
  
  function renderPassengersDivs(passengersPax) {
    let quantity = passengersPax
    let i = 0;
    for (i = 0; i < quantity; i++) {
      console.log("iteraciones: " + i)
      let newDiv = document.createElement('div')
      newDiv.innerHTML = `<input type="number" id="passengerAge${i}" name="passengerAge"min="0" max="100">`
      document.getElementById('passengersAge').appendChild(newDiv)
    }
  
    return i
  }
  let hora = document.getElementById('arrivalAirport').value
  let search = document.getElementById('searchForm')
  search.addEventListener('submit', (evt) => {
  
    console.log(hora)
    evt.preventDefault()
  })
  
  
  function renderAgeOptions(passengersPax) {
    let j = 0
    let x = 0
    document.getElementById("passengersAgeLabel").innerHTML = "Selecciona las edades";
    for (x = 0; x < passengersPax; x++) {
  
      let newDiv = document.createElement('div')
      newDiv.innerHTML = `<select name="passengerAge" id="allPassengersAge${x}" required>
                    <option value="" id="passangerAge${x}">Ingrese la edad del pasajero</option>
                    <option value="1" id="passangerAge${x}">Bebé (de 0 a 23 meses)</option>
              </select>`
      document.getElementById('passengersAge').appendChild(newDiv)
  
  
      for (j = 2; j < 101; j++) {
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
  
  function closeModalVisible() {
    document.getElementById("close").innerHTML = "ACEPTAR";
  };
  
  
  function pintar(data) {
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
  
  /* Ejemplo del objeto que recibiria por fetch
  let data = {
    departureAirport: "MAD",
    arrivalAirport: "LIN",
    departureDate: "20-05-2020",
    departureTime: "14:25",
    arrivalTime: "17:40",
    returnDepartureAirport: "LIN",
    returnArrivalAirport: "MAD",
    returnDate: "14-06-2020",
    returnDepartureTime: "2:00",
    returnArrivalTime: "5:30",
    finalValue: 500
  }*/
  
  fetch()
    .then(response => response.json())
    .then(data => {
      pintar(data)
    })
  
  