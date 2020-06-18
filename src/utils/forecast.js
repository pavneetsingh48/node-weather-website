//i have created this file so that the function for the forcast can be reused again and again
// weather forcast function has been created into this file

const request= require('request')

 const forecast = (latitude,longitude,callback )=>{
    const url = 'http://api.weatherstack.com/current?access_key=0a7e3e3b5c315ef9c8ab5ce320cfab85&query=' + latitude + ',' + longitude

    request({url: url , json:true}, (error,response)=>{ 
            if(error){
                callback('network issue , cant connect to the server',undefined)
            }
            else if(response.body.errors){
                callback('unable to find the location,try another search',undefined)
            }
            else {
                callback(undefined,'the current actual temperature is '  + response.body.current.temperature + ' deg c .it feels like '+response.body.current.feelslike +' deg c . there is ' + response.body.current.precip + ' % chances of rain . The current windspeed is ' + response.body.current.wind_speed + ' km/h. the current visibility is '+ response.body.current.visibility + ' km')
            }
            
         })

 } 
 module.exports = forecast