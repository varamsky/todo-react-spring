<?php
require_once('../env.php');
class Queries
{
    private $conn;
    // connecting to database with the Connect class
    function __construct()
    {
        include_once('connect.php');
        $this->conn = (new Connect())->connectDB();
        global $dbname, $tablename;
        $this->createDB($dbname);
        $this->createTable($tablename);
    }

    // create database if not exists
    function createDB($dbname)
    {
        $sql = "CREATE DATABASE IF NOT EXISTS $dbname";

        if ($this->conn->query($sql) === false) {
            die("Error creating database: " . $this->conn->error);
        }
        $this->conn->select_db($dbname);
    }

    // create table if not exists
    function createTable($tablename)
    {
        $sql = "CREATE TABLE IF NOT EXISTS $tablename(
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(500) NOT NULL,
            priority ENUM('LOW','MEDIUM','HIGH') DEFAULT 'LOW',
            isCompleted BOOLEAN DEFAULT FALSE,
            add_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FULLTEXT(title)
        )";
        if ($this->conn->query($sql) === false) {
            die("Error creating table $tablename: " . $this->conn->error);
        }
    }

    // Add Todo in Database
    function addTodo($title, $priority = 'LOW', $isCompleted = false)
    {
        global $tablename;
        $sql = "INSERT INTO $tablename(
            title,
            priority,
            isCompleted
        ) VALUES(
            ?,
            ?,
            ? 
        )";
        $stmt = $this->conn->prepare($sql);
        // mapping isCompleted to 1 or 0 as bind_param doesn't accept booleans
        //$stmt->bind_param("ssi", $title, $priority, ($isCompleted === true) ? 1 : 0);
        $stmt->bind_param("ssi", $title, $priority, $isCompleted);

        if ($stmt->execute() === true) {
            return [
                "status" => "1",
                "message" => "Added todo successfully"
            ];
        } else {
            return [
                "status" => "0",
                "message" => "Error while adding todo: " . $this->conn->error
            ];
        }
    }

    // Get all Todo from Database
    function getAllTodo()
    {
        global $tablename;
        $sql = "SELECT id,title,priority,isCompleted,add_date FROM $tablename";

        $data = $this->conn->query($sql);
        $result = [];
        foreach ($data as $key => $value) {
            $result[$key] = $value;
        }

        return $result;
    }

    // Get all Todo by FULLTEXT filter from Database
    function getFullTextTodo($searchText)
    {
        global $tablename;
        $sql = "SELECT id,title,priority,isCompleted,add_date FROM $tablename WHERE MATCH(title) AGAINST('${searchText}' IN NATURAL LANGUAGE MODE)";

        $data = $this->conn->query($sql);
        $result = [];
        foreach ($data as $key => $value) {
            $result[$key] = $value;
        }

        return $result;
    }

    // Delete a Todo from Database
    function deleteTodo($id)
    {
        global $tablename;
        $sql = "DELETE FROM $tablename WHERE id=$id";

        if ($this->conn->query($sql) === true) {
            return [
                "status" => "1",
                "message" => "Deleted todo successfully"
            ];
        } else {
            return [
                "status" => "0",
                "message" => "Error while deleting todo: " . $this->conn->error
            ];
        }
    }

    // Update a Todo in Database
    function updateTodo($id, $column, $newValue)
    {
        global $tablename;
        $sql = "UPDATE $tablename SET $column='$newValue' WHERE id=$id";

        if ($this->conn->query($sql) === true) {
            return [
                "status" => "1",
                "message" => "Updated todo successfully"
            ];
        } else {
            return [
                "status" => "0",
                "message" => "Error while updating todo: " . $this->conn->error
            ];
        }
    }
}
