package com.example.be_eric.models;

import com.fasterxml.jackson.annotation.*;
import lombok.*;
import org.hibernate.annotations.*;

import javax.persistence.*;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@ToString
@NoArgsConstructor
@AllArgsConstructor

public class User {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;

//    private String firstName;
//    private String lastName;

    @NotBlank
    @Column(name = "username", unique = true, nullable = false)
    private String username;

    @NotBlank
    @NaturalId
    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @NotBlank
    private String password;

    @Column(name = "gender",  columnDefinition = "BOOLEAN default false")
    private boolean gender = false;

    @Column(name = "isEnable", nullable = false, columnDefinition = "BOOLEAN default false")
    private boolean isEnable =false;

    private String number;
    private String avatar;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(
            name = "User_Role",
            joinColumns = @JoinColumn(name = "user_id"),  //lien ket voi khoa chinh cua bang hien tai
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private List<Role> roles =  new ArrayList<>();


//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true )
//    @JsonBackReference
//    @OnDelete(action = OnDeleteAction.CASCADE)
//    private List<Post> posts = new ArrayList<>();

    @OneToOne(mappedBy = "user")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id" )
    @JsonIdentityReference(alwaysAsId = true)
//    @JoinColumn(name = "user_id", updatable = false)
    @JsonProperty("shop_id")
    private Shop shop;

    public User( String username,  String email,  String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public User(Long id, @NotBlank String username, @NotBlank String email,  @NotBlank String password, String avatar, List<Role> roles) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.roles = roles;
        this.avatar =avatar;
    }




    public User(Long id, @NotBlank String username, @NotBlank String email, @NotBlank String password, List<Role> roles) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.roles = roles;
    }

    // Thêm thuộc tính created_at và chú thích @CreationTimestamp
    @CreationTimestamp
    private LocalDateTime created_at;

    // Thêm thuộc tính updated_at và chú thích @UpdateTimestamp
    @UpdateTimestamp
    private LocalDateTime updated_at;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @OneToOne
    private Image image;

    public Image getImage() {
        return image;
    }

    public void setImage(Image image) {
        this.image = image;
    }

//    public String getFirstName() {
//        return firstName;
//    }
//
//    public void setFirstName(String firstName) {
//        this.firstName = firstName;
//    }
//
//    public String getLastName() {
//        return lastName;
//    }
//
//    public void setLastName(String lastName) {
//        this.lastName = lastName;
//    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isGender() {
        return gender;
    }

    public void setGender(boolean gender) {
        this.gender = gender;
    }

    public boolean isEnable() {
        return isEnable;
    }

    public void setEnable(boolean enable) {
        isEnable = enable;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

//    public List<Post> getPosts() {
//        return posts;
//    }
//
//    public void setPosts(List<Post> posts) {
//        this.posts = posts;
//    }

    @JsonProperty("shop_id")
    public Shop getShop() {
        return shop;
    }

    public void setShop(Shop shop) {
        this.shop = shop;
    }

    public LocalDateTime getCreated_at() {
        return created_at;
    }

    public void setCreated_at(LocalDateTime created_at) {
        this.created_at = created_at;
    }

    public LocalDateTime getUpdated_at() {
        return updated_at;
    }

    public void setUpdated_at(LocalDateTime updated_at) {
        this.updated_at = updated_at;
    }
}
