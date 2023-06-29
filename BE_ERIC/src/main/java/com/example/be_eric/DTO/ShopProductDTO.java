package com.example.be_eric.DTO;


import com.example.be_eric.models.Product.Product;
import com.example.be_eric.models.Product.ShopProduct;
import com.example.be_eric.models.Shop;
import com.example.be_eric.service.ProductService;
import com.example.be_eric.service.ShopService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;

@Data
public class ShopProductDTO {

    private Long productId;
    private Long shopId;
    private double price;
    private int quantity;
    private String link;



}
