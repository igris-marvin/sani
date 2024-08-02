package com.enterprise.sani.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HomeFurnitureDTO {
    private Long id;
    private String furnitureName;
    private String photo;
    private String discount;
    private String price;
}
