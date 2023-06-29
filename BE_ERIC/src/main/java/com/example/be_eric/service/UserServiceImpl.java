package com.example.be_eric.service;

import com.example.be_eric.models.Role;
import com.example.be_eric.models.User;
import com.example.be_eric.repository.RoleRepository;
import com.example.be_eric.repository.UserRepository;
import com.example.be_eric.ultils.Exception.DuplicateValueException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


@Service
@Transactional
@Slf4j

public class UserServiceImpl implements  UserService, UserDetailsService {

    @Autowired
    private   UserRepository userRepo;
    @Autowired
    private   RoleRepository roleRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepo.findByEmail(email);

        if( user == null) {
            log.error("User not found in the database");
            throw new UsernameNotFoundException("User not found in the database");
        }else{
            log.info("User found in the database: {}", email);
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        });
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);
    }

    @Override
    public User saveUser(User user)  {
        if( !userRepo.existsByEmail(user.getEmail() )){
            log.info("Save new user {} to the database", user.getUsername());
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            Role role = roleRepo.findByName("ROLE_USER");
            user.getRoles().add(role);  // vi role la 1 array list nen get lay [] roi a vao
            return userRepo.save(user);
        }
        else {
            throw new DuplicateValueException("Email này đã được đăng ký");
        }
    }

    @Override
    public Role saveRole(Role role) {
        log.info("Save new role {} to the database", role.getName());
        return roleRepo.save(role);
    }

    @Override
    public void addRoleToUser(String username, String roleName) {
        log.info("Add  role {} to user", roleName, username);
        User user = userRepo.findByUsername(username);
        Role role = roleRepo.findByName(roleName);
        user.getRoles().add(role);
    }

    @Override
    public User getUser(String usename) {

        return userRepo.findByUsername((usename));
    }

    @Override
    public User getUserByEmail(String email) {
       return  userRepo.findByEmail(email);
    }

    @Override
    public User getUserById(Long id) {
        return  userRepo.findById(id).orElse(null);
    }

    @Override
    public boolean changePassword(User user) {
        try{
            if ( userRepo.existsById(user.getId())){
                user.setPassword(passwordEncoder.encode(user.getPassword()));
                Role role = roleRepo.findByName("ROLE_USER");
                user.getRoles().add(role);  // vi role la 1 array list nen get lay [] roi a vao
                 userRepo.save(user);
                return  true;
            }
            return  false;
        }catch (Exception e)
        { throw  e;}

    }

    @Override
    public List<User> getUsers() {
        return userRepo.findAll();
    }
}
