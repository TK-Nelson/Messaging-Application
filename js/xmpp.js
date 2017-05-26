//https://www.ibm.com/developerworks/xml/tutorials/x-realtimeXMPPtut/
//http://stackoverflow.com/questions/32266997/strophe-js-receive-only-one-message
//http://strophe.im/strophejs/doc/1.0.2/files2/strophe-js.html#Strophe.getText

    const BOSH_SERVICE = 'http://xmpp.dubtel.com:7070/http-bind/';
    var connection = null;
    var myJid=null;
    var toJid =null;
    var msg=null;


    //Strophe Debugger
    //Strophe.log = function(level, msg) {
    //  console.log(level + ' : ' + msg);
   // };  
function timeNow(){


    var d= new Date()
    var hour = d.getHours()
    var min = d.getMinutes()
    var ampm = "AM"
    var strReturn = hour+ ":" + min + " " + ampm

    //if (d.getMinutes() < 10) {
    //    return d.getHours()+":0" + d.getMinutes();
    //}else{
    //    return d.getHours()+":"+d.getMinutes()
    //};

     if (hour>12){
        hour =hour-12;
        ampm = "PM"
    } 

    if (min < 10) {
       min = "0" + min;
    }
    return strReturn

}


function log(msg){
    $('#chat-log').append('<div class="msg"><div class="msg-body" id="msg">'+ msg +'</div><div class="msg-time" id="msg_time">'+timeNow()+ "</div> <div>")
    //$('#chat-log').append('<div class="i-flex" id="msg">'+timeNow()+ " "+ msg+ '</div>').append(document.createTextNode(msg));
}



function notifyUser(msg) 
{  
    var to = msg.getAttribute('to');
    var from = msg.getAttribute('from');
    var type = msg.getAttribute('type');
    var elems = msg.getElementsByTagName('body');

    //If message s populated and to is populated, print message to chat field. 
   if (type == "chat" && elems.length > 0){
        var body = elems[0];
        var text = Strophe.getText(body);
        log(text)
    }
        return true;
}
    

function onConnect(status){
    if(status==Strophe.Status.CONNECTING){
        console.log('Strophe is connecting.');
    }else if (status == Strophe.Status.CONNFAIL){
        console.log('Strophe failed to connect.');
    }else if (status== Strophe.Status.DISCONNECTING){
        console.log('Strophe is disconnecting.');  
    }else if (status == Strophe.Status.DISCONNECTED){
        console.log('Strophe is disconnected.');
    }else if (status == Strophe.Status.AUTHFAIL){
        console.log('Strophe failed to authenticate.');
    }else if(status == Strophe.Status.CONNECTED){
        console.log('Strophe is connected.');
        connection=this;
        

        // Listener to catch other user's msgs
        connection.addHandler(notifyUser, null, 'message', null, null,  null);
        //connection.addHandler(onOwnMessage, null, 'iq', 'set', null,  null); 
        connection.send($pres().tree());
        console.dir(connection);
        //Send test message to user.
        log("Hello! Any new posts will appear below.") 
        
    }   
}


function XMPP(xmppUser, password) {
    var conn = new Strophe.Connection(BOSH_SERVICE);
    myJid = xmppUser;
    connection = conn.connect(
        xmppUser + '@xmpp.dubtel.com',
        password, 
        onConnect);
    }



function sendMessage(to, type){
    msg = $("#message-box").get(0).value;
    var msgPkg=$msg({
        to: myJid+'@xmpp.dubtel.com', 
        type:'chat'
    })
    .cnode(Strophe.xmlElement('body', msg)).up();
    connection.send(msgPkg)
    $('#chat-log').animate({scrollTop:$('#chat-log').height()}, 700)
    document.getElementById('message-box').value = "";
    document.getElementById('message-box').focus()

}