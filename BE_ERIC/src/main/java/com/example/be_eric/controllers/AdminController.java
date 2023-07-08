package com.example.be_eric.controllers;


import com.example.be_eric.models.Product.Product;
import com.example.be_eric.models.Shop;
import com.example.be_eric.models.User;
import com.example.be_eric.repository.RoleRepository;
import com.example.be_eric.service.ShopService;
import com.example.be_eric.service.UserService;
import com.example.be_eric.ultils.Messenger.ErrorResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private ShopService shopService;

    @Autowired
    private UserService userService;


    @Autowired
    private RoleRepository roleRepo;

    @GetMapping(value = "/search/getShops")
    public ResponseEntity getShops(@RequestParam( name = "keyword", required = false, defaultValue = "") String keyword,
                                           @RequestParam(name = "isPending",required = false,  defaultValue = "false") boolean isPending) {

        try{
            List<Shop>  listShop = shopService.findShopByKeyword(keyword, isPending);
            return ResponseEntity.ok().body(listShop);
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        }
    }

    @GetMapping(value = "/get/user/id")
    public ResponseEntity<?> searchAllProduct(@RequestParam( name = "userId", required = true, defaultValue = "") Long userId) {
        try{
//            Shop shop = shopService.getById(shopId);
//            User user = shop.getUser();
            User user = userService.getUserById(userId);
            return ResponseEntity.ok().body(user);
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        }
    }

    @PostMapping(value = "/accept/shop")
    public ResponseEntity<?> acceptShop(@RequestParam( name = "shopId", required = true) Long shopId)
    {

//        System.out.println("Sssssssssssssssssssss");
        try{
            return ResponseEntity.ok().body(  shopService.acceptAShop(shopId));
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        }
    }


}
