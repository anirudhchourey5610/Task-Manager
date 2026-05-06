package com.example.taskmanager.dto;

import com.example.taskmanager.entity.Role;

public class AuthResponse {
    private Long userId;
    private Role role;
    private String name;

    public AuthResponse(Long userId, Role role, String name) {
        this.userId = userId;
        this.role = role;
        this.name = name;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
