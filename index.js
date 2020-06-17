//if mayor de 10 pax redirect a un html con info de la compañías para precios grupo
//bebé problemas: bebé 1, resto edad, bebé 0
//pasar fechas al mismo formato que recoger que del html recojamos eso
//dar todos los resultados del buscador
// let passengers = document.getElementById('passengersPax')
// let btnPassengers = document.getElementById('btn').addEventListener('click', passengersPerAge)
// function passengersPerAge() {
//     let passengersPax = passengers.value
//     renderPassengersDivs(passengersPax)
// }
// function renderPassengersDivs(passengersPax){
//     let quantity = passengersPax
//     let i = 0
//     for(i = 0; i < quantity; i++) {
//             console.log("iteraciones: " + i)
//             let newDiv = document.createElement('div')
//             newDiv.innerHTML = `<input type="number" id="passengerAge${i}" name="passengerAge"min="0" max="100">`
//             document.getElementById('passengersAge').appendChild(newDiv)
//     }
//     return i;
// };

/// SELECT ORIGEN Y DESTINO ///
const endpoint = 'https://gist.github.com/tdreyno/4278655'
const cities = [];

console.log(cities);

fetch(endpoint,{'Access-Control-Allow-Origin':'*'})
    .then(blob => blob.json())
    .then(data => cities.push(...data));

function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) ||
            place.code.match(regex);
    });
}

function displayMatches(e) {
    const matchedArray = findMatches(e.target.value, cities);
    const html = matchedArray.map(place => {
        const regex = new RegExp(e.target.value, 'gi');
        const cityName = place.city.replace(regex,
            `<span class=hl>${e.target.value}</span>`)
        const codeName = place.code.replace(regex,
            `<span class=hl>${e.target.value}</span>`)
        return `
            <li>
                <span class="name">${cityName}, ${codeName}</span>
            </li>
        `
    }).join('');
    suggestions.innerHTML = html;
}

const search = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

search.addEventListener('change', displayMatches);
search.addEventListener('keyup', displayMatches);


















// const endpoint= 'https://raw.githubusercontent.com/jbrooksuk/JSON-Airports/master/airports.json';
// //const promise = fetch(endpoint);
// //console.log(promise);

// //fetch(endpoint).then(blob => console.log(blob));



//     const cities = [];
//     fetch(endpoint)
//         .then(response => response.json())
//         .then(data => cities.push(...data));
//     console.log(cities);


// /// /// regex /// ///
// let wordToSearch= (/^[a-zA-Z]+$/g);


//     function findMatches(wordToSearch, cities) {
//         return cities.filter(data => {
//             const regex = new RegExp(wordToSearch);
//             return data.name.match(regex) ||
//                 data.iata.match(regex);
//         })
//     }



//     function displayMatches(e) {
//         const matchedArray = findMatches(e.target.value, cities);
//         const html = matchedArray.map(data => {
//             const regex = new RegExp(e.target.value, 'gi');
//             const cityName = data.name.replace(regex,
//                 `<span class=hl>${e.target.value}</span>`)
//             const iataName = data.iata.replace(regex,
//                 `<span class=hl>${e.target.value}</span>`)
//             return `
//                 <li>
//                     <span class="name">${cityName}, ${iataName}</span>
//                 </li>
//             `
//         })
//     }

//     const search = document.querySelector('.search');
  
//     search.addEventListener('change', displayMatches);
//     search.addEventListener('keyup', displayMatches);
/// API CITY&IATA ///
// const apiKey= "SbdRljJcvNx01MGGFI4iXAcueAiLmuNQ";
// const secret= "lcVhKMfcR50kWaQs";

// function findAirport(){
//     let selectAirport= document.getElementById('departureAirport').value
    
//     fetch(`https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT,CITY&keyword=${selectAirport}&page[limit]=5`, {
//         method:"GET"
//     })
//     .then(response =>{
//         return response.json();
//     })
//     .then (data =>{
//         let selectAirportOk= document.createElement("h1");
//         selectAirportOk.appendChild(document.createTextNode('aeropuerto'));

       
//     }).catch((error) => {
//         console.error('Error:', error);
//     });
// }