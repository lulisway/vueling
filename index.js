"use strict"

let arrayPassengers = []
let search = document.getElementById('searchForm')
search.addEventListener('submit', (evt)=>{

evt.preventDefault()

// let origin = document.getElementById('departureAirport').value 
// let destiny = document.getElementById('arrivalAirport').value


let departureDate = getDepartureDate()
let returnDepartureDate = getReturnDepartureDate()



// let returnDepartureDate = document.getElementById('returnDepartureDate').value
// let passengers = document.getElementById('passangers')


// let departureAirport = showOptions(origin)
// let arrivalAirport = showOptions(destiny)

let petition = `http://localhost:8888/origin: ${departureAirport}/destiny: ${arrivalAirport}/${departureDate.DepartureYear}/${departureDate.DepartureMonth}/${departureDate.DepartureDay}/${returnDepartureDate.ReturnDepartureYear}/${returnDepartureDate.ReturnDepartureMonth}/${returnDepartureDate.ReturnDepartureDay}/${arrayPassengers[0]}/${arrayPassengers[1]}/${arrayPassengers[2]}/${arrayPassengers[3]}/${arrayPassengers[4]}/${arrayPassengers[5]}/${arrayPassengers[6]}/${arrayPassengers[7]}/${arrayPassengers[8]}/${arrayPassengers[9]}`

console.log("petition: " + petition)

// searchFlights(petition)
})



let btnPassengers = document.getElementById('btn').addEventListener('click', passengersPerAge)


function passengersPerAge() {
    
    let passengersPax = document.getElementById('passengersPax').value
    
    //renderPassengersDivs(passengersPax)
    renderAgeOptions(passengersPax)
}




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
    document.getElementById(`passengersAge${x}`).appendChild(generatePassengersOptions("Bebé (0 a 23 meses)","Bebé (de 0 a 23 meses)"))
     
    
        for(j = 2; j < 101; j++) {
          document.getElementById(`passengersAge${x}`).appendChild(generatePassengersOptions(j,j))
          
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
  
// function allPassengers(){
//   let arrayPassengers = []

//   for (i = 0; i < 10 ; i++){
//       document.getElementById(`passengersAge${x}`).value
//   }



//   let allPassengersAge = {
//               Pass1 :
//   }


//   return allPassengersAge
// }
  
  
  
  // return arrayPassengers



// ---- VENTANA MODAL ---- //
 function setPassengers() {
    location.href = '#modal';
  }

 function closeModalVisible(){
    document.getElementById("close").innerHTML = "ACEPTAR";
 };






 // ---- FECHAS IDA Y VUELTA ---- //


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
  return departureDateObj


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
  return returnDepartureDateObj
  
};


