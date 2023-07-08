package com.example.be_eric.service;


import com.example.be_eric.DTO.ShopProductDetailDTO;
import com.example.be_eric.models.Product.Product;
import com.example.be_eric.models.Product.ShopProduct;
import com.example.be_eric.models.Role;
import com.example.be_eric.models.Shop;
import com.example.be_eric.models.User;
import com.example.be_eric.repository.RoleRepository;
import com.example.be_eric.repository.ShopProductRepository;
import com.example.be_eric.repository.ShopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class ShopServiceImpl implements ShopService {

    @Autowired
    private ShopRepository shopRepo;

    @Autowired
    private RoleRepository roleRepo;

    @Autowired
    private ShopService shopService;

    @Autowired
    ShopProductRepository shopProductRepository;

    @Override
    public Shop save(Shop shop) {
        return shopRepo.save(shop);
    }

    @Override
    public void delete(Shop shop) {
        shopRepo.delete(shop);
    }

    @Override
    public Shop getById(int id) {
        return shopRepo.findById(Long.valueOf(id)).orElse(null);
    }

    @Override
    public Shop getById(Long id) {
        return shopRepo.findById(id).orElse(null);
    }

    @Override
    public Shop getByUser(Long userId) {
        return shopRepo.getShopByUser_Id(userId);
    }

    @Override
    public Shop addUser(Long shopId, Long userId) {
        return null;
    }

    @Override
    public List<Shop> getAllShop() {
        return shopRepo.findAll();
    }

    @Override
    public List<ShopProductDetailDTO> getShopByProductId(Long productId) {
        return shopRepo.findShopsByProductId(productId);
    }

    //////////
    @Override
    public boolean existsByProduct_IdAndShop_Id(Long productId, Long shopId) {
        return shopProductRepository.existsByProduct_IdAndShop_Id(productId, shopId);
    }

    @Override
    public ShopProduct findByProduct_IdAndShop_Id(Long productId, Long shopId) {
        return shopProductRepository.findByProduct_IdAndShop_Id(productId, shopId);
    }

    @Override
    public ShopProduct saveShopProduct(ShopProduct shopProduct) {
        return shopProductRepository.save(shopProduct);
    }

    @Override
    public void deleteShopProduct(ShopProduct shopProduct) {
        shopProductRepository.delete(shopProduct);
    }

    @Override
    public ShopProductDetailDTO findProductVendor(Long productId, Long shopId) {
        return shopProductRepository.findProductVendor(productId, shopId);
    }

    @Override
    public List<Shop> findShopByKeyword(String keyword, boolean isPending) {

        if (isPending){
            // Neu tim kiem danh sach dang duyet
            return shopRepo.findShopsBySStatus();
        }else {
            // tim kiem tat ca
            return shopRepo.findShopsBySNameIsContaining(keyword);
        }
    }

    @Transactional
    @Override
    public Shop acceptAShop(Long shopId) {
        Shop shop = getById(shopId);
        User user = shop.getUser();
        List<Role> roleList = user.getRoles();
        Role roleSaler = roleRepo.findByName( "ROLE_SALER");
        if (roleList.contains(roleSaler)){
        }
        else {
            user.getRoles().add(roleSaler);
        }

        shop.setsStatus(true);
        return shopService.save(shop);
    }


}
