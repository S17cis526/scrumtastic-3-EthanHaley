module.exports = authenticate;

function authenticate(req, res, next) {
	var auth = req.headers.authorization;
	if(auth) {
		var b = new Buffer(auth.split(' ')[1], 'base64');
		var s = b.toString();
		var credentials = s.split(':');
		var username = credentials[0];
		var password = credentials[1];
		
		console.log(username, password);
		if(username == "foo" && password == "bar") {
			next(req, res);
		} else { //Bad Creds
			res.statusCode = 401;
			res.statusMessage = "Unauthorized";
			res.end("Unauthorized");
		}
		
	} else { //No auth provided
		res.writeHead(401, {'WWW-Authenticate': 'Basic'});
		res.end();
	}
}