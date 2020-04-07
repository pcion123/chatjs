import logger from "../util/logger.js";
import string from "../util/string.js";

import socketio from "../socket/socketio.js";

import asyncholder from "../base/task/asyncholder.js";
import task from "../base/task/task.js";
import schedule from "../base/task/schedule.js";

const controller = {
	maintext : null,

	addressinput : null,
	connectbtn : null,
	disconnectbtn : null,

	accountinput : null,
	passwordinput : null,
	loginbtn : null,
	logoutbtn : null,

	messageinput : null,
	sendmessagebtn : null,
	clearbtn : null,
	testbtn : null,

	init : function() {
		this.maintext = document.getElementById('maintext');
		this.addressinput = document.getElementById('addressinput');
		this.connectbtn = document.getElementById('connectbtn');
		if (this.connectbtn != null) {
			connectbtn.onclick = this.onConnect;
		}
		this.disconnectbtn = document.getElementById('disconnectbtn');
		if (this.disconnectbtn != null) {
			disconnectbtn.onclick = this.onDisconnect;
		}
		this.accountinput = document.getElementById('accountinput');
		this.passwordinput = document.getElementById('passwordinput');
		this.loginbtn = document.getElementById('loginbtn');
		if (this.loginbtn != null) {
			loginbtn.onclick = this.onLogin;
		}
		this.logoutbtn = document.getElementById('logoutbtn');
		if (this.logoutbtn != null) {
			logoutbtn.onclick = this.onLogout;
		}
		this.messageinput = document.getElementById('messageinput');
		this.sendmessagebtn = document.getElementById('sendmessagebtn');
		if (this.sendmessagebtn != null) {
			sendmessagebtn.onclick = this.onSendMessage;
		}
		this.clearbtn = document.getElementById('clearbtn');
		if (this.clearbtn != null) {
			clearbtn.onclick = this.onClear;
		}
		this.testbtn = document.getElementById('testbtn');
		if (this.testbtn != null) {
			testbtn.onclick = this.onTest;
		}
	},

	onConnect : function() {
		socketio.connect(addressinput.value);
	},

	onDisconnect : function() {
		socketio.disconnect();
	},

	onLogin : function() {
		let account = accountinput.value;
		let password = passwordinput.value;
		logger.info(string.format("onLogin -> {0} {1}", account, password));
	},

	onLogout : function() {
		logger.info("onLogout");
	},

	onSendMessage : function() {
		socketio.send(1, 1, messageinput.value);
	},

	onMessage : function(message) {
		if (maintext.value == "") {
			maintext.value = message;
		} else {
			maintext.value = maintext.value + '\n' + message;
		}
	},

	onClear : function() {
		maintext.value = "";
	},

	onTest : function() {
		// asyncholder.add(new task(asyncholder, this, [1, 1, 2], function(obj, params) { logger.info(obj); params.forEach(element => logger.info(element)) }, 3000));
		asyncholder.add(new schedule(asyncholder, this, [1, 1, 2], function(obj, params) { logger.info(obj); params.forEach(element => logger.info(element)) }, 3000));
	}
};
export default controller;