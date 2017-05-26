
var app = $('#app')
var login = require('././js/login.js')
var formData = require('././js/formData.js')

function log(msg){
	console.log(msg)
}

function logd(msg){
	console.dir(msg)
}

function navToRegister(){
  app.load('./pages/Register.html #content');

}

function navLogin(){
    app.load('./index.html #content');
}


function Register(){
     $.post('http://api.dubtel.com/v1/register',$('#Register').serialize(), function(data){ 
     navLogin();  
    });
}





function init(){
	document.getElementById('login-submit').addEventListener('click', function(){
		//var email = formData('login_form').username;
    	//var password =formData('login_form').password;

		login($('#login_form').serialize())
		

	})
}

document.onreadystatechange = function(){
	log("Document State: "+ document.readyState)
	if(document.readyState=="complete"){
		init();
	}
}