const express = require("express")
const shortid = require('shortid')

const server = express()

server.use(express.json())

const port = 8000

server.listen(port, () => console.log("server up"))

const users = [
    {
        id: shortid.generate(),
        name: "Mike Hawk",
        bio: "Famous pro skaters unknown son"
    },
    {
        id: shortid.generate(),
        name: "Shelly Blip",
        bio: "Damn nice lady"
    }
]


server.get('/', (req,res) => {
    res.status(200).json({message: "Ayyyeeoo First Server"})
})

server.get('/api/users', (req,res) => {
    res.status(200).json({data: users})
})

server.get('/api/users/:id', (req,res) => {
    const id = req.params.id
    const user = users.filter(user => user.id === id)
    res.status(200).json(user)
})

server.post('/api/users', (req,res) => {
    const user = req.body
    users.push(user)
    res.status(200).json({data: users})
})

server.delete('/api/users/:id', (req,res) => {
    const id = Number(req.params.id)
    const newUsers = users.filter(user => user.id !== id)
    res.status(200).json(newUsers)
})

server.put('/api/users/:id', (req,res) => {
    const changes = req.body
    const id = Number(req.params.id)
    let found = users.find(user => user.id === id)
    if (found) {
        Object.assign(found, changes)
        res.status(200).json(found)
    } else {
        res.status(404).json({message: 'not found'})
    }
})