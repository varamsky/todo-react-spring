package com.spring.todo;

import com.spring.todo.Model.Todo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

@WebMvcTest
@AutoConfigureMockMvc
public class TodoControllerTest {

    @Autowired
    MockMvc mockmvc;

    List<Todo> todos = new ArrayList<>();

    @BeforeEach
    void setUp() {
        todos = List.of(
                new Todo(1, "title", "MEDIUM", true, "22-12-2023T18:27:13.282955006"),
                new Todo(2, "title 2", "LOW", true, "22-12-2023T18:27:13.282955006")
                );
    }

    @Test
    void shouldReturnAllTodos() throws Exception {
        mockmvc.perform(get("/api/todos")).andExpect(status().isOk());
    }

}
