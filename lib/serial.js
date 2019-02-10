'use strict';

//Numato Lab - http://numato.com
//This node.js sample script opens the port and sends two commands to the device. These commands
//will turn on Relay0, wait for 2 seconds and then turn off. The response received from the device
//is printed to the console unparsed.
//Please follow the steps below to test the script.

//1. Download and install Node.js from https://nodejs.org/download/
//2. Run command "npm install serialport" at the command prompt to install serial port library.
//3. Attach the gpio device to the PC and note the port identifier corresponding to the device.
//4. Update the line below that starts with "var port =" with the port name for your device.
//5. Run the script by entering the command "node UsbRelay" at the command prompt

const serialport = require("serialport");

module.exports = {

	toggle: function (app) {

		return new Promise(function (reject, resolve) {

			var dev = app.config.device.port ? app.config.device.port : "/dev/ttyACM0";
			var baudrate = app.config.device.baudrate ? app.config.device.baudrate : "19200";
			
			var port = new serialport(dev, {
				baudRate: parseInt(baudrate),
				autoOpen: false
			});
			port.on('open', function(error) {
				console.log( dev + ' open: ' +  error ? error.message : "" );
			});
			port.on('data', function (data) {
				console.log( dev + ' data: ' + String(data));
			});				
			port.on('close', function(error){
				console.log( dev + ' close: ' +  error ? error.message : "" );
			});
			port.on('error', function(error){

				if(port.isOpen){
					port.close();
				}
				reject({
					status: error ? error.message : "",
					device: dev
				})
			});	
				
			port.open(function(error){

				port.write("relay on 0\r");

				setTimeout(function () {

					port.write("relay off 0\r");

					if(port.isOpen){
						port.close();
					}
					resolve({
						status: error ? error.message : "",
						device: dev
					})								

				}, 1000);		
				
			});
		})
	},
}