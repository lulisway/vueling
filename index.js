"use strict"

/* ----------- Global variables ----------- */
/* ----------- (Initialization) ----------- */

let arrayPassengers = []
let passengers = document.getElementById('passengersPax')
let search = document.getElementById('searchForm')



/* ----------- Handler Functions ----------- */
/// --- PETICIÓN FETCH --- ///

function searchFlights(petition){
  fetch(petition)
    .then(response => response.json())
    .then(data => {
      pintar(data)
    })
  }

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


// ------------ AIRPORTS INPUTS FUNCTIONS ------------ //



// -------------- DATES INPUTS FUNCTIONS ------------- //

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
  return returnDepartureDate
  //return returnDepartureDateObj
};

// ------------ PASSENGERS INPUTS FUNCTIONS ------------ //

function LabelAges(){
  document.getElementById("label-ages").innerHTML = "Selecciona sus edades";
}


function passengersPerAge() {

  let passengersPax = passengers.value
    deleteChilds()
    renderAgeOptions(passengersPax)

  function deleteChilds () {
    let div = document.getElementById('passengersAge');
      while (div.firstChild) {
            div.removeChild(div.firstChild);
      }
  }
}

 

function renderAgeOptions(passengersPax){
  // Funciones hijas -- Closures
  function generatePassengersOptions(value, content){
    let newPassengerDiv = document.createElement('option') 

    newPassengerDiv.setAttribute("value", value) 
    newPassengerDiv.text = content
    return newPassengerDiv
  }

  function drawPassengers(x){
    let passenger = document.getElementById(`passengersAge${x}`)
    passenger.addEventListener('change', () =>{
    
    let newPassengerAge = document.createElement('p')
    newPassengerAge.setAttribute("value", x)
    newPassengerAge.setAttribute("id", x) 
    newPassengerAge.text = `Pasajero n°${x+1}: ${passenger.value} años`
    newPassengerAge.innerHTML = `Pasajero ${x+1}: ${passenger.value}`
    document.getElementById('selectedPassengers').appendChild(newPassengerAge)
    arrayPassengers.push(`${passenger.value}`)
    // console.log("valor de cada pasajero: " + passenger.value)
    // console.log("Array of pass: " + arrayPassengers)
    })
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

    return j
}

// ----------- VENTANA MODAL ----------- //
 function setPassengers() {
    location.href = '#modal';
  }

 function closeModal(){
  location.href = '#';
 };

 function callResponse(){
  let x = document.getElementById("response");
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




/* ----------- Event Listeners ----------- */
/* -------------- (Binding) -------------- */

document.getElementById('passengersPax').addEventListener('change', passengersPerAge)
document.getElementById('passengersPax').addEventListener('change', LabelAges)

search.addEventListener('submit', (evt)=>{

evt.preventDefault()


// --- AIRPORTS VALUES --- //

// let departureAirport = 
// let arrivalAirport = 


// --- DATES VALUES --- //

let departureDate = getDepartureDate()
let returnDepartureDate = getReturnDepartureDate()


// --- PASSENGERS VALUES --- //


let aditionalPassengers = writePassengers(arrayPassengers)

function writePassengers(arrayPassengers){
  let i
  let passengersUrl
  let result = ""
    for (i=0; i < arrayPassengers.length; i++){
      passengersUrl = arrayPassengers[i].toString()
      result += `/${passengersUrl}`
      //console.log(result)
    }
    return result   
}

// --- URL PETITION --- //

// let petition = `http://localhost:8888/search/${departureAirport}/${arrivalAirport}/${departureDate.DepartureYear}/${departureDate.DepartureMonth}/${departureDate.DepartureDay}/${returnDepartureDate.ReturnDepartureYear}/${returnDepartureDate.ReturnDepartureMonth}/${returnDepartureDate.ReturnDepartureDay}/${arrayPassengers[0]}&p2=${arrayPassengers[1]}&p3=${arrayPassengers[2]}/${arrayPassengers[3]}/${arrayPassengers[4]}/${arrayPassengers[5]}/${arrayPassengers[6]}/${arrayPassengers[7]}/${arrayPassengers[8]}/${arrayPassengers[9]}`

let petition = `http://localhost:8888/search/${departureAirport}/${arrivalAirport}/${departureDate}/${returnDepartureDate}${aditionalPassengers}`

console.log("petition: " + petition)

// searchFlights(petition) ----> FETCH FUCTION

})

















