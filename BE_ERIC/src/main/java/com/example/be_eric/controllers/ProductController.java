package com.example.be_eric.controllers;

import com.example.be_eric.DTO.ProductDTO;
import com.example.be_eric.models.Product.Product;
import com.example.be_eric.models.User;
import com.example.be_eric.service.*;
import com.example.be_eric.ultils.Exception.DontExistException;
import com.example.be_eric.ultils.Exception.InValidException;
import com.example.be_eric.ultils.Exception.UploadImageException;
import com.example.be_eric.ultils.Messenger.ErrorResponse;
import com.example.be_eric.ultils.Messenger.UploadImageResponse;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Controller
public class ProductController {

    @Autowired
    private FirebaseFileService firebaseFileService;

    @Autowired
    private ProductService productService;

    @Autowired
    private UserService userService;

    @Autowired
    private ShopService shopService;

    // Luu bai post vao DB
    // Luu hinh anh len fire storage
    // Goi api flask de luu vector feature len fire store
//    @PostMapping(value = "/api/post/create", name = "POST",
//            consumes = {MediaType.APPLICATION_JSON_VALUE,
//                        MediaType.MULTIPART_FORM_DATA_VALUE })
//    public ResponseEntity create(@RequestPart("post") String post , @RequestPart("fileImage") MultipartFile fileImage)
//    {
//        Post newPost = new Post();
//        try {
//
//            System.out.println("tai 1");
//            ObjectMapper objectMapper = new ObjectMapper();
//            Map<String, Object> postMap = objectMapper.readValue(post, new TypeReference<Map<String, Object>>() {});
//
////            ObjectMapper objectMapper = new ObjectMapper();
////            newPost = objectMapper.readValue(post, Post.class);
//            newPost.setContent(  (String) postMap.get("content") );
//            newPost.setTitle(  (String) postMap.get("title") );
//            System.out.println("tai 2");
//
//            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//            User u = userService.getUserByEmail( authentication.getName());
//
//            newPost.setUser( u );
//
//            System.out.println(newPost.getUser().getEmail());
//            String fileName = firebaseFileService.uploadImage_saveVector(fileImage, newPost  );
//            return ResponseEntity.ok().build();
//
////            // Goi api flask save vector fetrure
////            RestTemplate restTemplate = new RestTemplate();
////            HttpHeaders headers = new HttpHeaders();
////            headers.setContentType(MediaType.MULTIPART_FORM_DATA);
////
////            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
////            ByteArrayResource resource = new ByteArrayResource(fileImage.getBytes()) {
////                @Override
////                public String getFilename() {
////                    return fileImage.getOriginalFilename();
////                }
////            };
////            body.add("fileImage", resource);
////            body.add("post_id", newPost.getId());
////
////            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
////            String url = "http://127.0.0.1:5000/ai/api/post/addNewImg";
////            ResponseEntity<String> response = restTemplate.postForEntity(url, requestEntity, String.class);
////            HttpStatus statusCode = response.getStatusCode();
////            int statusCodeValue = statusCode.value();
////
////            if( statusCodeValue == 200 ){   // thi luu anh do vao DB. va upload anh le
////                return ResponseEntity.ok().build();
//////                String fileName = firebaseFileService.uploadImage(fileImage, newPost  );
////            }
////            else  throw  new UploadImageExcepton( );
//
//            // upload file anh
//        }
//        catch (UploadImageException e){
//            return ResponseEntity.badRequest()
//                    .body(new UploadImageResponse("Upload anh khong thanh cong"));
//        }
//        catch (Exception e) {
//            // Neu ma co loi thi phai xoa het dong trantraction nay
//            System.out.println(e.getMessage());
//            return ResponseEntity.badRequest()
//                    .body(new ErrorResponse(e.getMessage()));
//        }
//    }

