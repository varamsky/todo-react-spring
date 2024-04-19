package com.spring.todo.Service;

import com.spring.todo.Exception.RequiredFieldsException;
import com.spring.todo.Model.Priority;
import com.spring.todo.Repository.TodoRepository;
import com.spring.todo.Model.Todo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class TodoService {

    private final Logger logger = LoggerFactory.getLogger(Logger.class);
    private final TodoRepository repository;

    public TodoService(TodoRepository repository) {
        this.repository = repository;
    }

    public List<Todo> getAllTodos() {
        return repository.findAll();
    }

    public Todo addTodo(Todo todo) {
//        if (Objects.equals(todo.getTitle(), "") || todo.getTitle() == null)
//            throw new RequiredFieldsException("Please provide the title.");
        // TODO: don't check required fields here and let spring do the work
        logger.info("Inside TodoService.addTodo");
        if (todo.getPriority() == null)
            todo.setPriority(String.valueOf(Priority.defaultValue()));
        else {
            // change priority strings like "Medium", "medium", and so on to "MEDIUM"
            todo.setPriority(todo.getPriority().toUpperCase());
            if (!Priority.checkByName(todo.getPriority()))
                throw new RequiredFieldsException("Please provide a valid priority.");
        }
        logger.info("Inside TodoService.addTodo -> adding date");
        // we set the add date ourselves and override it even if sent by the client
        todo.setAddDate(LocalDateTime.now().toString());
        logger.info("Inside TodoService.addTodo -> adding setCompleted");
        todo.setIsCompleted(false);

        logger.info("Inside TodoService.addTodo -> saving todo");
        return repository.save(todo);
    }

    public Todo updateTodo(long id, Todo todo, Todo todoFromDb) {
        if (todo.getPriority() != null) {
            if (!Priority.checkByName(todo.getPriority()))
                throw new RequiredFieldsException("Please provide a valid priority.");
            todoFromDb.setPriority(todo.getPriority().toUpperCase());
        }
        if (todo.getTitle() != null) todoFromDb.setTitle(todo.getTitle());
        if (todo.getIsCompleted() != todoFromDb.getIsCompleted()) todoFromDb.setIsCompleted(todo.getIsCompleted());

        return repository.save(todoFromDb);
    }

    public Optional<Todo> getTodoById(long id) {
        return repository.findById(id);
    }

    public boolean deleteTodoById(long id) {
        try {
            if (!repository.existsById(id)) return false;
            repository.deleteById(id);
            return true;
        } catch (Exception ex) {
            logger.error("Error deleting a todo by id -> {}", ex.getMessage());
            return false;
        }
    }

    public List<Todo> search(String searchText) {
        return repository.search(searchText);
    }
}
