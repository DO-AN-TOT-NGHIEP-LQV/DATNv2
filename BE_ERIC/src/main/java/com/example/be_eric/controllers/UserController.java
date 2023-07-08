package com.example.be_eric.controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.be_eric.DTO.ShopDTO;
import com.example.be_eric.DTO.UserUpdateFormDTO;
import com.example.be_eric.models.Role;
import com.example.be_eric.models.Shop;
import com.example.be_eric.models.User;
import com.example.be_eric.service.FirebaseFileService;
import com.example.be_eric.service.ShopService;
import com.example.be_eric.service.UserService;
import com.example.be_eric.ultils.Exception.DuplicateValueException;
import com.example.be_eric.ultils.Exception.InValidException;
import com.example.be_eric.ultils.Exception.UploadImageException;
import com.example.be_eric.ultils.Messenger.ErrorResponse;

import com.example.be_eric.ultils.Messenger.UploadImageResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    @Autowired
    private  UserService userService;

    @Autowired
    private ShopService shopService;

    @Autowired
    private FirebaseFileService firebaseFileService;

    final
    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @GetMapping("/user/getDetail")
    public ResponseEntity<?> getPosts (HttpServletRequest request, HttpServletResponse response) {

        String authorizationHeader = request.getHeader(AUTHORIZATION);
        if( authorizationHeader != null && authorizationHeader.startsWith("Bearer ") ){
            try {
                String refresh_token = authorizationHeader.substring("Bearer ".length());
                Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(refresh_token);
                String username = decodedJWT.getSubject();   // dung email de dat lam user name
                User user = userService.getUserByEmail(username);

                return ResponseEntity.ok().body(user);

            }catch (Exception exception){
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new ErrorResponse(exception.getMessage()));
            }
        }else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Lỗi xác thực"));
        }
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers(){
        return ResponseEntity.ok().body(userService.getUsers());
    }

    @PostMapping("/user/register")
    public ResponseEntity<?> saveUser(@RequestBody UserForm user) {
        try {

            User newUser = new User(user.getUsername(), user.getEmail(), user.getPassword());


            userService.saveUser(newUser);
            return ResponseEntity.ok().build();
        } catch (DuplicateValueException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        }
    }

    @PostMapping("/user/changePassword")
    public ResponseEntity<?> changePassword(@RequestBody UserForm userForm, HttpServletRequest request) {
        try {

            String authorizationHeader = request.getHeader(AUTHORIZATION);

            String refresh_token = authorizationHeader.substring("Bearer ".length());
            Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
            JWTVerifier verifier = JWT.require(algorithm).build();
            DecodedJWT decodedJWT = verifier.verify(refresh_token);
            String username = decodedJWT.getSubject();
            User user = userService.getUserByEmail(username);
            if( user == null)
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse("Người dùng không tồn tại"));


            boolean isMatch = passwordEncoder.matches( userForm.getCurrentPassword(), user.getPassword());
                System.out.println(isMatch);

            if(isMatch == false)
//                System.out.println("khong trung");
                return ResponseEntity.badRequest().body(new ErrorResponse("Sai mật khẩu"));

            user.setPassword(userForm.getNewPassword());

            if(userService.changePassword(user))
            return ResponseEntity.ok().build();
            else
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse("Có lỗi sảy ra trong tiến trình"));

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        }
    }


    @PostMapping("/user/updateProfile")
    public ResponseEntity<?> updateProfile(@RequestBody UserUpdateFormDTO userForm, HttpServletRequest request) {
        try {

            String authorizationHeader = request.getHeader(AUTHORIZATION);

            String refresh_token = authorizationHeader.substring("Bearer ".length());
            Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
            JWTVerifier verifier = JWT.require(algorithm).build();
            DecodedJWT decodedJWT = verifier.verify(refresh_token);
            String username = decodedJWT.getSubject();
            User user = userService.getUserByEmail(username);
            if( user == null)
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse("Người dùng không tồn tại"));

            if( userForm.getUsername() == null || userForm.getUsername().equals(""))
                return ResponseEntity.badRequest().body(new ErrorResponse("Tên người dùng không được trống"));

            user.setUsername( userForm.getUsername());
            user.setNumber( userForm.getNumber());
            user.setGender(userForm.isGender());

            return ResponseEntity.ok().body( userService.updateUser(user) );
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        }
    }

    @PostMapping("/user/updateImage/{userId}")
    public ResponseEntity<?> updateProfile(
            @PathVariable(required = true) Long userId,
            @RequestPart("fileImage") MultipartFile fileImage,
            HttpServletRequest request)
    {
        System.out.println(userId);
        if(userId  == null){
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse("Không tìm thấy Id người dùng"));

        }
        User user = userService.getUserById(userId);

        if( user == null){
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse("Không tìm thấy thông tin người dùng"));
        }
        try {
            return ResponseEntity.ok().body(firebaseFileService.changeImageUser(fileImage, user));

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


    @GetMapping("/token/refresh")
    public ResponseEntity<?> refreshToken(HttpServletRequest request) {
        try {
            String authorizationHeader = request.getHeader(AUTHORIZATION);
            if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
                return ResponseEntity.badRequest().body(new ErrorResponse("Token đã hết hạn"));
            }

            String refresh_token = authorizationHeader.substring("Bearer ".length());
            Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
            JWTVerifier verifier = JWT.require(algorithm).build();
            DecodedJWT decodedJWT = verifier.verify(refresh_token);
            String username = decodedJWT.getSubject();
            User user = userService.getUserByEmail(username);

            String access_token = JWT.create()
                    .withSubject(user.getEmail())
                    .withExpiresAt(new Date(System.currentTimeMillis() + 2 * 60 * 60 * 1000))
                    .withIssuer(request.getRequestURL().toString())
                    .withClaim("roles", user.getRoles().stream().map(Role::getName).collect(Collectors.toList()))
                    .sign(algorithm);

            Map<String, String> tokens = new HashMap<>();
            tokens.put("access_token", access_token);
            tokens.put("refresh_token", refresh_token);

            return ResponseEntity.ok(tokens);
        } catch (Exception exception) {
            System.out.println( exception.getMessage());

            Map<String, String> error = new HashMap<>();
            error.put("error_message", "Refresh token đã hết hạn, hãy đăng nhập lại");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
        }
    }

    @PostMapping(value = "/user/registerShop", name = "POST")
    public ResponseEntity<?> registerShop(@RequestBody ShopDTO shopDTO,
                                          HttpServletRequest request)
    {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        String refresh_token = authorizationHeader.substring("Bearer ".length());
        Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(refresh_token);
        String username = decodedJWT.getSubject();
        User user = userService.getUserByEmail(username);

        Shop newShop = new Shop();
        try{
            if( user.getShop() != null)
                throw new InValidException("Tài khoảng này được đăng ký mở cửa hàng");
            if( user ==  null){
                System.out.println("11111111");
                throw new InValidException("Không tìm thấy tài khoảng người dùng");
            }
            if( shopDTO.getsLink() == "" ||   shopDTO.getsLink() == null )
                throw new InValidException("Liên kết cửa hàng rỗng");
            if (shopDTO.getsName() == "" || shopDTO.getsName() == null )
                throw new InValidException("Số điện thoại rỗng cửa hàng rỗng");
            if (shopDTO.getsNumber() == "" || shopDTO.getsNumber() == null)
                throw new InValidException("Tên cửa hàng rỗng");
            if (shopDTO.getsAddress1()== "" || shopDTO.getsAddress1() == null)
                throw new InValidException("Địa chỉ cửa hàng rỗng");

            newShop.setsName(shopDTO.getsName());
            newShop.setsLink(shopDTO.getsLink());
            newShop.setsNumber(shopDTO.getsNumber());
            newShop.setUser(user);
            newShop.setsAddress1(shopDTO.getsAddress1());
            newShop.setsStatus(false);


            return ResponseEntity.ok().body( shopService.save(newShop));
        }
        catch (InValidException e){
            return ResponseEntity.badRequest()
                    .body(new UploadImageResponse(e.getMessage()));
        }
        catch (Exception e){
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        }

    }


    // Kiem tra da dang ky cua hang hay chua va tinh trang dang ky cua hang
    // cua tai khoang do
    @GetMapping(value = "/user/getStatusRegisterShop", name = "GET")
    public ResponseEntity<?> getStatusRegisterShop(@RequestParam("userId") Long userId)
    {
        try {
        Shop responeList = shopService.getByUser(userId);
        if (responeList == null) {
            return ResponseEntity.ok().body(null);
        }

        return ResponseEntity.ok().body(responeList);

    } catch (Exception e) {
        System.out.println(e);
        return ResponseEntity.badRequest().body(e);
    }
    }

    @DeleteMapping(value = "/user/cancelRegisterShop", name = "GET")
    public ResponseEntity<?> cancelRegisterShop(@RequestParam("shopId") Long shopId)
    {
        try {
           Shop shop = shopService.getById(shopId);
           if( shop != null && !shop.getsStatus() && shop.getImage() == null ){
                shopService.delete(shop);
           }
           else{
               throw new Exception("Không đủ điều kiện hủy yêu cầu");
           }

            return ResponseEntity.ok().build();

        }
        catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }





