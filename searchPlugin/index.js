var MongoClient = require('mongodb').MongoClient;
//var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

var dbModule = {};

dbModule.connect = function (callback) {
	var url = 'mongodb://mongo:27017/Project';
	MongoClient.connect(url, function (err, db) {
		//assert.equal(null, err);
		console.log("Connected correctly to server.");
		callback(db);
	});
};

module.exports = dbModule;
