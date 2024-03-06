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
CREATE TABLE Medailles (
    medaille_id INT AUTO_INCREMENT PRIMARY KEY,
    epreuve_id INT,
    athlete_id INT,
    nom_athlete VARCHAR(100) NOT NULL,
    type_medaille ENUM('Or', 'Argent', 'Bronze') NOT NULL,
    FOREIGN KEY (epreuve_id) REFERENCES Epreuves(epreuve_id) ON DELETE CASCADE,
    FOREIGN KEY (athlete_id) REFERENCES Athletes(athlete_id) ON DELETE CASCADE
);
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

INSERT INTO Pays (nom_pays) VALUES
('Jamaique'),
('Kenya'),
('Etats-Unis'),
('Cuba'),
('Iran'),
('Royaume-Uni');

INSERT INTO Athletes (nom_athlete, pays_id) VALUES
('Usain Bolt', 1),
('Tyson Gay', 3),
('Yohan Blake', 1),
('Eliud Kipchoge', 2),
('Wilson Kipsang', 2),
('Feyisa Lilesa', 2),
('Michael Phelps', 3),
('Ryan Lochte', 3),
('Ian Thorpe', 3),
('Javier Sotomayor', 4),
('Stefan Holm', 5),
('Bohdan Bondarenko', 6),
('Hadi Saei', 5),
('Steven Lopez', 3),
('Servet Tazegul', 6),
('Jade Jones', 3),
('Hwang Kyung-seon', 1),
('Wu Jingyu', 4);

-- Exemple de donnees pour la table Medailles
INSERT INTO Medailles (epreuve_id, athlete_id, nom_athlete, type_medaille) VALUES
(1, 1, 'Usain Bolt', 'Or'),
(1, 2, 'Tyson Gay', 'Argent'),
(1, 3, 'Yohan Blake', 'Bronze'),
(2, 4, 'Eliud Kipchoge', 'Or'),
(2, 5, 'Wilson Kipsang', 'Argent'),
(2, 6, 'Feyisa Lilesa', 'Bronze'),
(3, 7, 'Michael Phelps', 'Or'),
(3, 8, 'Ryan Lochte', 'Argent'),
(3, 9, 'Ian Thorpe', 'Bronze'),
(4, 10, 'Javier Sotomayor', 'Or'),
(4, 11, 'Stefan Holm', 'Argent'),
(4, 12, 'Bohdan Bondarenko', 'Bronze'),
(5, 13, 'Hadi Saei', 'Or'),
(5, 14, 'Steven Lopez', 'Argent'),
(5, 15, 'Servet Tazegul', 'Bronze'),
(6, 16, 'Jade Jones', 'Or'),
(6, 17, 'Hwang Kyung-seon', 'Argent'),
(6, 18, 'Wu Jingyu', 'Bronze');

