package com.spring.todo.Controller;

import com.spring.todo.Model.Todo;
import com.spring.todo.Service.TodoService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/todos")
public class TodoController {

    private final TodoService service;
    private final Logger logger = LoggerFactory.getLogger(LoggerFactory.class);

    public TodoController(TodoService service){
        this.service = service;
    }

    @GetMapping
    List<Todo> getAllTodos() {
        return service.getAllTodos();
    }

    @GetMapping("/{id}")
    ResponseEntity<Todo> getTodoById(@PathVariable long id) {
        Optional<Todo> todo = service.getTodoById(id);
        return todo.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    ResponseEntity<Todo> createTodo(@RequestBody @Valid Todo todo, BindingResult bindingResult){
        logger.info("todo.title = {}", todo.getTitle());
        logger.info("todo = {}", todo.toString());
        if(bindingResult.hasErrors())
            logger.error(bindingResult.getAllErrors().toString());
        return new ResponseEntity<>(service.addTodo(todo), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    ResponseEntity<Todo> updateTodo(@PathVariable long id, @RequestBody @Valid Todo todo, BindingResult bindingResult){
        logger.info("id = {}", id);
        logger.info("todo update = {}", todo.toString());
        if(bindingResult.hasErrors())
            logger.error(bindingResult.getAllErrors().toString());

        Optional<Todo> todoFromDb = service.getTodoById(id);
        return todoFromDb.map(value -> new ResponseEntity<>(service.updateTodo(id, todo, value), HttpStatus.CREATED)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    ResponseEntity<Void> deleteTodo(@PathVariable long id){
        logger.info("deleteTodo id = {}", id);
        boolean result = service.deleteTodoById(id);
        if(result) return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/search")
    List<Todo> search(@RequestParam String searchText) {
        return service.search(searchText);
    }
}
