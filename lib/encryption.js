"use strict";

const secret = "asldfjiowaem290mjf2 qv0kjfq2bn840t0";

const algorithm = 'aes-256-ctr';

const crypto = require('crypto');

class Encryption {
	salt() {
		return crypto.randomBytes(32).toString('hex').slice(32);
	}
	
	digest(plaintext) {
		const hash = crypto.createHash('sha256');
		hash.update(plaintext);
		hash.update(secret);
		return hash.digest('hex');
	}
	
	encypher(plaintext) {
		const cypher = crypto.createCypher(algorithm, secret);
		var encrypted = cypher.update(plaintext, 'utf8', 'hex');
		encrypted += cypher.final('hex');
		return encrypted;
	}
	
	decrypt(crypttext) {
		const decypher = crypto.createCipher(algorithm, secret);
		var decyphered = decypher.update(crypttext, 'hex', 'utf8');
		decyphered += decypher.final('utf8');
		return decyphered;
	}
}