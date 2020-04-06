import list from "./base/list.js";
import logger from "./util/logger.js";
import string from "./util/string.js";
import json from "./util/json.js";
import controller from "./controller/controller.js";
import socketio from "./socket/socketio.js";
import protocol from "./socket/protocol.js";

(function() {
	var maintext;

	var addressinput;
	var connectbtn;
	var disconnectbtn;

	var accountinput;
	var passwordinput;
	var loginbtn;
	var logoutbtn;

	var messageinput;
	var sendmessagebtn;
	var clearbtn;
	var testbtn;

	init();

	function init() {
		initSystem();
		initUI();

		// logger.info(socketio.socket);
		// socketio.connect(addressinput.value);
		// logger.info(socketio.socket);
	}

	function initSystem() {
		setInterval(update, 200);
	}

	function initUI() {
		maintext = document.getElementById('maintext');
		addressinput = document.getElementById('addressinput');
		connectbtn = document.getElementById('connectbtn');
		if (connectbtn != null) {
			connectbtn.onclick = function() {
				controller.onConnect(socketio, addressinput.value);
			}
		}
		disconnectbtn = document.getElementById('disconnectbtn');
		if (disconnectbtn != null) {
			disconnectbtn.onclick = function() {
				controller.onDisconnect(socketio);
			}
		}
		accountinput = document.getElementById('accountinput');
		passwordinput = document.getElementById('passwordinput');
		loginbtn = document.getElementById('loginbtn');
		if (loginbtn != null) {
			loginbtn.onclick = function() {
				controller.onLogin(accountinput.value, passwordinput.value);
			}
		}
		logoutbtn = document.getElementById('logoutbtn');
		if (logoutbtn != null) {
			logoutbtn.onclick = function() {
				controller.onLogout();
			}
		}
		messageinput = document.getElementById('messageinput');
		sendmessagebtn = document.getElementById('sendmessagebtn');
		if (sendmessagebtn != null) {
			sendmessagebtn.onclick = function() {
				controller.onSendMessage(socketio, messageinput.value);
			}
		}
		clearbtn = document.getElementById('clearbtn');
		if (clearbtn != null) {
			clearbtn.onclick = function() {
				controller.onClear(maintext);
			}
		}
		testbtn = document.getElementById('testbtn');
		if (testbtn != null) {
			testbtn.onclick = function() {
				// controller.onTest(maintext);
				// socketio.send(1, 1, "1324587");
				// logger.info(socketio.getConnected());
				// socketio.setConnected(true);
				// logger.info(socketio.getConnected());
				// socketio.setConnected(false);
				// var message = socketio.formater(1,1,"123456");
				// logger.info(message);
				// var str = json.objToStr(message);
				// logger.info(str);
				// var lista = new list(1);
				// var listb = new list(10);
				// logger.info(lista);
				// logger.info(listb);
				// logger.info(lista.add(9));
				// logger.info(listb.add(9));
				protocol.bind(0, 0, function() {
					logger.info("test");
				})
				protocol.processes[0][0]();
			}
		}
	}

	function update() {
		// socketio.update();
	}
}());