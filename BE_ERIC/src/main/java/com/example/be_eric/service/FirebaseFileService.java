package com.example.be_eric.service;

import com.example.be_eric.models.Comment.ProductMainDiscussion;
import com.example.be_eric.models.Image;
import com.example.be_eric.models.Product.Product;
import com.example.be_eric.models.Shop;
import com.example.be_eric.ultils.Exception.UploadImageException;
import com.google.api.core.ApiFuture;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.*;
import com.google.cloud.storage.*;

import com.google.cloud.storage.Blob;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.*;
import javax.transaction.Transactional;
import java.io.FileInputStream;
import java.io.IOException;

import java.io.InputStream;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class FirebaseFileService {
    private Storage storage ;

//    @Autowired
//    private PostService postService;
    @Autowired
    private DiscussionService discussionService;

    @Autowired
    private  ProductService productService;

    @Autowired
    private  ImageService imageService;

    @Autowired
    private Firestore firestore;

    @Autowired
    private ShopService shopService;
    private InputStream serviceAccount = getClass().getResourceAsStream("/serviceFirebaseKey.json");

    @EventListener
    public void init(ApplicationReadyEvent event) {
        try {
//            FileInputStream serviceAccounts =
//                new FileInputStream("src/main/resources/serviceFirebaseKey.json");



            storage = StorageOptions.newBuilder().
                    setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .setProjectId("datnv1-34493")
                    .build().getService();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    @Transactional(rollbackOn = UploadImageException.class)
    public String uploadImage_saveVector(MultipartFile fileImage, Product product) throws  UploadImageException {

        BlobId blobId = null;
        try {
//            String imageName = "shop_" + product.getShop().getId() + "_p_" + product.getId() + "_name_" + generateFileName(fileImage.getOriginalFilename());
            String imageName =   "p_" + product.getId() + "_name_" + generateFileName(fileImage.getOriginalFilename());
            String folderName = "ImageProduct";
            String filePath = folderName + "/" + imageName;
            System.out.println(imageName);

            blobId = BlobId.of("datnv1-34493.appspot.com", filePath);
            BlobInfo blobInfo = BlobInfo.newBuilder(blobId)
                    .setContentType(fileImage.getContentType())
                    .build();

            storage.create(blobInfo, fileImage.getBytes());

            String fileUrl = "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/" + URLEncoder.encode(filePath, "UTF-8") + "?alt=media";

            Image image = imageService.saveImage(new Image( imageName, fileUrl, true));
            System.out.println("Bat dau luu product");
            System.out.println("add hinh anh vao");
            productService.save(product);

            productService.addImageToProduct( product, image );
            System.out.println("Loi o viec luu db");

            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            ByteArrayResource resource = new ByteArrayResource(fileImage.getBytes()) {
                @Override
                public String getFilename() {
                    return fileImage.getOriginalFilename();
                }
            };
            body.add("fileImage", resource);
            body.add("product_id", product.getId());

            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
            String url = "http://103.197.185.34/ai/api/product/addNewImg";
//            String url = "http://127.0.0.1:5000/ai/api/product/addNewImg";
            ResponseEntity<String> response = restTemplate.postForEntity(url, requestEntity, String.class);
            HttpStatus statusCode = response.getStatusCode();
            int statusCodeValue = statusCode.value();

            System.out.println("Da luwu anh thanh cong");
            if (statusCodeValue == 500) {   // thi luu anh do vao DB. va upload anh le
                boolean deleted = storage.delete(blobId);
                System.out.println("loi 500 AI");
                throw new UploadImageException();
            }
            return fileUrl;

        } catch (Exception e) {
            System.out.println(e);
            if (blobId != null) {
                boolean deleted = storage.delete(blobId);
            }            boolean deleted = storage.delete(blobId);
            System.out.println("Loi trong ham try chinh");
            throw new UploadImageException();

        }
    }



    @Transactional(rollbackOn = UploadImageException.class)
    public Shop changeImageShop(MultipartFile newFile, Shop shop) throws  UploadImageException {

        Image oldImage = shop.getImage();
        try {
            String objectName = "ShopImage/" + oldImage.getName();
            System.out.println(oldImage.getName());


            BlobId blobId = BlobId.of("datnv1-34493.appspot.com", objectName);
            Blob blob = storage.get(blobId);
            if (blob == null) {
                throw new Exception("Hình ảnh không tồn tại trong kho lưu trữ");
            }

            String newFileName =   "shop_" + shop.getId() + "_" +  generateFileName(newFile.getOriginalFilename());
            String folderName = "ShopImage";
            String filePath = folderName + "/" + newFileName;
            BlobId newBlobId = BlobId.of("datnv1-34493.appspot.com", filePath);
            BlobInfo blobInfo = BlobInfo.newBuilder(newBlobId)
                    .setContentType(newFile.getContentType())
                    .build();

            shop.getImage().setName(newFileName);
            String fileUrl = "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/" + URLEncoder.encode(filePath, "UTF-8") + "?alt=media";
            shop.getImage().setUrl(fileUrl);

            Shop s = shopService.save(shop);

            storage.delete(blobId);
            storage.create(blobInfo, newFile.getBytes());

            return s;
        } catch (Exception e) {
            System.out.println(e);
            throw new UploadImageException(e.getMessage());
        }

    }


//    @Transactional
//    public  boolean deleteProduct_removeVector(Product product) throws Exception {
//
//        try {
//            WriteBatch batch = firestore.batch();
//            for ( int i = 0 ; i < 10 ; i++){
//
//                DocumentReference docRef = firestore.collection("Image_Feature_Vector").document("product_" +  product.getId() + "_" + i);
//                batch.delete(docRef);
//                System.out.println("Xoa anh thanh cong anh  product_" +  product.getId() + i);
//            }
//
//            List<Image> images = product.getImages();
//            String folderName = "ImageProduct";
//
//            for (Image image : images) {
//                String filePath = folderName + "/" + image.getName();
//                BlobId blobId = BlobId.of("datnv1-34493.appspot.com", filePath);
//
//                if (storage.get(blobId) != null) {
//                    boolean deleted = storage.delete(blobId);
//                    if (deleted) {
//                        System.out.println("File đã được xóa thành công");
//                    } else {
//                        System.out.println("Không thể xóa file");
//                        throw new Exception("Error in the process of deleting photos");
//                    }
//                }
//
//                System.out.println("here");
//                imageService.deleteImage(image);
//
//            };
//
//            System.out.println("here2");
//            if( productService.deleteProduct(product)){
//                ApiFuture<List<WriteResult>> future = batch.commit();
//                future.get();
//            }
//
//            return  true;
//        }catch (Exception e){
//            throw e;
//        }
//
//    }

    @Transactional
    public  boolean deleteProduct_removeVector(Product product) throws Exception {

        List<DocumentSnapshot> backupSnapshots = new ArrayList<>();
        List<String> imagePaths = new ArrayList<>();

        try {
            for ( int i = 0 ; i < 10 ; i++){
                DocumentReference docRef = firestore.collection("Image_Feature_Vector").document("product_" +  product.getId() + "_" + i);
                DocumentSnapshot snapshot = docRef.get().get();
                backupSnapshots.add(snapshot);
            }

            WriteBatch batch = firestore.batch();
            for (int i = 0; i < 10; i++) {
                DocumentReference docRef = firestore.collection("Image_Feature_Vector")
                        .document("product_" + product.getId() + "_" + i);
                batch.delete(docRef);
            }

//            List<Image> images = product.getImages();
//            String folderName = "ImageProduct";

//            for (Image image : images) {
//                String filePath = folderName + "/" + image.getName();
//                BlobId blobId = BlobId.of("datnv1-34493.appspot.com", filePath);
//
//                if (storage.get(blobId) != null) {
//                    boolean deleted = storage.delete(blobId);
//                    if (deleted) {
//                        System.out.println("File đã được xóa thành công");
//                    } else {
//                        System.out.println("Không thể xóa file");
//                        throw new Exception("Error in the process of deleting photos");
//                    }
//                }
//                imageService.deleteImage(image);
//
//            };

            List<Image> images = product.getImages();
            String folderName = "ImageProduct";
            for (Image image : images) {
                String filePath = folderName + "/" + image.getName();
                BlobId blobId = BlobId.of("datnv1-34493.appspot.com", filePath);

                if (storage.get(blobId) != null) {
                    boolean deleted = storage.delete(blobId);
                    if (deleted) {
                        System.out.println("File đã được xóa thành công");
                        imagePaths.add(filePath); // Lưu đường dẫn hình ảnh để xóa từ Firebase Storage sau này
                    } else {
                        System.out.println("Không thể xóa file");
                        throw new Exception("Error in the process of deleting photos");
                    }
                }

                System.out.println("here");
                imageService.deleteImage(image);
            }

            discussionService.deleteAllMainDiscussion(product);
            if( productService.deleteProduct(product)){
                // Commit thay đổi vào Firestore
                batch.commit().get();

                for (String imagePath : imagePaths) {
                    BlobId blobId = BlobId.of("datnv1-34493.appspot.com", imagePath);
                    storage.delete(blobId);
                }
                return  true;
            }
            return  false;
        }catch (Exception e){
            System.out.println("loi");
            System.out.println(e.getMessage());

            WriteBatch rollbackBatch = firestore.batch();
            for (int i = 0; i < 10; i++) {
                DocumentReference docRef = firestore.collection("Image_Feature_Vector")
                        .document("product_" + product.getId() + "_" + i);
                DocumentSnapshot backupSnapshot = backupSnapshots.get(i);
                rollbackBatch.set(docRef, backupSnapshot.getData());
            }
            rollbackBatch.commit();

            throw e;
        }

    }

    private String generateFileName(String originalFileName) {
        return UUID.randomUUID().toString() + "." + getExtension(originalFileName);
    }

    private String getExtension(String originalFileName) {
        return StringUtils.getFilenameExtension(originalFileName);
    }


}
