package com.spring.todo.Repository;

import com.spring.todo.Model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    @Query(value = "SELECT id,title,priority,is_completed,add_date FROM todos WHERE MATCH(title) AGAINST(?1)", nativeQuery = true)
    List<Todo> search(String searchText);
}
