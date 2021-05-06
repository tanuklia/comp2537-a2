const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT || 5000;
const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

let dbClient;
const app = express();
app.use(express.static(path.join(__dirname, 'public')))

// READ
app.get('/people', async (req, res) => {
  try {
    const result = await dbClient.query('SELECT * FROM people');
    res.send(result.rows);
  } catch (err) {
    console.error(err);
    res.send("ERROR!");
  }
  
})

// CREATE
app.post('/people', async (req, res) => {
  try {
    // let person = req.
    // await dbClient.query(`INSERT INTO people VALUES (${person.id}, '${person.name}', '${person.height}', '${person.gender}', '${person.birth_year}');`);
    res.send({"result": "ok"});
  } catch (err) {
    console.error(err);
    res.send({"result": "failed"});
  }
})

// UPDATE
app.put('/people', async (req, res) => {
  try {
    // let person = req.
    // await dbClient.query(`INSERT INTO people VALUES (${person.id}, '${person.name}', '${person.height}', '${person.gender}', '${person.birth_year}');`);
    res.send({"result": "ok"});
  } catch (err) {
    console.error(err);
    res.send({"result": "failed"});
  }
})

// DELETE
app.delete('/people', async (req, res) => {
  try {
    // let person = req.
    // await dbClient.query(`INSERT INTO people VALUES (${person.id}, '${person.name}', '${person.height}', '${person.gender}', '${person.birth_year}');`);
    res.send({"result": "ok"});
  } catch (err) {
    console.error(err);
    res.send({"result": "failed"});
  }
})

async function createTable() {
  const result = await dbClient.query(`
    CREATE TABLE people (
      id int NOT NULL PRIMARY KEY,
      name varchar(255) NOT NULL,
      height varchar(255) NOT NULL,
      gender varchar(255) NOT NULL,
      birth_year varchar(255) NOT NULL
    );
  `);
  console.log(result);
}

async function insertIntoTable() {
  await dbClient.query(`INSERT INTO people VALUES (1, 'Luke Skywalker', '172', 'male', '19BBY');`);
  await dbClient.query(`INSERT INTO people VALUES (2, 'C-3PO', '167', 'n/a', '112BBY');`);
  await dbClient.query(`INSERT INTO people VALUES (3, 'R2-D2', '96', 'n/a', '33BBY');`);
  await dbClient.query(`INSERT INTO people VALUES (4, 'Darth Vader', '202', 'male', '41.9BBY');`);
  await dbClient.query(`INSERT INTO people VALUES (5, 'Leia Organa', '150', 'female', '19BBY');`);
  await dbClient.query(`INSERT INTO people VALUES (6, 'Owen Lars', '178', 'male', '52BBY');`);
  await dbClient.query(`INSERT INTO people VALUES (7, 'Beru Whitesun lars', '165', 'female', '47BBY');`);
  await dbClient.query(`INSERT INTO people VALUES (8, 'R5-D4', '97', 'n/a', 'unknown');`);
  await dbClient.query(`INSERT INTO people VALUES (9, 'Biggs Darklighter', '183', 'male', '24BBY');`);
  await dbClient.query(`INSERT INTO people VALUES (10, 'Obi-Wan Kenobi', '182', 'male', '57BBY');`);
}

async function dropTable() {
  const result = await dbClient.query(`DROP TABLE people;`);
  console.log(result);
}

app.listen(PORT, async () => {
  dbClient = await pool.connect();
  // await createTable();
  // await insertIntoTable();
  // await dropTable();
  console.log(`listening at http://localhost:${PORT}`)
})