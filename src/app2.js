const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')


console.log(path.join(__dirname, '../public'))

const viewspath = path.join(__dirname,'../templates/views')
app.set('views'.viewspath)

app.set('views',viewspath)           /// define paths for express configurations
app.set('view engine', 'hbs')

app.use(express.static(path.join(__dirname, '../public')))

app.get('',(req,res) =>{
    res.render('index')
    // res.send('index page')\
})

app.get('/about' ,(req,res) => {
    res.send('the information will be shown here')
})

app.get('/title' ,(req,res) => {
    res.send('title page')
})

app.get('*',(req,res) => {
    res.send('my 404 page')
})  //this * we have used here is the wild card character which is used to 
//   recognise any other /extension if it is not defined so it sends an o/p insread of error

app.get('/weather' ,(req,res) => {
    res.send('weather will be shown here')
})


app.listen(2000 ,() => {
    console.log('server is up at port 2000')
})
