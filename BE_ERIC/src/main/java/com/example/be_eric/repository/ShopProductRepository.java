package com.example.be_eric.repository;


import com.example.be_eric.DTO.ShopProductDetailDTO;
import com.example.be_eric.models.Product.ShopProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface ShopProductRepository extends JpaRepository<ShopProduct, Long> {

    boolean existsByProduct_IdAndShop_Id(Long productId, Long shopId);

    ShopProduct findByProduct_IdAndShop_Id(Long productId, Long shopId);

    @Query("SELECT new  com.example.be_eric.DTO.ShopProductDetailDTO(p, sp) FROM Product p LEFT JOIN p.shopProducts sp  WHERE p.id = :productId AND sp.shop.id = :shopId ")
    ShopProductDetailDTO findProductVendor(@Param("productId") Long productId, @Param("shopId") Long shopId);

}
