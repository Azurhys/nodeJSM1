const express = require('express');
const mysql = require('mysql');
const cors = require('cors')

const app = express();
const port = 9000;

app.use(cors());

const db = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'example',
    database: 'JO'
});


db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connecté à la base de données MySQL');
});


app.get('/sports', (req, res) => {
    db.query('SELECT * FROM Sports', (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erreur lors de la récupération des sports' });
        } else {
            res.json(result);
        }
    });
});

app.get('/medailles', (req, res) => {
    db.query('SELECT * FROM Medailles', (err, result) => {
        if(err) {
            res.status(500).json({ error: 'Erreur lors de la récupération des données'})
        } else {
            res.json(result)
        }
    })
})

app.get('/epreuves', (req, res) => {
    db.query('SELECT * FROM Epreuves', (err, result) => {
        if(err) {
            res.status(500).json({ error: 'Erreur lors de la récupération des données'})
        } else {
            res.json(result)
        }
    })
})

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
