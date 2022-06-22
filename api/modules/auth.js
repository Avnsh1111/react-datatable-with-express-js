import jwt from 'jsonwebtoken';
import crypto from 'crypto';
//import User from '../models/user';
import { setUserInfo, getRole, sendOtp, sendNotification } from '../services/helpers';
import config from '../config';
import User from '../models/user';
var request = require('request');
//var User = require('../models/user');
// Generate JWT
// TO-DO Add issuer and audience
function generateToken(user) {
  return jwt.sign(user, config.secret, {
    expiresIn: 86400*365 // in seconds
  });
}
  
//= =======================================
// Login Route
//= =======================================

export default class AuthContoller {

	async postLogin  (req)  {  
	  if(req.user && req.user.error){
	  	return this.returnError(req.user.error);
	  }
	  const userInfo = setUserInfo(req.user);
	  const token = req.body.deviceToken

	  await database.User.update({deviceToken: token},{where:{id:req.user.id}});

	  return {
	      success: true,
	      token: `JWT ${generateToken(userInfo)}`,
	      data: userInfo,
	      message: 'Account successfully login.'
	    };
	}


	async postRegister (req, res, next) {
	  // Check for registration errors
	  const first_name = req.body.first_name;
	  const last_name = req.body.last_name;
	  const email = req.body.email;
	  const mobile_no = req.body.mobile_no;
	  const password = req.body.password;
	  const gender = req.body.gender;
	  const birth_date = req.body.birth_date;
	  const country = req.body.country;


	  // Return error if no first name provided
	  if (!first_name) {
	    return this.returnError('You must enter a first name.'); 
	  }

	  // Return error if no last name provided
	  if (!last_name) {
	    return this.returnError('You must enter a last name.'); 
	  }

	  // Return error if no email provided
	  if (!email) {
	    return this.returnError('You must enter an email address.'); 
	  }

	  // Return error if no email provided
	  if (!mobile_no) {
	    return this.returnError('You must enter an mobile no.'); 
	  }

	  // Return error if no password provided
	  if (!password) {
	    return this.returnError('You must enter a password.'); 
	  }

	  // Return error if no gender provided
	  if (!gender) {
	    return this.returnError('You must enter a gender.'); 
	  }

	  // Return error if birth_date provided
	  if (!birth_date) {
	    return this.returnError('You must enter a birth_date.'); 
	  }

	  // Return error if country provided
	  if (!country) {
	    return this.returnError('You must enter a country.'); 
	  }

	  try {
	    //let User = new database.User();
	    let user = await database.User.findOne({ where:{ email }});
	    if(user){
	      return this.returnError('EmailId is already in use.'); 
	    }
	    user = await database.User.findOne({ where:{ mobile_no }});
	    if(user){
	      return this.returnError('MobileNo is already in use.'); 
	    }
	    else{
	      const otp = Math.floor(100000 + Math.random() * 900000);
	      const code =Math.random().toString(36).substring(8)
	      const userData = {
	        first_name,
	        last_name,
	        email,
	        password,
	        mobile_no,
	        gender,
	        birth_date,
	        country
	      };
	      user = await database.User.create(userData);
	      user = JSON.parse(JSON.stringify(user))
	    
	      const userInfo = setUserInfo(user);

	    return {
	      success: true,
	      token: `JWT ${generateToken(userInfo)}`,
	      data: userInfo,
	      message: 'Account created.'
	    };
	  
	    }
	  }
	  catch(e){
	  	console.log('e', e);
	    return this.returnError('Server error.'); 
	  }
	};

	returnError(message){
	    return {
	      success: false,
	      data: {},
	      message: message
	    };
	  }
}
