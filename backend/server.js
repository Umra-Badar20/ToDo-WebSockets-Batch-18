import app from "./src/app.js"
import connectDB from "./src/db/db.js"
const port = 3000
import { Server } from "socket.io";
import { createServer } from "http";

connectDB()

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: "*"
});

io.on("connection", (socket) => {
 console.log("Socket Connected", socket.id);
 socket.on("add-todo",(data)=>{
    console.log(data);    
 })
 
});

httpServer.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})