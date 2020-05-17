const request=require('request')

const geocode=(address,callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?access_token=pk.eyJ1Ijoia2FyYW5hbGFnaDEyMyIsImEiOiJjazl0dDYzMXMwMWtoM2ZzMzlrejh4YjgyIn0.DM_ai6C75aBYbAYs3c6T3g&limit=1'
    request({ url,json : true},(error,{body}) => {
        if(error)
        {
            callback('Unable to connect to geo services !',undefined)
        }
        else if(body.features.length ===0){
            callback('Unable to search location. Try another !',undefined) 
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode