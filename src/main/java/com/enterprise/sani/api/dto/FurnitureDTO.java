package com.enterprise.sani.api.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.enterprise.sani.persistence.entity.Image;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FurnitureDTO implements Serializable {
    private Long furnitureId;
    private String furnitureName;
    private int quantity;
    private String price;
    private String description;
    private String status;
    private String category;
    private String displayImage;
    private List<String> extraImages;
    private String discount;
    private String dateAdded;
}