    // De xoa 1 post can
    // Tao 1 transtract tion
    // Xoa san pham
    // Xoa nhung id
    // Xoa nhung id hinh anh da train trong firebase
    // Xoa nhung id hinh anh
    @PostMapping(value = "/api/admin/product/create", name = "POST",
            consumes = {MediaType.APPLICATION_JSON_VALUE,
                    MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<?> createNewProduct(@RequestPart("product") String product , @RequestPart("fileImage") MultipartFile fileImage)
    {
        Product newProduct = new Product();
        try {

            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> productMap = objectMapper.readValue(product, new TypeReference<Map<String, Object>>() {});

            if (productMap.containsKey("name") && productMap.get("name") != null) {
                newProduct.setName((String) productMap.get("name"));
            } else {
                throw new InValidException("Không tìm thấy tên");
            }

            if (productMap.containsKey("description") && productMap.get("description") != null) {
                newProduct.setDescription((String) productMap.get("description"));
            } else {
                throw new InValidException("Không tìm thấy mô tả sản phẩm");
            }


            if (productMap.containsKey("price") && productMap.get("price") instanceof Number) {
                Number priceObj = (Number) productMap.get("price");
                double price = priceObj.doubleValue();
                newProduct.setPrice(price);
            } else {
                throw new InValidException("Invalid price");
            }


            if (productMap.containsKey("type") && productMap.get("type") != null) {
                newProduct.setType((String) productMap.get("type"));
            } else {
                throw new InValidException("Invalid type");
            }


            if (productMap.containsKey("brand") && productMap.get("brand") != null) {
                newProduct.setBrand((String) productMap.get("brand"));
            } else {
                throw new InValidException("Invalid brand");
            }


            System.out.println("goi uploadImage_saveVector" );
            String fileName = firebaseFileService.uploadImage_saveVector(fileImage, newProduct  );
            return ResponseEntity.ok().build();

        }
        catch (InValidException e){
            return ResponseEntity.badRequest()
                    .body(new UploadImageResponse(e.getMessage()));
        }
        catch (UploadImageException e){
            return ResponseEntity.badRequest()
                    .body(new UploadImageResponse("Upload anh khong thanh cong"));
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        }
    }



//    @PostMapping(value = "/api/post/delete")
//    public ResponseEntity delete(@RequestParam("IdDelete") Long IdDelete)
//    {
//        Product product =    productService.getById(IdDelete);
//
//        try {
//            if (product == null){
//                throw  new Exception( "Id sản phẩm không còn tồn tại");
//            }
//            firebaseFileService.deleteProduct_removeVector(product);
//            return ResponseEntity.ok().build();
//        }
//        catch (Exception e) {
//            return ResponseEntity.badRequest()
//                    .body(new ErrorResponse(e.getMessage()));
//        }
//    }

    // De xoa 1 post can
    // Tao 1 transtract tion
    // Xoa san pham
    // Xoa nhung id
    // Xoa nhung id hinh anh da train trong firebase
    // Xoa nhung id hinh anh
//    @DeleteMapping (value = "/api/sale/product/delete")
//    public ResponseEntity deleteProduct(@RequestParam("IdDelete") Long IdDelete)
//    {
//        Product product =  productService.getById(IdDelete);
//
//        try {
//            if (product == null){
//                throw  new Exception( "Product id no longer exists");
//            }
//            firebaseFileService.deleteProduct_removeVector(product);
//            return ResponseEntity.ok().build();
//        }
//        catch (Exception e) {
//            return ResponseEntity.badRequest()
//                    .body(new ErrorResponse(e.getMessage()));
//        }
//    }


    @GetMapping(value = "/api/admin/product/getById", name = "GET")
    public ResponseEntity getProductByIdOfaShop(@RequestParam("productId") Long productId, @RequestParam("shopId") Long shopId )
    {

        try {
            System.out.println("productId" + productId );
            System.out.println("shopId" + shopId );

            Product product =  productService.getProductByIdOfaShop(shopId, productId );
            if (product == null){
                throw  new Exception( "Sản phẩm này không tồn tại");
            }
            System.out.println(product.getId());
            return ResponseEntity.ok().body(product);
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        }
    }

//    @GetMapping(value = "/api/user/product/getById", name = "GET")
//    public ResponseEntity getProductById(@RequestParam("productId") Long productId )
//    {
//        try {
//            Product product =  productService.getById( productId );
//            if (product == null){
//                throw  new Exception( "Sản phẩm này không còn tồn tại");
//            }
//            System.out.println(product.getId());
//            return ResponseEntity.ok().body(product);
//        }
//        catch (Exception e) {
//            System.out.println(e.getMessage());
//            return ResponseEntity.badRequest()
//                    .body(new ErrorResponse(e.getMessage()));
//        }
//    }


    @PostMapping(value = "/api/admin/product/update", name = "POST",
            consumes = {MediaType.APPLICATION_JSON_VALUE,
                    MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<?> updateProduct(@RequestBody ProductDTO updateProduct)
    {
        try {
            Product product = productService.getById( updateProduct.getId() );
            if( product == null)
                throw new DontExistException("Sản phẩm không còn tồn tại");

            product.setName(updateProduct.getName());
            product.setDescription(updateProduct.getDescription());
//            product.setQuantity(updateProduct.getQuantity());
            product.setBrand(updateProduct.getBrand());
            product.setType(updateProduct.getType());

            product.setPrice(updateProduct.getPrice());

            productService.save(product);

            return ResponseEntity.ok().body(product);

        }
        catch (DontExistException e){
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        }
    }


    @PatchMapping(value = "/api/admin/product/feature")
    public ResponseEntity<?> setFeature(@RequestParam(name = "productId", required = true) Long  productId,
                                        @RequestParam(name = "shopId", required = true ) Long shopId,
                                        @RequestParam(name = "isFeature", required = true ) boolean isFeature )
    {
        try {
           productService.setProductFeatured(productId, shopId, isFeature);
            return ResponseEntity.ok().build();

        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        }
    }
}
