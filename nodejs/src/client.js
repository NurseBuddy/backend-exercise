const db = require('./database');

function getClients(req, res) {
  let clientList = [];
  db.each('SELECT * FROM clients', (err, row) => {
    clientList.push(row);

  }, (err, numRows) => {
    if (err) {
      console.log('Error: ', err);
      res.status(500);
      return res.send({error: 'Failed to fetch clients'});
    }

    return res.json(clientList);
  });
}

function addClient(req, res) {
  const {name} = req.body;

  db.run('INSERT INTO clients (name) VALUES ($name)', {$name:name}, (err) => {
    if (err) {
      console.log('Error: ', err);
      res.status(500);
      return res.json({error: 'Failed to add client'});
    }

    return res.sendStatus(204);
  });
}

module.exports={getClients, addClient};
