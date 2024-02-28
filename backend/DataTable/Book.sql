CREATE TABLE books (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    isbn13 DECIMAL(13) UNIQUE NOT NULL,
    title VARCHAR(200) NOT NULL,
    author VARCHAR(100) NOT NULL,
    publishDate DATE NOT NULL
);