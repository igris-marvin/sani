package com.enterprise.sani.api.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.enterprise.sani.api.dto.CategoryDTO;
import com.enterprise.sani.api.dto.FurnitureDTO;
import com.enterprise.sani.persistence.entity.Category;
import com.enterprise.sani.persistence.entity.Furniture;
import com.enterprise.sani.persistence.repository.CategoryRepository;
import com.enterprise.sani.persistence.repository.FurnitureRepository;

@Service
public class ShopService {
    
    @Autowired
    private CategoryRepository catRepo;

    @Autowired
    private FurnitureRepository furRepo;

    @Autowired
    private ConverterService convServ;

    public List<CategoryDTO> getCategories() {
        List<CategoryDTO> dtoList = new ArrayList<>();

        List<Category> cats = catRepo.findAll();

        for (Category c : cats) {
            CategoryDTO dto = convServ.convertCategory(c);

            dtoList.add(dto);
        }

        return dtoList;
    }

    public List<FurnitureDTO> getFurniture() {
        List<FurnitureDTO> dtoList = new ArrayList<>();

        List<Furniture> furniture = furRepo.findAll();

        for (Furniture x : furniture) {
            
            FurnitureDTO dto = convServ.convertFurniture(x);

            dtoList.add(dto);

        }

        return dtoList;
    }
}
