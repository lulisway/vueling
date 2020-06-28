// --- Server Initialization --- //
const express = require('express');
const cheerio = require('cheerio');
const app = express();
const puppeteer = require('puppeteer');
const serverPort = 8888
app.listen(serverPort)
console.log('Server listening to: ', serverPort)


//// -------- Endpoints -------- ////

app.use(express.static(__dirname))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get ('/search/D/:departureAirport/A/:arrivalAirport/DD/:departureDate/AD/:returnDepartureDate/PA/:aditionalPassengers', (req, res) =>{
    // console.log("Llega al endpoint")
    // --- Request Params --- //
    let depAirport = req.params.departureAirport
    let arrAirport = req.params.arrivalAirport
    console.log(depAirport)
    console.log(arrAirport)
    let depDate = req.params.departureDate
    let retDate = req.params.returnDepartureDate
    let depMonth = getYearAndMonth(req.params.departureDate)
    let depDay = getDay(req.params.departureDate)
    let retMonth = getYearAndMonth(req.params.returnDepartureDate)
    let retDay = getDay(req.params.returnDepartureDate)
    let passengers = getPassengers(req.params.aditionalPassengers)
    console.log("estos son los pasajeros", passengers)

    let url = `https://www.norwegian.com/es/ipc/availability/avaday?AdultCount=${passengers.adults}&ChildCount=${passengers.kids}&InfantCount=${passengers.babies}&A_City=${arrAirport}&D_City=${depAirport}&D_Month=${depMonth}&D_Day=${depDay}&R_Month=${retMonth}&R_Day=${retDay}&IncludeTransit=true&TripType=2`
    console.log(url)

    let urlWizz =`https://wizzair.com/es-es/#/booking/select-flight/${depAirport}/${arrAirport}/${depDate}/${retDate}/${passengers.adults}/${passengers.kids}/${passengers.babies}/0/null`
    
    console.log("Este es el resultado de la busqueda: ", sendBestPrice(url, urlWizz, depAirport, arrAirport))

    // --- Response --- //

async function sendBestPrice(url, urlWizz, depAirport, arrAirport){
    let resultWizz = await getDataWizz(urlWizz, depAirport, arrAirport)
            .then((data) => {
                if(data === undefined){
                    setTimeout(getDataWizz(urlWizz), 300)
                    console.log('data undefined')
                }
                else {
                    console.log("llega hasta getDataWizz")
                    console.log("obj recibido en getDataWizz: ", data)
                    return data
                }
            })
            

    let resultNor = await getData(url, depAirport, arrAirport)
            .then((data) => {
            if(data === undefined){
                setTimeout(getData(url), 300)
                console.log('data undefined')
            }
            else {
                console.log("llega hasta getData")
                console.log("obj recibido en getData: ", data)
                return data
            }
        })
        await console.log("soy resultNor linea 81: ", resultNor)
        // await sleep(5000)
        await getBestPrice(resultNor, resultWizz)
                .then(
                (data) => {
                    if(data === NaN){
                        setTimeout(getBestPrice(resultNor, resultWizz), 300)
                        console.log('data undefined')
                    }
                    if(data === undefined || data.finalValue === null){
                        let noFlights = {
                            msg : "No hay resultados para tu búsqueda, prueba buscando otras fechas u otros destinos."
                        }
                        res.send(noFlights)
                    }
                    else {
                        console.log("llega hasta getBestPrice")
                        console.log("el  mejor precio en getBestPrice: ", data.finalValue)
                        console.log('data que deberia ser enviada a front')
                        res.send(data)
                    }    
                }  
                )   
            .catch( err => { console.log("Error en promesa: ",  err); })
            }
})

