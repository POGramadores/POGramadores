const express = require('express');
const pg = require('pg');

const app = express();

const dbLocation = 'localhost';
const dbPort = 5432;
const connection = new pg.Client('postgresql://' + dbLocation + ':' + dbPort + '/');

/*app.use();*/

app.use(express.static(__dirname + '/static'));





app.on('end', function() { connection.end();});
