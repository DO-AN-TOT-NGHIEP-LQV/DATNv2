package com.example.be_eric.repository;

import com.example.be_eric.models.Comment.ProductMainDiscussion;
import com.example.be_eric.models.Product.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiscussionMainRepository extends JpaRepository<ProductMainDiscussion, Long> {

@Query("SELECT mc.id, mc.mainContent, u.username, u.id, u.avatar, sc.id, sc.subContent, subUser.id, subUser.username, subUser.avatar, mc.updated_at, sc.created_at  " +
        "FROM ProductMainDiscussion mc " +
        "JOIN mc.user u " +
        "LEFT JOIN  mc.subDiscussions sc " +
        "LEFT JOIN sc.user subUser " +
        "WHERE mc.product.id = :productId " +
        "ORDER BY mc.updated_at DESC")
       List<Object[]> findProductMainDiscussionsByProduct(@Param("productId") Long productId);

       @Query("SELECT pm.id  FROM ProductMainDiscussion pm WHERE pm.product.id = :productId ")
       List<Long> findProductMainDiscussionIdsByProductId(@Param("productId") Long productId);
}
