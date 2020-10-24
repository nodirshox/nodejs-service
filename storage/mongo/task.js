const mongoose = require("mongoose");
const Task = require("../../models/Task");

let TaskStorage = {
    create: (task) => {
        return new Promise((resolve, reject) => {
            if (!task.title) return reject(new Error("Task title is required"));

			task.created_at = new Date();
			task.updated_at = new Date();

            let ts = new Task(task);
            ts.save((err, result) => {
                if (err) return reject(err);
                let task_id = result._id;
                return resolve(task_id);
            })
        })
    },
    update: (task) => {
		return new Promise((resolve, reject) => {
			console.log(task)
			if (!task.id) return reject(new Error("Task ID is required"));
            if (!task.title) return reject(new Error("Task title is required"));
            if (task.is_active != true && task.is_active != false) return reject(new Error("Status of Task is required"));

			Task.findOne({ _id: task.id }, (err, ts) => {
				if (err) return reject(err);
				if (!ts) return reject(new Error("Task is not found"));

                ts.title = task.title;
                ts.is_active = task.is_active;
				ts.updated_at = new Date();

				ts.save((err, result) => {
					if (err) return reject(err);
					resolve(result);
				});
			});
		});
    },
    get: (task) => {
		return new Promise((resolve, reject) => {
			if (!task.id) return reject(new Error("Task ID is required"));
			Task.findOne({ _id: task.id }, (err, result) => {
				if (err) return reject(err);
				if (!result) return reject(new Error("Task is not found"));
				
				return resolve(result);
			});
		});
	},
	find: () => {
		return new Promise((resolve, reject) => {
			let query = {};
			Task.find(query, (err, result) => {
				if (err) return reject(err);
				resolve(result);
			});
		});
	},
	delete: (task) => {
		return new Promise((resolve, reject) => {
			if (!task.id) return reject(new Error("Task ID is required"));
			Task.findOneAndDelete({ _id: task.id }, (err, result) => {
				if (err) return reject(err);
				if (!result) return reject(new Error("Task is not found"));

				return resolve(result);
			});
		});
	}
}

module.exports = TaskStorage;