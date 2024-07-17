const express = require("express")

const PORT = 3000
const server = express()

server.use(express.json())  // inbuilt middleware

const stringsInArray = (arr) => {
    let flag = true
    arr.forEach(element => {
        if(typeof element !== 'string'){
            flag = false
            return flag
        }
    });
    return flag
}

const validator = (req, res, next) => {
    let {ID, Name, Rating, Description, Genre, Cast} = req.body
    let errMessage = ''
    if(typeof ID !== "number" ){
        errMessage += "ID must be a number"
    }
    if(typeof Name !== "string" ){
        errMessage += "Name must be a string"
    }
    if(typeof Rating !== "number" ){
        errMessage += "Rating must be a number"
    }
    if(typeof Description !== "string" ){
        errMessage += "Description must be a string"
    }
    if(typeof Genre !== "string" ){
        errMessage += "Genre must be a string"
    }
    if(!Array.isArray(Cast) || !stringsInArray(Cast)){
        errMessage += "Cast must be an array of string"
    }
    if(errMessage){
        return res.status(400).json({
            message : "Bad request. some data is incorrect",
            note : errMessage,
        })
    }

    next()
}

server.post("/", validator, (req, res) => {
    res.status(200).json({message : "Data recieved"})
})

server.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT} number `);
})