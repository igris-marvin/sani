package com.enterprise.sani.api.service;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import org.springframework.stereotype.Service;

import com.enterprise.sani.api.dto.CategoryDTO;
import com.enterprise.sani.api.dto.FurnitureDTO;
import com.enterprise.sani.persistence.entity.Category;
import com.enterprise.sani.persistence.entity.Discount;
import com.enterprise.sani.persistence.entity.Furniture;
import com.enterprise.sani.persistence.entity.Furniture.FurnitureStatus;
import com.enterprise.sani.persistence.entity.Image;

@Service
public class ConverterService {

    private DecimalFormat frmt = new DecimalFormat("R###,###.00");

    //converts Catgeory data to a a data access object type
    public CategoryDTO convertCategory(Category categ) {

        CategoryDTO catDto = null;
        
        Long id = categ.getCategoryId();
        String name = categ.getCategoryName();
        String description = categ.getDescription();
        String photo = "data:image/jpg;base64," +
            Base64
                .getEncoder()
                    .encodeToString(
                        categ
                            .getDisplayImage()
                );
        String dateAdded = categ.getDateAdded().toString();

        catDto = new CategoryDTO(id, name, description, photo, dateAdded);
            
        return catDto;
    }

    //converts Furniture data to a data access object type
    public FurnitureDTO convertFurniture(Furniture x) {
        Long furnitureId = x.getFurnitureId();
        String furnitureName = x.getFurnitureName();
        int quantity = x.getQuantity();
        String price = frmt.format(x.getPrice());
        String description = x.getDescription();
        String status = x.getStatus().name();
        String category = x.getCategory().getCategoryName();
        String displayImage = "data:image/jpg;base64," + Base64
                                    .getEncoder()
                                    .encodeToString(
                                        x.getDisplayImage().getImageSource()
                                    );

        List<String> extraImages = new ArrayList<>();

        for (Image y: x.getExtraImages()) {

            
            String image = "data:image/jpg;base64," + Base64
                                            .getEncoder()
                                            .encodeToString(
                                                y.getImageSource()
                                            );

            extraImages.add(image);
        }
        
        String discount = x.getDiscount().getDiscountTitle();
        String dateAdded = x.getDateAdded().toString();

        FurnitureDTO dto = new FurnitureDTO(
            furnitureId, 
            furnitureName, 
            quantity, 
            price, 
            description, 
            status, 
            category, 
            displayImage, 
            extraImages, 
            discount, 
            dateAdded
        );

        return dto;
    }
}
