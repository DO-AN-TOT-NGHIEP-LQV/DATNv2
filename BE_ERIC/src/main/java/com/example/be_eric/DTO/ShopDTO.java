package com.example.be_eric.DTO;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Data

public class ShopDTO {
//    private  Long user_id;
//    private  String name;
//
//    private String number;
//    private boolean status;
    private  String sLink;
    private  String sAddress1;
    private  String sName;
    private  String sNumber;
    private  Long shopId;
    private  Long userId;

    public ShopDTO( Long userId, Long shopId, String sLink, String sAddress1, String sName, String sNumber) {
        this.sLink = sLink;
        this.sAddress1 = sAddress1;
        this.sName = sName;
        this.sNumber = sNumber;
        this.shopId = shopId;
        this.userId = userId;
    }


    public ShopDTO(  Long shopId, String sLink, String sAddress1, String sName, String sNumber) {
        this.sLink = sLink;
        this.sAddress1 = sAddress1;
        this.sName = sName;
        this.sNumber = sNumber;
        this.shopId = shopId;
    }



    public ShopDTO() {

    }
    public String getsLink() {
        return sLink;
    }

    public void setsLink(String sLink) {
        this.sLink = sLink;
    }

    public String getsAddress1() {
        return sAddress1;
    }

    public void setsAddress1(String sAddress1) {
        this.sAddress1 = sAddress1;
    }

    public String getsName() {
        return sName;
    }

    public void setsName(String sName) {
        this.sName = sName;
    }

    public String getsNumber() {
        return sNumber;
    }

    public void setsNumber(String sNumber) {
        this.sNumber = sNumber;
    }

    public Long getShopId() {
        return shopId;
    }

    public void setShopId(Long shopId) {
        this.shopId = shopId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
