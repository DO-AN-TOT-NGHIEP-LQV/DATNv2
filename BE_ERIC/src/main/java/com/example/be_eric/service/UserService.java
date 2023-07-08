package com.example.be_eric.service;

import com.example.be_eric.models.Role;
import com.example.be_eric.models.User;

import java.util.List;

public interface UserService {
    User saveUser( User user);
    Role saveRole(Role role);
    void addRoleToUser( String username, String roleName);
    boolean upUserToSaler(User user);
    User getUser(String usename);
    User getUserByEmail(String email);
    User getUserById(Long  id);
    boolean changePassword( User user);
    List<User> getUsers();
    User updateUser( User user);

}
