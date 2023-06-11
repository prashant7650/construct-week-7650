const express = require('express');
const { connection } = require('./configs/db');
const { adminRouter } = require('./routes/admin.routes');
const {userRouter} = require('./routes/user');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


const { logger } = require('./middlewares/logger.middleware');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors())

app.use(express.json());
app.use(logger);


app.use("/users", userRouter)



const http = require("http");

const socketio = require('socket.io');

const { chatting } = require('./configs/chatting');
 


const serverHttp = http.createServer(app)
const io = socketio(serverHttp); // with wss we are attaching http server

chatting(io); // using the imported chatting function and passing io instance/ object 











serverHttp.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log("connected to db ")

    }
    catch (err) {
        console.log("error | connection", err)
    }
    console.log(`server started @ http://localhost:${process.env.PORT}`)
})

