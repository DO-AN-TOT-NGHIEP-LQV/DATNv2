package com.example.be_eric.service;

import com.example.be_eric.DTO.ShopProductDetailDTO;
import com.example.be_eric.models.Image;
import com.example.be_eric.models.Product.Product;
import com.example.be_eric.repository.ProductRepository;
import com.example.be_eric.repository.ProductSpecifications;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements  ProductService{

    @Autowired
    private ProductRepository productRepo;

    @Override
    public Product save(Product product) {
        return productRepo.save(product);
    }

    @Override
    public List<Product> getAll() {
        return productRepo.findAll();
    }

    @Override
    @Transactional
    public void addImageToProduct(Product product, Image image) {

        Optional<Product> optionalPost = productRepo.findById(product.getId());
        if (optionalPost.isPresent()) {
            Product newpost = optionalPost.get();
            image.setIsProductImage(true);
            newpost.getImages().add(image);
            productRepo.save(newpost);
        }
    }

    @Override
    public Product getById(Long id) {
        return productRepo.findById(id).orElse(null);
    }

    @Override
    public Page<Product> searchByText(String searchText, Pageable pageable) {
        return productRepo.findProductsByNameContainingOrDescriptionContaining(searchText,  searchText, pageable);
    }

    @Override
    public List<Product> searchByTextNotPageable(String searchText) {
        return productRepo.findProductsByNameContainingOrDescriptionContaining(searchText,  searchText);
    }

//    @Override
//    @Transactional
//    public boolean updateViews(Long idProduct) {
//       try {
//            Product product = getById(idProduct);
//            if (product != null) {
//                product.setCountViews(product.getCountViews() + 1);
//                productRepo.save(product);
//                return true;
//            }
//            else {
//                return false;
//            }
//        }
//       catch (ObjectOptimisticLockingFailureException ex) {
//           // Xử lý khi xảy ra xung đột cập nhật
//           throw  ex ;
//       }
//       catch (Exception e){
//           throw  e;
//       }
//    }

    @Override
    public Page<Product> searchAndFilterProducts(String keyword, String[] types, String[] brands, Double minPrice, Double maxPrice, Pageable pageable) {
        return productRepo.findAll(ProductSpecifications.searchAndFilter(keyword, types, brands, minPrice, maxPrice),pageable);

    }

    @Override
    public List<Product> searchAndFilterProducts(String keyword, String[] types, String[] brands, Double minPrice, Double maxPrice) {
        return productRepo.findAll(ProductSpecifications.searchAndFilter(keyword, types, brands, minPrice, maxPrice));

    }

    @Override
    public List<Product> findProductsByShopIdAndKeyword(Long shopId, String keyword) {
        return productRepo.findProductsByShopIdAndKeyword( keyword);
    }

    @Override
    public List<Product> findAllProductByKeyword(String keyword) {
        return productRepo.findProductsByNameContaining(keyword);
    }

    @Override
    public boolean deleteProduct(Product product) {
        try{
            productRepo.delete(product);
            return  true;
        }catch (Exception e){
            throw  e;
        }
    }

    @Override
    public Product getProductByIdOfaShop(Long shopId , Long productId) {
        return productRepo.findProductByShopIdAndId( productId);
    }

    @Override
    public void setProductFeatured(Long idProduct, Long idShop, boolean isFeature) throws Exception {
      try{

          if( isFeature ){
              long num = productRepo.countFeaturedProductsByShopId((idShop));
              if( num > 5  )
              {
                  throw  new Exception("This shop has more than 5 featured products");
              }
          }

          productRepo.setProductFeatured(idProduct, isFeature );
      }catch (Exception e){
          throw  e;
      }

    }

    @Override
    public List<ShopProductDetailDTO> findProductOfShopIdAndKeyword(Long productId, String keyword) {
        return productRepo.findProductOfShopIdAndKeyword( productId, keyword  );
    }

}
