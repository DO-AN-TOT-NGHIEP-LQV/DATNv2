package com.example.be_eric.models.Comment;


import com.example.be_eric.models.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductSubDiscussion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String subContent;

    @ManyToOne( fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne( fetch = FetchType.LAZY)
    @JsonBackReference
    @JoinColumn(name = "main_discussion_id")
    private ProductMainDiscussion mainDiscussion;

    public ProductSubDiscussion(Long id, String subContent, Long userId, Long mainDiscussionId) {
        this.id = id;
        this.subContent = subContent;
        this.user = new User();
        this.user.setId(userId);
        this.mainDiscussion = new ProductMainDiscussion();
        this.mainDiscussion.setId(mainDiscussionId);
    }

    public ProductSubDiscussion(String subContent, User user, ProductMainDiscussion mainDiscussion) {
        this.subContent = subContent;
        this.user = user;
        this.mainDiscussion = mainDiscussion;
    }

    @CreationTimestamp
    private LocalDateTime created_at;
    @UpdateTimestamp
    private LocalDateTime updated_at;
}
