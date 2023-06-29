package com.example.be_eric.models.Comment;


import com.example.be_eric.models.Product.Product;
import com.example.be_eric.models.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductMainDiscussion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String mainContent;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "product_id")
    private Product product;


    @OneToMany(mappedBy = "mainDiscussion",  fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true )
    @JsonManagedReference
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<ProductSubDiscussion> subDiscussions = new ArrayList<>();


    public ProductMainDiscussion(Long id, String mainContent, User user, Product product) {
        this.id = id;
        this.mainContent = mainContent;
        this.user = user;
        this.product = product;
    }

    public ProductMainDiscussion( String mainContent, User user, Product product) {
        this.mainContent = mainContent;
        this.user = user;
        this.product = product;
    }

    @CreationTimestamp
    private LocalDateTime created_at;
    @UpdateTimestamp
    private LocalDateTime updated_at;
}
