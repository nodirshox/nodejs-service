const grpc = require("grpc");
var protoLoader = require("@grpc/proto-loader");
const mongoose = require("mongoose");
const logger = require("./config/logger");

// Loading proto
const PROTO_URL = __dirname + "/protos/task_service/task_service.proto";
const packageDefinition = protoLoader.loadSync(PROTO_URL, {
	keepCase: true,
	longs: String,
	enums: String,
	defaults: true,
	oneofs: true,
});
const taskProto = grpc.loadPackageDefinition(packageDefinition).task_service;

function main() {
	logger.info("Main function is running");

	mongoDBUrl = "mongodb://localhost:27017/task";

	logger.info("Connecting to db " + mongoDBUrl);

	mongoose.connect(
	mongoDBUrl,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	},
	(err) => {
		if (err) {
		logger.error(
			"There is an error in connecting db (" +
			mongoDBUrl +
			"): " +
			err.message
		);
		}
	}
	);
	mongoose.connection.once("open", function () {
		logger.info("Connected to the databasee");
	});

	// gRPC server
	var server = new grpc.Server();

	server.addService(
		taskProto.TaskService.service,
		require("./services/task.js")
	);
	
	server.bind("0.0.0.0:" + config.RPCPort, grpc.ServerCredentials.createInsecure());

	server.start();
	logger.info("grpc server is running at 0.0.0.0:80");
}

main();