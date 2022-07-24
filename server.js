const http = require('http');
const app = require('./app');
const dotenv = require('dotenv');
const server = http.createServer(app);
const connectDB = require("./server/database/dbConnect");

//dotenv setup
dotenv.config( { path : 'conf.env'} )
const PORT = process.env.PORT  || 3000;

// connect to mongoDB Atlas
connectDB();
server.listen(PORT, (err) => {
    if(err) {
        console.log('Something went wrong: ', err);
    } else {
        console.log(`Server is running on port: , http://localhost:${PORT}`);
    }
})