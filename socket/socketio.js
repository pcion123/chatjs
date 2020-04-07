import logger from "../util/logger.js";
import string from "../util/string.js";
import json from "../util/json.js";
import time from "../util/time.js";

import config from "../config.js";

import protocolId from "../constant/protocolid.js";

import protocol from "./protocol.js";

import asyncholder from "../base/task/asyncholder.js";
import task from "../base/task/task.js";
import schedule from "../base/task/schedule.js";

const socketio = {
	socket : null,
	host : "ws://localhost:8080/",
	connected : false,
	serialId : 0,

	processes : Array.from(Array(256), () => new Array(256)),

	pingSchedule : null,
	pingTime : time.now(),

	init : function() {
		this.bind(protocolId.SYSTEM.code, 0, protocol.rcv_000_000);
		this.bind(protocolId.ACCOUNT.code, 1, protocol.rcv_001_001);
	},

	bind : function(mainNo, subNo, event) {
		this.processes[mainNo][subNo] = event;
	},

	connect : function(host) {
		if (!window.WebSocket) {
			window.WebSocket = window.MozWebSocket;
		}
		if (window.WebSocket) {
			if (this.connected) {
				this.disconnect();
			}
			this.host = host;
			this.socket = new WebSocket(host);
			this.socket.parent = this;
			this.socket.onmessage = this.onReceive;
			this.socket.onopen = this.onConnect;
			this.socket.onclose = this.onDisconnect;
		} else {
			alert("browser is not support websocket.");
		}
	},

	disconnect : function() {
		if (this.socket != null) {
			this.socket.close();
			this.socket = null;
		}
	},

	update : function() {

	},

	dispatcher : function(pack) {
		if (pack == null) {
			logger.warn("rcv pack is undefined");
			return;
		}
		if (pack.header == null) {
			logger.warn("rcv pack header is undefined");
			return;
		}
		if (pack.buffer == null) {
			logger.warn("rcv pack buffer is undefined");
			return;
		}
		let mainNo = pack.header.mainNo;
		let subNo = pack.header.subNo;
		let message = pack.buffer;
		if (this.processes[mainNo][subNo] != null) {
			this.processes[mainNo][subNo](message);
		} else {
			logger.warn(string.format("process {0}_{1} is not registed", mainNo, subNo));
		}
	},

	send : function(mainNo, subNo, message) {
		if (this.connected) {
			let pack = this.formater(mainNo, subNo, message);
			let str = json.objToStr(pack);
			this.socket.send(str);
			logger.debug("socket is send pack -> " + str);
		} else {
			logger.warn(string.format("{0} is not connected", this.host));
		}
	},

	formater : function(mainNo, subNo, buffer) {
		return this.formater0(mainNo, subNo, buffer, 0);
	},

	formater0 : function(mainNo, subNo, buffer, serialId) {
		let pack = new Object();
		if (serialId == 0) {
			pack.header = this.genHeader(mainNo, subNo);
		} else {
			pack.header = this.genHeader0(mainNo, subNo, serialId);
		}
		pack.buffer = buffer;
		return pack;
	},

	genSerialId : function() {
		return this.genSerialId0(this.serialId);
	},

	genSerialId0 : function(id) {
		this.serialId = id + 1;
		return this.serialId;
	},

	genHeader : function(mainNo, subNo) {
		let id = this.genSerialId();
		return this.genHeader0(mainNo, subNo, id);
	},

	genHeader0 : function(mainNo, subNo, serialId) {
		let header = new Object();
		// header.isCompress = false;
		// header.len = 20;
		header.mainNo = mainNo;
		header.subNo = subNo;
		header.serialId = serialId;
		// header.sessionId = user.sessionId;
		// header.token = user.token;
		// header.uid = user.uid;
		return header;
	},

	ping : function(socket) {
		socket.pingTime = time.now();
		
		socket.send(0, 0, null);
	},

	onReceive : function(event) {
		logger.debug("socket is receive pack -> " + event.data);

		let pack = json.strToObj(event.data);
		this.parent.dispatcher(pack);
	},

	onConnect : function(event) {
		this.parent.connected = true;
		this.parent.pingSchedule = asyncholder.runSchedule(this.parent, [], this.parent.ping, 1000);

		logger.info(string.format("{0} is connected", this.parent.host));
	},

	onDisconnect : function(event) {
		this.parent.connected = false;
		if (this.parent != null) {
			this.parent.pingSchedule.shutdown();
			this.parent.pingSchedule = null;
		}

		logger.info(string.format("{0} is disconnected", this.parent.host));
	}
};
export default socketio;