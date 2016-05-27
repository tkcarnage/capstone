/*jshint esversion: 6 */

var electron = require('electron');
// Module to control application life.
var app = electron.app;
// Module to create native browser window.
var BrowserWindow = electron.BrowserWindow;
// var client = require('electron-connect').client;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 500, height: 500, "web-preferences" : {"web-security" : false, nodeIntegration: "true"} });

  //electron connect to server process
  // client.create(mainWindow);

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/windows/main/main.html');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQSxJQUFJLFdBQVcsUUFBUTs7QUFFdkIsSUFBSSxNQUFNLFNBQVM7O0FBRW5CLElBQUksZ0JBQWdCLFNBQVM7Ozs7O0FBSzdCLElBQUk7O0FBRUosU0FBUyxnQkFBZ0I7O0VBRXZCLGFBQWEsSUFBSSxjQUFjLENBQUMsT0FBTyxLQUFLLFFBQVE7Ozs7OztFQU1wRCxXQUFXLFFBQVEsWUFBWSxZQUFZOzs7RUFHM0MsV0FBVyxZQUFZOzs7RUFHdkIsV0FBVyxHQUFHLFVBQVUsWUFBWTs7OztJQUlsQyxhQUFhOzs7Ozs7O0FBT2pCLElBQUksR0FBRyxTQUFTOzs7QUFHaEIsSUFBSSxHQUFHLHFCQUFxQixZQUFZOzs7RUFHdEMsSUFBSSxRQUFRLGFBQWEsVUFBVTtJQUNqQyxJQUFJOzs7O0FBSVIsSUFBSSxHQUFHLFlBQVksWUFBWTs7O0VBRzdCLElBQUksZUFBZSxNQUFNO0lBQ3ZCOztHQUVEIiwic291cmNlc0NvbnRlbnQiOlsiLypqc2hpbnQgZXN2ZXJzaW9uOiA2ICovXG5cbnZhciBlbGVjdHJvbiA9IHJlcXVpcmUoJ2VsZWN0cm9uJyk7XG4vLyBNb2R1bGUgdG8gY29udHJvbCBhcHBsaWNhdGlvbiBsaWZlLlxudmFyIGFwcCA9IGVsZWN0cm9uLmFwcDtcbi8vIE1vZHVsZSB0byBjcmVhdGUgbmF0aXZlIGJyb3dzZXIgd2luZG93LlxudmFyIEJyb3dzZXJXaW5kb3cgPSBlbGVjdHJvbi5Ccm93c2VyV2luZG93O1xuLy8gdmFyIGNsaWVudCA9IHJlcXVpcmUoJ2VsZWN0cm9uLWNvbm5lY3QnKS5jbGllbnQ7XG5cbi8vIEtlZXAgYSBnbG9iYWwgcmVmZXJlbmNlIG9mIHRoZSB3aW5kb3cgb2JqZWN0LCBpZiB5b3UgZG9uJ3QsIHRoZSB3aW5kb3cgd2lsbFxuLy8gYmUgY2xvc2VkIGF1dG9tYXRpY2FsbHkgd2hlbiB0aGUgSmF2YVNjcmlwdCBvYmplY3QgaXMgZ2FyYmFnZSBjb2xsZWN0ZWQuXG52YXIgbWFpbldpbmRvdztcblxuZnVuY3Rpb24gY3JlYXRlV2luZG93ICgpIHtcbiAgLy8gQ3JlYXRlIHRoZSBicm93c2VyIHdpbmRvdy5cbiAgbWFpbldpbmRvdyA9IG5ldyBCcm93c2VyV2luZG93KHt3aWR0aDogODAwLCBoZWlnaHQ6IDYwMH0pO1xuXG4gIC8vZWxlY3Ryb24gY29ubmVjdCB0byBzZXJ2ZXIgcHJvY2Vzc1xuICAvLyBjbGllbnQuY3JlYXRlKG1haW5XaW5kb3cpO1xuXG4gIC8vIGFuZCBsb2FkIHRoZSBpbmRleC5odG1sIG9mIHRoZSBhcHAuXG4gIG1haW5XaW5kb3cubG9hZFVSTCgnZmlsZTovLycgKyBfX2Rpcm5hbWUgKyAnL3dpbmRvd3MvbWFpbi9tYWluLmh0bWwnKTtcblxuICAvLyBPcGVuIHRoZSBEZXZUb29scy5cbiAgbWFpbldpbmRvdy53ZWJDb250ZW50cy5vcGVuRGV2VG9vbHMoKTtcblxuICAvLyBFbWl0dGVkIHdoZW4gdGhlIHdpbmRvdyBpcyBjbG9zZWQuXG4gIG1haW5XaW5kb3cub24oJ2Nsb3NlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAvLyBEZXJlZmVyZW5jZSB0aGUgd2luZG93IG9iamVjdCwgdXN1YWxseSB5b3Ugd291bGQgc3RvcmUgd2luZG93c1xuICAgIC8vIGluIGFuIGFycmF5IGlmIHlvdXIgYXBwIHN1cHBvcnRzIG11bHRpIHdpbmRvd3MsIHRoaXMgaXMgdGhlIHRpbWVcbiAgICAvLyB3aGVuIHlvdSBzaG91bGQgZGVsZXRlIHRoZSBjb3JyZXNwb25kaW5nIGVsZW1lbnQuXG4gICAgbWFpbldpbmRvdyA9IG51bGw7XG4gIH0pO1xufVxuXG4vLyBUaGlzIG1ldGhvZCB3aWxsIGJlIGNhbGxlZCB3aGVuIEVsZWN0cm9uIGhhcyBmaW5pc2hlZFxuLy8gaW5pdGlhbGl6YXRpb24gYW5kIGlzIHJlYWR5IHRvIGNyZWF0ZSBicm93c2VyIHdpbmRvd3MuXG4vLyBTb21lIEFQSXMgY2FuIG9ubHkgYmUgdXNlZCBhZnRlciB0aGlzIGV2ZW50IG9jY3Vycy5cbmFwcC5vbigncmVhZHknLCBjcmVhdGVXaW5kb3cpO1xuXG4vLyBRdWl0IHdoZW4gYWxsIHdpbmRvd3MgYXJlIGNsb3NlZC5cbmFwcC5vbignd2luZG93LWFsbC1jbG9zZWQnLCBmdW5jdGlvbiAoKSB7XG4gIC8vIE9uIE9TIFggaXQgaXMgY29tbW9uIGZvciBhcHBsaWNhdGlvbnMgYW5kIHRoZWlyIG1lbnUgYmFyXG4gIC8vIHRvIHN0YXkgYWN0aXZlIHVudGlsIHRoZSB1c2VyIHF1aXRzIGV4cGxpY2l0bHkgd2l0aCBDbWQgKyBRXG4gIGlmIChwcm9jZXNzLnBsYXRmb3JtICE9PSAnZGFyd2luJykge1xuICAgIGFwcC5xdWl0KCk7XG4gIH1cbn0pO1xuXG5hcHAub24oJ2FjdGl2YXRlJywgZnVuY3Rpb24gKCkge1xuICAvLyBPbiBPUyBYIGl0J3MgY29tbW9uIHRvIHJlLWNyZWF0ZSBhIHdpbmRvdyBpbiB0aGUgYXBwIHdoZW4gdGhlXG4gIC8vIGRvY2sgaWNvbiBpcyBjbGlja2VkIGFuZCB0aGVyZSBhcmUgbm8gb3RoZXIgd2luZG93cyBvcGVuLlxuICBpZiAobWFpbldpbmRvdyA9PT0gbnVsbCkge1xuICAgIGNyZWF0ZVdpbmRvdygpO1xuICB9XG59KTsiXSwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
