package com.example.be_eric.DTO;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;


@Data
@Getter
@Setter
public class MainDiscussionDTO {

    private Long mainId;
    private String mainContent;
    private String username;
    private Long userId;
    private String userAvatar;
    private List<SubDiscussionDTO> subComments;
    private LocalDateTime mainUpdateAt;
    private Long productId;

    public MainDiscussionDTO(Long id, String mainContent, String username, Long userId, String userLogo, LocalDateTime updateAt , List<SubDiscussionDTO> subComments) {
        this.mainId = id;
        this.mainContent = mainContent;
        this.username = username;
        this.userId = userId;
        this.userAvatar = userLogo;
        this.subComments = subComments;
        this.mainUpdateAt =updateAt;
    }

    public MainDiscussionDTO( String mainContent,  Long productId) {
        this.mainContent = mainContent;
        this.productId = productId;
    }

    public MainDiscussionDTO() {}
}




