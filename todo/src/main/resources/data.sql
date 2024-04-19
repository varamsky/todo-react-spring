-- This sql file will automatically picked up by H2 and the course table will be created
SELECT 'START data.sql' as 'INFO';
SELECT 'Creating Table if not already exists' as 'INFO';
CREATE TABLE IF NOT EXISTS todos(
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(65) NOT NULL,
    priority ENUM('LOW','MEDIUM','HIGH') DEFAULT 'LOW',
    is_completed BOOLEAN DEFAULT FALSE,
    add_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FULLTEXT fulltext_idx(title) -- This works for MySQL
);
SELECT 'Table created' as 'INFO';
--SELECT 'Creating index on column title' as 'INFO';
--CREATE INDEX idx_title ON todos(title);

SELECT 'INSERTING data into the table' as 'INFO';
INSERT INTO todos(title) VALUES('Default todo');
INSERT INTO todos(title, priority) VALUES('High priority Todo', 'HIGH');
INSERT INTO todos(title, is_completed) VALUES('Completed Todo', true);
SELECT 'Data inserted' as 'INFO';
SELECT 'END' as 'INFO';