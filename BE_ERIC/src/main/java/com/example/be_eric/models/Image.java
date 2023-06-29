package com.example.be_eric.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String url;

//    @NotNull
    private Boolean isProductImage = true;
//
    public Image(Long id, String name, String url) {
        this.id = id;
        this.name = name;
        this.url = url;
    }
//    public Image(Long id, String name, String url,  Boolean isProductImage) {
//        this.id = id;
//        this.name = name;
//        this.url = url;
//        this.isProductImage =  isProductImage;
//    }

    public Image( String name, String url, boolean isProductImage) {
        this.name = name;
        this.url = url;
        this.isProductImage = isProductImage;
    }
}