//    @PostMapping(value = "/user/registerShop", name = "POST",
//            consumes = {MediaType.APPLICATION_JSON_VALUE,
//                    MediaType.MULTIPART_FORM_DATA_VALUE })
//    public ResponseEntity<?> registerShop(@RequestPart("shop") String shop ,
//                                              @RequestPart("fileImage") MultipartFile fileImage,
//                                              HttpServletRequest request)
//        {
//
//            if (fileImage.getContentType() != null && (fileImage.getContentType().equals("image/jpeg")
//                    || fileImage.getContentType().equals("image/png"))) {
//
//                // Kiểm tra xem file có tồn tại hay không
//                if (!fileImage.isEmpty()) {
//                    // File ảnh tồn tại và không rỗng
//                    // Tiếp tục xử lý logic của bạn ở đây
//                } else {
//
//                    return ResponseEntity.badRequest()
//                            .body(new ErrorResponse("Không tìm thấy file ảnh"));
//                    // File ảnh không tồn tại
//                    // Xử lý lỗi hoặc trả về thông báo lỗi tương ứng
//                }
//            } else {
//                return ResponseEntity.badRequest()
//                        .body(new ErrorResponse("Không phải định dạng ảnh"));
//                // Request part không phải là file ảnh
//                // Xử lý lỗi hoặc trả về thông báo lỗi tương ứng
//            }
//
//
//            String authorizationHeader = request.getHeader(AUTHORIZATION);
//            String refresh_token = authorizationHeader.substring("Bearer ".length());
//            Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
//            JWTVerifier verifier = JWT.require(algorithm).build();
//            DecodedJWT decodedJWT = verifier.verify(refresh_token);
//            String username = decodedJWT.getSubject();
//            User user = userService.getUserByEmail(username);
//
//
//            Shop newShop = new Shop();
//        try{
//            ObjectMapper objectMapper = new ObjectMapper();
//            Map<String, Object> shopMap = objectMapper.readValue(shop, new TypeReference<Map<String, Object>>() {});
//
//            if (shopMap.containsKey("sName") && shopMap.get("sName") != null) {
//                newShop.setsName((String) shopMap.get("sName"));
//            } else {
//                throw new InValidException("Không tìm thấy tên cửa hàng");
//            }
//
//            if (shopMap.containsKey("sLink") && shopMap.get("sLink") != null) {
//                newShop.setsLink((String) shopMap.get("sLink"));
//            } else {
//                throw new InValidException("Không tìm thấy link cửa hàng");
//            }
//
//
//            if (shopMap.containsKey("sAddress1") && shopMap.get("sAddress1") != null) {
//                newShop.setsAddress1((String) shopMap.get("sAddress1"));
//            } else {
//                throw new InValidException("Không tìm thấy địa chỉ cửa hàng");
//            }
//
//            if (shopMap.containsKey("sNumber") && shopMap.get("sNumber") != null) {
//                newShop.setsNumber((String) shopMap.get("sNumber"));
//            } else {
//                throw new InValidException("Không tìm thấy trường số điện thoại");
//            }
//
//            newShop.setsStatus(false);
//            newShop.setUser(user);
//
//        }
//        catch (InValidException e){
//            return ResponseEntity.badRequest()
//                    .body(new UploadImageResponse(e.getMessage()));
//        }
//        catch (Exception e){
//            return ResponseEntity.badRequest()
//                    .body(new ErrorResponse(e.getMessage()));
//        }
//
//        return ResponseEntity.ok().build();
//    }
}

@Data
class RoleToUserForm {
    private String username;
    private String roleName;
}

@Data
class UserForm {
    private String username;
    private String email;
    private String password;
    private String currentPassword;
    private String newPassword;

}

