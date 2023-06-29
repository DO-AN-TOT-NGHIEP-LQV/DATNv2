package com.example.be_eric;


import com.example.be_eric.models.*;
import com.example.be_eric.models.Comment.ProductMainDiscussion;
import com.example.be_eric.models.Comment.ProductSubDiscussion;
import com.example.be_eric.models.Product.Product;
import com.example.be_eric.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserService userService;

//    @Autowired
//    private  PostService postService;

    @Autowired
    private  ImageService imageService;

    @Autowired
    private ShopService shopService;

    @Autowired
    private ProductService productService;

    @Autowired
    private DiscussionService discussionService;

    @Autowired
    private Environment environment;


    @Override
    public void run(String... args) throws Exception {

        String ddlAuto = environment.getProperty("spring.jpa.hibernate.ddl-auto");

//        if ("create".equals(ddlAuto)) {
        if ("create".equals(ddlAuto)) {

        userService.saveRole(new Role(1L, "ROLE_USER"));
        userService.saveRole(new Role(2L, "ROLE_SALER"));
        userService.saveRole(new Role(3L, "ROLE_ADMIN"));

        userService.saveUser(new User(1L, "Le QViet",  "1@gmail.com", "1", "https://www.shutterstock.com/image-vector/man-character-face-avatar-glasses-260nw-562077406.jpg", new ArrayList<>()));
        userService.saveUser(new User(2L, "Viet 2",  "2@gmail.com", "2", new ArrayList<>()));
        userService.saveUser(new User(3L, "$@$Dang Yeu",  "3@gmail.com", "3", new ArrayList<>()));
        userService.saveUser(new User(4L, "Jame",  "4@gmail.com", "4","https://img.freepik.com/premium-vector/businessman-avatar-cartoon-character-profile_18591-50581.jpg?w=740", new ArrayList<>()));
        userService.saveUser(new User(5L, "Samiel",  "5@gmail.com", "5", new ArrayList<>()));

        userService.addRoleToUser("Le QViet", "ROLE_ADMIN" );
//        userService.addRoleToUser("Le QViet", "ROLE_SUPER_ADMIN" );
        userService.addRoleToUser("Viet 2", "ROLE_SALER" );
        userService.addRoleToUser("Jame", "ROLE_SALER" );
        userService.addRoleToUser("Samiel", "ROLE_SALER" );


//        postService.savePost(new Post(1L, "Sadds", "adasd", userService.getUserByEmail("1@gmail.com")));
//        postService.savePost(new Post(2L, "sdasd", "3223423", userService.getUserByEmail("3@gmail.com")));
//        postService.savePost(new Post(3L, "ewr", "dsd", userService.getUserByEmail("1@gmail.com")));
//        postService.savePost(new Post(4L, "ẻ", "ưer", userService.getUserByEmail("3@gmail.com")));
//        postService.savePost(new Post(5L, "sdasd", "df", userService.getUserByEmail("3@gmail.com")));
//        postService.savePost(new Post(6L, "sdasd", "asdasd", userService.getUserByEmail("1@gmail.com")));
//        postService.savePost(new Post(7L, "sdasd", "asdasd", userService.getUserByEmail("3@gmail.com")));
//        postService.savePost(new Post(8L, "ưe435", "sde", userService.getUserByEmail("2@gmail.com")));
//        postService.savePost(new Post(9L, "sdasd", "dsf", userService.getUserByEmail("3@gmail.com")));
//        postService.savePost(new Post(10L, "345fd", "asdasd", userService.getUserByEmail("3@gmail.com")));
//        postService.savePost(new Post(11L, "sdasd", "asdasd", userService.getUserByEmail("2@gmail.com")));
//        postService.savePost(new Post(12L, "sdasd", "asdasd", userService.getUserByEmail("3@gmail.com")));
//        postService.savePost(new Post(13L, "sdasd", "dưe", userService.getUserByEmail("3@gmail.com")));
//        postService.savePost(new Post(14L, "sdasd", "asdasd", userService.getUserByEmail("3@gmail.com")));
//        postService.savePost(new Post(15L, "sdasd", "asdasd", userService.getUserByEmail("3@gmail.com")));
//        postService.savePost(new Post(16L, "sdasd", "asdasd", userService.getUserByEmail("3@gmail.com")));
//        postService.savePost(new Post(17L, "sdasd", "asdasd", userService.getUserByEmail("1@gmail.com")));
//        postService.savePost(new Post(18L, "sdasd", "asdasd", userService.getUserByEmail("3@gmail.com")));
//        postService.savePost(new Post(19L, "sdasd", "asdasd", userService.getUserByEmail("3@gmail.com")));
//        postService.savePost(new Post(20L, "sdasd", "asdasd", userService.getUserByEmail("1@gmail.com")));
//        postService.savePost(new Post(21L, "fdsf", "adasd", userService.getUserByEmail("1@gmail.com")));
//        postService.savePost(new Post(22L, "sdasd", "sd", userService.getUserByEmail("3@gmail.com")));
//        postService.savePost(new Post(23L, "ewr", "dsd", userService.getUserByEmail("1@gmail.com")));
//        postService.savePost(new Post(24L, "ẻ", "ưer", userService.getUserByEmail("3@gmail.com")));
//        postService.savePost(new Post(25L, "sdasd", "df", userService.getUserByEmail("3@gmail.com")));
//        postService.savePost(new Post(26L, "sdf", "dsf", userService.getUserByEmail("1@gmail.com")));
//        postService.savePost(new Post(27L, "dsf", "asdasd", userService.getUserByEmail("3@gmail.com")));
//        postService.savePost(new Post(28L, "ưe435", "sde", userService.getUserByEmail("2@gmail.com")));
//        postService.savePost(new Post(29L, "sdf", "dsf", userService.getUserByEmail("3@gmail.com")));
//        postService.savePost(new Post(30L, "345fd", "sdf", userService.getUserByEmail("3@gmail.com")));
//        postService.savePost(new Post(31L, "sdasd", "sdf", userService.getUserByEmail("2@gmail.com")));
//        postService.savePost(new Post(32L, "sdasd", "745234", userService.getUserByEmail("3@gmail.com")));
//        postService.savePost(new Post(33L, "sdtasd", "dưe", userService.getUserByEmail("3@gmail.com")));
//        postService.savePost(new Post(34L, "gt", "g", userService.getUserByEmail("3@gmail.com")));
//        postService.savePost(new Post(35L, "sdasd", "ahgsdasd", userService.getUserByEmail("3@gmail.com")));
//        postService.savePost(new Post(36L, "24", "56", userService.getUserByEmail("3@gmail.com")));
//        postService.savePost(new Post(37L, "sdasd", "as456dasd", userService.getUserByEmail("1@gmail.com")));
//        postService.savePost(new Post(38L, "3234", "asdasd", userService.getUserByEmail("3@gmail.com")));
//        postService.savePost(new Post(39L, "sdasd", "asdasd", userService.getUserByEmail("3@gmail.com")));
//        postService.savePost(new Post(40L, "sd23asd", "asdasd", userService.getUserByEmail("1@gmail.com")));



            productService.save(new Product(1L,"SP-02 Oxford Nam da đen", "Oxford Nam da bò đen đế gỗ",   66000 ));
            productService.save(new Product(2L,"UX_02 ", "Boots nam vintage",   100000 ));
            productService.save(new Product(3L,"Vanz unisex vàng", "Vanz unisex vàng",      72005  ));
            productService.save(new Product(4L,"US-2 Sandal nữ", "Giày sandal nữ da màu đất", 100300           ));
            productService.save(new Product(5L,"Guốc đỏ mũi trơn", "Guốc nữ mũi trơn ", 130000          ));
            productService.save(new Product(7L,"pro7", "",  0              ));
            productService.save(new Product(8L,"pro8", "gdegrh asdasd asdasd",  140000         ));
            productService.save(new Product(9L,"pro9", "gdegrh asdasd asdasd",  754333        ));
            productService.save(new Product(10L,"pro10", "gdegrh asdasd asdasd",   140000       ));
            productService.save(new Product(11L,"pro11", "gdegrh asdasd asdasd",   12333        ));
            productService.save(new Product(12L,"pro12", "gdegrh asdasd asdasd", 65222          ));
            productService.save(new Product(13L,"pro13", "gdegrh asdasd asdasd",  15000         ));
            productService.save(new Product(12L,"pro2", "gdegrh asdasd asdasd",   100000         ));
            productService.save(new Product(13L,"pro4", "gdegrh asdasd asdasd",   0               ));
            productService.save(new Product(14L,"pro5", "gdegrh asdasd asdasd",  10030           ));
            productService.save(new Product(15L,"pro6", "gdegrh asdasd asdasd",  130000          ));
            productService.save(new Product(16L,"pro7", "gdegrh asdasd asdasd",   0              ));
            productService.save(new Product(17L,"pro8", "gdegrh asdasd asdasd",   140000         ));
            productService.save(new Product(18L,"pro9", "gdegrh asdasd asdasd",   754333        ));
            productService.save(new Product(19L,"pro10", "gdegrh asdasd asdasd",   140000         ));
            productService.save(new Product(20L,"pro11", "gdegrh asdasd asdasd",   12333        ));
            productService.save(new Product(21L,"pro1",
                  "  h asdasd asdasd,gde",  6));
        productService.save(new Product(22L,"pro2", "gdegrh asdasd asdasd"   ,  66000));
        productService.save(new Product(23L,"pro3", "gdegrh asdasd asdasd"   , 100000));
        productService.save(new Product(24L,"pro4", "gdegrh asdasd asdasd"  ,       72005 ));
        productService.save(new Product(25L,"pro5", "gdegrh asdasd asdasd"  ,  60000));
        productService.save(new Product(26L,"pro6", "gdegrh asdasd asdasd"  ,  60005));
        productService.save(new Product(27L,"pro7", "gdegrh asdasd asdasd"  ,           6));
        productService.save(new Product(28L,"pro8", "gdegrh asdasd asdasd"  ,  69999));
        productService.save(new Product(29L,"pro9", "gdegrh asdasd asdasd"  ,  6.5));
        productService.save(new Product(30L,"pro10", "gdegrh asdasd asdasd"  , 100000));
        productService.save(new Product(31L,"pro11", "gdegrh asdasd asdasd"  ,  6500));
        productService.save(new Product(32L,"pro12", "gdegrh asdasd asdasd"   ,  65222));
        productService.save(new Product(33L,"pro13", "gdegrh asdasd asdasd"   , 14000));
        productService.save(new Product(34L,"pro2", "gdegrh asdasd asdasd"  ,   66000));
        productService.save(new Product(35L,"pro3", "gdegrh asdasd asdasd"  ,  100000));
        productService.save(new Product(36L,"pro4", "gdegrh asdasd asdasd"  ,        72005 ));
        productService.save(new Product(37L,"pro5", "gdegrh asdasd asdasd"  ,   60000));
        productService.save(new Product(38L,"pro6", "gdegrh asdasd asdasd"  ,  60005));
        productService.save(new Product(39L,"pro7", "gdegrh asdasd asdasd"  ,           6));
        productService.save(new Product(40L,"pro8", "gdegrh asdasd asdasd"  ,  69999));
        productService.save(new Product(41L,"pro9", "gdegrh asdasd asdasd"  ,  6.5));
        productService.save(new Product(42L,"pro10", "gdegrh asdasd asdasd"  ,  100000));
        productService.save(new Product(43L,"pro11", "gdegrh asdasd asdasd"  ,  6500));
        productService.save(new Product(44L,"pro12", "gdegrh asdasd asdasd"   , 65222));
        productService.save(new Product(45L,"pro13", "gdegrh asdasd asdasd"  , 14000));
        productService.save(new Product(46L,"pro2", "gdegrh asdasd asdasd"  ,   66000));
        productService.save(new Product(47L,"pro3", "gdegrh asdasd asdasd"  ,  100000));
        productService.save(new Product(48L,"pro4", "gdegrh asdasd asdasd"  ,      72005 ));
        productService.save(new Product(49L,"pro5", "gdegrh asdasd asdasd"  ,   60000));
        productService.save(new Product(50L,"pro6", "gdegrh asdasd asdasd"  ,60005));
        productService.save(new Product(51L,"pro7", "gdegrh asdasd asdasd"  ,           6));
        productService.save(new Product(52L,"pro8", "gdegrh asdasd asdasd"  ,  69999));
        productService.save(new Product(53L,"pro9", "gdegrh asdasd asdasd"  ,  6.5));



        imageService.saveImage(new Image( 1L, "1.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F1.jpg?alt=media"));
        imageService.saveImage(new Image( 2L, "2.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F2.jpg?alt=media"));
        imageService.saveImage(new Image( 3L, "3.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F3.jpg?alt=media"));
        imageService.saveImage(new Image( 4L, "4.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F4.jpg?alt=media"));
        imageService.saveImage(new Image( 5L, "5.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F5.jpg?alt=media"));
        imageService.saveImage(new Image( 6L, "6.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F6.jpg?alt=media"));
        imageService.saveImage(new Image( 7L, "7.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F7.jpg?alt=media"));
        imageService.saveImage(new Image( 8L, "8.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F8.jpg?alt=media"));
        imageService.saveImage(new Image( 9L, "9.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F9.jpg?alt=media"));
        imageService.saveImage(new Image( 10L, "10.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F10.jpg?alt=media"));
        imageService.saveImage(new Image( 11L, "11.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F11.jpg?alt=media"));
        imageService.saveImage(new Image( 12L, "12.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F12.jpg?alt=media"));
        imageService.saveImage(new Image( 13L, "13.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F13.jpg?alt=media"));
        imageService.saveImage(new Image( 14L, "14.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F14.jpg?alt=media"));
        imageService.saveImage(new Image( 15L, "15.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F15.jpg?alt=media"));
        imageService.saveImage(new Image( 16L, "16.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F16.jpg?alt=media"));
        imageService.saveImage(new Image( 17L, "17.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F17.jpg?alt=media"));
        imageService.saveImage(new Image( 18L, "18.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F18.jpg?alt=media"));
        imageService.saveImage(new Image( 19L, "19.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F19.jpg?alt=media"));
        imageService.saveImage(new Image( 20L, "20.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F20.jpg?alt=media"));
        imageService.saveImage(new Image( 21L, "21.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F21.jpg?alt=media"));
        imageService.saveImage(new Image( 22L, "22.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F22.jpg?alt=media"));
        imageService.saveImage(new Image( 23L, "23.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F23.jpg?alt=media"));
        imageService.saveImage(new Image( 24L, "24.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F24.jpg?alt=media"));
        imageService.saveImage(new Image( 25L, "25.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F25.jpg?alt=media"));
        imageService.saveImage(new Image( 26L, "26.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F26.jpg?alt=media"));
        imageService.saveImage(new Image( 27L, "27.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F27.jpg?alt=media"));
        imageService.saveImage(new Image( 28L, "28.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F28.jpg?alt=media"));
        imageService.saveImage(new Image( 29L, "29.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F29.jpg?alt=media"));
        imageService.saveImage(new Image( 30L, "30.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F30.jpg?alt=media"));
        imageService.saveImage(new Image( 31L, "31.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F31.jpg?alt=media"));
        imageService.saveImage(new Image( 32L, "32.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F32.jpg?alt=media"));
        imageService.saveImage(new Image( 33L, "33.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F33.jpg?alt=media"));
        imageService.saveImage(new Image( 34L, "34.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F34.jpg?alt=media"));
        imageService.saveImage(new Image( 35L, "35.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F35.jpg?alt=media"));
        imageService.saveImage(new Image( 36L, "36.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F36.jpg?alt=media"));
        imageService.saveImage(new Image( 37L, "37.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F37.jpg?alt=media"));
        imageService.saveImage(new Image( 38L, "38.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F38.jpg?alt=media"));
        imageService.saveImage(new Image( 39L, "39.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F39.jpg?alt=media"));
        imageService.saveImage(new Image( 40L, "40.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F40.jpg?alt=media"));
        imageService.saveImage(new Image( 41L, "41.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F41.jpg?alt=media"));
        imageService.saveImage(new Image( 42L, "42.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F42.jpg?alt=media"));
        imageService.saveImage(new Image( 43L, "43.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F43.jpg?alt=media"));
        imageService.saveImage(new Image( 44L, "44.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F44.jpg?alt=media"));
        imageService.saveImage(new Image( 45L, "45.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F45.jpg?alt=media"));
        imageService.saveImage(new Image( 46L, "46.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F46.jpg?alt=media"));
        imageService.saveImage(new Image( 47L, "47.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F47.jpg?alt=media"));
        imageService.saveImage(new Image( 48L, "48.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F48.jpg?alt=media"));
        imageService.saveImage(new Image( 49L, "49.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F49.jpg?alt=media"));
        imageService.saveImage(new Image( 50L, "50.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F50.jpg?alt=media"));
        imageService.saveImage(new Image( 51L, "51.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F51.jpg?alt=media"));
        imageService.saveImage(new Image( 52L, "52.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F52.jpg?alt=media"));
        imageService.saveImage(new Image( 53L, "53.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageProduct%2F53.jpg?alt=media"));


        imageService.saveImage(new Image( 54L, "shop1.png", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ShopImage%2Fshop1.png?alt=media", false));
        imageService.saveImage(new Image( 55L, "shop2.png", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ShopImage%2Fshop2.png?alt=media", false));
        imageService.saveImage(new Image( 56L, "shop3.png", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ShopImage%2Fshop3.png?alt=media", false));

        shopService.save(new Shop("Shop2", "0905202332","Quang Nam", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ShopImage%2Fshop1.png?alt=media", imageService.getImage(54L)  , userService.getUserByEmail("2@gmail.com")));
        shopService.save(new Shop("Shop5", "0905202332","Quang Binh", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ShopImage%2Fshop2.png?alt=media",  imageService.getImage(55L)  , userService.getUserByEmail("4@gmail.com")));
        shopService.save(new Shop("Shop3", "7709446333","Quang Binh", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ShopImage%2Fshop3.png?alt=media",  imageService.getImage(56L)  , userService.getUserByEmail("5@gmail.com")));

            //
//        postService.addImageToPost(postService.getPostById(1L), imageService.getImage(1L)  );
//        postService.addImageToPost(postService.getPostById(2L), imageService.getImage(2L)  );
//        postService.addImageToPost(postService.getPostById(3L), imageService.getImage(3L)  );
//        postService.addImageToPost(postService.getPostById(4L), imageService.getImage(4L)  );
//        postService.addImageToPost(postService.getPostById(5L), imageService.getImage(5L)  );
//        postService.addImageToPost(postService.getPostById(6L), imageService.getImage(6L)  );
//        postService.addImageToPost(postService.getPostById(7L), imageService.getImage(7L)  );
//        postService.addImageToPost(postService.getPostById(8L), imageService.getImage(8L)  );
//        postService.addImageToPost(postService.getPostById(9L), imageService.getImage(9L)  );
//        postService.addImageToPost(postService.getPostById(10L), imageService.getImage(10L)  );
//        postService.addImageToPost(postService.getPostById(11L), imageService.getImage(11L)  );
//        postService.addImageToPost(postService.getPostById(12L), imageService.getImage(12L)  );
//        postService.addImageToPost(postService.getPostById(13L), imageService.getImage(13L)  );
//        postService.addImageToPost(postService.getPostById(14L), imageService.getImage(14L)  );
//        postService.addImageToPost(postService.getPostById(15L), imageService.getImage(15L)  );
//        postService.addImageToPost(postService.getPostById(16L), imageService.getImage(16L)  );
//        postService.addImageToPost(postService.getPostById(17L), imageService.getImage(17L)  );
//        postService.addImageToPost(postService.getPostById(18L), imageService.getImage(18L)  );
//        postService.addImageToPost(postService.getPostById(19L), imageService.getImage(19L)  );
//        postService.addImageToPost(postService.getPostById(20L), imageService.getImage(20L)  );
//



        productService.addImageToProduct( productService.getById(1L), imageService.getImage(1L) );
        productService.addImageToProduct( productService.getById(2L), imageService.getImage(2L) );
        productService.addImageToProduct( productService.getById(3L), imageService.getImage(3L) );
        productService.addImageToProduct( productService.getById(4L), imageService.getImage(4L) );
        productService.addImageToProduct( productService.getById(5L), imageService.getImage(5L) );
        productService.addImageToProduct( productService.getById(6L), imageService.getImage(6L) );
        productService.addImageToProduct( productService.getById(7L), imageService.getImage(7L) );
        productService.addImageToProduct( productService.getById(8L), imageService.getImage(8L) );
        productService.addImageToProduct( productService.getById(9L), imageService.getImage(9L) );
        productService.addImageToProduct( productService.getById(10L), imageService.getImage(10L) );
        productService.addImageToProduct( productService.getById(11L), imageService.getImage(11L) );
        productService.addImageToProduct( productService.getById(12L), imageService.getImage(12L) );
        productService.addImageToProduct( productService.getById(13L), imageService.getImage(13L) );
        productService.addImageToProduct( productService.getById(14L), imageService.getImage(14L) );
        productService.addImageToProduct( productService.getById(15L), imageService.getImage(15L) );
        productService.addImageToProduct( productService.getById(16L), imageService.getImage(16L) );
        productService.addImageToProduct( productService.getById(17L), imageService.getImage(17L) );
        productService.addImageToProduct( productService.getById(18L), imageService.getImage(18L) );
        productService.addImageToProduct( productService.getById(19L), imageService.getImage(19L) );
        productService.addImageToProduct( productService.getById(20L), imageService.getImage(20L) );
        productService.addImageToProduct( productService.getById(21L), imageService.getImage(21L) );
        productService.addImageToProduct( productService.getById(22L), imageService.getImage(22L) );
        productService.addImageToProduct( productService.getById(23L), imageService.getImage(23L) );
        productService.addImageToProduct( productService.getById(24L), imageService.getImage(24L) );
        productService.addImageToProduct( productService.getById(25L), imageService.getImage(25L) );
        productService.addImageToProduct( productService.getById(26L), imageService.getImage(26L) );
        productService.addImageToProduct( productService.getById(27L), imageService.getImage(27L) );
        productService.addImageToProduct( productService.getById(28L), imageService.getImage(28L) );
        productService.addImageToProduct( productService.getById(29L), imageService.getImage(29L) );
        productService.addImageToProduct( productService.getById(30L), imageService.getImage(30L) );
        productService.addImageToProduct( productService.getById(31L), imageService.getImage(31L) );
        productService.addImageToProduct( productService.getById(32L), imageService.getImage(32L) );
        productService.addImageToProduct( productService.getById(33L), imageService.getImage(33L) );
        productService.addImageToProduct( productService.getById(34L), imageService.getImage(34L) );
        productService.addImageToProduct( productService.getById(35L), imageService.getImage(35L) );
        productService.addImageToProduct( productService.getById(36L), imageService.getImage(36L) );
        productService.addImageToProduct( productService.getById(37L), imageService.getImage(37L) );
        productService.addImageToProduct( productService.getById(38L), imageService.getImage(38L) );
        productService.addImageToProduct( productService.getById(39L), imageService.getImage(39L) );
        productService.addImageToProduct( productService.getById(40L), imageService.getImage(40L) );
        productService.addImageToProduct( productService.getById(41L), imageService.getImage(41L) );
        productService.addImageToProduct( productService.getById(42L), imageService.getImage(42L) );
        productService.addImageToProduct( productService.getById(43L), imageService.getImage(43L) );
        productService.addImageToProduct( productService.getById(44L), imageService.getImage(44L) );
        productService.addImageToProduct( productService.getById(45L), imageService.getImage(45L) );
        productService.addImageToProduct( productService.getById(46L), imageService.getImage(46L) );
        productService.addImageToProduct( productService.getById(47L), imageService.getImage(47L) );
        productService.addImageToProduct( productService.getById(48L), imageService.getImage(48L) );
        productService.addImageToProduct( productService.getById(49L), imageService.getImage(49L) );
        productService.addImageToProduct( productService.getById(50L), imageService.getImage(50L) );
        productService.addImageToProduct( productService.getById(51L), imageService.getImage(51L) );
        productService.addImageToProduct( productService.getById(52L), imageService.getImage(52L) );
        productService.addImageToProduct( productService.getById(53L), imageService.getImage(53L) );


        discussionService.saveMainDiscussion(new ProductMainDiscussion(1L, "Binh luan Main 1", userService.getUserById(1L), productService.getById(1L)));
        discussionService.saveMainDiscussion(new ProductMainDiscussion(2L, "Binh luan Main 2", userService.getUserById(2L), productService.getById(1L)));
        discussionService.saveMainDiscussion(new ProductMainDiscussion(3L, "Binh luan Main 3", userService.getUserById(3L), productService.getById(1L)));

        discussionService.saveSubDiscussion(new ProductSubDiscussion(1L, "Sub cmmt 1", 1L, 1L));
        discussionService.saveSubDiscussion(new ProductSubDiscussion(2L, "Sub cmmt 1", 3L, 1L));
        discussionService.saveSubDiscussion(new ProductSubDiscussion(3L, "Sub cmmt 1", 2L, 2L));
        discussionService.saveSubDiscussion(new ProductSubDiscussion(4L, "Sub cmmt 1", 4L, 3L));

        }

    }


}
