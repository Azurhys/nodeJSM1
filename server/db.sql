CREATE DATABASE IF NOT EXISTS JO;
USE JO;
DROP TABLE IF EXISTS Medailles;
DROP TABLE IF EXISTS Epreuves;
DROP TABLE IF EXISTS Sports;

CREATE TABLE Sports (
    sport_id INT AUTO_INCREMENT PRIMARY KEY,
    nom_sport VARCHAR(100) NOT NULL,
    site_competition VARCHAR(100) NOT NULL
);

CREATE TABLE Epreuves (
    epreuve_id INT AUTO_INCREMENT PRIMARY KEY,
    nom_epreuve VARCHAR(100) NOT NULL,
    sport_id INT,
    FOREIGN KEY (sport_id) REFERENCES Sports(sport_id)
);

CREATE TABLE Medailles (
    medaille_id INT AUTO_INCREMENT PRIMARY KEY,
    epreuve_id INT,
    nom_athlete VARCHAR(100) NOT NULL,
    type_medaille ENUM('Or', 'Argent', 'Bronze') NOT NULL,
    FOREIGN KEY (epreuve_id) REFERENCES Epreuves(epreuve_id)
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
