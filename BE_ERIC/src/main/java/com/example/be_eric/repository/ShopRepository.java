package com.example.be_eric.repository;

import com.example.be_eric.DTO.ShopProductDetailDTO;
import com.example.be_eric.models.Shop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ShopRepository extends JpaRepository<Shop, Long> {

//    @Query("SELECT s FROM Shop s LEFT JOIN s.shopProducts sp WHERE sp.product.id = :productId")
//    List<Shop> findShopsByProductId(@Param("productId") Long productId);

    @Query("SELECT new  com.example.be_eric.DTO.ShopProductDetailDTO(s,sp) FROM Shop s LEFT JOIN s.shopProducts sp WHERE sp.product.id = :productId")
    List<ShopProductDetailDTO> findShopsByProductId(@Param("productId") Long productId);






}
