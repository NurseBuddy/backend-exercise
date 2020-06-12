const db = require('./database');

function getCarers(req, res) {
  let carerList = [];
  db.each('SELECT * FROM carers', (err, row) => {
    carerList.push(row);

  }, (err, numRows) => {
    if (err) {
      console.log('Error: ', err);
      res.status(500);
      return res.send({error: 'Failed to fetch carers'});
    }

    return res.json(carerList);
  });
}

function addCarer(req, res) {
  const {name} = req.body;

  db.run('INSERT INTO carers (name) VALUES ($name)', {$name:name}, (err) => {
    if (err) {
      console.log('Error: ', err);
      res.status(500);
      return res.json({error: 'Failed to add carer'});
    }

    return res.sendStatus(204);
  });
}

module.exports={getCarers, addCarer};
