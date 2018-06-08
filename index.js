/* ----------------Bot---------------- */

const Client = require('./structures/Client.js');
const { token } = require('./config.json');
const express = require('express');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const endpointDIR = path.join(__dirname, 'endpoints');

const client = new Client({
	port: 5739
});

client.once('ready', () => console.log(`Logged in as ${client.user.tag}`));

client.login(token);

/* ----------------Server---------------- */

const site = express();

site.use(express.static(__dirname + '/public'));

site.use(
    function crossOrigin(req,res,next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        return next();
    }
);

site.use(function addClient(req, res, next) {
	req.client = client;
	next();
});

const readdir = promisify(fs.readdir);
readdir(endpointDIR).then(endpoints => {
	for (const endpoint of endpoints) {
		site.get(`/${endpoint.replace('.js', '')}`, (...args) => require(path.join(endpointDIR, endpoint))(...args));
	}
});

site.listen(client.port, () => {
	console.log(`Site running on port: ${client.port}`);
});
