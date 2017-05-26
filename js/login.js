   
module.exports= (function login(URIStr){

	event.preventDefault()
    log("URI String: "+URIStr)
    var email = formData('login_form').username
    var password =formData('login_form').password
    var user={}


    $.ajax({
    	url:'http://api.dubtel.com/v1/login',
    	type: 'POST',
    	data: URIStr,
    	dataType:'JSON'
    }).done(function(data){
            logd(data)
            if(data.status== "Success"){
                logd(data)
                user.email=data.email
                user.userName = data.first_name+data.last_name
                user.pass =''
                user.loggedIn= true
                window.localStorage.setItem('user', JSON.stringify(user))
                //app.load('./pages/dashboard.html #content', 
                    //function(){
                        //user.loggedIn=true;
                        //ipcRenderer.send('sesRequest', user);
                        //XMPP(user.userName, user.pass);
                        //ipcRenderer.send('dashWinDim', user);
                    //$('#userName').append(user.userName)
                    

                //})
            }
        })
    	

    
    return URIStr
})