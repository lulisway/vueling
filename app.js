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

// // app.get ('/search/:departureAirport/:arrivalAirport/:departureDate/:returnDepartureDate/aditionalPassengers', (req, res) =>{
// //     let depAirport = req.param.departureAirport
// //     let arrAirport = req.param.arrivalAirport
// //     let depDate = req.param.departureDate
// //     let retDate = req.param.returnDepartureDate
// //     let passengers = req.param.aditionalPassengers
// //     let bestFlight = funcionX()
// //     res.send(bestFlight)
// // })





app.get('/searching', (req,res)=>{



let dataNor = {
    departureAirport: "NOT FOUND",
    arrivalAirport: "NOT FOUND",
    departureDate: "NOT FOUND",
    departureTime: "NOT FOUND",
    arrivalTime: "NOT FOUND",
    returnDepartureAirport: "NOT FOUND",
    returnArrivalAirport: "NOT FOUND",
    returnDate: "NOT FOUND",
    returnDepartureTime: "NOT FOUND",
    returnArrivalTime: "NOT FOUND",
    finalValue: "NOT FOUND"
  }
    try {
        (async () => {
            /** by default puppeteer launch method have headless option true*/
            const browser = await puppeteer.launch({
                headless: false
            });
            const page = await browser.newPage();
            await page.goto('https://www.norwegian.com/es/ipc/availability/avaday?AdultCount=1&A_City=FAO&D_City=SXF&D_Month=202009&D_Day=03&R_Month=202009&R_Day=10&IncludeTransit=true&TripType=2');
            await page.evaluate(() => {
                document.cookie = "_nasStorageConsent=all=True&analysis=True&marketing=True&v=1; TS01e9bd6b=01ccc25f52e87438454bbc9410fe7e26f3aa65053dfd2625000c9963abfe7d3b66c7594904de85091aea299460678aacd1234a6f097d2cd4b238b5e68dd8c25dd97119a98279e5e99fbf9b68e8b491e356cc7b8d060561355c25dee25fe7c7f5e9394d87f62592b5f269efd4ba4821f11b7bc5cf97; ft_ld_1h=1592926467051; optimizelyEndUserId=oeu1592926467220r0.995722880752421; _gcl_au=1.1.1570753195.1592926467; _ga=GA1.2.45005213.1592926468; _gid=GA1.2.2042899770.1592926468; _gat_UA-9004708-1=1; _dc_gtm_UA-9004708-1=1; _mibhv=anon-1592926467705-1072502634_7873; _fbp=fb.1.1592926467809.795013459; forterToken=2728fe139de24a9aa3c4e02490621abd_1592926467612__UDF43_9ck; ftr_ncd=6; _hjid=800068f2-7875-403b-b910-d30f2ec99230; bid_Dyby5HwvkndCBsQvyZanSiVdOQ6UAb3Y=06ccc226-66d6-4f1c-a38a-94c4cd320997; NAS_boxever_guestRef=3d9dc009-a4d0-493b-aeb6-a43689ef882e; bx_bucket_number=29";
            });
            await page.reload();
            
            setTimeout(async () => {
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
                let depAirport = $(".avadaytable > tbody > .oddrow.rowinfo2 > .depdest > .content").html()
                console.log("DEPAIRPORT: " + depAirport)
                let arrAirport = $(".avadaytable > tbody > .oddrow.rowinfo2 > .arrdest > .content").html()
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
                await browser.close();
                dataNor.departureAirport = depAirport;
                dataNor.arrivalAirport = arrAirport;
                dataNor.departureDate = depDate;
                dataNor.departureTime = `${depTime}`;
                dataNor.arrivalTime = `${arrTime}${arrTimeSpan}`;
                dataNor.returnDepartureAirport = arrAirport;
                dataNor.returnArrivalAirport = depAirport;
                dataNor.returnDate = retDate;
                dataNor.returnDepartureTime = retDepTime;
                dataNor.returnArrivalTime = `${retArrTime.substring(0,5)}${retArrTimeSpan}`;
                dataNor.finalValue = `${depPrice + arrPrice}`;
                console.log(dataNor)
                return dataNor
            }, 5000);
        })()
    } catch (err) {
        console.error(err);
    }
})

