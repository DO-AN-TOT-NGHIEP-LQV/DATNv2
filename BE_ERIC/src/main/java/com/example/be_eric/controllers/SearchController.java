package com.example.be_eric.controllers;

import com.example.be_eric.DTO.ShopProductDetailDTO;
import com.example.be_eric.models.Product.Product;
import com.example.be_eric.service.ProductService;
import com.example.be_eric.service.ShopService;
import com.example.be_eric.service.UserService;
import com.example.be_eric.ultils.Messenger.ErrorResponse;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class SearchController {

    @Autowired
    private ProductService productService;
    @Autowired
    private ShopService shopService;

    @Autowired
    private UserService userService;

    // Nhan file anh tu UI
    // Dua file anh len python de trich xuat dac trung va tra ve id cua anh
    // tu danh sach ten anh lay ra id or name coi va tra ve id
    @PostMapping(value = "/search/searchByImage",
              consumes = {MediaType.APPLICATION_JSON_VALUE,
                         MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<?> searchPostByImage(@RequestPart("fileSearchImg") MultipartFile fileSearchImg)
    {


        try {
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            ByteArrayResource resource = new ByteArrayResource(fileSearchImg.getBytes()) {
                @Override
                public String getFilename() {
                    return fileSearchImg.getOriginalFilename();
                }
            };
            body.add("fileSearchImg", resource);
            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
            String url = "http://103.197.185.34/ai/api/product/searchByImg";
//            String url = "http://127.0.0.1:5000/ai/api/product/searchByImg";


            ResponseEntity<String> response = restTemplate.postForEntity(url, requestEntity, String.class);

            ObjectMapper objectMapper = new ObjectMapper();
            List<String> stringList  = objectMapper.readValue(response.getBody(), new TypeReference<List<String>>(){});

            List<Object> responeList = new ArrayList<>();
            for ( String stringIdDocumentImage : stringList){
                String[] parts = stringIdDocumentImage.split("_");
                String typeString = parts[0]; // Lấy phần tử đầu tiên
                if(typeString.equals("product")){
                    try{
                        Product tmp =  productService.getById(Long.valueOf(stringIdDocumentImage.replaceAll("[^\\d]", "")));
                        if(tmp != null )  responeList.add(tmp);
                    }
                    catch (Exception e){
                    }
                }
            }
            return ResponseEntity.ok().body(responeList);

        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        }
    }


    @GetMapping(value = "/search/products/searchAndFilterProducts")   // Co phan trang
    public ResponseEntity searchAndFilterProducts(
            @RequestParam(required = false,  defaultValue = "") String keyword,
            @RequestParam(required = false) String[] types,
            @RequestParam(required = false) String[] brands,
            @RequestParam(required = false, defaultValue = "0") Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) int page) {

        try{   // Co phan trang
            Pageable pageable = PageRequest.of(page, 50);
            Page<Product> productsListPage = productService.searchAndFilterProducts(keyword, types, brands, minPrice, maxPrice , pageable);
            List<Product> productsList = productsListPage.getContent();
            return ResponseEntity.ok().body(productsList);
        }
        catch (Exception e){
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        }

    }

    @GetMapping(value = "/search/products/SearchByText")
    public ResponseEntity searchProductByText(@RequestParam(name = "searchText",required = false, defaultValue = "") String searchText, @RequestParam("page") int page) {
        System.out.println("45refsdfsdf");
//        Sort sort = Sort.by(Sort.Direction.DESC, "created_at"); // Sắp xếp theo ngày tạo (giảm dần)
        Pageable pageable = PageRequest.of(page, 50, Sort.by("createdAt").descending());
        Page<Product> productsListPage = productService.searchByText(searchText, pageable);
        List<Product> productsList = productsListPage.getContent();
        return ResponseEntity.ok().body(productsList);
    }


//    @GetMapping(value = "/search/products/shopId")
//    public ResponseEntity searchProductByShop(@RequestParam("shopId") Long shopId, @RequestParam( name = "keyword", required = false, defaultValue = "") String keyword) {
//        try{
//            List<Product> productsList = productService.findProductsByShopIdAndKeyword(shopId, keyword);
//            return ResponseEntity.ok().body(productsList);
//        }
//         catch (Exception e){
//             System.out.println(e.getMessage());
//            return ResponseEntity.badRequest()
//                    .body(new ErrorResponse(e.getMessage()));
//        }
//    }


    @GetMapping(value = "/search/products/shopId")
    public ResponseEntity searchProductByShop(@RequestParam("shopId") Long shopId, @RequestParam( name = "keyword", required = false, defaultValue = "") String keyword) {
        try{
            List<ShopProductDetailDTO> productsList = productService.findProductOfShopIdAndKeyword(shopId, keyword);
            return ResponseEntity.ok().body(productsList);
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        }
    }

    // Get product get all shop have a product
    @GetMapping(value = "/search/products/getShops", name = "GET")
    public ResponseEntity getShopsOfProducts(@RequestParam("productId") Long productId )
    {
        try {
            System.out.println("45refsdfsdf");
            Product product =  productService.getById( productId );
            if (product == null){
                throw  new Exception( "Sản phẩm này không còn tồn tại");
            }
            List<ShopProductDetailDTO> dtoList  = shopService.getShopByProductId(productId);
            return ResponseEntity.ok().body(dtoList);
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        }
    }

    //    Get all product for admin manager
    @GetMapping(value = "/search/products/getAll")
    public ResponseEntity searchAllProduct( @RequestParam( name = "keyword", required = false, defaultValue = "") String keyword) {

        try{
            List<Product> productsList = productService.findAllProductByKeyword( keyword);
            return ResponseEntity.ok().body(productsList);
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        }
    }

    // get detail product for screen detail anh update
    @GetMapping(value = "/search/products/getDetail")
    public ResponseEntity searchGetProductDetail(@RequestParam("productId") Long productId) {
        try {

            Product product =  productService.getById( productId );
            if (product == null){
                throw  new Exception( "Sản phẩm này không còn tồn tại");
            }
            return ResponseEntity.ok().body(product);

        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        }
    }


    @GetMapping(value = "/search/products/checkVendorProduct/{shopId}/{productId}")
    public ResponseEntity searchVentorProduct(
            @PathVariable(required = true) Long shopId,
            @PathVariable(required = true) Long productId) {
        try {

            Product product =  productService.getById( productId );
            if (product == null){
                throw  new Exception( "Sản phẩm này không còn tồn tại");
            }

            boolean checkExist = shopService.existsByProduct_IdAndShop_Id(productId, shopId);

            Map<String, Object> responseData = new HashMap<>();
            responseData.put("product", product);
            responseData.put("isExist", checkExist);

            return ResponseEntity.ok().body(responseData);

        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        }
    }
}