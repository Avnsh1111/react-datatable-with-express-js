import jwt from 'jsonwebtoken';
import config from '../config';
import mime from 'mime';
export default class Utils { 
	static functionName(string){
		string = string.split('_');
		const strNew=[];
		for(let st of string){
			strNew.push(st.charAt(0).toUpperCase() + st.slice(1));	
		}
		return strNew.join('');
	}


	static camelCaseConvert(s){
		console.log('string', s)
		s = s.split('By')[0];
		let camel = s.replace(/[A-Z]/g, '-$&').toLowerCase()
		return camel
	}

	static checkApiMethod(method){
		const methods = ['get','put','post','delete']
		if(methods.indexOf(method) > -1){
			return true;
		}
		return false
	}

	static checkApiAuth(string){
		if(string === 'auth'){
			return true;
		}
		return false
	}

	static getRoute(arr, isAuth = false){
		if(isAuth){
			console.log('calling auth');
			return arr ? '/' + arr.splice(2,arr.length).join('-') : '';
		}
		return arr ? '/' + arr.splice(1,arr.length).join('-') : '';
	}

	static getAdminRoute(arr, isAuth = false, pos){
		if(isAuth){
			arr = arr.splice((pos +1),arr.length);
			return arr.length > 0 ? '/admin/' + arr.join('-') : '/admin';
		}
		return arr ? '/' + arr.splice(pos,arr.length).join('-') : '';
	}

	static getParams(string){
		let params = string.split('By');
		params.shift();
		let paramString = '';
		for(let param of params){
			paramString += `/:${param.toLowerCase()}`;
		}
		return paramString;
	}

	static makeId(length) {
	   let result           = '';
	   let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	   let charactersLength = characters.length;
	   for ( let i = 0; i < length; i++ ) {
	      result += characters.charAt(Math.floor(Math.random() * charactersLength));
	   }
	   return result;
	}

	static otp(length) {
	   let result           = '';
	   let characters       = '0123456789';
	   let charactersLength = characters.length;
	   for ( let i = 0; i < length; i++ ) {
	      result += characters.charAt(Math.floor(Math.random() * charactersLength));
	   }
	   return result;
	}

	static generateToken(user) {
	  return jwt.sign(user, config.secret, {
	    expiresIn: 60810 // in seconds
	  });
	}
	static decodeBase64Image(dataString) {
	  let matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
	    response = {};

	  if (matches.length !== 3) {
	    return new Error('Invalid input string');
	  }

	  response.type = matches[1];
	  response.data = new Buffer.from(matches[2], 'base64');

	  return response;
}
}