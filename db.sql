CREATE TABLE user
(
    id       INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50)  NOT NULL UNIQUE,
    email    VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    fullname VARCHAR(50),
    gender   BIT,
    address  VARCHAR(255),
    role     VARCHAR(10)
);

CREATE TABLE token
(
    id            INT AUTO_INCREMENT PRIMARY KEY,
    username      VARCHAR(50) NOT NULL UNIQUE,
    access_token  VARCHAR(255),
    refresh_token VARCHAR(255),
    created_at    TIMESTAMP,
    updated_at    TIMESTAMP
);