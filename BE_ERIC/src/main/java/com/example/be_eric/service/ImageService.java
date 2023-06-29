package com.example.be_eric.service;

import com.example.be_eric.models.Image;

public interface ImageService {
    Image saveImage(Image image);
    Image getImage(Long id);

    void  deleteImage(Image image);



}
