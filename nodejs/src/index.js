const {getCarers, addCarer} = require('./carer');
const {getClients, addClient} = require('./client');
const {getClientVisits, addClientVisit} = require('./visit');

const express = require('express');
const app = express();
const port = 3000;
require('./create-tables');
app.use(express.json());

app.get('/api/v1/carer', getCarers);
app.post('/api/v1/carer', addCarer);

app.get('/api/v1/client', getClients);
app.post('/api/v1/client', addClient);

app.get('/api/v1/visit/:clientId', getClientVisits);
app.post('/api/v1/visit/:clientId', addClientVisit);

try {
  app.listen(port, () => console.log(`Sample app listening on port ${port}.`));
}
catch (e) {
  console.log('Error', e);
}
