const db = require('./database');

function getClientVisits(req, res) {
  let visitList = [];
  db.each('SELECT * FROM visits WHERE client_id = $clientId ORDER BY start_time DESC LIMIT 100', {
    $clientId: req.params.clientId,
  }, (err, row) => {
    visitList.push(row);
  }, (err, numRows) => {
    if (err) {
      console.log('Error: ', err);
      res.status(500);
      return res.send({error: 'Failed to fetch client visits'});
    }

    return res.json(visitList);
  });
}

function addClientVisit(req, res) {
  const {startTime, endTime, carerId} = req.body;

  db.run('INSERT INTO visits (start_time, end_time, client_id, carer_id) VALUES ($startTime, $endTime, $clientId, $carerId)', {
      $startTime: startTime,
      $endTime: endTime,
      $clientId: req.params.clientId,
      $carerId: carerId,
    }, (err) => {
    if (err) {
      console.log('Error: ', err);
      res.status(500);
      return res.json({error: 'Failed to add visit'});
    }

    return res.sendStatus(204);
  });

}

module.exports={getClientVisits, addClientVisit};
