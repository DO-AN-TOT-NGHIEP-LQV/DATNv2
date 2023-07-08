package com.example.be_eric;
import com.example.be_eric.models.*;
import com.example.be_eric.models.Comment.ProductMainDiscussion;
import com.example.be_eric.models.Comment.ProductSubDiscussion;
import com.example.be_eric.service.*;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


@SpringBootApplication
public class BeEricApplication {

    public static void main(String[] args) {
        SpringApplication.run(BeEricApplication.class, args);
    }

    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

}
