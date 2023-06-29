package com.example.be_eric.service;

import com.example.be_eric.models.Image;
import com.example.be_eric.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImageServiceImpl implements  ImageService {

    @Autowired
    private ImageRepository imgRepo;


    @Override
    public Image saveImage(Image image) { try{
       return  imgRepo.save(image);
    }catch (Exception e){
        System.out.println("Loi luu db image");
        throw e;
    }
    }

    @Override
    public Image getImage(Long id) {
        return imgRepo.findById(id).orElse(null);
    }

    @Override
    public void deleteImage(Image image) {

        imgRepo.delete(image);
    }


}
