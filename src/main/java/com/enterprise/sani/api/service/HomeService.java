package com.enterprise.sani.api.service;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.enterprise.sani.api.dto.CategoryDTO;
import com.enterprise.sani.api.dto.HomeFurnitureDTO;
import com.enterprise.sani.persistence.entity.Category;
import com.enterprise.sani.persistence.entity.Furniture;
import com.enterprise.sani.persistence.repository.CategoryRepository;
import com.enterprise.sani.persistence.repository.FurnitureRepository;

@Service
public class HomeService {
    
    @Autowired
    private FurnitureRepository furnRepo;

    @Autowired
    private CategoryRepository catRepo;

    public List<HomeFurnitureDTO> getSpecials() {

        List<HomeFurnitureDTO> list = new ArrayList<>();

        List<Furniture> flist = furnRepo.findAll();

        for (int x = 0; x < flist.size(); x++) {

            HomeFurnitureDTO dto = convertToHomeFurniture(flist.get(x));

            if(dto != null) {

                list.add(dto);
            }
        }

        return list;
    }

    private HomeFurnitureDTO convertToHomeFurniture(
        Furniture fr
    ) {
        HomeFurnitureDTO dto = null;
        
        if(fr.getDiscount().getDiscountPercentage() > 0) {
            
            Long id = fr.getFurnitureId();
            String furnitureName = fr.getFurnitureName();
            String photo = "data:image/*;base64," + Base64
                .getEncoder()
                .encodeToString(
                    fr
                        .getDisplayImage()
                        .getImageSource()
            );

            String discount = fr.getDiscount().getDiscountTitle();
            String price = "R" + Double.toString(fr.getPrice());

            dto = new HomeFurnitureDTO(id, furnitureName, photo, discount, price);
        }

        return dto;
    }

    public List<CategoryDTO> getCategories() {

        List<CategoryDTO> li = new ArrayList<>();

        List<Category> c = catRepo.findAll();

        for (int i = 0; i < c.size(); i++) {
            CategoryDTO dto = convertCategory(c.get(i));

            li.add(dto);
        }

        return li;
    }

    private CategoryDTO convertCategory(
        Category cate
    ) {
        CategoryDTO dto = null;

        Long id = cate.getCategoryId();
        String name = cate.getCategoryName();
        String description = cate.getDescription();
        String photo = 
            "data:image/*;base64," + 
            Base64
                .getEncoder()
                .encodeToString(
                    cate.getDisplayImage()
                );
        String dateAdded = cate.getDateAdded().toString();

        dto = new CategoryDTO(id, name, description, photo, dateAdded);

        return dto;
    }
}
