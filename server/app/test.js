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



function buildTest(type, url, endpoint, response) {
	var curlString = 'curl ';
	if (type !== 'get') {
		console.log('not a "get" request');
	} else {
		curlString += url;
	}
}


// function sendRequest(curlString) {
// 	exec(curlString, function(error,stdout, stderr){
// 		console.log('stdout: ' + stdout);
// 		//console.log('stderr: ' + stderr);
// 		if (error != null) {
// 			console.log('exec error: ' + error);
// 		}
// 	})
// }

// function sendRequest(curlString) {
// 	var array = curlString.split(' ');
// 	console.log(array);
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
//   	//console.log("ERRORERROR", error);
//   });
// }


function sendRequest(curlString) {
	var array = curlString.split(' ');
  const response = spawn('curl', array);
  if (response.stdout.toString().length == 0) {
  	return response.stderr.toString();
  }
  return response.stdout.toString();
}

console.log(sendRequest("--include https://api.github.com/users/zausnerd"));
//sendRequest("curl https://api.github.com/users/zausnerd");
