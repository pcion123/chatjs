import logger from "./util/logger.js";
import controller from "./controller/controller.js";
import socketio from "./socket/socketio.js";

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
				controller.onSendMessage(messageinput.value);
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
				controller.onTest(maintext);
			}
		}
	}

	function update() {
		// socketio.update();
	}
}());