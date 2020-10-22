const grpc = require("grpc");
const taskStorage = require("../storage/mongo/task");
const logger = require("../config/logger");

const taskService = {
	Create: (call, callback) => {
		logger.debug("Task Create Request", {
			label: "task",
			request: call.request
		});
		taskStorage.create(call.request).then((result) => {
			callback(null, { task_id: result });
		}).catch((err) => {
			logger.error(err.message, {
				function: "create task",
				request: call.request
			});
			callback({
				code: grpc.status.INTERNAL,
				message: err.message
			});
		});
	},
	Update: (call, callback) => {
		logger.debug("Task Update Request", {
			label: "task",
			request: call.request
		});
		taskStorage.update(call.request).then((result) => {
			callback(null, result);
		}).catch((err) => {
			logger.error(err.message, {
				function: "Task update",
				request: call.request
			});
			callback({
				code: grpc.status.INTERNAL,
				message: err.message
			});
		});
	},
	Find: (call, callback) => {
		logger.debug("Task Find Request", {
			label: "task",
			request: call.request,
		});
		taskStorage.find(call.request).then((result) => {
			callback(null, { tasks: result });
		}).catch((err) => {
			logger.error(err.message, {
				function: "Task Find",
				request: call.request
			});
			callback({
				code: grpc.status.INTERNAL,
				message: err.message
			});
		});
	},
	Get: (call, callback) => {
		logger.debug("Task Get Request", {
			label: "task",
			request: call.request
		});
		taskStorage.get(call.request).then((result) => {
			callback(null, result);
		}).catch((err) => {
			logger.error(err.message, {
				function: "Task Get",
				request: call.request
			});
			callback({
				code: grpc.status.INTERNAL,
				message: err.message
			});
		});
	},
	Delete: (call, callback) => {
		logger.debug("Task Delete Request", {
			label: "task",
			request: call.request
		});
		taskStorage.delete(call.request).then((result) => {
			callback(null, { task: result });
		}).catch((err) => {
			logger.error(err.message, {
				function: "Task Delete",
				request: err.request
			});
			callback({
				code: grpc.status.INTERNAL,
				message: err.message
			});
		});
	}
};

module.exports = taskService;