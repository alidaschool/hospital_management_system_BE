const jwt = require('jsonwebtoken');


//dotenv setup
const dotenv = require('dotenv');
dotenv.config( { path : 'config.env'} )

const Doctor = require('../models/doctor');
const requireAuth = (req,res, next) => {
    const token = req.cookies.jwt;

    // check json web token exist  & verified
if (token) {
    jwt.verify(token,process.env.ACCESS_TOKEN,(err,decodedToken) => {
        if (err) {
            console.log(err.message);
            res.redirect('/login');
        } else {
            console.log(decodedToken);
            next();
        }
    })
    
} else {
    res.redirect('/login');
}

}
// check current Doctor
const checkDoctor=  (req,res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token,process.env.ACCESS_TOKEN,async (err,decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.doctor = '';
                next();
            } else {
                console.log(decodedToken);

                let doctor = await Doctor.findById(decodedToken.id);
                res.locals.doctor = doctor;
                next();
            }
        })
        
    } else {
        res.locals.doctor = '';
                next();
    }
    
    }
module.exports = { requireAuth, checkDoctor };