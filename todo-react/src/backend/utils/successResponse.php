<?php

class SuccessResponse
{
    // normal success
    // 200 OK
    // for GET
    // for PUT & POST as transmission of message to server
    function success200($payload)
    {
        $response = [];
        $response = $this->parsePayload($payload);

        $response['status']['code'] = "200";
        $response['status']['message'] = "200 OK";

        echo json_encode($response);
    }

    // 201 CREATED
    // for PUT & POST as creating of new resource at the server
    function success201($payload)
    {
        $response = $this->parsePayload($payload);

        // adding status code to response
        $response['status']['code'] = "201";
        $response['status']['message'] = "201 Created";
        echo json_encode($response);
    }

    function parsePayload($payload)
    {
        $response = [];

        foreach ($payload as $key => $value) {
            $response["payload"][$key] = $value;
        }

        return $response;
    }
}
