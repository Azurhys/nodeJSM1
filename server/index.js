const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const crypto = require('crypto');
const bodyParser = require('body-parser');

const app = express();
const port = 9000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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

function hashPassword(password) {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
}

// Route pour l'authentification de l'utilisateur
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = hashPassword(password);
    // Requête SQL pour récupérer l'utilisateur avec le nom d'utilisateur donné
    const query = 'SELECT * FROM User WHERE username = ?';

    db.query(query, [username], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erreur lors de l\'authentification' });
        } else {
            if (result.length === 0) {
                res.status(401).json({ error: 'Nom d\'utilisateur incorrect' });
            } else {
                const user = result[0];
                if (user.password === hashedPassword) {
                    // Authentification réussie
                    res.json({ message: 'Authentification réussie' });
                } else {
                    res.status(401).json({ error: 'Mot de passe incorrect' });
                }
            }
        }
    });
});


// Route pour obtenir la liste des sports
app.get('/sports', (req, res) => {
    db.query('SELECT * FROM Sports', (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erreur lors de la récupération des sports' });
        } else {
            res.json(result);
        }
    });
});

// Route pour obtenir un sport spécifique par son ID
app.get('/sports/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM Sports WHERE sport_id = ?', [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erreur lors de la récupération du sport' });
        } else {
            if (result.length === 0) {
                res.status(404).json({ message: 'Sport non trouvé' });
            } else {
                res.json(result[0]);
            }
        }
    });
});

// Route pour créer un nouveau sport
app.post('/sports', (req, res) => {
    const { nom_sport, site_competition } = req.body;
    db.query('INSERT INTO Sports (nom_sport, site_competition) VALUES (?, ?)', [nom_sport, site_competition], (err, result) => {
        if (err) {
            res.status(400).json({ error: 'Erreur lors de la création du sport' });
        } else {
            res.status(201).json({ message: 'Sport créé avec succès' });
        }
    });
});

// Route pour mettre à jour un sport existant
app.put('/sports/:id', (req, res) => {
    const id = req.params.id;
    const { nom_sport, site_competition } = req.body;
    db.query('UPDATE Sports SET nom_sport = ?, site_competition = ? WHERE sport_id = ?', [nom_sport, site_competition, id], (err, result) => {
        if (err) {
            res.status(400).json({ error: 'Erreur lors de la mise à jour du sport' });
        } else {
            res.json({ message: 'Sport mis à jour avec succès' });
        }
    });
});

// Route pour créer un nouveau pays
app.post('/pays', (req, res) => {
    const { nom_pays } = req.body;
    db.query('INSERT INTO Pays (nom_pays) VALUES (?)', [nom_pays], (err, result) => {
      if (err) {
        console.error('Erreur lors de la création du pays :', err);
        res.status(500).json({ error: 'Erreur lors de la création du pays' });
      } else {
        console.log('Pays créé avec succès');
        res.status(201).json({ message: 'Pays créé avec succès', id: result.insertId });
      }
    });
  });
  
  // Route pour récupérer tous les pays
  app.get('/pays', (req, res) => {
    db.query('SELECT * FROM Pays', (err, result) => {
      if (err) {
        console.error('Erreur lors de la récupération des pays :', err);
        res.status(500).json({ error: 'Erreur lors de la récupération des pays' });
      } else {
        console.log('Pays récupérés avec succès');
        res.json(result);
      }
    });
  });
  
  // Route pour mettre à jour un pays
  app.put('/pays/:id', (req, res) => {
    const { nom_pays } = req.body;
    const id = req.params.id;
    db.query('UPDATE Pays SET nom_pays = ? WHERE pays_id = ?', [nom_pays, id], (err, result) => {
      if (err) {
        console.error('Erreur lors de la mise à jour du pays :', err);
        res.status(500).json({ error: 'Erreur lors de la mise à jour du pays' });
      } else {
        console.log('Pays mis à jour avec succès');
        res.json({ message: 'Pays mis à jour avec succès' });
      }
    });
  });
  
  // Route pour supprimer un pays
  app.delete('/pays/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM Pays WHERE pays_id = ?', id, (err, result) => {
      if (err) {
        console.error('Erreur lors de la suppression du pays :', err);
        res.status(500).json({ error: 'Erreur lors de la suppression du pays' });
      } else {
        console.log('Pays supprimé avec succès');
        res.json({ message: 'Pays supprimé avec succès' });
      }
    });
  });

  
