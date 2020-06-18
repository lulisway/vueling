let passengers = document.getElementById('passengersPax')
let btnPassengers = document.getElementById('btn').addEventListener('click', passengersPerAge)



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