//// -------- Scraping Functions -------- ////
async function getData(url, depAirport, arrAirport){

let dataNor = {
    airlineName : "Norwegian",
    departureAirport: depAirport,
    arrivalAirport: arrAirport,
    departureDate: "NOT FOUND",
    departureTime: "NOT FOUND",
    arrivalTime: "NOT FOUND",
    returnDepartureAirport: arrAirport,
    returnArrivalAirport: depAirport,
    returnDate: "NOT FOUND",
    returnDepartureTime: "NOT FOUND",
    returnArrivalTime: "NOT FOUND",
    finalValue: "NOT FOUND"
  }

    try {
        const goToUrl = async (url) => {
            /** by default puppeteer launch method have headless option true*/
            const browser = await puppeteer.launch({
                headless: false
            });
            const page = await browser.newPage();
            await page.goto(url);
            await page.evaluate(() => {
                document.cookie = "_nasStorageConsent=all=True&analysis=True&marketing=True&v=1; TS01e9bd6b=01ccc25f52e87438454bbc9410fe7e26f3aa65053dfd2625000c9963abfe7d3b66c7594904de85091aea299460678aacd1234a6f097d2cd4b238b5e68dd8c25dd97119a98279e5e99fbf9b68e8b491e356cc7b8d060561355c25dee25fe7c7f5e9394d87f62592b5f269efd4ba4821f11b7bc5cf97; ft_ld_1h=1592926467051; optimizelyEndUserId=oeu1592926467220r0.995722880752421; _gcl_au=1.1.1570753195.1592926467; _ga=GA1.2.45005213.1592926468; _gid=GA1.2.2042899770.1592926468; _gat_UA-9004708-1=1; _dc_gtm_UA-9004708-1=1; _mibhv=anon-1592926467705-1072502634_7873; _fbp=fb.1.1592926467809.795013459; forterToken=2728fe139de24a9aa3c4e02490621abd_1592926467612__UDF43_9ck; ftr_ncd=6; _hjid=800068f2-7875-403b-b910-d30f2ec99230; bid_Dyby5HwvkndCBsQvyZanSiVdOQ6UAb3Y=06ccc226-66d6-4f1c-a38a-94c4cd320997; NAS_boxever_guestRef=3d9dc009-a4d0-493b-aeb6-a43689ef882e; bx_bucket_number=29";
            });
            await page.reload();
            await sleep(5000);
           //setTimeout(
            const scrapeData = async (depAirport, arrAirport) => {
                const $ = cheerio.load(await page.content());
                //$("tbody .oddrow.rowinfo1 .arrdest div span").text()
               
                let depTime = $(".oddrow.rowinfo1 .depdest div").html()
                console.log("depTime: ", depTime)
                let depTimeSpan = $(".oddrow.rowinfo1 .depdest div span").text()
                let arrTime = $(".arrdest div").html()
                console.log("arrTime:", arrTime)
                let arrTimeSpan = addScale(depTime, arrTime)
                console.log(depTime)
                console.log(depTimeSpan)
                
                console.log(arrTimeSpan)
                let depPrice = parseFloat($(".content label").text().replace(/,/g, '.'))
                console.log(depPrice)
                let arrPrice = parseFloat($("#avaday-inbound-result > div > div > div > div > table > tbody > tr > .fareselect.standardlowfare .content label").html().replace(/,/g, '.'))
                console.log(arrPrice)
                let depCity = $(".avadaytable > tbody > .oddrow.rowinfo2 > .depdest > .content").html()
                console.log("DEPAIRPORT: " + depAirport)
                let arrCity = $(".avadaytable > tbody > .oddrow.rowinfo2 > .arrdest > .content").html()
                console.log("ARRAIRPORT: " + arrAirport)
                let depDate = $(".sectionboxavaday.avadayoutbound > .headerbox > .layouttable > tbody > tr > td").next().text()
                console.log("DEPDATE: " + depDate)
                let retDate = $(".sectionboxavaday.avadayinbound > .headerbox > .layouttable > tbody > tr > td").next().text()
                let retDepTime = $(".sectionboxavaday.avadayinbound > .bodybox > .body > .avadaytable > tbody > tr > td > div").html()
                let retArrTime = $(".sectionboxavaday.avadayinbound > .bodybox > .body > .avadaytable > tbody > tr > .arrdest > div").text()
                let retArrTimeSpan = addScale(retDepTime, retArrTime)
                //$("#avaday-inbound-result > div > div > .bodybox > div > table > tbody > tr > .arrdest > div").text()
                console.log("retArrTimeSpan: " + retArrTimeSpan)
                
                function addScale(dep, arr){
                    let depHour = dep.substring(0,2)
                    console.log("depHour: ", depHour)
                    let arrHour = arr.substring(0,2)
                    console.log("arrHour: ", arrHour)
                    // let patt = /[+1]/
                    // let res = patt.test(oneMoreDay)
                    if(arrHour < depHour){
                        let oneScale = "+1"
                        console.log(oneScale)
                        return oneScale
                    }
                    else{
                        let noScale = ""
                        console.log("noScale: " + noScale)
                        return noScale
                    }
                }

                await page.screenshot({path: 'screenshot.png'});
                
                dataNor.departureAirport = `${depCity}`;
                //dataNor.departureAirport = `${depAirport}, ${depCity}`; ver esto
                dataNor.arrivalAirport = `${arrCity}`;
                dataNor.departureDate = depDate;
                dataNor.departureTime = `${depTime}`;
                dataNor.arrivalTime = `${arrTime}${arrTimeSpan}`;
                // dataNor.returnDepartureAirport = arrAirport;
                // dataNor.returnArrivalAirport = depAirport;
                dataNor.returnDate = retDate;
                dataNor.returnDepartureTime = retDepTime;
                dataNor.returnArrivalTime = `${retArrTime.substring(0,5)}${retArrTimeSpan}`;
                dataNor.finalValue = depPrice + arrPrice;
                console.log("DataNor dentro del try: " + dataNor)
                await browser.close();
                return dataNor
            }
            await scrapeData();
            
        }
        await goToUrl(url)
    } catch (err) {
        console.error(err);
    }
    await sleep(5000);
    console.log('DataNor fuera del try catch: ', dataNor)
    return (dataNor);
}

