const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+ longitude +'&appid=4f23012dec262e8bdc5f30a6688d036b'
    console.log(latitude , longitude , url)
    request({ url, json: true }, (error, {body}={}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.cod > 400) {
            callback('Unable to find location', undefined)
        } else {
            const temp = (body.main.temp-273).toFixed(2) ;
            const max_temp = (body.main.temp_max - 273).toFixed(2);
            const min_temp = (body.main.temp_min - 273).toFixed(2);
            callback(undefined, '"'+body.weather[0].description + '". It is currently ' + temp + ' degress out. There is a ' + body.main.humidity + '% humidity.' + 'Max and Min Temp for today are '+max_temp+' and ' + min_temp + 'degress . Visibility for today is '+ body.visibility )
        }
    })
}



module.exports = forecast