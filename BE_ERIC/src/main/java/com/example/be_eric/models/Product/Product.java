package com.example.be_eric.models.Product;

import com.example.be_eric.models.Image;
import com.example.be_eric.models.Shop;
import com.fasterxml.jackson.annotation.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
//@JsonIgnoreProperties("user_id")
//@JsonIgnoreProperties({"hibernateLazyInitializer"})
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    @Column(columnDefinition = "TEXT")

//    @NotNull
    private String description;

//    @NotNull
//    private int quantity;

//    private double  originalPrice = 0;

//    @NotNull
    private double  price = 0;

//    @NotNull
    private String type;

    private String brand;

//    private String link;

    private  boolean status = false;

    private  boolean isFeatured = false;


    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(
            name = "product_images",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "image_id"))
    private List<Image> images =  new ArrayList<>();


//    @ManyToOne(fetch = FetchType.LAZY)
////    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id" )
////    @JsonIdentityReference(alwaysAsId = true)
////    @JsonProperty("shop_id")
//    @JsonManagedReference
//    @JoinColumn(name = "shop_id", updatable = false)
//    private Shop shop;

//    @JsonIgnore
    @JsonManagedReference
    @OneToMany(mappedBy = "product")
    private List<ShopProduct> shopProducts = new ArrayList<>();



    public Product(Long id, String name, String description,  double  price) {
        this.id = id;
        this.name = name;
        this.description = description;
//        this.quantity = quantity;
        this.price = price;
    }

    public Product(Long id, String name, String description,  String type, String brand) {
        this.id = id;
        this.name = name;
        this.description = description;
//        this.quantity = quantity;
        this.type = type;
        this.brand = brand;
    }



    public Product(Long id, String name, String description, String type, String brand, List<Image> images) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.type = type;
        this.brand = brand;
        this.images = images;
    }

    // Thêm thuộc tính created_at và chú thích @CreationTimestamp
    @CreationTimestamp
    private LocalDateTime createdAt;

    // Thêm thuộc tính updated_at và chú thích @UpdateTimestamp
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
