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


var curlBuilder = {
  headers: function(test, curlString) {
    test.headers.forEach(function(elem) {
      if (elem.key != undefined) {
        var string = '-H'+ '%' + elem.key + ':' + elem.value;
        curlString += string;
      }
    });
    return curlString;
  },
  url: function(test,curlString) {
    curlString += '%' + test.url;
    return curlString;
  },
  authorization: function(test, curlString) {
    var authString = '%--user' + '%' + test.authorization.email + ':' + test.authorization.password;
    curlString += authString;
    return curlString;
  },
  body: function(test, curlString) {
    var string = '';
    if (test.body.bodytype == 'x-www-form-urlencoded') {
      // console.log(test.body.data,typeof JSON.parse(test.body.data));
      string += '%-d%';
       var arrayObj = JSON.parse(test.body.data);
        arrayObj.forEach(function(elem) {
          if (elem.key!= undefined) {
            string += elem.key + "=" + elem.value + "&";
          }
        });
        string = string.substring(0,string.length - 1);
        // string += '"';
    } else if (test.body.bodytype === 'raw') {
      string += '%--data%' + test.body.data;
      string += '%-H'+ '%' + 'Content-type' + ':' + 'application/json';
    } else if (test.body.bodytype == 'form-data') {
        var arrayObj = JSON.parse(test.body.data);
        arrayObj.forEach(function(elem) {
          if (elem.key!= undefined) {
            string += '%-F%';
            string += elem.key + "=" + elem.value;
          }
        });
    }
    curlString += string;
    return curlString;
  }
}

function buildCurlString(testObj) {
  var curlString = '-X%' + testObj.method + '%';
  for (var key in curlBuilder) {
    if (testObj[key]) {
      curlString = curlBuilder[key](testObj, curlString);
    }
  }
  return sendRequest(curlString);
}


function sendRequest(curlString) {
	var array = curlString.split('%');
  // console.log(array);
  const response = spawn('curl', array);
  if (response.stdout == null) {
  	return response.stderr.toString();
  }
  return response.stdout.toString();
}

//curl -X POST -F 'size=small' -F 'topping=bacon' https://httpbin.org/post

//testObj = {url:"https://httpbin.org/get?show_env=1", headers: [{key: "testing",value: "123"}, {key: "hi",value: "friend" }, {key: "myNameIs",value: "slimShady" }], method: 'GET' };
//testObj = {url:"https://httpbin.org/get?show_env=1", method: 'GET' };
//var testObj =  {"user":{"_id":"57320be92c0bed2837117814","email":"user@user.com","__v":0,"isAdmin":false,"jobs":[]},"url":"http://httpbin.org/get", "authorization" : {email: "zausnerd@gmail.com", password: "password"}, "params":[],"headers":[{"key":"hi","value":"friend"},{}],"body":{"data":[]},"method":"POST","name":"david"}
//var testObj =  {"user":{"_id":"57320be92c0bed2837117814","email":"user@user.com","__v":0,"isAdmin":false,"jobs":[]},"url":"https://api.github.com/users/zausnerd", "authorization" : {email: "zausnerd", password: "password1"}, "params":[],"headers":[{"key":"hi","value":"friend"},{}],"body":{"data":[]},"method":"GET","name":"david"}
//var testObj = { "url" : "https://httpbin.org/post", "params" : [ ], "headers" : [ ], "user" : "57320be92c0bed2837117814", "expectedStatus" : "200", "body" : { "data" : "[{\"key\":\"size\",\"value\":\"small\"},{\"key\":\"topping\",\"value\":\"bacon\"},{}]", "bodytype" : "form-data", "expectation" : "{RESULT:\"EXPECTED\"}", "result" : "New" }, "response" : null, "method" : "POST", "name" : "first_test", "__v" : 0 }
var testObj = { "url" : "https://httpbin.org/post", "params" : [], "headers" : [ ], "user" : "57320be92c0bed2837117814", "expectedStatus" : "200", "body" : { "data" : '[{"key":"iLove", "value":"Pizza"},{"key":"imOkWith", "value":"Broccoli"}]', "bodytype" : "x-www-form-urlencoded", "expectation" : "{RESULT:\"EXPECTED\"}", "result" : "New" }, "response" : null, "method" : "POST", "name" : "first_test", "__v" : 0 }
//var testObj = { "url" : "https://httpbin.org/post", "params" : [ ], "headers" : [ ], "user" : "57320be92c0bed2837117814", "expectedStatus" : "200", "body" : { "data" : "{'test': 'hello'}", "bodytype" : "raw", "expectation" : "{RESULT:\"EXPECTED\"}", "result" : "New" }, "response" : null, "method" : "POST", "name" : "first_test", "__v" : 0 }
//var testObj =  {"user":{"_id":"57320be92c0bed2837117814","email":"user@user.com","__v":0,"isAdmin":false,"jobs":[]},"url":"http://httpbin.org/get","params":[],"body":{"data":[]},"method":"GET","name":"david"}
//var testObj =  {"user":{"_id":"57320be92c0bed2837117814","email":"user@user.com","__v":0,"isAdmin":false,"jobs":[]},"url":"http://httpbin.org/post","params":[],"body":{"data":[{"pizza":"isGood"},{"tacoBell":"YUM"}]},"method":"POST","name":"david", "bodytype" : "x-www-form-urlencoded"};


console.log(buildCurlString(testObj));



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
