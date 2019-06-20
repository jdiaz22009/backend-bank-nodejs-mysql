-- CREATE DATABASE
CREATE DATABASE bank;

USE bank;

-- CREATE TABLES

-- PRODUCTS
CREATE TABLE IF NOT EXISTS products(
  id_product INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name_product VARCHAR(255),
  desc_product VARCHAR(255),
  status INT(2),
  create_date VARCHAR(255),
  create_update VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS clients(
  id_client INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  last_name VARCHAR(255),
  document VARCHAR(255),
  email VARCHAR(255),
  phone_mobile VARCHAR(255),
  age INT(11),
  status INT(2),
  create_date VARCHAR(255),
  create_update VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS card_bank(
  id_card INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_client INT(11),
  id_product INT(11),
  num_card INT(11),
  cvc INT(4),
  date_valid VARCHAR(11),
  type_card VARCHAR(70),
  status INT(2),
  create_date VARCHAR(255),
  create_update VARCHAR(255)
);

-- FK TABLE
ALTER TABLE card_bank ADD CONSTRAINT id_client_pk_fk_fk FOREIGN KEY(id_client) REFERENCES clients(id_client);
ALTER TABLE card_bank ADD CONSTRAINT id_product_pk_fk FOREIGN KEY(id_product) REFERENCES products(id_product);