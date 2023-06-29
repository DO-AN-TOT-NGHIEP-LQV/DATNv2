package com.example.be_eric;
import com.example.be_eric.models.*;
import com.example.be_eric.models.Comment.ProductMainDiscussion;
import com.example.be_eric.models.Comment.ProductSubDiscussion;
import com.example.be_eric.service.*;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


@SpringBootApplication
public class BeEricApplication {

    public static void main(String[] args) {
        SpringApplication.run(BeEricApplication.class, args);
    }

    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

//    @Bean
//    CommandLineRunner run(UserService userService, PostService postService, ImageService imageService,
//                          ShopService shopService, ProductService productService, DiscussionService discussionService){
//        return args -> {
//            userService.saveRole(new Role(1L, "ROLE_USER"));
//            userService.saveRole(new Role(2L, "ROLE_ADMIN"));
//            userService.saveRole(new Role(3L, "ROLE_SALER"));
//
//            userService.saveUser(new User(1L, "1",  "1@gmail.com", "1", new ArrayList<>()));
//            userService.saveUser(new User(2L, "2",  "2@gmail.com", "2", new ArrayList<>()));
//            userService.saveUser(new User(3L, "3",  "3@gmail.com", "3", new ArrayList<>()));
//            userService.saveUser(new User(4L, "4",  "4@gmail.com", "4", new ArrayList<>()));
//            userService.saveUser(new User(5L, "5",  "5@gmail.com", "5", new ArrayList<>()));
//
//            userService.addRoleToUser("1", "ROLE_USER" );
//            userService.addRoleToUser("1", "ROLE_ADMIN" );
//            userService.addRoleToUser("1", "ROLE_SUPER_ADMIN" );
//            userService.addRoleToUser("2", "ROLE_USER" );
//            userService.addRoleToUser("2", "ROLE_SALER" );
//            userService.addRoleToUser("4", "ROLE_ADMIN" );
//            userService.addRoleToUser("5", "ROLE_SALER" );
//
//            shopService.save(new Shop("Shop2", "3853","Quang Nam", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ShopImage%2Fshop1.png?alt=media", userService.getUserByEmail("2@gmail.com")));
//            shopService.save(new Shop("Shop5", "0384","Quang Binh", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ShopImage%2Fshop2.png?alt=media", userService.getUserByEmail("5@gmail.com")));
//
//
//            postService.savePost(new Post(1L, "Sadds", "adasd", userService.getUserByEmail("1@gmail.com")));
//            postService.savePost(new Post(2L, "sdasd", "3223423", userService.getUserByEmail("3@gmail.com")));
//            postService.savePost(new Post(3L, "ewr", "dsd", userService.getUserByEmail("1@gmail.com")));
//            postService.savePost(new Post(4L, "ẻ", "ưer", userService.getUserByEmail("3@gmail.com")));
//            postService.savePost(new Post(5L, "sdasd", "df", userService.getUserByEmail("3@gmail.com")));
//            postService.savePost(new Post(6L, "sdasd", "asdasd", userService.getUserByEmail("1@gmail.com")));
//            postService.savePost(new Post(7L, "sdasd", "asdasd", userService.getUserByEmail("3@gmail.com")));
//            postService.savePost(new Post(8L, "ưe435", "sde", userService.getUserByEmail("2@gmail.com")));
//            postService.savePost(new Post(9L, "sdasd", "dsf", userService.getUserByEmail("3@gmail.com")));
//            postService.savePost(new Post(10L, "345fd", "asdasd", userService.getUserByEmail("3@gmail.com")));
//            postService.savePost(new Post(11L, "sdasd", "asdasd", userService.getUserByEmail("2@gmail.com")));
//            postService.savePost(new Post(12L, "sdasd", "asdasd", userService.getUserByEmail("3@gmail.com")));
//            postService.savePost(new Post(13L, "sdasd", "dưe", userService.getUserByEmail("3@gmail.com")));
//            postService.savePost(new Post(14L, "sdasd", "asdasd", userService.getUserByEmail("3@gmail.com")));
//            postService.savePost(new Post(15L, "sdasd", "asdasd", userService.getUserByEmail("3@gmail.com")));
//            postService.savePost(new Post(16L, "sdasd", "asdasd", userService.getUserByEmail("3@gmail.com")));
//            postService.savePost(new Post(17L, "sdasd", "asdasd", userService.getUserByEmail("1@gmail.com")));
//            postService.savePost(new Post(18L, "sdasd", "asdasd", userService.getUserByEmail("3@gmail.com")));
//            postService.savePost(new Post(19L, "sdasd", "asdasd", userService.getUserByEmail("3@gmail.com")));
//            postService.savePost(new Post(20L, "sdasd", "asdasd", userService.getUserByEmail("1@gmail.com")));
//
//
//
//            postService.savePost(new Post(21L, "fdsf", "adasd", userService.getUserByEmail("1@gmail.com")));
//            postService.savePost(new Post(22L, "sdasd", "sd", userService.getUserByEmail("3@gmail.com")));
//            postService.savePost(new Post(23L, "ewr", "dsd", userService.getUserByEmail("1@gmail.com")));
//            postService.savePost(new Post(24L, "ẻ", "ưer", userService.getUserByEmail("3@gmail.com")));
//            postService.savePost(new Post(25L, "sdasd", "df", userService.getUserByEmail("3@gmail.com")));
//            postService.savePost(new Post(26L, "sdf", "dsf", userService.getUserByEmail("1@gmail.com")));
//            postService.savePost(new Post(27L, "dsf", "asdasd", userService.getUserByEmail("3@gmail.com")));
//            postService.savePost(new Post(28L, "ưe435", "sde", userService.getUserByEmail("2@gmail.com")));
//            postService.savePost(new Post(29L, "sdf", "dsf", userService.getUserByEmail("3@gmail.com")));
//            postService.savePost(new Post(30L, "345fd", "sdf", userService.getUserByEmail("3@gmail.com")));
//            postService.savePost(new Post(31L, "sdasd", "sdf", userService.getUserByEmail("2@gmail.com")));
//            postService.savePost(new Post(32L, "sdasd", "745234", userService.getUserByEmail("3@gmail.com")));
//            postService.savePost(new Post(33L, "sdtasd", "dưe", userService.getUserByEmail("3@gmail.com")));
//            postService.savePost(new Post(34L, "gt", "g", userService.getUserByEmail("3@gmail.com")));
//            postService.savePost(new Post(35L, "sdasd", "ahgsdasd", userService.getUserByEmail("3@gmail.com")));
//            postService.savePost(new Post(36L, "24", "56", userService.getUserByEmail("3@gmail.com")));
//            postService.savePost(new Post(37L, "sdasd", "as456dasd", userService.getUserByEmail("1@gmail.com")));
//            postService.savePost(new Post(38L, "3234", "asdasd", userService.getUserByEmail("3@gmail.com")));
//            postService.savePost(new Post(39L, "sdasd", "asdasd", userService.getUserByEmail("3@gmail.com")));
//            postService.savePost(new Post(40L, "sd23asd", "asdasd", userService.getUserByEmail("1@gmail.com")));
//
//
////            postService.savePost(new Post(25L, "sdasd", "asdasd", userService.getUserByEmail("1@gmail.com")));
//
//            productService.save(new Product(21L,"pro1",
//                    "gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd " +
//                            "asdasd, gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh" +
//                            " asdasd asdasd,gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd " +
//                            "gdegrh asdasd asdasd,gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd " +
//                            "gdegrh asdasd asdasd,gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd " +
//                            "gdegrh asdasd asdasd,gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd " +
//                            "gdegrh asdasd asdasd,gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd " +
//                            "gdegrh asdasd asdasd,gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd,gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd,gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd,gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd,gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd,gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd,gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd,gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd,gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd gdegrh asdasd asdasd", 5, 6, shopService.getById(1)));
//            productService.save(new Product(22L,"pro2", "gdegrh asdasd asdasd", 50, 100000 ,  66000, shopService.getById(2)));
//            productService.save(new Product(23L,"pro3", "gdegrh asdasd asdasd", 55, 10000  , 100000, shopService.getById(1)));
//            productService.save(new Product(24L,"pro4", "gdegrh asdasd asdasd", 54, 0,       72005,                 shopService.getById(2)));
//            productService.save(new Product(25L,"pro5", "gdegrh asdasd asdasd", 52,100300,   60000, shopService.getById(1)));
//            productService.save(new Product(26L,"pro6", "gdegrh asdasd asdasd", 523,130000,  60005, shopService.getById(2)));
//            productService.save(new Product(27L,"pro7", "gdegrh asdasd asdasd", 53, 0,          6, shopService.getById(1)));
//            productService.save(new Product(28L,"pro8", "gdegrh asdasd asdasd", 53, 140000, 69999, shopService.getById(2)));
//            productService.save(new Product(29L,"pro9", "gdegrh asdasd asdasd", 25, 754333, 6.5, shopService.getById(2)));
//            productService.save(new Product(30L,"pro10", "gdegrh asdasd asdasd", 25, 140000, 100000, shopService.getById(2)));
//            productService.save(new Product(31L,"pro11", "gdegrh asdasd asdasd", 35, 12333, 6500, shopService.getById(2)));
//            productService.save(new Product(32L,"pro12", "gdegrh asdasd asdasd", 5, 65222, shopService.getById(2)));
//            productService.save(new Product(33L,"pro13", "gdegrh asdasd asdasd", 5, 15000, 14000, shopService.getById(2)));
//
//            imageService.saveImage(new Image( 1L, "1.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F1.jpg?alt=media"));
//            imageService.saveImage(new Image( 2L, "2.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F2.jpg?alt=media"));
//            imageService.saveImage(new Image( 3L, "3.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F3.jpg?alt=media"));
//            imageService.saveImage(new Image( 4L, "4.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F4.jpg?alt=media"));
//            imageService.saveImage(new Image( 5L, "5.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F5.jpg?alt=media"));
//            imageService.saveImage(new Image( 6L, "6.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F6.jpg?alt=media"));
//            imageService.saveImage(new Image( 7L, "7.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F7.jpg?alt=media"));
//            imageService.saveImage(new Image( 8L, "8.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F8.jpg?alt=media"));
//            imageService.saveImage(new Image( 9L, "9.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F9.jpg?alt=media"));
//            imageService.saveImage(new Image( 10L, "10.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F10.jpg?alt=media"));
//            imageService.saveImage(new Image( 11L, "11.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F11.jpg?alt=media"));
//            imageService.saveImage(new Image( 12L, "12.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F12.jpg?alt=media"));
//            imageService.saveImage(new Image( 13L, "13.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F13.jpg?alt=media"));
//            imageService.saveImage(new Image( 14L, "14.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F14.jpg?alt=media"));
//            imageService.saveImage(new Image( 15L, "15.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F15.jpg?alt=media"));
//            imageService.saveImage(new Image( 16L, "16.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F16.jpg?alt=media"));
//            imageService.saveImage(new Image( 17L, "17.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F17.jpg?alt=media"));
//            imageService.saveImage(new Image( 18L, "18.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F18.jpg?alt=media"));
//            imageService.saveImage(new Image( 19L, "19.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F19.jpg?alt=media"));
//            imageService.saveImage(new Image( 20L, "20.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F20.jpg?alt=media"));
//            imageService.saveImage(new Image( 21L, "21.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F21.jpg?alt=media"));
//            imageService.saveImage(new Image( 22L, "22.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F22.jpg?alt=media"));
//            imageService.saveImage(new Image( 23L, "23.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F23.jpg?alt=media"));
//            imageService.saveImage(new Image( 24L, "24.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F24.jpg?alt=media"));
//            imageService.saveImage(new Image( 25L, "25.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F25.jpg?alt=media"));
//            imageService.saveImage(new Image( 26L, "26.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F26.jpg?alt=media"));
//            imageService.saveImage(new Image( 27L, "27.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F27.jpg?alt=media"));
//            imageService.saveImage(new Image( 28L, "28.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F28.jpg?alt=media"));
//            imageService.saveImage(new Image( 29L, "29.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F29.jpg?alt=media"));
//            imageService.saveImage(new Image( 30L, "30.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F30.jpg?alt=media"));
//            imageService.saveImage(new Image( 31L, "31.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F31.jpg?alt=media"));
//            imageService.saveImage(new Image( 32L, "32.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F32.jpg?alt=media"));
//            imageService.saveImage(new Image( 33L, "33.jpg", "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/ImageTest%2F33.jpg?alt=media"));
//
//            //
//            postService.addImageToPost(postService.getPostById(1L), imageService.getImage(1L)  );
//            postService.addImageToPost(postService.getPostById(2L), imageService.getImage(2L)  );
//            postService.addImageToPost(postService.getPostById(3L), imageService.getImage(3L)  );
//            postService.addImageToPost(postService.getPostById(4L), imageService.getImage(4L)  );
//            postService.addImageToPost(postService.getPostById(5L), imageService.getImage(5L)  );
//            postService.addImageToPost(postService.getPostById(6L), imageService.getImage(6L)  );
//            postService.addImageToPost(postService.getPostById(7L), imageService.getImage(7L)  );
//            postService.addImageToPost(postService.getPostById(8L), imageService.getImage(8L)  );
//            postService.addImageToPost(postService.getPostById(9L), imageService.getImage(9L)  );
//            postService.addImageToPost(postService.getPostById(10L), imageService.getImage(10L)  );
//            postService.addImageToPost(postService.getPostById(11L), imageService.getImage(11L)  );
//            postService.addImageToPost(postService.getPostById(12L), imageService.getImage(12L)  );
//            postService.addImageToPost(postService.getPostById(13L), imageService.getImage(13L)  );
//            postService.addImageToPost(postService.getPostById(14L), imageService.getImage(14L)  );
//            postService.addImageToPost(postService.getPostById(15L), imageService.getImage(15L)  );
//            postService.addImageToPost(postService.getPostById(16L), imageService.getImage(16L)  );
//            postService.addImageToPost(postService.getPostById(17L), imageService.getImage(17L)  );
//            postService.addImageToPost(postService.getPostById(18L), imageService.getImage(18L)  );
//            postService.addImageToPost(postService.getPostById(19L), imageService.getImage(19L)  );
//            postService.addImageToPost(postService.getPostById(20L), imageService.getImage(20L)  );
//
//            postService.addImageToPost(postService.getPostById(21L), imageService.getImage(1L)  );
//            postService.addImageToPost(postService.getPostById(22L), imageService.getImage(2L)  );
//            postService.addImageToPost(postService.getPostById(23L), imageService.getImage(3L)  );
//            postService.addImageToPost(postService.getPostById(24L), imageService.getImage(4L)  );
//            postService.addImageToPost(postService.getPostById(25L), imageService.getImage(5L)  );
//            postService.addImageToPost(postService.getPostById(26L), imageService.getImage(6L)  );
//            postService.addImageToPost(postService.getPostById(27L), imageService.getImage(7L)  );
//            postService.addImageToPost(postService.getPostById(28L), imageService.getImage(8L)  );
//            postService.addImageToPost(postService.getPostById(29L), imageService.getImage(9L)  );
//            postService.addImageToPost(postService.getPostById(30L), imageService.getImage(10L)  );
//            postService.addImageToPost(postService.getPostById(31L), imageService.getImage(11L)  );
//            postService.addImageToPost(postService.getPostById(32L), imageService.getImage(12L)  );
//            postService.addImageToPost(postService.getPostById(33L), imageService.getImage(13L)  );
//            postService.addImageToPost(postService.getPostById(34L), imageService.getImage(14L)  );
//            postService.addImageToPost(postService.getPostById(35L), imageService.getImage(15L)  );
//            postService.addImageToPost(postService.getPostById(36L), imageService.getImage(16L)  );
//            postService.addImageToPost(postService.getPostById(37L), imageService.getImage(17L)  );
//            postService.addImageToPost(postService.getPostById(38L), imageService.getImage(18L)  );
//            postService.addImageToPost(postService.getPostById(39L), imageService.getImage(19L)  );
//            postService.addImageToPost(postService.getPostById(40L), imageService.getImage(20L)  );
//
//
//            productService.addImageToProduct( productService.getById(1L), imageService.getImage(21L) );
//            productService.addImageToProduct( productService.getById(2L), imageService.getImage(22L) );
//            productService.addImageToProduct( productService.getById(3L), imageService.getImage(23L) );
//            productService.addImageToProduct( productService.getById(4L), imageService.getImage(24L) );
//            productService.addImageToProduct( productService.getById(5L), imageService.getImage(25L) );
//            productService.addImageToProduct( productService.getById(6L), imageService.getImage(26L) );
//            productService.addImageToProduct( productService.getById(7L), imageService.getImage(27L) );
//            productService.addImageToProduct( productService.getById(8L), imageService.getImage(28L) );
//            productService.addImageToProduct( productService.getById(9L), imageService.getImage(29L) );
//            productService.addImageToProduct( productService.getById(10L), imageService.getImage(30L) );
//            productService.addImageToProduct( productService.getById(11L), imageService.getImage(31L) );
//            productService.addImageToProduct( productService.getById(12L), imageService.getImage(32L) );
//            productService.addImageToProduct( productService.getById(13L), imageService.getImage(33L) );
//
//            discussionService.save(new ProductMainDiscussion(1L, "Binh luan Main 1", userService.getUserById(1L), productService.getById(1L)));
//            discussionService.save(new ProductMainDiscussion(2L, "Binh luan Main 2", userService.getUserById(2L), productService.getById(1L)));
//            discussionService.save(new ProductMainDiscussion(3L, "Binh luan Main 3", userService.getUserById(3L), productService.getById(1L)));
////            System.out.println(  postService.getPostById(1L).getPostImages()  );
//
//            discussionService.save(new ProductSubDiscussion(1L, "Sub cmmt 1", 1L, 1L));
//            discussionService.save(new ProductSubDiscussion(2L, "Sub cmmt 1", 3L, 1L));
//            discussionService.save(new ProductSubDiscussion(3L, "Sub cmmt 1", 2L, 2L));
//            discussionService.save(new ProductSubDiscussion(4L, "Sub cmmt 1", 4L, 3L));
//        };
//    }
//


}
