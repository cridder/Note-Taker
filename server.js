// Dependencies.
const express = require('express');
const uuid = require('uuid');
const fs = require('fs');
const path = require('path');

// Express app.
const app = express();

// Set port.
const PORT = process.env.PORT || 8080;

// Express middleware.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// Notes route.
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });

// api routes 
app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname,  "./db/db.json"), 'utf8', (err, data) => {
      if (err) throw err;
      res.json(JSON.parse(data));
    });
  });

// Html route. 
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

// Delete id.
app.delete('/api/notes/:id', (req, res) => {
    fs.readFile(path.join(__dirname,  "./db/db.json"), 'utf8', (err, data) => {
      let db = JSON.parse(data);
      db = db.filter((e) => {
        return e.id !== req.params.id;
      });
      fs.writeFile(
        path.join(__dirname,  "./db/db.json"),
        JSON.stringify(db, null, 2),
        (err, data) => {
          if (err) throw err;
          res.json(db);
        }
      );
    });
  });

app.post('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname,  "./db/db.json"), 'utf8', (err, data) => {
      let db = JSON.parse(data);
      db.push({
        id: uuid.v4(),
        ...req.body,
      });
      fs.writeFile(
        path.join(__dirname,  "./db/db.json"),
        JSON.stringify(db, null, 2),
        (err, data) => {
          if (err) throw err;
          res.json(db);
        }
      );
    });
  });
 
//  Port. 
app.listen(PORT, () => console.log(`The server is now listening on PORT ${PORT}`));