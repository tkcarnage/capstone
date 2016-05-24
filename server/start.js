/*

 ES6 by default! Using http://babeljs.io

 Our actual application code begins inside of
 server/main.js, but the process should be started
 from this file in order to enable ES6 translation.

 There is no boilerplate ES6 code in our application
 so if you choose not to use any ES6 features, you can
 start your application from main.js.

*/

require('babel-register');
require('./main');

// var electron = require('electron');
// var app = electron.app;  // Module to control application life.
// var BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.

// // Keep a global reference of the window object, if you don't, the window will
// // be closed automatically when the JavaScript object is garbage collected.
// var mainWindow = null;

// // Quit when all windows are closed.
// app.on('window-all-closed', function() {
//     // On OS X it is common for applications and their menu bar
//     // to stay active until the user quits explicitly with Cmd + Q
//     if (process.platform != 'darwin') {
//         app.quit();
//     }
// });

// function createWindow () {
//     // Create the browser window.
//     mainWindow = new BrowserWindow({width: 1200, height: 1080, "node-integration": false, minWidth: 1200, icon: __dirname + "/desktopapp.png"});

//     // and load the index.html of the app.
//     mainWindow.loadURL('http://localhost:1337/');
//     mainWindow.webContents.openDevTools();
//     // Emitted when the window is closed.
//     mainWindow.on('closed', function() {
//         // Dereference the window object, usually you would store windows
//         // in an array if your app supports multi windows, this is the time
//         // when you should delete the corresponding element.
//         mainWindow = null;
//     });
//     console.log(process.platform);

// }

// // This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
// app.on('ready', createWindow);

// app.on('activate', () => {
//     if(mainWindow === null) {
//         createWindow();
//     }
// });

