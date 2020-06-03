const request= require('request')

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)


//property short hand 3 rd verions
const forecast = (longitude,latitude,callback) => {
    const url='http://api.weatherstack.com/current?access_key=c02a6ab707eea4fa3d5ece9cf51dbf26&query=' + latitude  + ' , '+  longitude + ' &units=m'
    request({ url,json: true},(error,{body}) => {
        if(error){
            callback('unable to connect location service',undefined)
        }else if(body.error){
            callback('unable to fine location .Try another !',undefined)
        }
        else{
            callback(undefined,
                body.current.weather_descriptions[0] + '  . It is currently '+  body.current.temperature + ' degrees out. There is a ' + body.current.feelslike + '% chance of rain.'
                // weather_description : response.body.current.weather_descriptions[0],
                // temprature : response.body.current.temperature,
                // feelsLike: response.body.current.feelslike
                )
        }
    })
}

module.exports=forecast

//1st version
  // const url='http://api.weatherstack.com/current?access_key=c02a6ab707eea4fa3d5ece9cf51dbf26&query=20.5937,78.9629&units=m'
// request({ url: url, json:true }, (error,response) => {
//         // const data=JSON.parse(response.body) //json string to object
//         // console.log(data.current)
//         //  console.log(response.body.current)
//         //  challenge
//         console.log(response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees out. There is a ' + response.body.current.feelslike + '% chance of rain.')
        
// })

// 2nd version
// const forecast = (longitude,latitude,callback) => {
//     const url='http://api.weatherstack.com/current?access_key=c02a6ab707eea4fa3d5ece9cf51dbf26&query=' + latitude  + ' , '+  longitude + ' &units=m'
//     request({ url :url,json: true},(error,response) => {
//         if(error){
//             callback('unable to connect location service',undefined)
//         }else if(response.body.error){
//             callback('unable to fine location .Try another !',undefined)
//         }
//         else{
//             callback(undefined,
//                 response.body.current.weather_descriptions[0] + '  . It is currently '+  response.body.current.temperature + ' degrees out. There is a ' + response.body.current.feelslike + '% chance of rain.'
//                 // weather_description : response.body.current.weather_descriptions[0],
//                 // temprature : response.body.current.temperature,
//                 // feelsLike: response.body.current.feelslike
//                 )
//         }
//     })
// }