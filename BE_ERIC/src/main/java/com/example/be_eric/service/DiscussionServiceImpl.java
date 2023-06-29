package com.example.be_eric.service;

import com.example.be_eric.DTO.MainDiscussionDTO;
import com.example.be_eric.DTO.SubDiscussionDTO;
import com.example.be_eric.models.Comment.ProductMainDiscussion;
import com.example.be_eric.models.Comment.ProductSubDiscussion;
import com.example.be_eric.models.Product.Product;
import com.example.be_eric.repository.DiscussionMainRepository;
import com.example.be_eric.repository.DiscussionSubRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class DiscussionServiceImpl implements  DiscussionService{

    @Autowired
    DiscussionMainRepository mainDiscussionRepo;
    @Autowired
    DiscussionSubRepository subDiscussionRepo;

    @Override
    public List<MainDiscussionDTO> getDTOMainDiscussion(Long id) {
        List<Object[]> result = mainDiscussionRepo.findProductMainDiscussionsByProduct(id);
        List<MainDiscussionDTO> mainDiscussions = new ArrayList<>();

        for (Object[] row : result) {
            Long mainDisId = (Long) row[0];
            String mainDisContent = (String) row[1];
            String userLastName = (String) row[2];
            Long userId  = (Long) row[3];
            String userAvatar = (String) row[4];
            Long subDisId = (Long) row[5];
            String subDisContent = (String) row[6];
            Long subUserId = (Long) row[7];
            String subUserName = (String) row[8];
            String subUserAvatar = (String) row[9];
            LocalDateTime mainUpdateAt = (LocalDateTime) row[10];
            LocalDateTime subUpdateAt = (LocalDateTime) row[11];

//            MainDiscussionDTO mainDis = new MainDiscussionDTO(mainDisId, mainDisContent, userLastName, userId, userAvatar, mainUpdateAt, new ArrayList<>());
//            SubDiscussionDTO subDis = new SubDiscussionDTO(subDisId, subDisContent, subUserName, subUserId, subUserAvatar, subUpdateAt );
//
//            mainDis.getSubComments().add(subDis);
//
//            boolean isExistingMainDis = false;
//            for ( MainDiscussionDTO mainDiscussion : mainDiscussions){
//                if( mainDiscussion.getMainId() == mainDis.getMainId() ){
//                    mainDiscussion.getSubComments().add(subDis);
//                    isExistingMainDis = true;
//                    break;
//                }
//            }
//
//            if (!isExistingMainDis) {
//                mainDiscussions.add(mainDis);
//            }

            MainDiscussionDTO mainDis = new MainDiscussionDTO(mainDisId, mainDisContent, userLastName, userId, userAvatar, mainUpdateAt,  new ArrayList<>());
            SubDiscussionDTO subDis = new SubDiscussionDTO(subDisId, subDisContent, subUserName, subUserId, subUserAvatar, subUpdateAt );
            List<SubDiscussionDTO> listSubDis = new ArrayList<>();

            if( subDis.getSubId() != null )
                mainDis.getSubComments().add(subDis);

            boolean isExistingMainDis = false;
            for ( MainDiscussionDTO mainDiscussion : mainDiscussions){
                if( mainDiscussion.getMainId() == mainDis.getMainId() ){
                    if( subDis.getSubId() != null )
                        mainDiscussion.getSubComments().add(subDis);
                    isExistingMainDis = true;
                    break;
                }

            }

            if (!isExistingMainDis) {
                mainDiscussions.add(mainDis);
            }

        }

        return mainDiscussions;
    }

    @Override
    public ProductMainDiscussion saveMainDiscussion(ProductMainDiscussion productMainDiscussion) {
        return mainDiscussionRepo.save(productMainDiscussion);
    }

    @Override
    public ProductSubDiscussion saveSubDiscussion(ProductSubDiscussion productSubDiscussion) {
        return subDiscussionRepo.save(productSubDiscussion);
    }

    @Override
    public ProductMainDiscussion getMainDiscussionById(Long id) {
        return mainDiscussionRepo.findById(id).orElse(null);
    }

    @Override
    public ProductSubDiscussion getSubDiscussionById(Long id) {
        return subDiscussionRepo.findById(id).orElse(null);
    }

    @Override
    public void delete(ProductMainDiscussion productMainDiscussion) {
         mainDiscussionRepo.delete(productMainDiscussion);
    }

    @Override
    public void delete(ProductSubDiscussion productSubDiscussion) {
         subDiscussionRepo.delete(productSubDiscussion);
    }

    @Override
    public void deleteAllMainDiscussion(Product product) {

       List<Long> ids =  mainDiscussionRepo.findProductMainDiscussionIdsByProductId(product.getId());
       mainDiscussionRepo.deleteAllById(ids);


    }


}