async function getDataWizz(urlWizz, depAirport, arrAirport) {
    let dataWizz = {
        airlineName: "Wizz Air",
        departureAirport: depAirport, 
        arrivalAirport: arrAirport, 
        departureDate: "", 
        departureTime: "", 
        arrivalTime: "", 
        returnDepartureAirport: arrAirport, 
        returnArrivalAirport: depAirport, 
        returnDate: "", 
        returnDepartureTime: "", 
        returnArrivalTime: "", 
        finalValue: ""
    }
    try {
        const goToUrlWizz = async (urlWizz) => {
                const browser = await puppeteer.launch({
                    headless: false
                });
                const page = await browser.newPage();
                await page.goto(urlWizz);
                await sleep(90000);
                const scrapeData = async () => {
                    const $= cheerio.load(await page.content());

                    let depCity= $('#outbound-fare-selector .flight-select__flight-info__time .station').html();
                    console.log(depCity);
                    let arrCity= $('#outbound-fare-selector .flight-select__flight-info__time .station.align-right').html();
                    console.log(arrCity);
                    let departureDate= $('#outbound-fare-selector .flight-select__flight-info__details .flight-select__flight-info__day').html();
                    console.log(departureDate);
                    let departureTime= $('#outbound-fare-selector .flight-select__flight-info__time .hour').html();
                    console.log(departureTime);
                    let arrivalTime= $('#outbound-fare-selector .flight-select__flight-info__times :nth-child(3) span').html();
                    console.log(arrivalTime);                    
                    let returnDepartureAirport= $('#return-fare-selector .flight-select__flight-info__time .station').html();
                    console.log(returnDepartureAirport);
                    let returnArrivalAirport= $('#return-fare-selector .flight-select__flight-info__time .station.align-right').html();
                    console.log(returnArrivalAirport);
                    let returnDate= $('#return-fare-selector .flight-select__flight-info__details .flight-select__flight-info__day').html();
                    console.log(returnDate);                    
                    let returnDepartureTime= $('#return-fare-selector .flight-select__flight-info__time .hour').html();
                    console.log(returnDepartureTime);
                    let returnArrivalTime= $('#return-fare-selector .flight-select__flight-info__times :nth-child(3) span').html();
                    console.log(returnArrivalTime);
                    let depPrice = parseFloat($('#outbound-fare-selector .fare-type-button__title.fare-type-button__title--active span').html().replace(/,/g, '.').substring(16, 21));
                    console.log(depPrice);
                    let arrPrice = parseFloat($('#return-fare-selector .fare-type-button__title.fare-type-button__title--active span').html().substring(16, 21).replace(/,/g, '.'));
                    console.log(arrPrice);
                   
                        dataWizz.departureAirport = depCity;
                        dataWizz.arrivalAirport = arrCity;
                        dataWizz.departureDate=  departureDate;
                        dataWizz.departureTime=  departureTime;
                        dataWizz.arrivalTime=  arrivalTime;
                        dataWizz.returnDepartureAirport= returnArrivalAirport;
                        dataWizz.returnArrivalAirport=  returnArrivalAirport;
                        dataWizz.returnDate=  returnDate;
                        dataWizz.returnDepartureTime=  returnDepartureTime;
                        dataWizz.returnArrivalTime=  returnArrivalTime;
                        dataWizz.finalValue = parseFloat((depPrice + arrPrice).toFixed(2));
                        console.log("DataWizz dentro del try: " + dataWizz)
                        await browser.close();
                        return dataWizz
                    }
                    await scrapeData();

                }
                await goToUrlWizz(urlWizz)
            } catch (err) {
                console.error(err);
            }
            await sleep(5000);
            console.log('DataNorWizz fuera del try catch: ', dataWizz)
            return (dataWizz);
}
    
    
 



