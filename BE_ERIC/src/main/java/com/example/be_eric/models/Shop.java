package com.example.be_eric.models;


import com.example.be_eric.models.Product.Product;
import com.example.be_eric.models.Product.ShopProduct;
import com.fasterxml.jackson.annotation.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer"})

public class Shop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sName;
    private String sNumber;
    private boolean sStatus;
    private  String sLogo;
    private  String sAddress1;
    private  String sLink;
    private  String sFax;
    private boolean sApproved = false;

    @OneToOne
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id" )
    @JsonIdentityReference(alwaysAsId = true)
    @JsonProperty("user_id")
    private User user;

    @OneToOne
    private Image image;

    public Image getImage() {
        return image;
    }
    public void setImage(Image image) {
        this.image = image;
    }


//    @OneToMany(mappedBy = "shop", cascade = CascadeType.ALL, orphanRemoval = true )
//    @JsonBackReference
//    @OnDelete(action = OnDeleteAction.CASCADE)
//    private List<Product> products = new ArrayList<>();

    @OneToMany(mappedBy = "shop", fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<ShopProduct> shopProducts = new ArrayList<>();

    @CreationTimestamp
    private LocalDateTime created_at;

    @UpdateTimestamp
    private LocalDateTime updated_at;

    public Shop(String sName, String sNumber, String sAddress1, User user) {
        this.sName = sName;
        this.sNumber = sNumber;
        this.sAddress1 = sAddress1;
        this.user = user;
    }


    public Shop(String sName, String sNumber, String sAddress1, String sLogo, User user) {
        this.sName = sName;
        this.sNumber = sNumber;
        this.sAddress1 = sAddress1;
        this.user = user;
        this.sLogo = sLogo;
    }

    public Shop(String sName, String sNumber, String sAddress1, String sLogo, Image image, User user) {
        this.sName = sName;
        this.sNumber = sNumber;
        this.sAddress1 = sAddress1;
        this.user = user;
        this.sLogo = sLogo;
        this.image = image;
    }


    public Shop(String sName, String sNumber, String sAddress1, String sLogo, Image image, User user, boolean sStatus) {
        this.sName = sName;
        this.sNumber = sNumber;
        this.sAddress1 = sAddress1;
        this.user = user;
        this.sLogo = sLogo;
        this.image = image;
        this.sStatus = sStatus;
    }



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getsName() {
        return sName;
    }

    public void setsName(String sName) {
        this.sName = sName;
    }

    public String getsNumber() {
        return sNumber;
    }

    public void setsNumber(String sNumber) {
        this.sNumber = sNumber;
    }

    public boolean getsStatus() {
        return sStatus;
    }

    public void setsStatus(boolean sStatus) {
        this.sStatus = sStatus;
    }

    public String getsLogo() {
        return sLogo;
    }

    public void setsLogo(String sLogo) {
        this.sLogo = sLogo;
    }

    public String getsAddress1() {
        return sAddress1;
    }

    public void setsAddress1(String sAddress1) {
        this.sAddress1 = sAddress1;
    }

    public String getsLink() {
        return sLink;
    }

    public void setsLink(String sLink) {
        this.sLink = sLink;
    }

    public String getsFax() {
        return sFax;
    }

    public void setsFax(String sFax) {
        this.sFax = sFax;
    }

    @JsonProperty("user_id")
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

//    public List<Product> getProducts() {
//        return products;
//    }

//    public void setProducts(List<Product> products) {
//        this.products = products;
//    }

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

    public List<ShopProduct> getShopProducts() {
        return shopProducts;
    }

    public void setShopProducts(List<ShopProduct> shopProducts) {
        this.shopProducts = shopProducts;
    }
}
