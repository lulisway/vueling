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
    //renderPassengersDivs(passengersPax)
    deleteChilds()
    renderAgeOptions(passengersPax)
}


function renderAgeOptions(passengersPax){
  // Función hija -- Closure
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
  
  //TO DO: faltaría: if bebé, no pintar 1, si no bebé de 0 a 23 meses. Recoger 1 como value
  function drawPassengers(x){

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













