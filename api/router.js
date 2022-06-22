import express from 'express';
import passport from 'passport';
import {passportService, refreshToken} from './services/passport';

import fs from 'fs';
// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

import Utils from './lib/utils';

export default function (app) {

  const apiRoutes = express.Router();
    


    fs
  .readdirSync(`${__dirname}/modules`)
  .filter(file => (file.slice(-3) === '.js'))
  .forEach((file) => {
    let className = require(`./modules/${file}`);
    let obj = new className.default();
    getRoutes(obj, file.slice(0,-3));
    ///console.log(obj);
  });


  function getRoutes(obj,file,){
    let methods = new Set();
    //console.log('methods',obj)
    var propertyNames = Object.getOwnPropertyNames(Object.getPrototypeOf(obj));

    const apiMethod = ['get', 'post','put', 'delete']
    
    for(let method of propertyNames){
      let controllerMethod = Utils.camelCaseConvert(method);
      
      controllerMethod = controllerMethod.split('-');
      
      
      if(apiMethod.indexOf(controllerMethod[0]) > -1){

        let middleware1 = (req,res,next) => { next()};
        let middleware2 = (req,res,next) => { next()};
        let routeName = null;
        let isAdmin = controllerMethod[2]==='admin' ? true : false;
        if(controllerMethod[1]==='auth' && !isAdmin){
            routeName = Utils.getRoute(controllerMethod,true);
            middleware1 = requireAuth;
        }
        else if(isAdmin){
            let pos = controllerMethod[2]==='admin' ? 2:1;
            routeName = Utils.getAdminRoute(controllerMethod,true, pos);
            middleware1 = isAdmin ? requireAuth : middleware1;
        }
        else{
          routeName = Utils.getRoute(controllerMethod);
        }
 
        if(routeName==='/login'){
          middleware1= requireLogin;
        }
        let params = Utils.getParams(method);
        routeName = routeName === '/' ? '' : routeName;
        console.log(controllerMethod[0],(`/${file}${routeName}${params}`));
        apiRoutes[controllerMethod[0]](`/${file}${routeName}${params}` ,middleware1, middleware2, async (req, res) => {
          let result;
          let requestObj= {
            query: req.query,
            params: req.params,
            body: req.body,
            user: req.user,
          }
          console.log('requestObj',requestObj);
          result =await obj[method](requestObj);
          
          res.send(result);
        });
      }

    }

    //Utils.checkApiMethod();
    
    //authRoutes.post('/register', AuthenticationController.register);  
  }
  

  // Set url for API group routes
  app.use('/api', apiRoutes);
};
