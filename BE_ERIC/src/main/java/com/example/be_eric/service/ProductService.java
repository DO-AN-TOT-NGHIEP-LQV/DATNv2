package com.example.be_eric.service;

import com.example.be_eric.DTO.ShopProductDetailDTO;
import com.example.be_eric.models.Image;
import com.example.be_eric.models.Product.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProductService {

    Product save(Product product);
    List<Product> getAll();
    void addImageToProduct(Product product, Image image) ;

    Product getById( Long id);
    Page<Product> searchByText(String searchText, Pageable pageable);

    List<Product> searchByTextNotPageable(String searchText);

//    boolean updateViews( Long idProduct);

    Page<Product> searchAndFilterProducts(String keyword, String[] types, String[] brands, Double minPrice, Double maxPrice, Pageable pageable);
    List<Product> searchAndFilterProducts(String keyword, String[] types, String[] brands, Double minPrice, Double maxPrice);

    List<Product> findProductsByShopIdAndKeyword(Long shopId, String keyword);
    List<Product> findAllProductByKeyword(String keyword);

    boolean deleteProduct(Product product);

    Product getProductByIdOfaShop( Long shopId, Long productId);
    void setProductFeatured(Long idProduct, Long idShop, boolean isFeature) throws Exception;


    List<ShopProductDetailDTO> findProductOfShopIdAndKeyword(Long productId, String keyword);

}