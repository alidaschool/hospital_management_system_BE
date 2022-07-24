const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

const bodyParser = require("body-parser");
const { requireAuth, checkDoctor } = require('./server/middleware/authMiddleware');


// parse request to body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Controlling the Cross-Origin Resource Sharing (CORS) Error
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', `*`);
//     res.header(
//         "Access-Control-Allow-Header", 
//         "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//     );
//     if(req.method == 'OPTIONS') {
//         res.header(
//             "Access-Control-Allow-Methods",
//             "PUT, POST, GET, DELETE"
//         );
//         return res.status(200).json({});
//     }
// });

// Getting Available Routes:
const patientRoute = require('./server/routes/patients');
const sessionRoute = require('./server/routes/session');
const doctorRoute = require('./server/routes/doctors');
const nurseRoute = require('./server/routes/nurses');
const authRoute =  require('./server/routes/auth');

// Using Morgan Middleware
app.use(morgan('dev'));

// Route Middlewares:
// app.get('*',checkDoctor);
// app.use('/auth', authRoute);
// app.use('/session', sessionRoute);
// app.use('/patients', patientRoute);
// app.use('/doctors', requireAuth,doctorRoute);
// app.use('/nurses', nurseRoute);

app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    })
})


module.exports = app;