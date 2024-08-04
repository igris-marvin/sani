package com.enterprise.sani.persistence.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Category {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categoryId;
    private String categoryName;
    private String description;
    
    @Column(columnDefinition = "LONGBLOB")
    private byte[] displayImage;

    @Temporal(value = TemporalType.TIMESTAMP)
    private Date dateAdded;

    public Category(String categoryName, String description, byte[] displayImage, Date dateAdded) {
        this.categoryName = categoryName;
        this.description = description;
        this.displayImage = displayImage;
        this.dateAdded = dateAdded;
    }
}
