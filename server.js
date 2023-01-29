// required
const express = require('express');
const uuid = require('uuid');
const fs = require('fs');
const path = require('path');
// app express
const app = express();
// heroku port
const PORT = process.env.PORT || 8080;
// middle ware for assests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
// route for notes html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });
// routes for db 
app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname,  "./db/db.json"), 'utf8', (err, data) => {
      if (err) throw err;
      res.json(JSON.parse(data));
    });
  });
// route for index html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });
// route to delete a notes
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
// route to add a note
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
 // listen on the port
app.listen(PORT, () => console.log(`The server is now listening on PORT ${PORT}`));