  <!-- See https://unpkg.com/browse/p5ble@0.0.7/README.md -->
  <!--script src="https://unpkg.com/p5ble@0.0.7/dist/p5.ble.js"></script-->


// BLE related functions

function connectToBle() {
    // Connect to a device by passing the service UUID
    // Runs in the background, will call gotCharacteristics is connected
    console.log('connect to BLE');
    myBLE.connect(serviceUuid, gotCharacteristics);
    connectButton.hide();
    saveButton.show();
    console.log('connectoBLE finished');
}


// A function that will be called once got characteristics
function gotCharacteristics(error, characteristics) {
    console.log('gotCharacteristics');

    if (error)
        console.log('error: ', error);
    console.log('characteristics: ', characteristics);
    myCharacteristic = characteristics[0];
    // Read the value of the first characteristic, attach to callback function gotValue
    //myBLE.read(myCharacteristic, 'string', gotValue); // to read a string
    myBLE.read(myCharacteristic, 'uint16', gotValue);
    //plot(myCharacteristic);

    myBLE.onDisconnected(onDisconnected);

    timeStarted = Date.now();
    console.log('gotCharacteristics finished');
}

// A function that will be called once got values
function gotValue(error, value) {
    if (error)
        console.log('error: ', error);

    // swap the bytes (little endian ->> big endian)
    myValue = (value & 0xFF) * 256 + (value >>> 8);
    //console.log('T:', Date.now(), 'value: ', value);
    console.log('T:', Date.now() - timeStarted, 'value: ', myValue);

    plot(myValue, myValue, myValue);

    if (myBLE.isConnected()) {
        myBLE.read(myCharacteristic, 'uint16', gotValue);
    } else {
        console.log('not connected');
    }
}



// Button handlers
function testPressed() {
    console.log('test pressed');

    //var btn1 = document.getElementById('test_button1');
    //btn1.style.display = "none";

    // timeStamp = new Date.now();
    // console.log('T:', Date.now());
    const timestamp = new Date().getTime();
    saveButton.show();
    //testButton.hide();
    var i = parseInt((Math.random() * 10), 10) + 440;
    if (i < mi)
        mi = i - 5;
    if (i > ma)
        ma = i + 5;
    console.log('T:', timestamp, 'i', i);
    plot(i, min, max);
}


// Plot & draw related

