// const express = require('express')
// const app = express()
// const path = require('path')//this is core module of node ehich helps to call some func to connect 
//to some different file like html fiel to join with backend 

// console.log(path.join(__dirname, '../public'))
//now this path.join is pre defined function which takes us to the path or the directory from the 
//existing one 

// const hbs = require('hbs')

// app.get('' ,(req,res) => {
//     res.send('<h1>weather app</h1>') // here we are passing html code 
// })

//another thing we have done is that we intalled hbs which is just like
//html but the difference is that we can now use some more features like rendering 
// and passing a value using node js only as shown in code below


// app.use(express.static(path.join(__dirname, '../public')))
//static take the path we want to serve up




const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')

//setup static directory to serve
const publicdirectorypath= path.join(__dirname,'../public')
app.use(express.static(publicdirectorypath))


const viewspath = path.join(__dirname,'../templates/views')//setup handlebars and view engine 
app.set('views',viewspath)           /// define paths for express configurations
app.set('view engine','hbs')  //we are using this so that express can identify that we will be using 
                                // handlebars here and it can connect with hbs


const partialpath = path.join(__dirname,'../templates/partials')
hbs.registerPartials(partialpath)  

const forecast=require ('./utils/forecast.js')
const geocode = require('./utils/geocode.js')

                                




// // app.get('/help' ,(req,res) => {
// //     res.send({
// //         name : 'pavneet singh',
// //         age: 20
// //     })  //here we are passing json data and express can detect the json data and show the parsed value

// })

// app.get('',(req,res) => {                     
//    res.send('<h1>WEATHER APP</h1>')     //no need to pass this blank extention as index.html is working
// })                                      // instead of this    

app.get('/help' ,(req,res) => {
    res.render('help',{
        title:'HELP PAGE',
        helptext: 'this is a helpful text',
        name :'pavneet singh'
    })
})
                                            // here also html files will be working here 
app.get('/about' ,(req,res) => {
    res.render('about',{
        title : 'ABOUT PAGE',
        name: 'pavneet singh'
    })
})

app.get('',(req , res) =>{
    res.render('index' , {
        title:'WEATHER APP',
        name: 'pavneet singh',
        age: 20
    })
})


app.get('/weather' ,(req,res) => {
    
    if(!req.query.address){
        res.send({
            error : 'location not entered'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={} ) => {
        if(error){
            return res.send({error})
        }
    

    forecast(latitude,longitude,(error,forecastData)=>{
        if(error){
            return res.send({error})
        }

    res.send({
           forecast : forecastData,
           location : location,
           address : req.query.address  
        })    
      }) 
    })
}) 

app.get('/product',(req,res) => {

    if(!req.query.search){
        res.send({
            error : 'please provide a search term'
        })
    }
   else{
    console.log(req.query.search)
    res.send({
        product: []
    })
   }
    
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title :'404',
        name : 'pavneet singh',
        errormessage : 'help page could not be found'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title :'404',
        name : 'pavneet singh',
        errormessage : 'page could not be found'
    })
})

app.listen(3000 , ()=>{
    console.log('server is up on port 3000')
})