package com.example.be_eric.controllers.DTOResponse;


import com.example.be_eric.models.Product.Product;
import com.example.be_eric.models.Shop;
import lombok.Data;

import java.util.List;

@Data
public class ShopDetailDAO {

    private Shop shop;
    private double countRate;
    private int countComment;
    private List<Product> topProducts;
    private List<Product> newProducts;

}
