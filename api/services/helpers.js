import { ROLE_MEMBER, ROLE_CLIENT, ROLE_OWNER, ROLE_ADMIN } from '../constants';

var request = require('request');

// Set user info from request
export function setUserInfo(request) {
  const getUserInfo = {
    id: request.id,
    first_name: request.first_name,
    last_name: request.last_name,
    email: request.email,
    role: request.role,
    mobile_no: request.mobile_no,
    gender: request.gender,
    birth_date: request.birthDate,
    status: request.status,
    country :  request.country,
  };

  return getUserInfo;
};

export async function getRole(id) {

  let role = await database.Role.findOne({where:{id: id}});

  if(!role)
    return false;

  return id;
  
};

export function ucFirst (s) {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function currentTime(){
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  var hours = today.getHour();
  var minutes = today.getMinutes();
  var seconds = today.getSeconds();

  return yyyy + '-' + mm + '-' + dd + " " + hours + ":" + minutes + ":" + seconds;
}

export function currentDate(){
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  return yyyy + '-' + mm + '-' + dd;
}

export function CurrentTime(){
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  var hours = today.getHour();
  var minutes = today.getMinutes();
  var seconds = today.getSeconds();

  return hours + ":" + minutes + ":" + seconds;
}

export async function sendNotification  (device_id,notification,data){
  var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        registration_ids: device_id,
        collapse_key: 'Perform Action',

        notification: notification,

        data: data
    };

    return new Promise((resolve, reject) => {
         fcm.send(message, (err, result)=>{
           if(err)
             reject(err);

           resolve(result)
         });
       })
}


export function roleAuthorization  (requiredRole) {
  return async function (req, res, next) {
    const user = req.user;
    console.log('i  callled')
    const foundUser = await database.User.findOne({where:{id:user.id}}) //, (err, foundUser) => {
      if (!foundUser) {
        return res.status(422).json({ error: 'No user was found.' });
        //return next();
      }
      
      if (foundUser.role == 1) {
        return next();
      }

      return res.status(401).json({ error: 'You are not authorized to view this content.' });
    //});
  };
};
