// Button definitions and button (gui) functions
// console.log("buttons.js script");

var connectButton = document.getElementById("connect_button");
var listButton = document.getElementById("list_button");
var resetButton = document.getElementById("reset_button");
var saveButton = document.getElementById("save_button");
var testButton = document.getElementById("test_button");

// var s0Button = document.getElementById("0s");
// var s1Button = document.getElementById("1s");
// var s10Button = document.getElementById("10s");
// var m1Button = document.getElementById("1m");
var avgBox = document.getElementById("avg");

function myFunction() { // just for testing
    connectButton.innerHTML = "aangepast click";
    //btn2.style.display="block";
    saveButton.style.visibility = "visible";
}

function resetFunction() {
    console.log('resetbutton pressed');
    data = [];
	points = [];
    var t = new Date();
    for (var i = dataPoints; i >= 0; i--) {
		var x = new Date(t.getTime() - i * 1000);
		data.push([x, NaN, NaN, NaN]);
	}
}

function saveData() { // data saving - split in gui and data part
    console.log('save data');
	if (debug) {
		console.log('points');
		console.log(points);
	}
    //var d = new Blob([points], {type: 'text/plain'});
    const csvBlob = new Blob(points, {
        type: 'text/csv;encoding:utf-8'
    });
	
	if (debug) {
		console.log('csvBlob');
		console.log(csvBlob);
	}
		
    textFile = window.URL.createObjectURL(csvBlob);
	if (debug) {
		console.log('textFile');
		console.log(textFile);
	}

    var link = document.getElementById('downloadlink');
    link.style.visibility = 'visible';
    link.href = textFile;
}

function testPressed() {
    console.log('test pressed');
	debug = !debug;
    const timestamp = new Date().getTime();
    saveButton.disabled = false;
	listButton.disabled = false;
	noLoop(); // p5.js
}

function debugPressed() {
    console.log('debug pressed');
	ck = document.cookie;
	console.log('ck',ck);
	debug = !debug;
    const timestamp = new Date().getTime();
    saveButton.disabled = false;
	listButton.disabled = false;
	//noLoop(); p5.js
}

// https://www.w3schools.com/js/js_cookies.asp
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}