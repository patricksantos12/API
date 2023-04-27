create database platonix CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

create table platonixApp (
    platonixID int NOT NULL AUTO_INCREMENT,
    plateNumber varchar(255),
    carRegistrationStatus varchar(255),
    carColor varchar(255),
    carMaker varchar(255),
    carModel varchar(255),
    carCityLocation varchar(255),
    PRIMARY KEY (platonixID)
);

create table platonixAppUser (
    userID int NOT NULL AUTO_INCREMENT,
    platonixUser varchar(255),
    platonixPass varchar(255),
    PRIMARY KEY (userID)
);