//// -------- Handler Functions -------- ////
        /* --- Date Functions --- */

function getYearAndMonth(date){
    let year = date.substring(0,4)
    let month = date.substring(5,7)
    let result = year + month
    return result
  }

function getDay(date){
    let result = date.substring(8,10)
    return result
}
        /* --- Passengers Functions --- */

function getPassengers(passengers){
    // let allpassengers = []
    let str = passengers
    let all = str.split("-");
    let babies = []
    let kids = []
    let adults = []
    let noPassanger = []
   

        for (i = 0; i < all.length; i++){

           if (all[i] == 0){
               noPassanger.push(all[i])
           }
            else if (all[i] < 2){
                babies.push(all[i])
            }
            else if (all[i] > 1 && all [i] < 12){
                kids.push(all[i])
            }
            else {
                adults.push(all[i])
            }
        }
        
        let passengersPerAge = {
            babies : `${babies.length}`,
            kids : `${kids.length}`,
            adults : `${adults.length}`,
            noOne : noPassanger.length 
        }
            console.log(passengersPerAge)
            return passengersPerAge
}

        /* --- Best Price Functions --- */
async function getBestPrice (result1,result2){
    if(result1 === undefined || result1 === null || result1.finalValue === undefined || result1.finalValue === null ){
      return result2
    }
    else if(result2 === undefined ||result2 === null || result2.finalValue === undefined || result2.finalValue === null){
      return result1
    }
    else if(result1.finalValue === undefined && result2.finalValue === undefined){
        return false
    }
    else if(result1.finalValue === result2.finalValue){
        let twoOptions = [result1, result2]
        return twoOptions
    }
    else {
      let minValue = Math.min(result1.finalValue, result2.finalValue)
      console.log(`el precio mas bajo es ${minValue}€`)
      
      switch (minValue) {
          case result1.finalValue:
            await new Promise (r => setTimeout(r, 1000) )
            await console.log('El vuelo más barato es de ' + result1.airlineName);
            return result1
            break;
          case result2.finalValue: 
            await new Promise (r => setTimeout(r, 1000) )
            await console.log('El vuelo más barato es de ' + result2.airlineName)
            return result2
            break;
          default:
            await console.log('default');
        }
  
    }
  }
        /* --- Sleep Functions --- */

function sleep(miliseconds) {
    return new Promise((resolve, reject) => setTimeout(resolve, miliseconds))
}

function getBestPrice2 (result1,result2){
  
    
  
    if(result1 === undefined || result1 === null || result1.finalValue === undefined){
      return result2
    }
    else if(result2 === undefined ||result2 === null || result2.finalValue === undefined){
      return result1
    }
    else if(result1.finalValue === undefined && result2.finalValue === undefined){
        return false
    }
    else if(result1.finalValue === result2.finalValue){
        let twoOptions = [result1, result2]
        return twoOptions
    }
    else {
      let minValue = Math.min(result1.finalValue,result2.finalValue)
      console.log(`el precio mas bajo es ${minValue}€`)
      
      switch (minValue) {
          case result1.finalValue:
            console.log('El vuelo más barato es de ' + result1.airlineName);
            return result1
            break;
          case result2.finalValue: 
            console.log('El vuelo más barato es de ' + result2.airlineName)
            return result2
            break;
          default:
           console.log('default');
        }
  
    }
  }
