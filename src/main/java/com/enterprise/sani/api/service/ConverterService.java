package com.enterprise.sani.api.service;

import java.util.Base64;

import org.springframework.stereotype.Service;

import com.enterprise.sani.api.dto.CategoryDTO;
import com.enterprise.sani.persistence.entity.Category;

@Service
public class ConverterService {

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
            
        return catDto;
    }
}
