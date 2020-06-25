
app.get('/searchnora', (req,res)=>{
    try {
        (async () => {
            /** by default puppeteer launch method have headless option true*/
            const browser = await puppeteer.launch({
                headless: false
            });
            const page = await browser.newPage();
            await page.goto('https://www.britishairways.com/travel/booking/public/es_es/#/flightList?origin=MAD&destination=LCY&outboundDate=2020-11-12&inboundDate=2020-11-22&adultCount=1&youngAdultCount=0&childCount=0&infantCount=0&cabin=M&ticketFlexibility=LOWEST&journeyType=RTFLT&source=false');
           
            setTimeout(async () => {
                const $ = cheerio.load(await page.content());
                console.log($("body").html());
                await page.screenshot({path: 'screenshot.png'});
                await browser.close();
            }, 20000);
        })()
    } catch (err) {
        console.error(err);
    }
})

// app.get('/searchlucia', (req,res)=>{
//     try {
//         (async () => {
//                 const browser = await puppeteer.launch({
//                     headless: true,
//                     args: [`--user-agent=Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko`]
//                 });
//                 const page = await browser.newPage();
//                 // const fakeUserAgent = 'Mozilla/5.0 (Windows NT 10.0; WOW64; Triden/7.0; rv:11.0) like Gecko'

//                 // browser.on('targetcreated', async (target) =>{
//                 //     let page = await target.page()
//                 //     await page.setUserAgent(fakeUserAgent)
//                 // })
                
//                 // await page.setUserAgent(fakeUserAgent)
//                 await page.goto('https://www.klm.es/search/offers?pax=1:0:2:0:0:0:0&cabinClass=ECONOMY&activeConnection=0&connections=MAD:A:20200625%3EROM:C-ROM:C:20200705%3EMAD:A', {waitUntil: 'domcontentloaded'});
          
           
//             setTimeout(async () => {
//                 const $ = cheerio.load(await page.content());
//                 console.log($("body").html());
//                 await page.screenshot({path: 'screenshot.png'});
//                 await browser.close();
//             }, 15932);
//         })()
//     } catch (err) {
//         console.error(err);
//     }
// })



// app.use(express.static(__dirname))

// app.listen(serverPort)
// console.log('Server listening to: ', serverPort)


// app.get('/search', (req, res) => {
//     driver.get('https://www.norwegian.com/es/ipc/availability/avaday?AdultCount=1&A_City=LON&D_City=MAD&D_Month=202010&D_Day=01&R_Month=202010&R_Day=08&IncludeTransit=true&TripType=2');

// driver.findElement(By.id('aspnetForm').then(function(element){
//     element.getText().then(function(text){
//         console.log(text);
//     });
// }))
// })







// app.get('/scrape', function(req, res){

// url = 'https://www.norwegian.com/es/ipc/availability/avaday?AdultCount=1&A_City=LON&D_City=MAD&D_Month=202010&D_Day=01&R_Month=202010&R_Day=08&IncludeTransit=true&TripType=2';

// request(url, function(error, response, html){
//     if(!error){
//         var $ = cheerio.load(html);
//         console.log(html)

//     var price;
//     var json = {
//                 // departureAirport: "",
//                 // arrivalAirport: "",
//                 // departureDate: "",
//                 // departureTime: "",
//                 // arrivalTime: "",
//                 // returnDepartureAirport: "",
//                 // returnArrivalAirport: "",
//                 // returnDate: "",
//                 // returnDepartureTime: "",
//                 // returnArrivalTime: "",
//                    finalValue: ""
//     };

//     $('.label seatsokfare').filter(function(){
//         var data = $(this);
//         console.log(data)
//         price = data.text()
//         console.log(price)
//         json.finalValue = "holi";
//     })

//     // $('.star-box-giga-star').filter(function(){
//     //     var data = $(this);
//     //     rating = data.text();

//     //     json.rating = rating;
//     // })
// }

// // To write to the system we will use the built in 'fs' library.
// // In this example we will pass 3 parameters to the writeFile function
// // Parameter 1 :  output.json - this is what the created filename will be called
// // Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
// // Parameter 3 :  callback function - a callback function to let us know the status of our function

// fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

//     console.log('File successfully written! - Check your project directory for the output.json file');

// })

// // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
// res.send('Check your console!')

//     }) ;
// })

// exports = module.exports = app