// Route pour ajouter un athlète
app.post('/athletes', (req, res) => {
    const { nom_athlete, pays_id } = req.body;
    const athlete = { nom_athlete, pays_id };
    db.query('INSERT INTO Athletes SET ?', athlete, (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'ajout de l\'athlète :', err);
        res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'athlète' });
      } else {
        console.log('Athlète ajouté avec succès');
        res.status(201).json({ message: 'Athlète ajouté avec succès', id: result.insertId });
      }
    });
  });
  
  // Route pour mettre à jour un athlète
  app.put('/athletes/:id', (req, res) => {
    const id = req.params.id;
    const { nom_athlete, pays_id } = req.body;
    const athlete = { nom_athlete, pays_id };
    db.query('UPDATE Athletes SET ? WHERE athlete_id = ?', [athlete, id], (err, result) => {
      if (err) {
        console.error('Erreur lors de la mise à jour de l\'athlète :', err);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'athlète' });
      } else {
        console.log('Athlète mis à jour avec succès');
        res.json({ message: 'Athlète mis à jour avec succès' });
      }
    });
  });
  // Route pour récupérer tous les athlètes
    app.get('/athletes', (req, res) => {
        db.query('SELECT * FROM Athletes', (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération des athlètes :', err);
            res.status(500).json({ error: 'Erreur lors de la récupération des athlètes' });
        } else {
            console.log('Athlètes récupérés avec succès');
            res.json(result);
        }
        });
    });
  
  // Route pour supprimer un athlète
  app.delete('/athletes/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM Athletes WHERE athlete_id = ?', id, (err, result) => {
      if (err) {
        console.error('Erreur lors de la suppression de l\'athlète :', err);
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'athlète' });
      } else {
        console.log('Athlète supprimé avec succès');
        res.json({ message: 'Athlète supprimé avec succès' });
      }
    });
  });

  
// Route pour supprimer un sport spécifique par son ID
app.delete('/sports/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM Sports WHERE sport_id = ?', [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erreur lors de la suppression du sport' });
        } else {
            res.json({ message: 'Sport supprimé avec succès' });
        }
    });
});

app.get('/epreuves', (req, res) => {
    db.query('SELECT * FROM Epreuves', (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erreur lors de la récupération des épreuves' });
        } else {
            res.json(result);
        }
    });
});

// Obtenir une épreuve spécifique par son ID
app.get('/epreuves/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM Epreuves WHERE epreuve_id = ?', id, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erreur lors de la récupération de l\'épreuve' });
        } else {
            if (result.length === 0) {
                res.status(404).json({ error: 'Épreuve non trouvée' });
            } else {
                res.json(result[0]);
            }
        }
    });
});

// Créer une nouvelle épreuve
app.post('/epreuves', (req, res) => {
    const { nom_epreuve, site_competition } = req.body;
    db.query('INSERT INTO Epreuves (nom_epreuve, sport_id) VALUES (?, ?)', [nom_epreuve, site_competition], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erreur lors de la création de l\'épreuve' });
        } else {
            res.status(201).json({ message: 'Épreuve créée avec succès', id: result.insertId });
        }
    });
});

// Mettre à jour une épreuve existante
app.put('/epreuves/:id', (req, res) => {
    const id = req.params.id;
    const { nom_epreuve, sport_id } = req.body;
    db.query('UPDATE Epreuves SET nom_epreuve = ?, sport_id = ? WHERE epreuve_id = ?', [nom_epreuve, sport_id, id], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'épreuve' });
        } else {
            res.json({ message: 'Épreuve mise à jour avec succès' });
        }
    });
});

// Supprimer une épreuve spécifique par son ID
app.delete('/epreuves/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM Epreuves WHERE epreuve_id = ?', id, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erreur lors de la suppression de l\'épreuve' });
        } else {
            res.json({ message: 'Épreuve supprimée avec succès' });
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

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
