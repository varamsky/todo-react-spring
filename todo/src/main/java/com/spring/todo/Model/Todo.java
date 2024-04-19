package com.spring.todo.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Entity(name = "todos")
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    @NotEmpty
    private String title;

    private String priority;

    @Column(name = "is_completed")
    private boolean isCompleted;

    @Column(name = "add_date")
    @DateTimeFormat(pattern = "dd-MM-yyyy HH:mm")
    private String addDate; // set by the server backend and override if sent by the frontend client

    public Todo(){}

    public Todo(long id, String title, String priority, boolean isCompleted, String addDate) {
        this.id = id;
        this.title = title;
        this.priority = priority;
        this.isCompleted = isCompleted;
        this.addDate = addDate;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public boolean getIsCompleted() {
        return isCompleted;
    }

    public void setIsCompleted(boolean isCompleted) {
        this.isCompleted = isCompleted;
    }

    public String getAddDate() {
        return addDate;
    }

    public void setAddDate(String addDate) {
        this.addDate = addDate;
    }

    @Override
    public String toString() {
        return "Todo{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", priority='" + priority + '\'' +
                ", isCompleted=" + isCompleted +
                ", addDate=" + addDate +
                '}';
    }
}
