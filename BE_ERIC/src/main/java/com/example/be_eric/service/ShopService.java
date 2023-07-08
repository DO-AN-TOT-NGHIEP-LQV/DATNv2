package com.example.be_eric.service;

import com.example.be_eric.DTO.ShopProductDetailDTO;
import com.example.be_eric.models.Product.Product;
import com.example.be_eric.models.Product.ShopProduct;
import com.example.be_eric.models.Shop;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ShopService {

    Shop save(Shop shop);
    void delete(Shop shop);
    Shop getById( int id);
    Shop getById( Long id);
//    Shop getShopByUserId( Long id);

    Shop getByUser( Long userId);
    Shop addUser ( Long shopId, Long userId);

    List<Shop> getAllShop();

    List<ShopProductDetailDTO> getShopByProductId(Long productId);

    boolean existsByProduct_IdAndShop_Id( Long productId, Long ShopId);
    ShopProduct findByProduct_IdAndShop_Id( Long productId, Long ShopId);
    ShopProduct saveShopProduct(ShopProduct shopProduct);
    void deleteShopProduct(ShopProduct shopProduct);

    ShopProductDetailDTO findProductVendor(Long productId, Long shopId);

    List<Shop> findShopByKeyword(String keyword, boolean isPending);
    Shop acceptAShop(Long shopId);



}
