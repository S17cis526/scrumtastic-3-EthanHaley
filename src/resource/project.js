/** @module project
 * A RESTful resource representing a software project
 * implementing the CRUD methods.
 */

"use strict";

module.exports = {
	list: list,
	create: create,
	read: read,
	update: update,
	destroy: destroy
}

var auth = require('./lib/auth-cookie.js');

/** @function list
 * Sends a list of all projects as a JSON array.
 */
function list(req, res, db) {
	auth(req, res, function(req, res) {
		db.all("SELECT * FROM projects", [], function(err, projects){
			if(err) {
				console.error(err);
				res.statusCode = 500;
				res.end("Server Error");
			}
			res.setHeader("Content-Type", "text/json");
			res.end(JSON.stringify(projects));
		});
	}
}

/** @function create
 * Creates a new project and adds it to the database
 */
function create(req, res, db) {
	var body = "";
	
	req.on("error", function(err) {
		console.error(err);
		res.statusCode = 500;
		res.end("Server Error");
	});
	
	res.on("data", function(data) {
		body += data;
		
	});
	
	req.on("end", function() {
		var project = JSON.parse(body);
		db.run("INSERT INTO projects (name, description, version, repository, license) VALUES (?,?,?,?,?)",
		[project.name, project.description, project.version, project.repository, project.license],
		function(err) {
			if(err) {
				console.error(err);
				res.statusCode = 500;
				res.end("Could not insert project into database");
				return;
			}
			res.statusCode = 200;
			res.end();
		});
	});
} 

/** @function read
 * Serves a specific project as a JSON string
 */
function read(req, res, db) {
	var id = req.params.id;
	db.get("SELECT * FROM projects WHERE id=?", [id], function(err, project){
		if(err) {
			console.error(err);
			res.statusCode = 500;
			res.end("Server Error");
			return;
		}
		if(!project) {
			res.statusCode = 404;
			res.end("Project Not Found");
			return;
		}
		res.setHeader("Content-Type", "text/json");
		res.end(JSON.stringify(project));
	});
}

/** @function update 
 * Updates a specific record with the supplied values.
 */
function update(req, res, db) {
	var id = req.params.id;
	var project = JSON.parse(body);
	db.run("UPDATE projects SET name=?, description=?, version=?, repository=?, license=? WHERE id=?",
	[project.name, project.description, project.version, project.repository, project.license, project.id],
	function(err) {
		if(err) {
			console.error(err);
			res.statusCode = 500;
			res.end("Could not update project in database");
			return;
		}
		res.statusCode = 200;
		res.end();
	});
}

/** @function destroy
 * Removes the specified project from the database
 */
function destroy(req, res, db) {
	var id = req.params.id;
	db.run("DELETE FROM projects WHERE id=?", [id], function(err){
		if(err) {
			console.error(err);
			res.statusCode = 500;
			res.end("Server Error");
		}
		res.statusCode = 200;
		res.end();
	});
}