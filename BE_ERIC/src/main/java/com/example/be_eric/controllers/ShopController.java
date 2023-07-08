package com.example.be_eric.controllers;


import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.be_eric.DTO.ShopDTO;
import com.example.be_eric.DTO.ShopProductDTO;
import com.example.be_eric.DTO.ShopProductDetailDTO;
import com.example.be_eric.models.Image;
import com.example.be_eric.models.Product.Product;
import com.example.be_eric.models.Product.ShopProduct;
import com.example.be_eric.models.Shop;
import com.example.be_eric.models.User;
import com.example.be_eric.service.FirebaseFileService;
import com.example.be_eric.service.ProductService;
import com.example.be_eric.service.ShopService;
import com.example.be_eric.service.UserService;
import com.example.be_eric.ultils.Exception.InValidException;
import com.example.be_eric.ultils.Exception.UploadImageException;
import com.example.be_eric.ultils.Messenger.ErrorResponse;
import com.example.be_eric.ultils.Messenger.UploadImageResponse;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class ShopController {

    private Storage storage ;
    @Autowired
    private ProductService productService;
    @Autowired
    private ShopService shopService;

    @Autowired
    private UserService userService;

    @Autowired
    private FirebaseFileService firebaseFileService;


    @GetMapping(value = "/sale/shop/getShop")
    public ResponseEntity<?> searchPostByImage(@RequestParam("shopId") int shopId)
    {
        try {

            Shop responeList = shopService.getById(shopId);
            return ResponseEntity.ok().body(responeList);
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.badRequest().body(e);
        }
    }


    // Them san pham lien ket
    @PostMapping(value = "/sale/shop/addProductVentor",
            consumes = { MediaType.APPLICATION_JSON_VALUE })
    public ResponseEntity<?> addProductVentor(@RequestBody ShopProductDTO shopProductDTO)
    {
        try{

            Long productId =  shopProductDTO.getProductId();
            Long shopId = shopProductDTO.getShopId();
            double price = shopProductDTO.getPrice() ;
            int quantity = shopProductDTO.getQuantity() ;
            String link = shopProductDTO.getLink();

            Product product = productService.getById(productId);
            Shop shop = shopService.getById(shopId);

            if( product == null || shop== null ){
                throw  new Exception("Sản phẩm hoặc cửa hàng này không còn tồn tại");
            }

            boolean checkExist = shopService.existsByProduct_IdAndShop_Id(productId, shopId);

             if( !checkExist)
            {
                ShopProduct shopProduct = new ShopProduct(shop, product, price, quantity, link );
                shopService.saveShopProduct(shopProduct);
                return ResponseEntity.ok().build();
            }
            else{
                throw  new Exception("Sản phẩm này đã tồn tại trong cửa hàng");
            }
        }
        catch (Exception e){
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        }
    }


    @PatchMapping(value = "/sale/shop/updateProductVentor",
            consumes = { MediaType.APPLICATION_JSON_VALUE })
    public ResponseEntity<?> updateProductVentor(@RequestBody ShopProductDTO shopProductDTO)
    {
        try{
            Long productId =  shopProductDTO.getProductId();
            Long shopId = shopProductDTO.getShopId();
            double price = shopProductDTO.getPrice() ;
            int quantity = shopProductDTO.getQuantity() ;
            String link = shopProductDTO.getLink();

            Product product = productService.getById(productId);
            Shop shop = shopService.getById(shopId);

            if( product == null || shop== null ){
                throw  new Exception("Sản phẩm hoặc cửa hàng này không còn tồn tại");
            }

            ShopProduct shopProduct = shopService.findByProduct_IdAndShop_Id(productId, shopId);

            if( shopProduct != null)
            {
                shopProduct.setPrice( price );
                shopProduct.setQuantity(quantity);
                shopProduct.setLink(link);

                ShopProduct updatedProduct =  shopService.saveShopProduct(shopProduct);
                return ResponseEntity.ok().body(updatedProduct);
            }
            else{
                throw  new Exception("Sản phẩm này không tồn tại trong cửa hàng");
            }
        }
        catch (Exception e){
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        }
    }

    @DeleteMapping(value = "/sale/shop/deleteProductVentor")
    public ResponseEntity<?> deleteProductVentor(@RequestParam  Long productId, @RequestParam Long shopId)
    {
        try{


            Product product = productService.getById(productId);
            Shop shop = shopService.getById(shopId);

            if( product == null || shop== null ){
                throw  new Exception("Sản phẩm hoặc cửa hàng này không còn tồn tại");
            }

            ShopProduct shopProduct = shopService.findByProduct_IdAndShop_Id(productId, shopId);

            if( shopProduct != null)
            {
                 shopService.deleteShopProduct(shopProduct);
                return ResponseEntity.ok().build();
            }
            else{
                throw  new Exception("Sản phẩm này không tồn tại trong cửa hàng");
            }
        }
        catch (Exception e){
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        }
    }

    @GetMapping(value = "/sale/shop/getVendorProduct/{shopId}/{productId}")
    public ResponseEntity searchVendorProduct(
            @PathVariable(required = true) Long shopId,
            @PathVariable(required = true) Long productId) {
        try {

            ShopProductDetailDTO shopProduct = shopService.findProductVendor(productId, shopId);

            return ResponseEntity.ok().body(shopProduct);

        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        }
    }

    @PostMapping("/sale/shop/updateProfile/{shopId}")
    public ResponseEntity<?> updateProfile(
    @PathVariable(required = true) Long shopId,
    @RequestBody ShopDTO shopDTO)
    {
        System.out.println(shopId);
        if(shopId  == null){
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse("Không tìm thấy Id cửa hàng"));

        }
        Shop shop = shopService.getById(shopId);

        if( shop == null){
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse("Cửa hàng không còn tồn tại hoặc không tìm thấy"));
        }
        shop.setsAddress1(shopDTO.getsAddress1());
        shop.setsNumber(shopDTO.getsNumber());
        shop.setsLink(shopDTO.getsLink());
        shop.setsName(shopDTO.getsName());

        System.out.println(shop.getsAddress1());
        System.out.println(shop.getsName());


        Shop s = shopService.save(shop);
        System.out.println("đã lưuu");

        return ResponseEntity.ok().body( s );

    }


    @PostMapping("/sale/shop/updateImage/{shopId}")
    public ResponseEntity<?> updateProfile(
            @PathVariable(required = true) Long shopId,
            @RequestPart("fileImage") MultipartFile fileImage,
            HttpServletRequest request)
    {
        System.out.println(shopId);
        if(shopId  == null){
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse("Không tìm thấy Id cửa hàng"));

        }
        Shop shop = shopService.getById(shopId);

        if( shop == null){
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse("Cửa hàng không còn tồn tại hoặc không tìm thấy"));
        }
        try {
            return ResponseEntity.ok().body(firebaseFileService.changeImageShop(fileImage, shop));

        } catch (UploadImageException e ) {
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        }

    }
}
