var fs = require('fs');
var chai = require('chai');
var chaiHttp = require('chai-http');
var jsDiff = require('diff');
var exec = require('child_process').exec;
// var spawn = require('child_process').spawn;
var spawn = require('child_process').spawnSync;
chai.use(chaiHttp);

function isDiff(obj1, obj2) {
	var diff = jsDiff.diffJson(obj1, obj2);
	for (var i = 0; i < diff.length; i++) {
		if (diff[i].hasOwnProperty('added') || diff[i].hasOwnProperty('removed')) {
			return false;
		}
	}
	return true;
}

function buildPOST() {

}

function buildDelete() {

}

function builPUT() {

}

function buildTest(test) {
  var curlString = '';
	if (test.method == 'GET') { curlString = buildGET(test); }
  else if (test.method == 'POST') { curlString = buildPOST(test); }
  else if (test.method == 'PUT') { curlString = buildPUT(test); }
  else { curlString = buildDelete(test); }
  var response =  sendRequest(curlString);
  return response;
}

function buildGET(test) {
  var string = '';
  if (test.headers) {
    for (var i = 0; i < test.headers.length - 1; i++) {
      if (test.headers[i] !== undefined && test.headers[i] !== null && test.headers[i] !== '{}') {
        var header = '-H'+ '%' + test.headers[i].key + ':' + test.headers[i].value +  '%';
        string += header;
      }
    }
  }
  string += test.url;
  return string;
}


function sendRequest(curlString) {
	var array = curlString.split('%');
  const response = spawn('curl', array);
  if (response.stdout == null) {
  	return response.stderr.toString();
  }
  return response.stdout.toString();
}

//testObj = {url:"https://httpbin.org/get?show_env=1", headers: [{key: "testing",value: "123"}, {key: "hi",value: "friend" }, {key: "myNameIs",value: "slimShady" }], method: 'GET' };
//testObj = {url:"https://httpbin.org/get?show_env=1", method: 'GET' };
var testObj =  {"user":{"_id":"57320be92c0bed2837117814","email":"user@user.com","__v":0,"isAdmin":false,"jobs":[]},"url":"http://httpbin.org/get","params":[],"headers":[{"key":"hi","value":"friend"},{}],"body":{"data":[]},"method":"GET","name":"david"}
//var testObj =  {"user":{"_id":"57320be92c0bed2837117814","email":"user@user.com","__v":0,"isAdmin":false,"jobs":[]},"url":"http://httpbin.org/get","params":[],"body":{"data":[]},"method":"GET","name":"david"}
console.log(buildTest(testObj));




// function sendRequest(curlString) {
//  exec(curlString, function(error,stdout, stderr){
//    console.log('stdout: ' + stdout);
//    //console.log('stderr: ' + stderr);
//    if (error != null) {
//      console.log('exec error: ' + error);
//    }
//  })
// }

// function sendRequest(curlString) {
//  var array = curlString.split(' ');
//  console.log(array);
//   const response = spawn('curl', array);

//   response.stdout.on('data', (data) => {
//       console.log('stdout:', data.toString());
//   });

//   response.stderr.on('data', (data) => {
//       //console.log('ERROR STDOUT:', data.toString());
//   });

//   response.on('close', (code) => {
//       //console.log('CLOSING', code);
//   });

//   response.on('error', (error) => {
//    //console.log("ERRORERROR", error);
//   });
// }
