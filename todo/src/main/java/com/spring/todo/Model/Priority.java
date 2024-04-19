package com.spring.todo.Model;

public enum Priority {
    LOW, MEDIUM, HIGH;

    public static Priority defaultValue() {
        return LOW;
    }

    public static boolean checkByName(String name) {
        for (Priority priority : values()) {
            if (priority.name().equalsIgnoreCase(name))
                return true;
        }
        return false;
    }
}
