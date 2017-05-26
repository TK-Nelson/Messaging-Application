const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const ipcRenderer  = require('electron').ipcRenderer
const remote = require('electron').remote
const {ipcMain} = require('electron')


const path = require('path')
const url = require('url')
const Store = require('./js/store.js');
const fs = require('fs')
//const localStorage = require('localStorage')



// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, ses, win, user, sesPersistStr, windowBounds
//let now, expTime = new Date()

//Saved object
args = {
  user,
  win}


function createWindow () {
  // Create the browser window.
  // Need to use to log back in before create window
    
  let {width, height, x, y} = store.get('win')
  args.win = store.get('win')
  mainWindow = new BrowserWindow({width, height, x, y})//, frame:false})
try{
	 args.user = store.get('user')
	 args.win = store.get('win')
	 log("-------------args at the Try call----------------")
	 logd(args)
	 log(" ")
}
catch (e){
	log("Error loading user:  "+e)
}


mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
      }))

// Open the DevTools.
  mainWindow.webContents.openDevTools()

  mainWindow.on('close', function(){
  	save(args)
  })

  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.

   

    mainWindow = null
  })
   
}


app.on('ready', function(){
  createWindow()
})

app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  //if(userData.userData.expirationTime)
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  } 
})




function log(msg){
	console.log(msg)
}

function logd(msg){
	console.dir(msg)
}


function save(data){ 
  debugger
	log("----------------------Before------------------------")
	logd(args)
  log(" ")
	store.set('win', mainWindow.getBounds())
  log("-----------------------------------------------")
  logd(data)
  log(" ")
  for (var property in data){
    log("property: "+property)

    if (property in data && property in args.user){
      log(property+" is a property in data")
      log(data)
      //Storage concatination & testing
    }else{
      log('Function imported data does not have '+ property)
    }
  }
  log("----------------------After------------------------")
  logd(args)
  log(" ")
}


//ipcRenderer Messages

ipcMain.on('sesRequest', (event, arg) =>{
	//args.user = arg
  log("------------------sesRequest-------------------")
  logd(arg)
	save(arg);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
})


ipcMain.on('dashWinDim', (event, arg)=> {
	let {width, height, x, y} = store.get('win');
	mainWindow.setBounds(store.get('win') )
})


//Saved Configs
const store = new Store({
  configName:'user-preferences',
  defaults:{
	    win:{
	    	width:800,
	    	 height:600,
	    	  x:0,
	    	  y:0
	    	},
	    user:{
	    	"userName":'', 
	        "email":'',
	        "pass":'',
	        "friends":[],
	        "loggedIn":'false'
	    }
  }
})


