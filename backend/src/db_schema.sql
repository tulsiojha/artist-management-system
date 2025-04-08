CREATE DATABASE IF NOT EXISTS ams;
USE ams;

CREATE TABLE IF NOT EXISTS user (
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(500) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    dob DATE NOT NULL,
    gender ENUM('m','f','o') NOT NULL,
    address VARCHAR(255) NOT NULL,
    role ENUM('super_admin', 'artist_manager', 'artist') NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    id INT AUTO_INCREMENT,
    PRIMARY KEY (id)
);


CREATE TABLE IF NOT EXISTS artist (
    name VARCHAR(255) NOT NULL,
    dob DATE NOT NULL,
    gender ENUM('m','f','o'),
    address VARCHAR(255) NOT NULL,
    first_release_year year NOT NULL,
    no_of_albums_released INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    id INT AUTO_INCREMENT,
    user_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS song (
    artist_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    album_name VARCHAR(255) NOT NULL,
    genre enum('rnb','country','classic','rock', 'jazz') NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    id INT AUTO_INCREMENT,
    PRIMARY KEY (id),
    FOREIGN KEY (artist_id) REFERENCES artist(id) ON DELETE CASCADE
);
