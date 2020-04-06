import logger from "../util/logger.js";
import string from "../util/string.js";
import json from "../util/json.js";
import protocolId from "../constant/protocolid.js";
import protocol from "./protocol.js";

const socketio = {
	socket : null,
	host : "ws://localhost:8080/",
	connected : false,
	serialId : 0,

	getConnected : function() {
		return this.connected;
	},

	setConnected : function(value) {
		this.connected = value;
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
		logger.info("socket is update");
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
		var mainNo = pack.header.mainNo;
		var subNo = pack.header.subNo;
		var message = pack.buffer;
		if (protocol.processes[mainNo][subNo] != null) {
			protocol.processes[mainNo][subNo]();
			logger.info(string.format("process {0}_{1} is registed -> {2}", mainNo, subNo, message));
		} else {
			logger.info(string.format("process {0}_{1} is not registed", mainNo, subNo));
		}
	},

	send : function(mainNo, subNo, message) {
		if (this.connected) {
			var pack = this.formater(mainNo, subNo, message);
			var str = json.objToStr(pack);
			this.socket.send(str);
		} else {
			logger.warn(string.format("{0} is not connected", this.host));
		}
	},

	formater : function(mainNo, subNo, buffer) {
		return this.formater0(mainNo, subNo, buffer, 0);
	},

	formater0 : function(mainNo, subNo, buffer, serialId) {
		var pack = new Object();
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
		var id = this.genSerialId();
		return this.genHeader0(mainNo, subNo, id);
	},

	genHeader0 : function(mainNo, subNo, serialId) {
		var header = new Object();
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

	onReceive : function(event) {
		logger.info("socket is reccive data -> " + event.data);
		var message = json.strToObj(event.data);
		this.parent.dispatcher(message);
	},

	onConnect : function(event) {
		this.parent.connected = true;
		logger.info(string.format("{0} is connected", this.parent.host));
	},

	onDisconnect : function(event) {
		this.parent.connected = false;
		logger.info(string.format("{0} is disconnected", this.parent.host));
	}
};
export default socketio;