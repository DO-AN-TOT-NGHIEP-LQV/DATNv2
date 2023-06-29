package com.example.be_eric.DTO;


import com.example.be_eric.models.Image;
import com.example.be_eric.models.Product.Product;
import com.example.be_eric.models.Product.ShopProduct;
import com.example.be_eric.models.Shop;
import com.example.be_eric.service.ProductService;
import com.example.be_eric.service.ShopService;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Data
@Getter
@Setter
public class ShopProductDetailDTO {


//    @Autowired
//     ProductService productService ;
//    @Autowired
//    ShopService shopService;

    private Shop shop;
    private ShopProduct shopProduct;
    private Product product;
//    private ProductDTO productDTO;

    public ShopProductDetailDTO(Shop shop, ShopProduct shopProduct) {
        this.shop = shop;
        this.shopProduct = shopProduct;
    }

    public ShopProductDetailDTO() {
    }


//    public ShopProductDTO( Long productId, int shopId, double price, int quantity) {
//        Product p = productService.getById(productId);
//        Shop s = shopService.getById(shopId);
//        this.shopProduct = new ShopProduct();
//        this.shopProduct.setShop(s);
//        this.shopProduct.setProduct(p);
//        this.shopProduct.setPrice(price);
//        this.shopProduct.setQuantity(quantity);
//
//        System.out.println("aewe");
//    }

    public ShopProductDetailDTO(Product product, ShopProduct shopProduct) {
        this.shopProduct = shopProduct;
        this.product = product;
    }

//    public ShopProductDTO(Long id, String name, String description, String type, String brand, List<Image> images, ShopProduct shopProduct) {
//        this.shopProduct = shopProduct;
//        this.productDTO = new ProductDTO(id, name, description, type, brand);
//    }

//    public ShopProductDTO(Long id, String name, String description, String type, String brand, ShopProduct shopProduct) {
//        this.shopProduct = shopProduct;
//        this.product = new ProductDTO(id, name, description, type, brand);
//    }





//    public Shop getShop() {
//        return shop;
//    }
//
//    public void setShop(Shop shop) {
//        this.shop = shop;
//    }
//
//    public ShopProduct getShopProduct() {
//        return shopProduct;
//    }
//
//    public void setShopProduct(ShopProduct shopProduct) {
//        this.shopProduct = shopProduct;
//    }
//
//    public Product getProduct() {
//        return product;
//    }
//
//    public void setProduct(Product product) {
//        this.product = product;
//    }

//    public ShopProductDTO(ShopProduct shopProduct, ProductDTO productDTO) {
//        this.shopProduct = shopProduct;
//        this.productDTO = productDTO;
//    }
//
//    public ProductDTO getProductDTO() {
//        return productDTO;
//    }
//
//    public void setProductDTO(ProductDTO productDTO) {
//        this.productDTO = productDTO;
//    }

    //    public ProductDTO getProductDTO() {
//        return product;
//    }
//
//    public void setProductDTO(ProductDTO productDTO) {
//        this.product = productDTO;
//    }
}
