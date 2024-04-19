package com.spring.todo.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value= HttpStatus.BAD_REQUEST)
public class RequiredFieldsException extends RuntimeException {
    public RequiredFieldsException(String errorMessage) {
        super(errorMessage);
    }
}
