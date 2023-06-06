const cors = require("cors")
const fruits = require('./fruits.json')
const express = require("express")
const app = express()

//const logger = require("./logger")
//app.use(logger)

app.use('/fruits',express.json())

app.get('/', (req,res) => {
    res.send("Hello Fruit API")
})

app.get('/fruits', (req,res) => {
    res.send(fruits)
})

app.get('/fruits/:name', (req,res) => {
    const name = req.params.name.toLowerCase()
    console.log(name)
    const fruit = fruits.find((fruit) => fruit.name.toLowerCase() == name)
    if(fruit == undefined){
        //Do something
        res.status(404).send()
    }else{
        res.send(fruit)
    }
})

app.post('/fruits', (req,res) => {
    //Check if fruit is in Json
    const fruit = fruits.find((fruit) => fruit.name.toLowerCase() == req.body.name.toLowerCase())
    if(fruit != undefined){
        res.status(409).send()
    }else{
        //Add the fruit to the JSON
        fruits.push(req.body)
        res.status(201).send(req.body)
    }
})

app.delete('/fruits/:name', (req,res) => {
    //See if it exists
    const fruit = fruits.find((fruit) => fruit.name.toLowerCase() == req.params.name.toLowerCase())
    if(fruit == undefined){
        //Can not delete nothing
        res.status(404).send()
    }else{
        //Delete part
        // const indexToDelete = fruits.indexOf(fruit)
        // fruits.splice(indexToDelete, 1)
        fruits.splice(fruits.indexOf(fruit), 1)
        //TO DO
        res.status(204).send()
    }
})


module.exports = app