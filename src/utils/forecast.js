const request=require('request')
const forecast =(latitude,longitude,callback) => {
const url = 'http://api.weatherstack.com/current?access_key=f0aa2993044271ee891e73349c55694f&query='+ latitude + ',' +longitude +'&units=m'
  request({ url,json : true},(error,{ body}) =>
  {
     if(error)
     {
        callback('Unabe to connect to weather service !',undefined)
     }
     else if(body.error){
           callback('Unable to find location !',undefined)
     }
     else{
           callback(undefined,'It is currently ' + body.current.temperature +' degrees out.But it feels like ' + body.current.feelslike + 'degree out.')
     }
  })
}

module.exports = forecast