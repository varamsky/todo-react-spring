<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET,POST,DELETE');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Access-Control-Allow-Methods, Content-Type, Authorization, X-Requested-With');

require_once("../models/queries.php");
require_once("successResponse.php");
require_once("errorResponse.php");

$queries = new Queries();
$successResponse = new SuccessResponse();
$errorResponse = new ErrorResponse();

$action = $_GET['action'];

if ($action === "ADD_TODO") {
    addTodo($queries, $successResponse, $errorResponse);
} else if ($action === "DELETE_TODO") {
    deleteTodo($queries, $successResponse, $errorResponse);
} else if ($action === "GET_ALL_TODO") {
    getAllTodo($queries, $successResponse, $errorResponse);
} else if ($action === "GET_FULLTEXT_TODO") {
    getFullTextTodo($queries, $successResponse, $errorResponse);
} else if ($action === "UPDATE_TODO") {
    updateTodo($queries, $successResponse, $errorResponse);
}

function addTodo($queries, $successResponse, $errorResponse)
{
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {

        $data = json_decode(file_get_contents("php://input"), true);
        $title = $data['title'];
        $isCompleted = $data['isCompleted'];
        $priority = $data['priority'];

        $successResponse->success201($queries->addTodo($title, $priority, $isCompleted));

        exit;
    } else {
        $errorResponse->error405();

        exit;
    }
}

function deleteTodo($queries, $successResponse, $errorResponse)
{
    if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        $data = json_decode(file_get_contents("php://input"), true);

        $id = $data['id'];

        $successResponse->success200($queries->deleteTodo($id));

        exit;
    } else {
        $errorResponse->error405();

        exit;
    }
}

function getAllTodo($queries, $successResponse, $errorResponse)
{
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $successResponse->success200($queries->getAllTodo());
    } else {
        $errorResponse->error405();

        exit;
    }
}

function getFullTextTodo($queries, $successResponse, $errorResponse)
{
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {

        $queries = new Queries();

        $data = json_decode(file_get_contents("php://input"), true);
        $searchText = $data['searchText'];

        $successResponse->success200($queries->getFullTextTodo($searchText));

        exit;
    } else {
        $errorResponse->error405();

        exit;
    }
}

function updateTodo($queries, $successResponse, $errorResponse)
{
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {

        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['id'];
        $column = $data['column'];
        $newValue = $data['newValue'];

        $successResponse->success201($queries->updateTodo($id, $column, $newValue));

        exit;
    } else {
        $errorResponse->error405();

        exit;
    }
}
