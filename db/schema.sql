CREATE TABLE ownerdata
(
	id INT AUTO_INCREMENT NOT NULL,
    username varchar(50) NOT NULL,
    `password` varchar(50) NOT NULL,
    firstname varchar(50) NOT NULL,
    lastname varchar(50) NOT NULL,
    email varchar(50) NOT NULL,
    address varchar(50),
    createdAt TIMESTAMP NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE dogdata
(
	id INT AUTO_INCREMENT NOT NULL ,
    owner_name varchar(50) NOT NULL,
    breed varchar(50) NOT NULL,
	weight int NOT NULL DEFAULT 0,
    shedding int NOT NULL DEFAULT 0,
    energy int NOT NULL DEFAULT 0,
    trainability int NOT NULL DEFAULT 0,
    kid	int NOT NULL DEFAULT 0,
    groom_interval int NOT NULL DEFAULT 0,
    groom_metric int NOT NULL DEFAULT 0,
    hypoallergenic boolean NOT NULL DEFAULT false,
    bark int NOT NULL DEFAULT 0,
    independence int NOT NULL DEFAULT 0,
	lifespan int NOT NULL DEFAULT 0,
    adoptable boolean NOT NULL DEFAULT false,
    image varchar(45),
    createdAt TIMESTAMP NOT NULL,
    
	PRIMARY KEY(id)
);

Select * from dogdata;