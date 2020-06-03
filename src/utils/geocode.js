const request=require('request')
const geocode= (address,callback) => {
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +' .json?access_token=pk.eyJ1Ijoia2lzdWpldGhhdmEiLCJhIjoiY2thcWl5djV3MDBlYjJ6b2NvbXU3NzA2MCJ9.sCp_lZkbta8AaXf6EjPw8g'
//property short hand es6 
    request({url,json:true},(error,{body}) => {
        if(error){
            callback('unable to connect location service',undefined)
        }
        else if(body.features.length === 0){
            callback('unable to find location. Try another!',undefined)
        }
        else{
        callback(undefined,{ 
             longtitude  : body.features[0].center[0],
             latitude  : body.features[0].center[1],
             location : body.features[0].place_name
        })
    
        }
    })

}
module.exports = geocode