<?php

class ErrorResponse
{
    // 405 Method Not Allowed
    // The request method is not allowed by the server at this point.
    function error405()
    {
        $response = [];

        $response['status']['code'] = "405";
        $response['status']['message'] = "The request method is not allowed by the server at this point";

        echo json_encode($response);
    }

    // 501 Not Implemented
    // The request method is not supported by the server and cannot be handled.
    function error501()
    {
        $response = [];

        $response['status']['code'] = "501";
        $response['status']['message'] = "The request method is not supported by the server and cannot be handled";

        echo json_encode($response);
    }
}
