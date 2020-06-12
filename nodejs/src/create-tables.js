const db = require('./database');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS carers (
    id INTEGER PRIMARY KEY,
    name VARCHAR(255))`);

  db.run(`CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY,
    name VARCHAR(255))`);

  db.run(`CREATE TABLE IF NOT EXISTS visits (
    id INTEGER PRIMARY KEY, 
    start_time DATETIME, 
    end_time DATETIME, 
    client_id INTEGER NOT NULL REFERENCES client(id) ON DELETE CASCADE, 
    carer_id INTEGER NOT NULL REFERENCES carers(id) ON DELETE CASCADE)`);
});
