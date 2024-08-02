package com.enterprise.sani.persistence.entity;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class SocialContact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long socialId;

    @Enumerated(value = EnumType.STRING)
    private Social social;
    private String url;
    private String handle;

    @Temporal(value = TemporalType.DATE)
    private Date dateAdded;

    public SocialContact(Social social, String url, String handle, Date dateAdded) {
        this.social = social;
        this.url = url;
        this.handle = handle;
        this.dateAdded = dateAdded;
    }

    public enum Social {
        WHATSAPP("Whatsapp"),
        INSTAGRAM("Instagram"),
        X_TWITTER("X/Twitter"),
        FACEBOOK("Facebook"),
        YOUTUBE("YouTube"),
        GITHUB("GitHub"),
        LINKEDIN("LinkedIn"),
        GOOGLE("Google"),
        TIKTOK("Tik Tok"),
        SNAPCHAT("Snap Chat"),
        REDDIT("Reddit"),
        QOURA("Qoura"),
        DISCORD("Discord"),
        TELEGRAM("Telegram");

        public final String socialName;

        Social(String socialName) {
            this.socialName = socialName;
        }
    }
}
