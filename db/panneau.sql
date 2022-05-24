-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : mysqldb:3306
-- Généré le : mar. 24 mai 2022 à 08:36
-- Version du serveur : 8.0.26
-- Version de PHP : 7.4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `projetpal_bd`
--

-- --------------------------------------------------------

--
-- Structure de la table `panneau`
--

CREATE TABLE `panneau` (
  `id` int NOT NULL,
  `titre` varchar(256) DEFAULT NULL,
  `adresse` varchar(256) DEFAULT NULL,
  `marked` tinyint(1) DEFAULT '0',
  `latitude` decimal(8,6) NOT NULL,
  `longitude` decimal(9,6) NOT NULL,
  `departement` int DEFAULT NULL,
  `circonscription` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `panneau`
--

INSERT INTO `panneau` (`id`, `titre`, `adresse`, `marked`, `latitude`, `longitude`, `departement`, `circonscription`) VALUES
(1, 'Place du Chapeau de Gendarme 49100 Angers', 'Place du Chapeau de Gendarme 49100 Angers', 0, '47.451572', '-0.555538', 49, 2),
(2, 'Place du Docteur Bichon 49100 Angers', 'Place du Docteur Bichon 49100 Angers', 0, '47.478770', '-0.564854', 49, 7),
(3, '182 Rue Saint-Léonard 49000 Angers', '182 Rue Saint-Léonard 49000 Angers', 0, '47.461706', '-0.532727', 49, 2),
(4, '1 Boulevard Daviers 49100 Angers', '1 Boulevard Daviers 49100 Angers', 0, '47.478608', '-0.556703', 49, 7),
(5, '20 Rue d’Osnabruck 49100 Angers', '20 Rue d’Osnabruck 49100 Angers', 0, '47.486706', '-0.523691', 49, 1),
(6, '5 Rue du Colonel Léon Faye 49100 Angers', '5 Rue du Colonel Léon Faye 49100 Angers', 0, '47.489175', '-0.515401', 49, 1),
(7, '1 Rue Couperin 49000 Angers', '1 Rue Couperin 49000 Angers', 0, '47.467219', '-0.529383', 49, 1),
(8, 'Place du Général Leclerc 49100 Angers', 'Place du Général Leclerc 49100 Angers', 0, '47.471308', '-0.546521', 49, 1),
(9, '1 Rue Paul Gauguin 49000 Angers', '1 Rue Paul Gauguin 49000 Angers', 0, '47.478711', '-0.586330', 49, 6),
(10, '53 Rue Alfred Seguin 49000 Angers', '53 Rue Alfred Seguin 49000 Angers', 0, '47.474787', '-0.591921', 49, 6),
(11, '0', '0', 0, '47.467810', '-0.559595', 49, 1),
(12, '0', '0', 0, '47.465651', '-0.519511', 49, 1),
(13, '36 Boulevard Gaston Birgé 49100 Angers', '36 Boulevard Gaston Birgé 49100 Angers', 0, '47.475082', '-0.519716', 49, 1),
(14, '0', '0', 0, '47.479762', '-0.590461', 49, 6),
(15, '10 Rue Joseph Cussonneau 49100 Angers', '10 Rue Joseph Cussonneau 49100 Angers', 0, '47.469979', '-0.531772', 49, 1),
(16, '5 Rue Martin Luther King 49000 Angers', '5 Rue Martin Luther King 49000 Angers', 0, '47.452102', '-0.565861', 49, 2),
(17, '22 Square du Grésillé 49000 Angers', '22 Square du Grésillé 49000 Angers', 0, '47.460702', '-0.596835', 49, 6),
(18, '2 Rue d’Osnabruck 49100 Angers', '2 Rue d’Osnabruck 49100 Angers', 0, '47.486339', '-0.526901', 49, 1),
(19, '24 Rue Adrien Recouvreur 49000 Angers', '24 Rue Adrien Recouvreur 49000 Angers', 0, '47.453912', '-0.557522', 49, 2),
(20, '39 Rue Gustave Courbet 49000 Angers', '39 Rue Gustave Courbet 49000 Angers', 0, '47.466030', '-0.602864', 49, 6),
(21, '10 Rue Guillaume Lekeu 49100 Angers', '10 Rue Guillaume Lekeu 49100 Angers', 0, '47.471416', '-0.520976', 49, 1),
(22, '171 Boulevard de Strasbourg 49000 Angers', '171 Boulevard de Strasbourg 49000 Angers', 0, '47.456150', '-0.551358', 49, 1),
(23, '51 Rue Jean Jaurès 49000 Angers', '51 Rue Jean Jaurès 49000 Angers', 0, '47.457326', '-0.522944', 49, 2),
(24, '80 Boulevard Saint-Michel 49100 Angers', '80 Boulevard Saint-Michel 49100 Angers', 0, '47.473560', '-0.538692', 49, 1),
(25, '0', '0', 0, '47.487113', '-0.550170', 49, 7),
(26, '0', '0', 0, '47.491101', '-0.529540', 49, 1),
(27, '41 Rue de Belgique 49100 Angers', '41 Rue de Belgique 49100 Angers', 0, '47.469708', '-0.542414', 49, 1),
(28, '0', '0', 0, '47.451809', '-0.511212', 49, 2),
(29, '40 Rue de la Chambre aux Deniers 49000 Angers', '40 Rue de la Chambre aux Deniers 49000 Angers', 0, '47.465767', '-0.599653', 49, 6),
(30, '0', '0', 0, '47.474025', '-0.554869', 49, 1),
(31, '1ter Avenue de la Blancheraie 49100 Angers', '1ter Avenue de la Blancheraie 49100 Angers', 0, '47.467379', '-0.560493', 49, 1),
(32, '0', '0', 0, '47.466675', '-0.591744', 49, 6),
(33, '0', '0', 0, '47.484389', '-0.552228', 49, 7),
(34, '0', '0', 0, '47.487567', '-0.573743', 49, 7),
(35, '40 Boulevard Auguste Allonneau 49100 Angers', '40 Boulevard Auguste Allonneau 49100 Angers', 0, '47.483342', '-0.526494', 49, 1),
(36, '0', '0', 0, '47.451977', '-0.544958', 49, 2),
(37, '5 Route de Bouchemaine 49000 Angers', '5 Route de Bouchemaine 49000 Angers', 0, '47.454212', '-0.567777', 49, 2),
(38, '3 Place André Leroy 49100 Angers', '3 Place André Leroy 49100 Angers', 0, '47.464427', '-0.548021', 49, 1),
(39, '40 Boulevard Jacques Portet 49000 Angers', '40 Boulevard Jacques Portet 49000 Angers', 0, '47.449969', '-0.559528', 49, 2),
(40, '67 Rue de la Meignanne 49100 Angers', '67 Rue de la Meignanne 49100 Angers', 0, '47.481611', '-0.575914', 49, 6),
(41, '2 Place du Chanoine Ballu 49000 Angers', '2 Place du Chanoine Ballu 49000 Angers', 0, '47.476234', '-0.585850', 49, 6),
(42, '1 Rue de l’Oisellerie 49100 Angers', '1 Rue de l’Oisellerie 49100 Angers', 0, '47.471199', '-0.554310', 49, 1),
(43, '2 Rue Maurice Suard 49100 Angers', '2 Rue Maurice Suard 49100 Angers', 0, '47.489190', '-0.528569', 49, 1),
(44, '124 Rue de Létanduère 49000 Angers', '124 Rue de Létanduère 49000 Angers', 0, '47.458491', '-0.554169', 49, 1),
(45, '205 Rue Haute des Banchais 49100 Angers', '205 Rue Haute des Banchais 49100 Angers', 0, '47.479769', '-0.520333', 49, 1),
(46, '0', '0', 0, '47.474093', '-0.549957', 49, 1),
(47, '0', '0', 0, '47.469635', '-0.539226', 49, 1),
(48, '0', '0', 0, '47.481392', '-0.523846', 49, 1),
(49, '0', '0', 0, '47.478761', '-0.597885', 49, 6),
(50, '1 Rue de la Lande 49000 Angers', '1 Rue de la Lande 49000 Angers', 0, '47.475766', '-0.594264', 49, 6),
(51, '49 Boulevard Joseph Bédier 49000 Angers', '49 Boulevard Joseph Bédier 49000 Angers', 0, '47.451101', '-0.549074', 49, 2),
(52, '30 Avenue Montaigne 49100 Angers', '30 Avenue Montaigne 49100 Angers', 0, '47.470271', '-0.535587', 49, 1),
(53, '26 Rue du Maréchal Juin 49000 Angers', '26 Rue du Maréchal Juin 49000 Angers', 0, '47.451209', '-0.567073', 49, 2),
(54, '38 Rue Rabelais 49000 Angers', '38 Rue Rabelais 49000 Angers', 0, '47.462505', '-0.547339', 49, 1),
(55, '3 Rue Parmentier 49000 Angers', '3 Rue Parmentier 49000 Angers', 0, '47.453467', '-0.525440', 49, 2),
(56, '0', '0', 0, '47.480291', '-0.595255', 49, 6),
(57, '0', '0', 0, '47.488608', '-0.515680', 49, 1),
(58, '0', '0', 0, '47.458012', '-0.544201', 49, 1),
(59, '0', '0', 0, '47.473484', '-0.571197', 49, 6),
(60, '0', '0', 0, '47.446329', '-0.552246', 49, 2),
(61, '24 Rue Eugénie Mansion 49000 Angers', '24 Rue Eugénie Mansion 49000 Angers', 0, '47.476882', '-0.587792', 49, 6),
(62, '41 Rue Hanneloup 49100 Angers', '41 Rue Hanneloup 49100 Angers', 0, '47.467432', '-0.545704', 49, 1),
(63, '14bis Avenue Marie Talet 49100 Angers', '14bis Avenue Marie Talet 49100 Angers', 0, '47.476057', '-0.548057', 49, 1),
(64, '55 Boulevard Jacques Millot 49000 Angers', '55 Boulevard Jacques Millot 49000 Angers', 0, '47.455147', '-0.534330', 49, 1),
(65, '26 Rue Géricault 49000 Angers', '26 Rue Géricault 49000 Angers', 0, '47.458272', '-0.525015', 49, 2),
(66, '2 Boulevard Marc Leclerc 49100 Angers', '2 Boulevard Marc Leclerc 49100 Angers', 0, '47.465069', '-0.565944', 49, 1),
(67, '0', '0', 0, '47.451554', '-0.534624', 49, 2),
(68, '102 Boulevard Albert Camus 49100 Angers', '102 Boulevard Albert Camus 49100 Angers', 0, '47.478862', '-0.576539', 49, 6),
(69, '54 Rue de Frémur 49000 Angers', '54 Rue de Frémur 49000 Angers', 0, '47.459966', '-0.558406', 49, 1),
(70, '19 Rue Saint-Martin 49100 Angers', '19 Rue Saint-Martin 49100 Angers', 0, '47.469395', '-0.552257', 49, 1),
(71, '89 Boulevard Albert Camus 49100 Angers', '89 Boulevard Albert Camus 49100 Angers', 0, '47.479430', '-0.575997', 49, 6),
(72, '2 Boulevard Gaston Birgé 49100 Angers', '2 Boulevard Gaston Birgé 49100 Angers', 0, '47.481838', '-0.522555', 49, 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `panneau`
--
ALTER TABLE `panneau`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `panneau_latitude_longitude` (`latitude`,`longitude`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `panneau`
--
ALTER TABLE `panneau`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
