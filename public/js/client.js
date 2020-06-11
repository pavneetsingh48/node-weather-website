// import { response } from "express"

// import { response } from "express"

// console.log('client side javasccript file is loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response) =>{
//      response.json().then((data)=>{
//          console.log(data)
//      })  
// })



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1=document.querySelector('#msg1')
const message2=document.querySelector('#msg2')

// message1.textContent='from javascript'

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value 
    message1.textContent='loading....'
    message2.textContent=''
    
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            // console.log(data.error)
            message1.textContent=data.error
        }
        else{
            // console.log(data.location)
            // console.log(data.forecast)   
            message1.textContent=data.location
            message2.textContent=data.forecast  
        }
    })
}) 
})