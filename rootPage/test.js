var pg = require('pg');
var conString = process.env.ELEPHANTSQL_URL || "postgres://node:1@localhost/agoravai";

var client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {
      return console.error('could not connect to postgres', err);
        }
          client.query('SELECT * from aluno', function(err, result) {
              if(err) {
                   return console.error('error running query', err);
                        }
                            console.log(result.rows);
                                  client.end();
                                      });
                                      });
