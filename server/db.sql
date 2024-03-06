CREATE DATABASE IF NOT EXISTS JO;
USE JO;
DROP TABLE IF EXISTS Medailles;
DROP TABLE IF EXISTS Epreuves;
DROP TABLE IF EXISTS Sports;

DROP TABLE IF EXISTS Athletes;

DROP TABLE IF EXISTS Pays;

DROP TABLE IF EXISTS User;

CREATE TABLE Sports (
    sport_id INT AUTO_INCREMENT PRIMARY KEY,
    nom_sport VARCHAR(100) NOT NULL,
    site_competition VARCHAR(100) NOT NULL
);

CREATE TABLE User (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);

INSERT INTO User (username, password) VALUES ('admin', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9');

CREATE TABLE Epreuves (
    epreuve_id INT AUTO_INCREMENT PRIMARY KEY,
    nom_epreuve VARCHAR(100) NOT NULL,
    sport_id INT,
    FOREIGN KEY (sport_id) REFERENCES Sports(sport_id) ON DELETE CASCADE
);

CREATE TABLE Medailles (
    medaille_id INT AUTO_INCREMENT PRIMARY KEY,
    epreuve_id INT,
    nom_athlete VARCHAR(100) NOT NULL,
    type_medaille ENUM('Or', 'Argent', 'Bronze') NOT NULL,
    FOREIGN KEY (epreuve_id) REFERENCES Epreuves(epreuve_id) ON DELETE CASCADE
);

CREATE TABLE Pays (
    pays_id INT AUTO_INCREMENT PRIMARY KEY,
    nom_pays VARCHAR(100) NOT NULL
);

CREATE TABLE Athletes (
    athlete_id INT AUTO_INCREMENT PRIMARY KEY,
    nom_athlete VARCHAR(100) NOT NULL,
    pays_id INT,
    FOREIGN KEY (pays_id) REFERENCES Pays(pays_id) ON DELETE CASCADE
);

ALTER TABLE Medailles
ADD COLUMN athlete_id INT,
ADD FOREIGN KEY (athlete_id) REFERENCES Athletes(athlete_id) ON DELETE CASCADE;


INSERT INTO Sports (nom_sport, site_competition) VALUES
('Athletisme', 'Stade de France'),
('Natation', 'Centre Aquatique de Saint-Denis'),
('Gymnastique', 'Palais des Sports Marcel-Cerdan'),
('Taekwondo', 'Centre Omnisports de Paris-Bercy');

INSERT INTO Epreuves (nom_epreuve, sport_id) VALUES
('100 metres', 1),
('Marathon', 1),
('200 metres nage libre', 2),
('Saut en hauteur', 1),
('Kyorugi', 4),
('Poomsae', 4);

-- Exemple de donnees pour la table Medailles
INSERT INTO Medailles (epreuve_id, nom_athlete, type_medaille) VALUES
(1, 'Usain Bolt', 'Or'),
(1, 'Tyson Gay', 'Argent'),
(1, 'Yohan Blake', 'Bronze'),
(2, 'Eliud Kipchoge', 'Or'),
(2, 'Wilson Kipsang', 'Argent'),
(2, 'Feyisa Lilesa', 'Bronze'),
(3, 'Michael Phelps', 'Or'),
(3, 'Ryan Lochte', 'Argent'),
(3, 'Ian Thorpe', 'Bronze'),
(4, 'Javier Sotomayor', 'Or'),
(4, 'Stefan Holm', 'Argent'),
(4, 'Bohdan Bondarenko', 'Bronze'),
(5, 'Hadi Saei', 'Or'),
(5, 'Steven Lopez', 'Argent'),
(5, 'Servet Tazegul', 'Bronze'),
(6, 'Jade Jones', 'Or'),
(6, 'Hwang Kyung-seon', 'Argent'),
(6, 'Wu Jingyu', 'Bronze');
