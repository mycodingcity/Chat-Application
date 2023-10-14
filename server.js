const express = require("express")
const app = express()
const port = 3000
const http = require("http").createServer(app)
const io = require('socket.io')(http)

 app.use(express.static(__dirname + "/public")) // this is for CSS link

app.get('/' , (req, res) =>{
res.sendFile(__dirname + '/index.html')
})

http.listen(port , () => {
    console.log(`Your server is running on ${port}`)
})

io.on('connection' , (socket)=> {
    console.log("I am connected..")

    socket.on('user-joined' , (mymsg) =>{
        socket.broadcast.emit('user-joined' , mymsg)
    })

socket.on('message' , (msg) =>{
    socket.broadcast.emit('message' , msg)
})

})
