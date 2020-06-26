// --- Server Initialization --- //
const express = require('express');
const cheerio = require('cheerio');
const app = express();
const puppeteer = require('puppeteer');
const serverPort = 8888
app.listen(serverPort)
console.log('Server listening to: ', serverPort)


app.use(express.static(__dirname))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// function sleep2(miliseconds) {
//     let finished = [false];
//     setTimeout((finished) => finished[0] = true, 5000, finished);
//     while (!finished[0]) {}
// }

function sleep(miliseconds) {
    return new Promise((resolve, reject) => setTimeout(resolve, miliseconds))
}

// app.get("/sleep", async (req, res) => {
//     console.log("Con sole XD");
//     sleep2(5000);
//     console.log("No, no est'a sol");
// })
app.get ('/search/D/:departureAirport/A/:arrivalAirport/DD/:departureDate/AD/:returnDepartureDate/PA/:aditionalPassengers', (req, res) =>{
    console.log("Llega al endpoint")
    let depAirport = req.params.departureAirport
    let arrAirport = req.params.arrivalAirport
    console.log(depAirport)
    console.log(arrAirport)
    let depMonth = getYearAndMonth(req.params.departureDate)
    let depDay = getDay(req.params.departureDate)
    let retMonth = getYearAndMonth(req.params.returnDepartureDate)
    let retDay = getDay(req.params.returnDepartureDate)
    let passengers = getPassengers(req.params.aditionalPassengers)
   
    
    //https://www.norwegian.com/uk/ipc/availability/avaday?AdultCount=2&ChildCount=1&InfantCount=1&A_City=BERALL&D_City=MAD&D_Month=202009&D_Day=03&R_Month=202009&R_Day=10&IncludeTransit=true&TripType=2

    let url = `https://www.norwegian.com/es/ipc/availability/avaday?${passengers.adults}&${passengers.kids}&${passengers.babies}&A_City=${arrAirport}&D_City=${depAirport}&D_Month=${depMonth}&D_Day=${depDay}&R_Month=${retMonth}&R_Day=${retDay}&IncludeTransit=true&TripType=2`
    console.log(url)
    
    getData(url, depAirport, arrAirport)
        .then(
            (data) => {

                if(data === undefined){
                    setTimeout(getData(url), 300)
                    console.log('data undefined')
                }
                else if (data.departureTime === null){
                    let notFound = {
                        msg : "No existen vuelos disponibles para el destino o la fecha indicados"
                    }
                    console.log('data null')
                    res.send(notFound)
                }
                else{
                    console.log("Lo que devuelve Data: ", data)
                    console.log('data que deberia estar bien')
                    res.send(data)
                }  
            }
        )   
        .catch( err => { console.log("Error en promesa: ",  err); })
    // res.send('hola')
})

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
                dataNor.returnDepartureAirport = arrAirport;
                dataNor.returnArrivalAirport = depAirport;
                dataNor.returnDate = retDate;
                dataNor.returnDepartureTime = retDepTime;
                dataNor.returnArrivalTime = `${retArrTime.substring(0,5)}${retArrTimeSpan}`;
                dataNor.finalValue = `${depPrice + arrPrice}`;
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
    
    
    
 




/* ----------- Handler Functions ----------- */
/// ----------- DATE FUNCTIONS ------------ ///

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
  
/// ----------- PASSENGERS FUNCTIONS ------------ ///

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
            babies : `InfantCount=${babies.length}`,
            kids : `ChildCount=${kids.length}`,
            adults : `AdultCount=${adults.length}`,
            noOne : noPassanger.length 
        }
            console.log(passengersPerAge)
            return passengersPerAge
}



