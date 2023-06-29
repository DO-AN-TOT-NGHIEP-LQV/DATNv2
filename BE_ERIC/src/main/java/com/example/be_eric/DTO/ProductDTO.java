package com.example.be_eric.DTO;

import com.example.be_eric.models.Image;
import lombok.Data;

import java.util.List;

@Data
public class ProductDTO {

    private Long id;

    private String name;
    private String description;

//    private double  originalPrice = 0;
    private double  price = 0;

//    private String link;
//    private int quantity;

    private String type;
    private String brand;

    public ProductDTO(Long id, String name, String description, String type, String brand) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.type = type;
        this.brand = brand;
    }

    public ProductDTO(Long id) {
        this.id = id;

    }

    public ProductDTO() {

    }


}
