package com.enterprise.sani.api.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.enterprise.sani.api.dto.CategoryDTO;
import com.enterprise.sani.persistence.entity.Category;
import com.enterprise.sani.persistence.repository.CategoryRepository;

@Service
public class ShopService {
    
    @Autowired
    private CategoryRepository catRepo;

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
}
