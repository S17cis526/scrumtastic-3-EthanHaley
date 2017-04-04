module.exports = auth;

function auth(req, res) {
	console.log(req.headers.cookie);
	res.setheader('Set-Cookie',[
		"quote=cookies%20are%20for%20me;", //K/V pair cookie 
		"sessionid-212;Expires=Wed, 09, Jun 2021 10:18:14 GMT", //
		"safe=value;HttpOnly"
	]);
	
	next(req, res);
}