const express = require('express');
const pg = require('pg');
const 


const app = express();

const dbLocation = 'localhost';
const dbPort = 5432;
const connection = new pg.Client('postgresql://' + dbLocation + ':' + dbPort + '/');






app.on('end', function() { connection.end();});
