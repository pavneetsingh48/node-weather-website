//we are making this geocode file so that we can use it in future by just calling in the file name 
//and grab the features of this file without defining the whole function
//by thi we can call const geocode=require(./utils/geocode.js) and we can link ths file to the other one


const request =  require('request')
 const geocode = (address,callback )=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoicGF2bmVldCIsImEiOiJja2FjNnp5ZGcxOW4yMnZzOTU0eThyN3V6In0.b8unawNvuqu4oCNeLctYZA'
    
    request({url: url , json:true}, (error,response)=>{ 
            if(error){
                callback('network issue , cant connect to the server',undefined)
            }
            else if(response.body.features.length===0){
                callback('unable to find the location,try another search',undefined)
            }
            else {
                callback(undefined,{
                    latitude: response.body.features[0].center[1],
                    longitude: response.body.features[0].center[0],
                    location: response.body.features[0].place_name
                })
            }
            
         })

 } 
 module.exports = geocode           