var grpc = require("grpc");
var protoLoader = require("@grpc/proto-loader");
const logger = require("../config/logger");

var PROTO_PATH = __dirname + "/../protos/task_service/task.proto";
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
	keepCase: true,
	longs: String,
	enums: String,
	defaults: true,
	oneofs: true,
});
var TaskProto = grpc.loadPackageDefinition(packageDefinition).task_service;

function main() {
	var client = new TaskProto.TaskService(
		"localhost:8000",
		grpc.credentials.createInsecure()
	);

	// create Task
	client.Create(
		{
            title: "Read a book"
		},
		(err, createResponse) => {
			console.log("Task Create");
			if (err) {
				console.log("Error: ", err.message);
				return;
			}
			logger.debug("Task Create response", {
				response: createResponse,
				label: "test"
			});
			console.log(createResponse);
			// update Task
			client.Update(
				{
					id: createResponse.task_id,
					title: "Write some code",
					is_active: false
				},
				(err, updateResponse) => {
					console.log("Task update");
					if (err) {
						console.log("Error: ", err.message);
						return;
					}
					logger.debug("Task Update response", {
						response: updateResponse,
						label: "test"
					});
					console.log(updateResponse);
					// Find Task
					client.Find({}, (err, findResponse) => {
						console.log("Task Find");
						if (err) {
							console.log("Error: ", err.message);
							return;
						}
						logger.debug("Task Find response", {
							response: findResponse,
							label: "test"
						});
						console.log(findResponse);
					});
					// Get Task
					client.Get(
						{
							id: createResponse.task_id,
						},
						(err, getResponse) => {
							console.log("Task Get");
							if (err) {
							console.log("Error: ", err.message);
							return;
							}
							logger.debug("Task Get response", {
								response: getResponse,
								label: "test",
							});
							console.log(getResponse);
							// Delete Task
							client.Delete(
								{
									id: getResponse.id,
								},
								(err, DeleteResponse) => {
									if (err) {
										console.log("Error: ", err.message);
										return;
									}
									logger.debug("Task Delete response", {
										response: getResponse,
										label: "test"
									});
									console.log(DeleteResponse);
								}
							);
						}
					);
				}
			);
		}
	);
}

main();