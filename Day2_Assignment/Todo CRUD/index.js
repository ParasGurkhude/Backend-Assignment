const express = require("express")
const fs = require('fs')


const server = express()
const PORT = 3030

server.use(express.json())

server.get('/home', (req, res) => {
    res.send('Welcome to the home page')
})


const readJson = () =>{  // function to get data from db.json file
    const data = fs.readFileSync("./db.json", "utf-8")
    return JSON.parse(data)
}

const writeJson = (data) =>{
    fs.writeFileSync("./db.json", JSON.stringify(data, null, 2))
}

// get todo data
server.get("/todo-data", (req, res) => {
    const data = readJson()
    res.send(data)
})

// Post /  Add Todo data
server.post('/add-todo', (req, res) => {
    const data = readJson();

    const newTask = {
        id : data.todos.length + 1,
        task : req.body.task,
        status : false,
    }

    data.todos.push(newTask)
    writeJson(data)
    res.json(newTask)
})

// put / update todo data
server.put("/update-data", (req, res) => {
    const data = readJson()
    data.todos.forEach( todo => {
        if(todo.id % 2 == 0 && todo.status === false){
            todo.status = true
        }
    });
    writeJson(data)
    res.json(data.todos)
})

// delete todo data
server.delete("/delete-data", (req, res) => {
    const data = readJson()
    data.todos = data.todos.filter((todo) => !todo.status)
    writeJson(data)
    res.json(data.todos)
})

server.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT} number`);
})