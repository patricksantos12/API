create database platonix;

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