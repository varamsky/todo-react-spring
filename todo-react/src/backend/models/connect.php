<?php
require_once('../env.php');

// Class to establish connection
class Connect
{
    function connectDB()
    {
        global $servername, $username, $password;
        $conn = new mysqli($servername, $username, $password);

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        return $conn;
    }
}
