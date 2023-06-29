package com.example.be_eric.repository;

import com.example.be_eric.models.Comment.ProductSubDiscussion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiscussionSubRepository extends JpaRepository<ProductSubDiscussion, Long>  {

}
