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

// let origin = document.getElementById('departureAirport').value 
// let destiny = document.getElementById('arrivalAirport').value


let departureDate = getDepartureDate()
let returnDepartureDate = getReturnDepartureDate()
console.log(getDepartureDate())
console.log(getReturnDepartureDate())

let aditionalPassengers = writePassengers(arrayPassengers)







//let returnDepartureDate = document.getElementById('returnDepartureDate').value


let departureAirport= getDepartureAirport();
// console.log(departureAirport);

let arrivalAirport= getArrivalAirport();
// console.log(arrivalAirport);

// let petition = `http://localhost:8888/search/${departureAirport}/${arrivalAirport}/${departureDate.DepartureYear}/${departureDate.DepartureMonth}/${departureDate.DepartureDay}/${returnDepartureDate.ReturnDepartureYear}/${returnDepartureDate.ReturnDepartureMonth}/${returnDepartureDate.ReturnDepartureDay}/${arrayPassengers[0]}&p2=${arrayPassengers[1]}&p3=${arrayPassengers[2]}/${arrayPassengers[3]}/${arrayPassengers[4]}/${arrayPassengers[5]}/${arrayPassengers[6]}/${arrayPassengers[7]}/${arrayPassengers[8]}/${arrayPassengers[9]}`

let petition = `http://localhost:8888/search/${departureAirport}/${arrivalAirport}/${departureDate}/${returnDepartureDate}${aditionalPassengers}`

console.log("petition: " + petition)

// searchFlights(petition)

})



let passengers = document.getElementById('passengersPax')
let btnPassengers = document.getElementById('passengersPax').addEventListener('change', passengersPerAge)
let labelAges = document.getElementById('passengersPax').addEventListener('change', LabelAges)

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



function passengersPerAge() {

  let passengersPax = passengers.value
    //renderPassengersDivs(passengersPax)
    borrarChilds()
    renderAgeOptions(passengersPax)


  function borrarChilds () {
    let div = document.getElementById('passengersAge');
      while (div.firstChild) {
            div.removeChild(div.firstChild);
  }
  }
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
  }
  
//   function aditionalPassengers(arrayPassengers){
//     let optionalPassengers = arrayPassengers.
//   }

//--funciona--//
// function drawPassengers(x){

    
    
//   let passenger = document.getElementById(`passengersAge${x}`)
//   passenger.addEventListener('change', () =>{
//   let newPassengerAge = document.createElement('p')
//   newPassengerAge.setAttribute("value", x)
//   newPassengerAge.setAttribute("id", x) 
//   newPassengerAge.text = `Pasajero n°${x+1}: ${passenger.value}`
//   newPassengerAge.innerHTML = `Pasajero nº ${x+1}: ${passenger.value} años`
//   document.getElementById('selectedPassengers').appendChild(newPassengerAge)
//   arrayPassengers.push(`${passenger.value}`)
//   console.log("valor de cada pasajero: " + passenger.value)
//   console.log("Array of pass: " + arrayPassengers)
//   })
//   }


     

      

  
  




// ---- VENTANA MODAL ---- //
 function setPassengers() {
    location.href = '#modal';
    var x = document.getElementById("0");
  if (x!==null) {
    let passengersPreviewDiv = document.getElementById("passengersPreview");
    passengersPreviewDiv.style.display = "none";
   document.getElementById("selectedPassengers").innerHTML="";
    borrarChilds() 
  } 

/*       var valor = document.getElementById("selectedPassengers");
    alert(valor.innerHTML); //Muestra "soy un span"
    alert(valor.outerHTML); //Muestra "<span id="span">soy un span</span>" */
  
    return j
}

 function closeModal(){
  location.href = '#';
  let passengersPreviewDiv = document.getElementById("passengersPreview");
  passengersPreviewDiv.style.display = "block";

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
  //return returnDepartureDateObj
  return returnDepartureDate
  
};

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


